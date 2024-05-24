import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { auth } from '../../services/firebase';

interface ConfigHelperProps {
  setIsPressed: (value: boolean) => void;
  setModalVisible: (value: boolean) => void;
  navigation: NavigationProp<any>;
}

export const useConfigHelper = ({
  setIsPressed,
  setModalVisible,
  navigation,
}: ConfigHelperProps) => {
  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleLogout = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleConfirmLogout = useCallback(() => {
    signOut(auth)
      .then(() => {
        console.log('Usuário saiu');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Erro ao sair', error);
      });
    setModalVisible(false);
  }, [navigation]);

  const handleCancelLogout = useCallback(() => {
    setModalVisible(false);
  }, []);

  return {
    handlePressIn,
    handlePressOut,
    handleLogout,
    handleConfirmLogout,
    handleCancelLogout,
  };
};
