import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SpatialNavigation, {
  Focusable,
  FocusableSection,
  withFocusable,
  withFocusableSection,
  withNavigation,
  JsSpatialNavigation,
} from './web/SpatialNavigation';

const isEmptyObject = obj =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

class TouchableFocusWeb extends PureComponent {
  onFocus = () => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus();
    }
  };

  onBlur = () => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur();
    }
  };

  onPress = () => {
    const { onPress } = this.props;
    if (onPress) {
      onPress();
    }
  };

  setNativeProps() {
    // ignore
  }

  render() {
    const { hasTVPreferredFocus, children } = this.props;

    const focusItem = (
      <Focusable
        onFocus={this.onFocus}
        onUnfocus={this.onBlur}
        onClickEnter={this.onPress}
        style={{
          right: 0,
          left: 0,
          bottom: 0,
          top: 0,
          position: 'absolute',
        }}
        hasTVPreferredFocus={hasTVPreferredFocus}
      />
    );

    // add a focusable item on top
    const focusableChildren = isEmptyObject(children)
      ? [focusItem]
      : [children, focusItem];

    return (
      <TouchableOpacity {...this.props} onPress={this.onPress}>
        {focusableChildren}
      </TouchableOpacity>
    );
  }
}

const noOp = () => {};

TouchableFocusWeb.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onPress: PropTypes.func,
  hasTVPreferredFocus: PropTypes.bool,
};

TouchableFocusWeb.defaultProps = {
  children: {},
  onFocus: noOp,
  onBlur: noOp,
  onPress: noOp,
  hasTVPreferredFocus: false,
};

// Use TouchableOpacity as a fallback for any other platform
export default TouchableFocusWeb;
export {
  SpatialNavigation,
  FocusableSection,
  withFocusable,
  withFocusableSection,
  withNavigation,
  JsSpatialNavigation,
};
