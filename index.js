import { Platform, TouchableOpacity } from 'react-native';

// on AndroidTV, disable extra native onClick event
if (Platform.OS === 'android' && Platform.isTV) {
  TouchableOpacity.defaultProps.clickable = false;
}

export default TouchableOpacity;
