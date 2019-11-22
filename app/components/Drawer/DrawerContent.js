import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
});

class DrawerContent extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Title: {this.props.title}</Text>
      </View>
    );
  }
}

export default DrawerContent;