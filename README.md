# UQ-Pool #
A carpooling app for UQ students with the goal of minimising traffic congestion
and reducing carbon emissions. 

## Enviroment Setup ##
### Front End / Back End ###
Node v14.17.4 (best to use NVM to manage node version)  
Yarn  
Navigate to the resective frontend or backend folder.
Once you have the correct version of node running and are in the respective folder
, run ```yarn install``` to install the package dependanices.

#### Google API Key ####
To use the google map API's, and the autocomplete, you must have your API
key installed. This key should stay private.

1. Log in at https://console.cloud.google.com/.
2. Using the 'Select a project' button in the header, create a new project.
3. On the sidebar, navigate to 'APIs & Services>Dashboard'. 
4. You may need to select the project you created. 
5. On the dashboard, at the top, select 'Enable APIs and Services'
6. From this API Library page, you can enable all the nessecary APIs you need.
7. Go to the 'Credentials' page through sidebar and create an API Key. 
8. Go the the file '.env' in the root folder and paste the following ```GOOGLE_MAPS_API_KEY={Your API Key}```.
9. You will need to setup billing on your account for this to work.

Project Uses Directions, Places, Geocoding and Distance Matrix APIs enabled. 

## How to run ##
### Back End ###
cd into the UQ-Pool/serverside directory and run ```yarn install``` to install any dependencies.<br />
cd into the UQ-Pool/serversid edirectory and run ```node index.mjs```. <br />

You will also need to install a MySQL server. Schema scripts can be found in `serverside/db`

Note that the server will run in development mode by default.

The server can be configured to run in production mode by editing the .env file. Changing the `NODE_ENV` to production will attempt to import HTTPS and TLS certificates.

### Front End ###
Set the address that the server is running on in `Config.json`.

cd into the UQ-Pool/clientside directory and run ```yarn install``` to install any dependencies.<br />
cd into the UQ-Pool/clientside directory and run ```yarn start``` from your terminal and scan the QR code on your phone.<br />
## Adding dependencies ##
When you use a package, ensure that it gets added to the package.json file by running ```yarn add [package-name]```. This is done in place of ```npm install``` as well. 
