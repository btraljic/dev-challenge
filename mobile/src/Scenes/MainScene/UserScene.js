// todo: (11) 2. would be cool if we actually displayed full user data that is contained in the user data object.

// todo: (12) 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
// if this is done correctly, we should be re-using components from the CompaniesScene.

// todo: (13) 4. would be even cooler to see a list of their friends, so I can tap on them an get more info about that user.

// todo: (14) 5 would be cool to make the user name and email updateable and saved ot the database, so we can let our users change their info.

import React, { PureComponent } from 'react';
import {
  View,
  Button,
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
import EditUser from '../../components/EditUser';

const query = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      image
      email
      address {
        city
        streetAddress
        state
        country
      }
      company {
        id
        name
        image
        color
        address {
          city
          streetName
        }
      }
      friends {
        id
        name
        email
        image
        color
      }
    }
  }
`;


export default class UserScene extends PureComponent {
  state = {
    editing: false,
  };

  onEditPress = () => this.setState({ editing: true });

  onEditClose = () => this.setState({ editing: false });

  render() {
    const { editing } = this.state;
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    console.log('editing', editing);

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
                <EditUser
                  editing={editing}
                  onClose={this.onEditClose}
                  id={data.user.id}
                  name={data.user.name}
                  email={data.user.email}
                />

                <CoverImage
                  imageURI={data.user.image}
                  title={data.user.name}
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
                    {data.user.name}
                  </BTText>
                  <BTText
                    mail={`mailto:${data.user.email}?subject=Mail From BestApp`}
                  >
                    {data.user.email}
                  </BTText>
                  <BTText />

                  <BTText>{data.user.address.streetAddress}</BTText>
                  <BTText>{data.user.address.city}</BTText>
                  <BTText>{data.user.address.state}</BTText>
                  <BTText>{data.user.address.country}</BTText>

                  <BTText />

                  {
                    data.user.company !== null &&
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CompanyScene', { id: data.user.company.id })
                      }
                    >
                      <CompanyList company={data.user.company} />
                    </TouchableOpacity>
                  }

                  <BTText />
                  <BTText
                    style={{
                      fontSize: settings.mediumFont,
                      fontWeight: 'bold',
                    }}
                  >
                    FRIENDS:
                  </BTText>
                  {
                    data.user.friends.map(item => (
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

        <Button
          title="Edit"
          style={styles.editButton}
          onPress={this.onEditPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sceneView: {
    height: '100%',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: settings.mediumFont,
    zIndex: 100,
  },
});
