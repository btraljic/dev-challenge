import React, { PureComponent } from 'react';
import {
  Text,
  Linking,
} from 'react-native';


export default class Anchor extends PureComponent {
  handlePress = () => {
    const { href } = this.props;
    Linking.openURL(href);
  };

  render() {
    const {
      style,
      children,
    } = this.props;

    return (
      <Text
        style={[style, { textDecorationLine: 'underline' }]}
        onPress={this.handlePress}
      >
        {children}
      </Text>
    );
  }
}
