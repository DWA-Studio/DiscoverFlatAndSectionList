import React from "react";
import { FlatList, Text, View } from "react-native";
import UserRow from "./UserRow";

const _renderItem = ({ item }) => (
  <UserRow
    name={item.name.last}
    fistName={item.name.first}
    picture={item.picture.thumbnail}
    email={item.email}
  />
);
const _renderSeparator = () => (
  <View style={{ height: 1, backgroundColor: "grey", marginLeft: 80 }} />
);

export default (UserList = props => (
  <FlatList
    data={props.data}
    renderItem={_renderItem}
    keyExtractor={item => item.email}
    ItemSeparatorComponent={_renderSeparator}
  />
));