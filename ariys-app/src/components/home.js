import React from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { SearchBar, Avatar } from "react-native-elements";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      base_url: "https://pyconlunchbeta.azurewebsites.net"
    };
  }

  componentDidMount() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi = () => {
    const url = "https://pyconlunchbeta.azurewebsites.net/api/list.json";

    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.fetchDataFromApi();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
          marginTop: "3%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Avatar
                source={{ uri: `${this.state.base_url}${item.photo}` }}
                onPress={() => console.log("Works!")}
                containerStyle={{ marginBottom: 2 }}
                avatarStyle={{ resizeMode: "cover" }}
                size="large"
              />
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>{item.name}</Text>
                <Text style={styles.menuText}>{item.menu}</Text>
                <Text style={styles.locText}>{item.address}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
    marginLeft: 110
  },
  menuText: {
    paddingLeft: 10,
    color: 'grey'
  },
  locText: {
    paddingLeft: 10,
    color: 'grey',
    marginTop: 6,
    fontSize: 12
  },
  titleText: {
    fontWeight: 'bold'
  },
  restaurantImage: {
    width: 600,
    height: 800
  }
});