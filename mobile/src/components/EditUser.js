import React, { PureComponent } from 'react';
import {
  Modal,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import settings from '../settings'
import { BTText } from '.';

const updateUser = gql`
  mutation updateUser($id: ID!, $name: String!, $email: String) {
    updateUser(user: {
      id: $id
      name: $name
      email: $email
    })
  }
`;


class EditUser extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      email: props.email,
    }
  }

  onOKPress = () => {
    const { name, email } = this.state;
    const { id } = this.props;

    if (name !== this.props.name || email !== this.props.email) {
      this.props.updateUser({
        variables: {
          id,
          name,
          email
        }
      })
        .then(({ data }) => {
          this.props.refetch();
        })
        .catch(error => {
          console.log(error);
        });
    }

    this.props.onClose();
  };

  onCancelPress = () => {
    this.setState({
      name: this.props.name,
      email: this.props.email,
    }, this.props.onClose());

  };

  render() {
    const { editing } = this.props;
    const { name, email } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={editing}
      >
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <TextInput
              style={styles.edit}
              onChangeText={(value) => this.setState({ name: value })}
              value={name}
            />
          </View>

          <View style={styles.wrapper}>
            <TextInput
              style={styles.edit}
              onChangeText={(value) => this.setState({ email: value })}
              value={email}
            />
          </View>

          <View style={styles.wrapper}>
            <TouchableOpacity
              style={styles.okButton}
              onPress={this.onOKPress}
            >
              <BTText
                style={{
                  color: 'white',
                  fontSize: settings.mediumFont,
                  padding: 10,
                }}
              >
                OK
              </BTText>
            </TouchableOpacity>
          </View>

          <View style={styles.wrapper}>
            <TouchableOpacity
              title="Cancel"
              style={styles.cancelButton}
              onPress={this.onCancelPress}
            >
              <BTText
                style={{
                  color: 'white',
                  fontSize: settings.mediumFont,
                  padding: 10,
                }}
              >
                Cancel
              </BTText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  edit: {
    fontSize: settings.mediumFont,
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  okButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#5cb85c',
  },
  cancelButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ac2925',
  },
});

export default graphql(updateUser, {
  name: "updateUser",
  options: {
    refetchQueries: ['User'],
  },
})(EditUser);
