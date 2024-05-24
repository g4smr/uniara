import tw from 'tailwind-react-native-classnames';

export const styles = {
  searchSection: tw`flex-1 justify-center items-center bg-gray-900 p-4`,
  searchInput: tw`w-full border border-gray-700 rounded-full px-4 py-2 mb-4 text-white text-center`,
  searchButton: tw`bg-green-500 py-2 px-4 rounded-full mb-4`,
  searchResult: tw`flex-row items-center p-4 border border-gray-700 rounded mt-4 bg-gray-800 shadow-lg`,
  searchResultImage: tw`w-16 h-16 rounded-full`,
  searchResultDetails: tw`ml-4 flex-1`,
  searchResultUsername: tw`text-lg font-bold text-white mb-1`,
  searchResultEmail: tw`text-sm text-gray-400`,
  addFriendButton: tw`bg-green-500 py-2 px-4 rounded-full`,
  friend: tw`flex-row items-center p-2 border-2 border-gray-700 rounded-lg bg-gray-900 shadow-xl`,
  friendImage: tw`w-12 h-12 rounded-full`,
  friendDetails: tw`ml-2 flex-grow`,
  friendUsername: tw`text-lg font-bold text-white`,
  friendEmail: tw`text-sm text-gray-400`,
  removeFriendButton: tw`bg-red-500 py-2 px-4 rounded-full`,
};
