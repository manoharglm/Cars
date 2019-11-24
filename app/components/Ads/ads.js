import React from 'react';
import { FlatList, Text, View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Appbar, FAB } from 'react-native-paper';
import SQLite from "react-native-sqlite-storage"
SQLite.enablePromise(true);
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
        this.state = {
            userAds: [],
        }
    }
    componentDidMount() {
        this.getDataFromDB()
    }
    getDataFromDB = async () => {
        const db = await SQLite.openDatabase({ name: 'cars.db', createFromLocation: 1, location: 'Library' }, this.openCB, this.errorCB);
        return db.transaction((tx) => {
            return tx.executeSql(`SELECT * from user_ads`, [], (tx, results) => {
                let len = results.rows.length;
                let userAds = []
                for (let i = 0; i < len; i++) {
                    userAds.push(results.rows.item(i))
                }
                this.setState({
                    userAds
                })
            });
        });
    }

    renderItem = (item, index) => {
        return (
            <Card
                elevation={1}
                style={{
                    margin: 10
                }}
                onPress={() => this.props.navigation.push("CarDetails", {data: item, contact: false})}
            >
                <Card.Cover source={{ uri: item.image_url }} />
                <Card.Title title={`${item.manufacturer} ${item.make}`} subtitle={`${item.year} | ${item.type} | ${item.fuel} | ${item.type}`} />
                <View
                    style={{
                        borderBottomColor: 'rgba(0,0,0,0.1)',
                        borderBottomWidth: 0.5,
                    }}
                />
                <Card.Content>
                    <Title>$ {item.price}</Title>
                    <Paragraph>Location: {item.city}</Paragraph>
                </Card.Content>
            </Card>
        )
    }

    updateuserAds = (data) => {
        console.log('userads',data);
        
        this.setState(prevState => {
            return {
                userAds : [...prevState.userAds,data]
            }
        })
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
                </Appbar.Header>
                <FlatList
                    data={this.state.userAds}
                    contentContainerStyle={{
                        marginBottom: 100
                    }}
                    inverted
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                // onEndReached = {this.getDataFromDB(this.page++)}
                />
                <FAB
                    style={styles.fab}
                    large
                    icon={require('../../images/plus.png')}
                    theme={theme}
                    onPress={() => this.props.navigation.push("CreateAd", {updateuserAds : userAds => this.updateuserAds(userAds)})}
                />
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
    fab: {
        position: 'absolute',
        margin: 30,
        right: 0,
        bottom: 0,
    },
});