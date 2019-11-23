import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux';
import Login from './components/Login/login'
import Home from './components/Home/home'
import Ads from './components/Ads/ads'
import CarDetails from './components/CarDetails/CarDetails'
import CreateAd from './components/Ads/CreateAd'
import TabIcon from './components/TabIcon';
import DrawerContent from './components/Drawer/DrawerContent'
import MenuIcon from './images/menu.png';

const getSceneStyle = () => ({
    backgroundColor: '#333333'
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scene: {
        backgroundColor: 'white',
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    tabBarStyle: {
        backgroundColor: 'black',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: 'white',
    },
});

const Routes = (props) => (
    <Router getSceneStyle={getSceneStyle}>
        <Scene
            key="root"
            hideNavBar
        >
            <Scene
                key="Login"
                initial
                component={Login}
                hideNavBar={true}
                gesturesEnabled={false}
            />

            <Tabs
                key="Tab"
                backToInitial
                showLabel={true}
                activeBackgroundColor="white"
                inactiveBackgroundColor="white"
                activeTintColor="black"
            >
                <Stack
                    key="tab_1"
                    title="Home"
                    icon={TabIcon}
                >
                    <Scene
                        key="Home"
                        component={Home}
                        hideNavBar={true}
                        gesturesEnabled={false}
                    />
                    <Scene
                        key="CarDetails"
                        component={CarDetails}
                        hideNavBar={true}
                        gesturesEnabled={false}
                    />

                </Stack>

                <Stack key="tab_2" title="Ads" icon={TabIcon}
                >
                    <Scene
                        key="Ads"
                        component={Ads}
                        hideNavBar={true}
                        gesturesEnabled={false}
                    />
                    <Scene
                        key="CarDetails"
                        component={CarDetails}
                        hideNavBar={true}
                        gesturesEnabled={false}
                    />
                    <Scene
                        key="CreateAd"
                        component={CreateAd}
                        hideNavBar={true}
                        gesturesEnabled={false}
                    />
                </Stack>
            </Tabs>
        </Scene>
    </Router>
);

export default Routes;