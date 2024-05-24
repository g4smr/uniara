import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SearchSection, FriendsSection } from '../components/FriendsComponents/Friends';
import {
  handleSearch,
  handleAddFriend,
  handleRemoveFriend,
  fetchFriends,
} from '../helpers/FriendsHelper/Friends';

type User = {
  id: string;
  username: string;
  image: string;
  email: string;
};

const Friends: React.FC = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const fetchedFriends = await fetchFriends();
      setFriends(fetchedFriends);
    };

    fetch();
  }, []);

  return (
    <View style={tw`flex-1 bg-gray-900 p-6`}>
      <SearchSection
        handleSearch={async () => {
          const result = await handleSearch(search);
          setSearchResult(result);
        }}
        handleAddFriend={async () => {
          await handleAddFriend(searchResult);
        }}
        search={search}
        setSearch={setSearch}
        searchResult={searchResult}
      />
      <FriendsSection
        friends={friends}
        handleRemoveFriend={async (id: string) => {
          const updatedFriends = await handleRemoveFriend(id, friends);
          setFriends(updatedFriends);
        }}
      />
    </View>
  );
};

export default Friends;
