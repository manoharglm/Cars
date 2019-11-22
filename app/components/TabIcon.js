  
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
};

const defaultProps = {
  focused: false,
  title: '',
};

const TabIcon = props => <Text style={{ 
    color: props.focused ? 'white' : 'black',
    fontWeight: 'bold'
}}>{props.title}</Text>;

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

export default TabIcon;