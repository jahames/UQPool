import   { useSelector, useDispatch }   from   'react-redux'
import React, { Component } from 'react';import { Button, Text, View, StyleSheet } from 'react-native';
import Input from './Input';

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isSIDValid: null,
              isFNValid: null,
              isLNValid: null,
              isEmailValid: null,
              isPhoneValid: null,
          sid: '',
          first_name: '',
          last_name: '',
          email: '',
          phone: ''
      };
      
      this.submitUser = this.submitUser.bind(this);
    }
    async submitUser() {
        try {
        const response = fetch('http://103.4.234.91:7777/user', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: {
        sid: this.state.sid,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        phone: this.state.phone
        }
        });
        const json = await response.json;
    } catch (error) {
      console.log(error);
    } finally {
    }
    }
    
  render() {

    return (
        // Column aligned vertical stack
        <View style={styles.container}>
        
        // sid
        <Input
          placeholder="student id (format: 77777777)"
          style={styles.input}
          pattern={[
            '^[0-9]{8,8}$', // 8 numbers
]
          ]}
          onValidation={isSIDValid => this.setState({ isSIDValid })}
        />
        <View>
          <Text style={{ color: isSIDValid && isSIDValid[0] ? 'green' : 'red' }}>
          </Text>
        </View>
          
          // first name
        <Input
          placeholder="first name"
          style={styles.input}
          pattern={[
            '^[a-zA-Z]*', // at least a character
]
          ]}
          onValidation={isFNValid => this.setState({ isFNValid })}
        />
        <View>
          <Text style={{ color: isFNValid && isFNValid[0] ? 'green' : 'red' }}>
          </Text>
        </View>

// last name          
        <Input
          placeholder="student id"
          style={styles.input}
          pattern={[
            '^[a-zA-Z]*', // at least one character
]
          ]}
          onValidation={isLNValid => this.setState({ isLNValid })}
        />
        <View>
          <Text style={{ color: isLNValid && isLNValid[0] ? 'green' : 'red' }}>
          </Text>
        </View>
          
// email
        <Input
          placeholder="student email (format: john.doe@xxxx.uq.edu.au)"
          style={styles.input}
          pattern={[
            '^[a-zA-Z0-9_\-]*@[a-z].uq.edu.au', // uq domain
]
          ]}
          onValidation={isEmailValid => this.setState({ isEmailValid })}
        />
        <View>
          <Text style={{ color: isEmailValid && isEmailValid[0] ? 'green' : 'red' }}>
          </Text>
        </View>
          
// phone
        <Input
          placeholder="mobile"
          style={styles.input}
          pattern={[
            '^04[0-9]{8,8}$', // 10 numbers starting with 04
]
          ]}
          onValidation={isPhoneValid => this.setState({ isPhoneValid })}
        />
        <View>
          <Text style={{ color: isPhoneValid && isPhoneValid[0] ? 'green' : 'red' }}>
          </Text>
        </View>
<button onClick={this.submitUser}>Register</button>;  
                  </View>
    );
  }
}

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
      flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 8,
  },
  input: {
    height: 48,
    width: '80%',
    padding: 8,
    margin: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
});
