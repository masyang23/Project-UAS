import React, { Component } from 'react';
 
import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
 
import { StackNavigator } from 'react-navigation';

import Logo from './src/Logo';

export default class Home extends Component{

  render() {
    return (

      <View style={ styles.MainContainer2 }>
      <Logo/>
              <TouchableOpacity
                        activeOpacity={0.5 }
                        style={styles.TouchableOpacityStyle2}
                        onPress ={() => this.props.navigation.navigate('First') }>
                      <Text style={styles.TextStyle }>MULAI</Text>
            </TouchableOpacity>
         </View>

    );
  }

}
const styles = StyleSheet.create({
    MainContainer2 :{
 
        alignItems: 'center',
        flex:1,
        paddingTop: 5,
        backgroundColor: '#BBDEFB'
     
      },
 });