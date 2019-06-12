import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import settings from '../settings';

import Anchor from './Anchor';


export default ({
  mail = '',
  style = {
    fontSize: settings.mediumFont,
  },
  children,
}) => {
  if (mail !== '') {
    return (
      <View style={styles.row}>
        <Anchor style={style} href={mail}>
          {children}
        </Anchor>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <Text style={style}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
