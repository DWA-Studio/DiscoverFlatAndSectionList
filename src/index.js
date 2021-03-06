/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import UserList from "./components/UserList";
import UserSectionList from "./components/UserSectionList";
import _ from "lodash";

export default class App extends Component {
  state = {
    page: 1,
    results: 20,
    totalPage: 3,
    seed: "demo",
    isFetching: false,
    data: [],
    hasMoreResult: true,
    refreshing: false,
    formatedData: []
  };

  async fetchData(page) {
    const uri = "https://randomuser.me/api/";
    const response = await fetch(
      `${uri}?page=${page}&results=${this.state.results}&seeds=${this.state
        .seed}`
    );
    const jsondata = await response.json();
    return jsondata.results;
  }

  async loadData(page) {
    this.setState({ isFetching: true });
    const data = await this.fetchData(page);
    const nextPage = page + 1;
    const formatedData = this.fromArrayToSectionData(data);
    this.setState({
      page: nextPage,
      data: [...this.state.data, ...data],
      isFetching: false,
      hasMoreResult: nextPage <= this.state.totalPage,
      formatedData: formatedData
    });
  }

  async refreshData() {
    this.setState({ refreshing: true });
    const data = await this.fetchData(1);
    const formatedData = this.fromArrayToSectionData(data);
    this.setState({
      page: 2,
      data: data,
      refreshing: false,
      hasMoreResult: true,
      formatedData: formatedData
    });
  }

  fromArrayToSectionData(data) {
    let ds = _.groupBy(data, d => d.name.last.charAt(0));
    ds = _.reduce(
      ds,
      (acc, next, index) => {
        acc.push({
          key: index,
          data: next
        });
        return acc;
      },
      []
    );
    ds = _.orderBy(ds, ["key"]);
    return ds;
  }

  async componentDidMount() {
    await this.loadData(this.state.page);
  }

  render() {
    /*
    * Comment and Uncomment return below if you want to see FlatList or SectionList
    */

    /*return (
      <View style={styles.container}>
        <UserSectionList
          data={this.state.formatedData}
          isFetching={this.state.isFetching}
          loadMore={() => this.loadData(this.state.page)}
          hasMoreResult={this.state.hasMoreResult}
          refreshing={this.state.refreshing}
          refresh={() => this.refreshData()}
        />
      </View>
    );*/
    return (
      <View style={styles.container}>
        <UserList
          data={this.state.data}
          isFetching={this.state.isFetching}
          loadMore={() => this.loadData(this.state.page)}
          hasMoreResult={this.state.hasMoreResult}
          refreshing={this.state.refreshing}
          refresh={() => this.refreshData()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
});
