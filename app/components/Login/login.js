import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Button,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import {
    TextInput,
} from 'react-native-paper';
import * as commonFunctions from '../commonFunctions';
const theme = {
    roundness: 2,
    colors: {
        primary: 'black',
        accent: 'black',
    },
};

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this._retrieveData().then(data => {  
            if(data){
                this.props.navigation.replace('Tab')
            }   
        })
    }

    handleChange = (name) => {
        return (text) => {
            this.setState({ [name]: text })
        }
    }


    _storeData = async (data) => {
        if(data){
            try {
                await AsyncStorage.setItem('ISLOGGEDIN', data)
              } catch (error) {
                  console.log(error);
              }
        }
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('ISLOGGEDIN');
            return JSON.parse(value)
        } catch (error) {
            console.log(error);
        }
    }

    onPressLoginButton = () => {
        if(commonFunctions.validateEmail(this.state.username)){
            let userData = require('../../user.json')
            let userDetails = userData.find(userObj => userObj.email === this.state.username)
            if(userDetails.password === this.state.password){
                this._storeData(JSON.stringify(true))
                this.props.navigation.replace('Tab')
            }else{
                alert('Invalid Email or Password')
            }
        }else{
            alert('Invalid EmailID')
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <View style={styles.container}>
                    {/* <Image
                        style={{
                            width: 100,
                            height: 100,
                            alignSelf: 'center',
                            margin: 50,
                        }}
                        source={require('../assets/icon.png')}
                    /> */}

                    <TextInput
                        style={{ backgroundColor: 'white', marginHorizontal: 20 }}
                        onChangeText={this.handleChange('username')}
                        value={this.state.username}
                        label='Email'
                        underlineColor='black'
                        theme={theme}
                        textContentType = 'emailAddress'
                        keyboardAppearance = 'email-address'
                    />
                    <TextInput
                        style={{ backgroundColor: 'white', marginHorizontal: 20 }}
                        onChangeText={this.handleChange('password')}
                        value={this.state.password}
                        label='Password'
                        secureTextEntry
                        underlineColor='black'
                        theme={theme}
                    />
                    <View
                        style={{
                            margin: 20,
                        }}
                    >
                        <Button
                            onPress={() => this.onPressLoginButton()}
                            title="LOGIN"
                            color="black"
                            accessibilityLabel="Login to application"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center'
    },
});

export default login