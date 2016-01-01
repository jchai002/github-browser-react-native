'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Component,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS
} = React;

var Feed= require('./Feed')
var Search=require('./Search')
var Account=require('./Account')

class AppContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedTab: 'feed'
    }
  }

  render(){
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab== 'feed'}
          icon={require('image!feed')}
          onPress={()=>this.setState({selectedTab:'feed'})}
          >
          <NavigatorIOS
            style={styles.wrapper}
            initialRoute={{
              component: Feed,
              title: 'New Activity Feed'
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab== 'search'}
          icon={require('image!search')}
          onPress={()=>this.setState({selectedTab:'search'})}
          >
          <NavigatorIOS
            style={styles.wrapper}
            initialRoute={{
              component: Search,
              title: 'Search'
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Account"
          selected={this.state.selectedTab== 'account'}
          icon={require('image!account')}
          onPress={()=>this.setState({selectedTab:'account'})}
          >
          <NavigatorIOS
            style={styles.wrapper}
            initialRoute={{
              component: Account,
              title: 'My Account'
            }}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  wrapper: {
  flex: 1
  }
});

module.exports = AppContainer
