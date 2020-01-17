import React, { Component } from "react";
import { Platform, TouchableOpacity } from "react-native";
let TouchableFocus = TouchableOpacity;

// on AndroidTV, disable extra native onClick event
if (Platform.OS === "android" && Platform.isTV) {
  class TouchableOpacityAndroidTV extends React.PureComponent {
    constructor(props) {
      super(props);
      this.touchableRef = React.createRef();
    }

    onPressFilter = e => {
      const { onPress } = this.props;
      const { eventKeyAction } = e;
      if (onPress && eventKeyAction === 0) {
        onPress(e);
      }
    };

    setNativeProps(props) {
      this.touchableRef.current.setNativeProps(props);
    }

    render() {
      return (
        <TouchableOpacity
          {...this.props}
          onPress={this.onPressFilter}
          ref={this.touchableRef}
          clickable={false}
        />
      );
    }
  }
  TouchableFocus = TouchableOpacityAndroidTV;
}

export default TouchableFocus;
