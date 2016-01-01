'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Component,
  ListView,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight,
  StyleSheet
} = React;

var RepoDetails = require('./RepoDetails');

class SearchResults extends Component {
  constructor(props){
    super(props);
    var ds= new ListView.DataSource({
      rowHasChanged: (r1,r2)=>r1 !=r2
    });
    this.state = {
      dataSource: ds,
      showProgress: true,
      searchQuery: props.searchQuery
    }
  }

  componentDidMount(){
    this.doSearch();
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  doSearch(){
    var url='https://api.github.com/search/repositories?q=' + encodeURIComponent(this.state.searchQuery);

    fetch(url)
      .then((response)=>response.json())
      .then((response)=>{
        console.log(response.items)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response.items)
        });
      })
      .finally(()=>{
        this.setState({
          showProgress: false
        })
      })
  }

  pressRow(rowData,repoName){
    this.props.navigator.push({
      title: repoName,
      component: RepoDetails,
      passProps: {
        repoDetails: rowData
      }
    })
  }

  renderRow(rowData){
    return (
      <TouchableHighlight
        underlayColor='#ddd'
        onPress={()=>this.pressRow(rowData,rowData.full_name)}
      >
        <View style={{
          flex:1,
          padding:20,
          borderColor: '#D7D7D7',
          borderBottomWidth:1
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold'
          }}>
            {rowData.full_name}
          </Text>

          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop:20,
            marginBottom:20
          }}>
            <View style={styles.repoCell}>
              <Image source={require('image!star')}
                style={styles.repoCellIcon}/>
              <Text style={styles.repoCellLabel}>
                {rowData.stargazers_count}
              </Text>
            </View>

            <View style={styles.repoCell}>
              <Image source={require('image!fork')}
                style={styles.repoCellIcon}/>
              <Text style={styles.repoCellLabel}>
                {rowData.forks}
              </Text>
            </View>

            <View style={styles.repoCell}>
              <Image source={require('image!issues')}
                style={styles.repoCellIcon}/>
              <Text style={styles.repoCellLabel}>
                {rowData.open_issues}
              </Text>
            </View>

          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render(){
    if (this.state.showProgress) {
      return (
        <View style={{
          flex:1,
          justifyContent: 'center'
        }}>
          <ActivityIndicatorIOS
          size="large"
          animating={true} />
        </View>
      )
    }
    return (
        <View style={{
          flex:1,
          justifyContent: 'flex-start',
          marginTop:64
        }}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)} />
        </View>
    );
  }
}

var styles = StyleSheet.create({
  repoCell: {
    width: 50,
    alignItems: 'center'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
  repoCellLabel: {
    textAlign: 'center'
  }
})

module.exports = SearchResults;
