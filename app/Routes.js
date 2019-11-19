import React, { Component } from 'react';
import { Scene, Router, Stack, Drawer } from 'react-native-router-flux';
import Login from './components/Login/login'
import Home from './components/Home/home'

const getSceneStyle = () => ({
    backgroundColor: '#333333'
});

const Routes = (props) => (
    <Router getSceneStyle={getSceneStyle}>
        <Scene
            key="root"
            hideNavBar
        >
            <Scene
                key="Login"
                component={Login}
                hideNavBar={true}
                gesturesEnabled={false}
            />
            <Scene
                key="Home"
                component={Home}
                hideNavBar={true}
                gesturesEnabled={false}
            />
        </Scene>
    </Router>
);

export default Routes;