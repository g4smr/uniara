import tw from 'tailwind-react-native-classnames';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = {
  container: tw`flex-1 justify-center items-center bg-gray-900 p-4`,
  button: (isPressed: boolean) => [
    tw`w-full max-w-xs p-4 rounded mb-4 bg-gray-800 shadow-lg`,
    isPressed ? tw`bg-gray-700` : tw`bg-gray-800`,
    { width: wp('80%'), height: hp('7%') },
  ],
  row: tw`flex-row items-center`,
  text: tw`text-center text-white text-lg ml-4 font-semibold`,
  modalContainer: tw`flex-1 justify-center items-center bg-gray-900 p-4`,
  modalContent: tw`bg-gray-800 p-4 rounded shadow-lg`,
  modalText: tw`text-white text-lg mb-4 font-semibold`,
  modalButtonContainer: tw`flex-row justify-between`,
  modalButton: tw`bg-gray-700 p-4 rounded shadow-lg`,
};
