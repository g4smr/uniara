import { StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export const styles = StyleSheet.create({
  container: tw`flex-1 bg-gray-900 p-4`,
  innerContainer: tw`flex-1 items-center justify-center`,
  image: tw`w-32 h-32 rounded-full border-2 border-blue-500`,
  nameInput: tw`w-full mt-4 border border-gray-800 rounded px-4 py-2 text-white text-center`,
  emailInput: tw`w-full mt-2 border border-gray-800 rounded px-4 py-2 text-white text-center`,
  newPasswordInput: tw`w-full mt-2 border border-gray-800 rounded px-4 py-2 text-white text-center`,
  passwordInput: tw`w-full mt-2 border border-gray-800 rounded px-4 py-2 text-white text-center`,
  confirmPasswordInput: tw`w-full mt-2 border border-gray-800 rounded px-4 py-2 text-white text-center`,
  updateButtonContainer: tw`mt-4`,
  updateButton: tw`w-full bg-blue-500 py-3 rounded items-center shadow-lg`,
  updateButtonText: tw`text-white text-lg font-semibold text-center`,
});
