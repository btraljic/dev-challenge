// todo: (15) 2. would be really cool to show the company info here.
// todo: (16) 3. would be extra cool to show the employee list and make it navigate to that user on tap.

import React, { PureComponent } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import settings from '../../settings'

import {
  CoverImage,
  BTText,
  UserList,
  CompanyList,
  ErrorScene
} from '../../components';

const query = gql`
  query Company($id: ID!) {
    company(id: $id) {
      id
      name
      image
      address {
        city
        streetAddress
        state
        country
      }
      employees {
        id
        name
        email
        image
        color
      }
    }
  }
`;


export default class CompanyScene extends PureComponent {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    return (
      <View style={styles.container}>
        <Query query={query} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }

            return (
              <ScrollView>
                <CoverImage
                  imageURI={data.company.image}
                  title={data.company.name}
                />
                <View>
                  <BTText />
                  <BTText
                    style={{
                      fontSize: settings.largeFont,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  >
                    {data.company.name}
                  </BTText>
                  <BTText />

                  <BTText>{data.company.address.streetAddress}</BTText>
                  <BTText>{data.company.address.city}</BTText>
                  <BTText>{data.company.address.state}</BTText>
                  <BTText>{data.company.address.country}</BTText>

                  <BTText />
                  <BTText
                    style={{
                      fontSize: settings.mediumFont,
                      fontWeight: 'bold',
                    }}
                  >
                    EMPLOYEES:
                  </BTText>
                  {
                    data.company.employees.map(item => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() =>
                          navigation.navigate('UserScene', { id: item.id })
                        }
                      >
                        <UserList user={item} />
                      </TouchableOpacity>
                    ))
                  }
                  <BTText />

                </View>
              </ScrollView>
            );
          }}
        </Query>
      </View>
    );
  }
}
/*
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sceneView: {
    height: '100%',
  },
});
