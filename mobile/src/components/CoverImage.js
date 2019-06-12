import React from 'react';
import {
  Dimensions,
  View,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';

import settings from '../settings';


export default ({ imageURI, title }) => {
  const { height, width } = Dimensions.get('window');

  return (
    <View style={[styles.imageWrapper, { height: height, width: width }]}>
      <ImageBackground
        style={styles.image}
        source={{ uri: imageURI }}
      >
        <Text style={styles.title}>
          {'\n\n\n'}
          {title}
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    ...StyleSheet.absoluteFil,
  },
  image: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: settings.coverFont,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#aaa',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 5,
  },
});

