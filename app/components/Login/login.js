import React, { Component } from 'react';
// import { connect } from 'react-redux';
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
    }

    handleChange = (name) => {
        return (text) => {
            this.setState({ [name]: text })
        }
    }
    validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase())
    }

    onPressLoginButton = () => {
        console.log(this.props);
        
        if(this.validate(this.state.username)){
            this.props.navigation.replace('Home')
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