import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import settings from '../settings';


export default memo(({ company }) => {
  // const imageData = fetch(company.image);
  const imageData = 'https://bloximages.newyork1.vip.townnews.com/gazette.com/content/tncms/assets/v3/editorial/3/d9/3d9527a0-3928-11e9-af96-1b5f3fa43b84/5c742f0341902.image.jpg';

  return (
    <View style={styles.companyList}>
      <View style={[styles.companyImageWrapper, { borderColor: company.color }]}>
        <Image
          style={styles.companyImage}
          source={{ uri: imageData }}
        />
      </View>
      <View style={styles.text}>
        <Text style={styles.textName}>{company.name}</Text>
        <Text style={styles.textAddress}>{company.address.city}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  companyList: {
    flexDirection: 'row',
    padding: 20
  },
  companyImageWrapper: {
    marginRight: 20,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(55,123,219,0.2)',
    width: 80,
    height: 80,
    overflow: 'hidden'
  },
  companyImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  text: {
    flexDirection: 'column'
  },
  textName: {
    fontSize: settings.largeFont
  },
  textAddress: {
    fontSize: settings.mediumFont
  }
});

