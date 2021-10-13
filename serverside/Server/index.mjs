// Dependencies
// Had so much trouble getting fetch import to work, if you can fix this go
// ahead.
import fetch from 'node-fetch'; 
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const env = require('dotenv').config({path:'../../.env'})
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const https = require('https');
const jwt = require('jsonwebtoken');

// TLS/SSL Certificates
const privateKey = fs.readFileSync('/etc/letsencrypt/live/uqpool.xyz/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/uqpool.xyz/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/uqpool.xyz/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// Authenticate tokens before doing requests
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, sid) => {
	console.log(err);
	if (err) return res.sendStatus(403)
	req.sid = sid
	next()
    })
}

const httpsPort = 7777;

// define express
const app = express();
// Enhance API security
app.use(helmet());
// convert incoming request body to json
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));
// serve static files such as images
app.use(express.static('public'));

// Start the HTTPS servers
const httpsServer = https.createServer(credentials, app);

// end point requires
const user = require('./user');
const navigation = require('./navigation');
const book = require('./book');
const rate = require('./rate');
const reward = require('./reward');

// available users being connected
var connected = {};
// Chat rooms for accepted pools 
var pools = {};

/* Request section:
These should reflect the state machine's side effects for
login/registration
booking
navigation
scheduling
rating/review
rewards
*/

// Registration section
app.post('/login', async(req, res) => {
    user.login(req.body, function (payload) {
        res.send(payload);
    });
});

app.put('/user', async(req, res) => {
    user.update(req.body, function (payload) {
        res.send(payload);
    });
});

app.delete('/user', async(req, res) => {
    user.remove(req.body.user, function (payload) {
        res.send(payload);
    });
});

app.post('/user', async(req, res) => {
    user.create(req.body, function (payload) {
	res.send(payload);
    });
});

app.get('/users', authenticateToken, async(req, res) => {
    user.users(req.body, function (payload) {
        res.send(payload);
    });
});

// History section
app.get('/history', async(req, res) => {
    user.history(req.body.user, function (payload) {
        res.send(payload);
    });
});

// Review section 
app.post('/rate', async(req, res) => {
    rate.create(req.body, function (payload) {
        res.send(payload);
    });
});

app.delete('/rate', async(req, res) => {
    rate.remove(req.body, function (payload) {
        res.send(payload);
    });
});

// Rewards Section
app.get('/rewards', async(req, res) => {
    reward.getRewards(req.body, function (payload) {
        res.send(payload);
    });
});

app.post('/rewards', async(req, res) => {
    reward.getPoints(req.body, function (payload) {
        res.send(payload);
    });
});

/*const server = app.listen(port, (err) => {
  if (err) {
      return console.log('Error: ', err);
  }
  console.log(`server is listening on ${port}`);
})*/

httpsServer.listen(httpsPort, (err) => {
    if (err) {
        return console.log('Error: ' + err);
    }
	console.log('HTTPS Server running on port ' + httpsPort);
});

// webhook section
const io = require('socket.io')(httpsServer);

/* Webhook section
These are a reflection of the user/location/booking/review methods but for 
webhooks requiring persistent connections
*/

io.on('connection', async (socket) => {
    console.log('a user connected');

    // User section
    // Broadcasting user has logged in or out
    // New user location to be added to the table

    // user x logging in
    // Add to either activeDriver | activeRider 
    // broadcast to all sockets in connected with locaiton
    socket.on('login', (body) => {
        let msg = JSON.parse(body)
        connected[msg.sid] = socket;
        console.log("User " + msg.sid + " added")
    });

    // user x logging out
    // Get rid of user in either activeDriver | activeRider
    // delete socket connection in connected
    socket.on('logout', (body) => {
        if (body.sid in connected) {
            delete connected[body.user];
            socket.broadcast.emit('logout', body);
        }
    });

    // Navigation and location management
    // user x has refreshed their location
    // broadcast new location to all sockets in connected
    socket.on('location', (body) => {
        socket.broadcast.emit('location', body);
    });

    // Booking section

    // User a requests to user b    
    // socket searches for user b in connected sockets and sends request
    socket.on('request', (body, result) => {

        if (body.sid in connected) {
            console.log("Requesting pickup for rider " + body.sid);
            book.requestPickup(body, function (payload) {
                connected[body.sid].emit('requestResponse', payload);
            });
        } else {
            console.log("That user does not exist");
        };
    });

    // user a cancels the request to user b
    // search for user b socket in connected and send cancel message
    socket.on('cancel', (body, request) => {

        if (body.sid in connected) {
            book.cancelPickup(body, function (payload) {
                connected[body.driver].emit('cancel', payload);
            });
        } else {
            console.log("That user does not exist");
        };

    });

    //User has accepted a driver
    socket.on('accept', (body, request) => {

        if (body.sid in connected) {
            if (driver_id in pools) {
                pool[driver_id].push(body.sid)
            } else {
                pool[driver_id] = [body.sid]
            };
            //TODO: Validate driver and car wants pickup 
            book.acceptPickup(body, function (payload) {
                console.log("User accepted driver " + body.sid);
                connected[body.driver].emit('confirm', payload);
                connected[body.sid].emit('confirm', payload);
            });
        } else {
            console.log("That user does not exist");
        };
   });

   // Pool Messaging Section
   // Once user is joined to a pool they will use the below socket.io calls to chat
   // and to update GPS locations

   //Send message to a pool chat
   socket.on('sendMessage', (body, request) => {
        if (body.sid in pools[body.driverSid]) {
            chat.sendMessage(body, function (payload) {
                pool[body.driverSid].emit('message', payload);
            });
        } else {
            console.log("Invalid chat room")
        };
    });

});
