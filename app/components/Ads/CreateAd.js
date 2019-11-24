import React from 'react';
import { FlatList, Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Button } from 'react-native';
import SQLite from "react-native-sqlite-storage"
SQLite.enablePromise(true);
import { Appbar, TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
const inputFieldsArr = ['city', 'price', 'year', 'manufacturer', 'make', 'condition', 'cylinders', 'fuel', 'odometer', 'transmission', 'VIN', 'drive', 'size', 'type', 'paint_color', 'desc']

const theme = {
    roundness: 2,
    colors: {
        primary: 'black',
        accent: 'black',
    },
};

let options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'cars/images',
    },
};

export default class CreateAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSource: {},
            city: null,
            price: null,
            year: null,
            manufacturer: null,
            make: null,
            condition: null,
            cylinders: null,
            fuel: null,
            odometer: null,
            transmission: null,
            VIN: null,
            drive: null,
            size: null,
            type: null,
            paint_color: null,
            image_url: null,
            desc: null,
        }
    }
    handleImagePicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log(response);
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.path };
                this.setState({
                    imgSource: source,
                });
            }
        });
    }
    
    getDataFromDB = async () => {
        let { city, price, year, manufacturer, make, condition, cylinders, fuel, odometer, transmission, VIN, drive, size, type, paint_color, desc, imgSource } =this.state
        const db = await SQLite.openDatabase({ name: 'cars.db', createFromLocation: 1, location: 'Library' }, this.openCB, this.errorCB);
        return db.transaction((tx) => {
            return tx.executeSql(`INSERT INTO user_ads (city,price,year,manufacturer,make,condition,cylinders,fuel,odometer,transmission,VIN,drive,size,type,paint_color,image_url,desc)
            VALUES ('${city}',${price},${year},'${manufacturer}','${make}','${condition}','${cylinders}','${fuel}','${odometer}','${transmission}','${VIN}','${drive}','${size}','${type}','${paint_color}','file:///${imgSource.uri}','${desc}')`, [], (tx, results) => {
                console.log(results);
            });
        });
    }

    postAdd = () => {
        
        this.getDataFromDB()

    }
    handleChange = (name) => {
        return (text) => {
            this.setState({ [name]: text })
        }
    }
    renderItem = (item, index) => {
        return <TextInput
            style={{ backgroundColor: 'white', marginHorizontal: 20 }}
            onChangeText={this.handleChange(item)}
            value={this.state[item]}
            label={item}
            underlineColor='black'
            theme={theme}
            numberOfLines={item === 'desc' ? 3 : undefined}
            multiline={item === 'desc'}
        />
    }

    render() {
        console.log(this.state.imgSource);
        
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={theme.colors.primary} barStyle="light-content"
                />
                <Appbar.Header
                    theme={theme}
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
                        title="Create ad"
                    />
                </Appbar.Header>

                <FlatList
                    data={inputFieldsArr}
                    contentContainerStyle={{
                        marginBottom: 100,
                    }}
                    keyboardDismissMode={'none'}
                    keyboardShouldPersistTaps={'always'}
                    //For the keyboard flickering bug of React Native this wont work for iOS
                    removeClippedSubviews={false}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                />
                <View
                    style={{
                        margin: 20,
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}
                >
                    <View
                        style = {{
                            marginRight: 10
                        }}
                    >
                    <Button
                        onPress={() => this.handleImagePicker()}
                        title="Add Images"
                        color="black"
                    />
                    </View>
                    <View
                        style = {{
                            width: '70%'
                        }}
                    >
                    <Button
                        onPress={() => this.postAdd()}
                        title="Submit"
                        color="black"
                    />
                    </View>
                </View>

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
