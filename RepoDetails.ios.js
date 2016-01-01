'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Component,
  Image,
  StyleSheet
} = React;
var moment= require('moment')

class RepoDetails extends Component {
  constructor(props){
    super(props);

    this.state = {
      repoDetails: props.repoDetails
    }
  }

  componentDidMount(){
    console.log(this.state.repoDetails)
  }

  render(){
    return (
      <View style={styles.container}>

      <Image
        source={{uri: this.state.repoDetails.owner.avatar_url}}
        style={{
          height:200,
          width:200,
          borderRadius: 5
        }}
        />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop:20
        }}>
          <View style={styles.repoCell}>
            <Image source={require('image!star')}
              style={styles.repoCellIcon}/>
            <Text style={styles.repoCellLabel}>
              {this.state.repoDetails.stargazers_count}
            </Text>
          </View>

          <View style={styles.repoCell}>
            <Image source={require('image!fork')}
              style={styles.repoCellIcon}/>
            <Text style={styles.repoCellLabel}>
              {this.state.repoDetails.forks}
            </Text>
          </View>

          <View style={styles.repoCell}>
            <Image source={require('image!issues')}
              style={styles.repoCellIcon}/>
            <Text style={styles.repoCellLabel}>
              {this.state.repoDetails.open_issues}
            </Text>
          </View>
        </View>

        <View style={{
            marginTop:20
          }} >
          <Text style={styles.large}>
            Language: <Text style={styles.bold}>{this.state.repoDetails.language}</Text>
          </Text>
          <Text style={styles.large}>
            Created: <Text style={styles.bold}>{moment(this.state.repoDetails.created_at).format("MMMM Do YYYY")}</Text>
          </Text>
          <Text style={styles.large}>
            Last Updated: <Text style={styles.bold}>{moment(this.state.repoDetails.updated_at).fromNow()}</Text>
          </Text>

          <Text style={styles.large}>
            <Text style={styles.description}>{this.state.repoDetails.description}</Text>
          </Text>

        </View>


      </View>
    )
  }
}

var styles= StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:80,
    justifyContent:'flex-start',
    alignItems: 'center'
  },
  large: {
    fontSize: 20,
    margin: 5,
    padding: 5
  },
  bold: {
    fontWeight: 'bold'
  },
  description: {
    color: 'gray'
  },
  repoCell: {
    width: 100,
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


module.exports = RepoDetails;
