'use strict';

var React = require('react-native');
var AuthService=require('./AuthService');
var Index = require('./index');

var moment= require('moment');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Component
} = React;


class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo:''
    }
  }
  render(){
      return (
        <View style={styles.container}>
          <Image
            source={{uri: this.state.userInfo.avatar_url}}
            style={{
              height:200,
              width:200,
              borderRadius: 100
            }}
            />

            <View style={{
                alignItems: 'center'
                }}>
            <Text style={styles.large}>
              <Text style={styles.bold}>{this.state.userInfo.name}</Text>
            </Text>

            <Text>
              <Text style={styles.username}>{this.state.userInfo.login}</Text>
            </Text>

            <View style={styles.detailCell}>
              <Image source={require('image!mail')}
                style={styles.detailCellIcon}/>
              <Text style={styles.detailCellLabel}>
                <Text>{this.state.userInfo.email}</Text>
              </Text>
            </View>

            <View style={styles.detailCell}>
              <Image source={require('image!location')}
                style={styles.detailCellIcon}/>
              <Text style={styles.detailCellLabel}>
                <Text>{this.state.userInfo.location}</Text>
              </Text>
            </View>

            <View style={styles.detailCell}>
              <Image source={require('image!link')}
                style={styles.detailCellIcon}/>
              <Text style={styles.detailCellLabel}>
                <Text>{this.state.userInfo.blog}</Text>
              </Text>
            </View>

            <Text style={styles.large}>
              Member Since: <Text style={styles.bold}>{moment(this.state.userInfo.created_at).format("MMMM Do YYYY")}</Text>
            </Text>

            <Text style={styles.large}>
              Most Recent Activity: <Text style={styles.bold}>{moment(this.state.userInfo.updated_at).fromNow()}</Text>
            </Text>
          </View>
      </View>
      );
  }
  componentDidMount(){
    AuthService.getAuthInfo((err,authInfo)=>{
      if (err){
        console.log(err)
      }
      this.setState({
        userInfo:authInfo.header.user
      })
    })
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:100,
    justifyContent:'flex-start',
    alignItems: 'center'
  },
  large: {
    fontSize: 20,
    paddingTop: 10
  },
  bold: {
    fontWeight: 'bold'
  },
  username: {
    color: 'gray'
  },
  detailCell: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 5
  },
  detailCellIcon: {
    width: 20,
    height: 20
  },
  detailCellLabel: {
    textAlign: 'center',
    paddingLeft: 5
  }
});

module.exports = Account
