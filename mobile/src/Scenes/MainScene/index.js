import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import UsersScene from './UsersScene';
import CompaniesScene from './CompaniesScene';
import UserScene from './UserScene';
import CompanyScene from './CompanyScene';

const HomeScene = createBottomTabNavigator({
  UsersScene: {
    screen: UsersScene,
    navigationOptions: {
      title: 'Users',
    },
  },
  CompaniesScene: {
    screen: CompaniesScene,
    navigationOptions: {
      title: 'Companies',
    },
  },
}, {
  initialRouteName: 'UsersScene',
  headerMode: 'screen',
  tabBarOptions: {
    labelStyle: {
      fontSize: 24,
    },
    style: {
      backgroundColor: '#eeeeee',
    },
  }
});

export default createStackNavigator({
  HomeScene,
  UserScene: {
    screen: UserScene,
    navigationOptions: () => ({
      header: null
    }),
  },
  CompanyScene
}, {
  initialRouteName: 'HomeScene',
  defaultNavigationOptions: {}
});
