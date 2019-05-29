import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#888'
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#888'
  }

});

export default ({ navigation }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => navigation.navigate('MainScene')}
  >
    {
      /* ***** begin */
      /* ***** Mijenjam vX.XX kako bih bio siguran da je zadnja verzija na emulatoru */
    }
    <Text style={styles.header}>Best App v1.01</Text>
    {
      /* ***** end */
    }
    <Text style={styles.subHeader}>Tap to start.</Text>
  </TouchableOpacity>
);
