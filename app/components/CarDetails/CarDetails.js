import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking
} from 'react-native';
import {
    Card,
    Title,
    Paragraph,
    Appbar,
    FAB,
    TouchableRipple
} from 'react-native-paper';
import Modal from "react-native-modal";
const theme = {
    roundness: 2,
    colors: {
        primary: 'black',
        accent: 'black',
    },
};

let contactData = {
    phone: '+919876543210',
    email: '​info@aigen.tech'
}

export default class ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.data = this.props.navigation.state.params.data
    }
    _showModal = () => this.setState({ visible: true });
    _hideModal = () => this.setState({ visible: false });

    openAUrl = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                return Linking.openURL(url);
            }
        }).catch(err => err);
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    flex: 1
                }}
            >
                <StatusBar
                    backgroundColor={theme.colors.primary}
                    barStyle="light-content"
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
                        style={{
                            margin: 10,
                        }}
                    >
                        <Card.Title title={`${this.data.manufacturer} ${this.data.make}`} subtitle={`${this.data.year} | ${this.data.type} | ${this.data.fuel} | ${this.data.type}`} />

                        <Card.Cover source={{ uri: this.data.image_url }} />
                        <Card.Content>
                            <Title>$ {this.data.price}</Title>
                            <Paragraph>Location: {this.data.city}</Paragraph>
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
                {
                    this.props.navigation.state.params.contact
                        ? <FAB
                            style={styles.fab}
                            large
                            icon={require('../../images/chat.png')}
                            theme={theme}
                            onPress={() => this._showModal()}
                        />
                        : null
                }

                <Modal
                    isVisible={this.state.visible}
                    onRequestClose={() => this._hideModal()}
                    onBackdropPress={() => this._hideModal()}
                >
                    <View style={{
                        backgroundColor: 'white',
                        height: '30%',
                        borderRadius: 5,
                        justifyContent: 'space-around',
                        paddingVertical: 20
                    }}>
                        <TouchableRipple
                            onPress={() => this.openAUrl(`tel:${contactData.phone}`)}
                            rippleColor="rgba(0, 0, 0, .32)"
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginHorizontal: 25,
                                    margin: 20,
                                    alignItems: 'center',
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 40,
                                        marginRight: 20,
                                        marginBottom: 10
                                    }}
                                >&#x2706;</Text>
                                <Text
                                    style={{
                                        fontSize: 18
                                    }}
                                >{contactData.phone}</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            onPress={() => this.openAUrl(`mailto:${contactData.email}?subject=Regarding your post in Cars Application`)}
                            rippleColor="rgba(0, 0, 0, .32)"
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginHorizontal: 25,
                                    margin: 20,
                                    alignItems: 'center',
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 40,
                                        marginRight: 20,
                                        marginBottom: 10
                                    }}
                                >&#9993;</Text>
                                <Text
                                    style={{
                                        fontSize: 18
                                    }}
                                >{contactData.email}</Text>
                            </View>
                        </TouchableRipple>

                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    fab: {
        position: 'absolute',
        margin: 30,
        right: 0,
        bottom: 0,
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
});