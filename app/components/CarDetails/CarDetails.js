import React from 'react';
import { FlatList, Text, View, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Appbar } from 'react-native-paper';
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
        this.data = this.props.navigation.state.params
    }

    render() {
        console.log(this.props);

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    flex: 1
                }}
            >
                <StatusBar
                    backgroundColor={theme.colors.primary} barStyle="light-content"
                />
                <Appbar.Header
                    theme={theme}
                    dark={true}
                >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.pop()}
                    >
                        <Image
                            style={{
                                height: 35,
                                width: 35,
                                marginLeft: 10
                            }}
                            source={require('../../images/back.png')}
                        />
                    </TouchableOpacity>
                    <Appbar.Content
                        title="Car Details"
                    />
                </Appbar.Header>
                <ScrollView >
                    <Card
                        elevation={1}
                        style={{
                            margin: 10
                        }}
                    >
                        <Card.Title title={`${this.data.manufacturer} ${this.data.make}`} subtitle={`${this.data.year} | ${this.data.type} | ${this.data.fuel} | ${this.data.type}`} />

                        <Card.Cover source={{ uri: this.data.image_url }} />
                        <Card.Content>
                            <Title>$ {this.data.price}</Title>
                            <Paragraph>Locattion: {this.data.city}</Paragraph>
                        </Card.Content>
                        <View
                            style={{
                                borderBottomColor: 'rgba(0,0,0,0.1)',
                                borderBottomWidth: 0.5,
                            }}
                        />
                        <Card.Content>
                            <Title>Details</Title>
                            <Paragraph>Fuel: {this.data.fuel}</Paragraph>
                            <Paragraph>Cylinders: {this.data.cylinders}</Paragraph>
                            <Paragraph>Drive: {this.data.drive}</Paragraph>
                            <Paragraph>Color: {this.data.paint_color}</Paragraph>
                            <Paragraph>Transmission: {this.data.transmission}</Paragraph>
                            <Paragraph>Type: {this.data.type}</Paragraph>

                        </Card.Content>
                        <Card.Content>
                            <Title>Description</Title>
                            <Paragraph>{this.data.desc}</Paragraph>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </View>
        )
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