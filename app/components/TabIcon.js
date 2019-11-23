
import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image } from 'react-native';

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
};

const defaultProps = {
  focused: false,
  title: '',
};
const TabIcon = props => {
  let icon = 
  (props.title === 'Home' && !props.focused) 
  ? require('../images/home.png') 
  : (props.title === 'Home' && props.focused)
  ? require('../images/home_focused.png') 
  : (props.title === 'Ads' && !props.focused)
  ? require('../images/user.png') 
  : require('../images/user_focused.jpg') 

  return (
    <Image
      style={{
        height: 30,
        width: 30,
      }}
      source={icon}
    />
  )
}
// const TabIcon = props => <Text style={{ 
//     color: props.focused ? 'black' : 'black',
//     fontWeight: 'bold'
// }}>{props.title}</Text>;

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

export default TabIcon;