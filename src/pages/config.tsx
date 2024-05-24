import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import ConfigComponent from '../components/ConfigComponents/Config';
import { useConfigHelper } from '../helpers/ConfigHelper/Config';

export type RootStackParamList = {
  Login: undefined;
};

const Config: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'Login'>>();
  const [isPressed, setIsPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    handlePressIn,
    handlePressOut,
    handleLogout,
    handleConfirmLogout,
    handleCancelLogout,
  } = useConfigHelper({ setIsPressed, setModalVisible, navigation });

  return (
    <ConfigComponent
      isPressed={isPressed}
      handlePressIn={handlePressIn}
      handlePressOut={handlePressOut}
      handleLogout={handleLogout}
      modalVisible={modalVisible}
      handleCancelLogout={handleCancelLogout}
      handleConfirmLogout={handleConfirmLogout}
    />
  );
};

export default Config;
