import tw from 'tailwind-react-native-classnames';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = {
  container: tw`flex-1 justify-center p-4 bg-gray-900`,
  input: [
    tw`h-12 border-blue-500 border-b-2 mb-4 px-4 bg-gray-800 text-white rounded-lg`,
    { width: wp('80%') },
  ],
  registerButton: [tw`bg-blue-600 rounded-lg p-3`, { width: wp('80%') }],
  registerButtonText: tw`text-white text-center font-bold`,
  modalContainer: tw`flex-1 justify-center items-center bg-transparent`,
  modalContent: tw`p-4 bg-gray-800 rounded-lg`,
  modalText: tw`text-white text-center mb-4`,
  modalButton: tw`bg-blue-600 rounded-lg p-3`,
  modalButtonText: tw`text-white text-center font-bold`,
  imageSelector: [tw`bg-blue-600 rounded-lg p-3 mb-1`, { width: wp('80%') }],
  imageSelectorText: tw`text-white text-center font-bold`,
  datePickerButton: [
    tw`bg-blue-600 rounded-lg ml-2 justify-center items-center`,
    { marginTop: -15 },
  ],
  errorText: [
    tw`text-red-500 text-sm mt-1 mb-2 text-justify text-center font-semibold`,
    { width: wp('80%') },
  ],
  valid: tw`text-green-500 text-sm mb-2 text-justify text-center font-semibold`,
  invalid: tw`text-red-500 text-sm mb-2 text-justify text-center font-semibold`,
};
