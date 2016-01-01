'use strict';

var React = require('react-native');
var buffer = require('buffer');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;
var AuthService=require('./AuthService')

var Account = React.createClass({
  getInitialState: function(){
    return {

    }
  },
  render: function(){
      return (
        <View style={styles.container}>
          <TouchableHighlight
            onPress={this.onLogoutPressed}
            style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableHighlight>
        </View>
      );
  },
  onLogoutPressed: function(){
    AuthService.logout()
    this.props.navigator.replace([{name: 'index'}])
  },
  componentDidMount: function(){
    AuthService.getAuthInfo((err,authInfo)=>{
      if (err){
        console.log(err)
      }
      console.log(authInfo)
    })
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop:10
  },
  input: {
    height: 50,
    margin: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor:'#48bbec',
    borderRadius: 5
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
});

module.exports = Account

AppRegistry.registerComponent('Account', () => Account);
