import tw from 'tailwind-react-native-classnames';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = {
  container: tw`flex-1 justify-center items-center p-4 bg-gray-900`,
  input: [
    tw`h-12 border-blue-500 border-b-2 mb-4 px-4 bg-gray-800 text-white rounded-lg`,
    { width: wp('80%') },
  ],
  loginButton: [tw`bg-blue-600 rounded-lg mb-4 p-3`, { width: wp('80%') }],
  loginButtonText: tw`text-white text-center font-bold`,
  registerContainer: tw`flex-row justify-center items-center my-2`,
  registerText: tw`text-gray-400`,
  registerLink: tw`text-blue-500`,
  forgotPassword: tw`text-gray-400 text-center`,
  modalContainer: tw`flex-1 justify-center items-center bg-transparent`,
  modalContent: tw`p-4 bg-gray-800 rounded-lg`,
  modalText: tw`text-white text-center mb-4`,
  modalButton: tw`bg-blue-600 rounded-lg p-3`,
  modalButtonText: tw`text-white text-center font-bold`,
};
