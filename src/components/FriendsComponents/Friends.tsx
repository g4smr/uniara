import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from '../../styles/FriendsScreen/FriendsStyles';
import tw from 'tailwind-react-native-classnames';

type User = {
  id: string;
  username: string;
  image: string;
  email: string;
};

type SearchSectionProps = {
  handleSearch: Function;
  handleAddFriend: Function;
  search: string;
  setSearch: Function;
  searchResult: User | null;
};

export const SearchSection: React.FC<SearchSectionProps> = ({
  handleSearch,
  handleAddFriend,
  search,
  setSearch,
  searchResult,
}) => {
  return (
    <View style={styles.searchSection}>
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Pesquisar usuário por email"
        style={styles.searchInput}
        placeholderTextColor="#7B7B7B"
      />
      <TouchableOpacity onPress={() => handleSearch(search)} style={styles.searchButton}>
        <Text style={tw`text-white font-bold text-lg`}>Pesquisar</Text>
      </TouchableOpacity>
      {searchResult && (
        <View style={styles.searchResult}>
          <Image source={{ uri: searchResult.image }} style={styles.searchResultImage} />
          <View style={styles.searchResultDetails}>
            <Text style={styles.searchResultUsername}>{searchResult.username}</Text>
            <Text style={styles.searchResultEmail}>{searchResult.email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleAddFriend(searchResult.id)}
            style={styles.addFriendButton}>
            <Text style={tw`text-white font-bold`}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

type FriendsSectionProps = {
  friends: User[];
  handleRemoveFriend: Function;
};

export const FriendsSection: React.FC<FriendsSectionProps> = ({ friends, handleRemoveFriend }) => {
  const renderFriend = ({ item, index }: { item: User; index: number }) => (
    <View style={styles.friend}>
      <Image source={{ uri: item.image }} style={styles.friendImage} />
      <View style={styles.friendDetails}>
        <Text style={styles.friendUsername}>{item.username}</Text>
        <Text style={styles.friendEmail}>{item.email}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveFriend(item.id)}
        style={styles.removeFriendButton}>
        <Text style={tw`text-white font-bold`}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return <FlatList data={friends} renderItem={renderFriend} keyExtractor={(item) => item.id} />;
};
