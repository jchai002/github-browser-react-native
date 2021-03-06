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

var Login = React.createClass({
  getInitialState: function(){
    return {
      username:'',
      password:'',
      badCredentials:'',
      unknownError:'',
      showProgress: false,
      success: false
    }
  },
  render: function(){

    var errorCtrl=<View />;
    if(this.state.badCredentials && !this.state.success){
      errorCtrl= <Text style={styles.error}>
        User name and Password combo did not work
      </Text>
    }

    if(this.state.unknownError && !this.state.success){
      errorCtrl= <Text style={styles.error}>
        unknown Error
      </Text>
    }
    return (
      <View style={styles.container}>
        <Image style={styles.logo}
        source={require('image!Octocat')} />
      <Text style={styles.heading}>
        Github Browser
      </Text>
      <TextInput
        onChangeText={(text)=>this.setState({username:text})}
        style={styles.input}
        placeholder="Github username"
        />
      <TextInput
        onChangeText={(text)=>this.setState({password:text})}
        secureTextEntry={true}
        style={styles.input}
        placeholder="Github password"
        />
      <TouchableHighlight
        onPress={this.onLoginPressed}
        style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableHighlight>
      {errorCtrl}

      <ActivityIndicatorIOS
        animating={this.state.showProgress}
        size="large"
        style={styles.loader}
        />
      </View>
    );
  },
  onLoginPressed: function(){
    console.log('Attempting to log in with username '+this.state.username)
    this.setState({showProgress:true});

    var authService = require('./AuthService')
    authService.login({
      username: this.state.username,
      password: this.state.password
    },(results)=>{
      this.setState(Object.assign({
        showProgress:false
      },results));
      if(results.success&&this.props.onLogin){
        this.props.onLogin();
      }
    });
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

module.exports = Login

AppRegistry.registerComponent('Login', () => Login);
