'use strict';

var React = require('react-native');

var {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Component,
  StyleSheet
} = React;
var SearchResults = require('./SearchResults');
class Search extends Component {

  constructor(props){
    super(props);

    this.state = {
      searchQuery: ''
    }
  }

  render(){
    return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text)=>this.setState({searchQuery:text})}
        style={styles.input}
        placeholder="Search for a repo"
        />

      <TouchableHighlight
        onPress={this.onSearchPressed.bind(this)}
        style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableHighlight>
    </View>
    );
  }

  onSearchPressed(){
    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        searchQuery: this.state.searchQuery
      }
    })
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:100,
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
  }
});


module.exports = Search
