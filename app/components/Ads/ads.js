import React from 'react';
import { FlatList, Text, View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
const theme = {
    roundness: 2,
    colors: {
        primary: 'black',
        accent: 'black',
    },
};
// var db = openDatabase({ name: 'cars.db', createFromLocation : 1});

export default class ads extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.colors.primary} barStyle="light-content"
                />
                <Appbar.Header
                    theme={theme}
                >
                    <Appbar.Content
                        title="My Ads"
                    />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.pop()}
                    >
                        <Image
                            style={{
                                height: 35,
                                width: 35,
                                marginRight: 10
                            }}
                            source={require('../../images/plus.png')}
                        />
                    </TouchableOpacity>
                </Appbar.Header>
                <Text>ADS</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
});