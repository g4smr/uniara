import { Auth, sendPasswordResetEmail } from 'firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const resetPassword = (
  auth: Auth,
  email: string,
  setModalMessage: (message: string) => void,
  setShowModal: (show: boolean) => void,
  navigation: NavigationProp
) => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Email de redefinição de senha enviado!');
      setModalMessage('Verifique seu e-mail para redefinir sua senha.');
      setShowModal(true);

      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    })
    .catch((error) => {
      console.error('Ocorreu um erro ao enviar o email de redefinição de senha: ', error);
      if (error.code === 'auth/invalid-email') {
        setModalMessage('Por favor, digite um e-mail válido para redefinir.');
      } else {
        setModalMessage('Ocorreu um erro ao enviar o email de redefinição de senha.');
      }
      setShowModal(true);
    });
};
