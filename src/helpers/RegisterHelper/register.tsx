// RegisterHelper.ts
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { format } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import { Text } from 'react-native';
import { styles } from '../../styles/RegisterScreen/RegisterStyles';

export type PasswordValidation = {
  length: boolean;
  uppercase: boolean;
  specialChar: boolean;
  number: boolean;
};

export const useShowState = () => {
  const [show, setShow] = useState(false);
  return { show, setShow };
};

export const onChange = (
  setShow: Function,
  setBirthdate: Function,
  _: any,
  selectedDate?: Date
) => {
  const currentDate = selectedDate || new Date();
  setShow(false);
  setBirthdate(format(currentDate, 'dd/MM/yyyy'));
};

export const showDatepicker = (setShow: Function) => {
  setShow(true);
};

export const pickImage = async (setImage: Function) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets !== null) {
    setImage(result.assets[0].uri);
  }
};

export const validatePassword = (password: string) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
    number: /\d/.test(password),
  };
};

export const usePasswordValidation = () => {
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
    number: false,
  });

  return { passwordValidation, setPasswordValidation };
};

export const PasswordValidationChecklist: React.FC<{ validation: PasswordValidation }> = ({
  validation,
}) => (
  <>
    <Text style={validation.length ? styles.valid : styles.invalid}>
      A senha deve ter pelo menos 8 caracteres.
    </Text>
    <Text style={validation.uppercase ? styles.valid : styles.invalid}>
      A senha deve conter pelo menos um caractere maiúsculo.
    </Text>
    <Text style={validation.specialChar ? styles.valid : styles.invalid}>
      A senha deve conter pelo menos um caractere especial.
    </Text>
    <Text style={validation.number ? styles.valid : styles.invalid}>
      A senha deve conter pelo menos um número.
    </Text>
  </>
);

export const registerUser = (
  username: string,
  birthdate: string,
  image: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!username) {
      reject('O campo de nome de usuário é obrigatório.');
      return;
    }
    if (!birthdate) {
      reject('O campo de data de nascimento é obrigatório.');
      return;
    }
    if (!image) {
      reject('A seleção de imagem é obrigatória.');
      return;
    }
    if (!email) {
      reject('O campo de email é obrigatório.');
      return;
    }
    if (!password) {
      reject('O campo de senha é obrigatório.');
      return;
    }
    if (password !== confirmPassword) {
      reject('As senhas não coincidem.');
      return;
    }

    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    const usernameQuery = query(usersCollection, where('username', '==', username));
    const emailQuery = query(usersCollection, where('email', '==', email));

    Promise.all([getDocs(usernameQuery), getDocs(emailQuery)])
      .then(([usernameSnapshot, emailSnapshot]) => {
        if (!usernameSnapshot.empty) {
          throw new Error('O nome de usuário fornecido já está em uso.');
        }
        if (!emailSnapshot.empty) {
          throw new Error('O email fornecido já está em uso.');
        }
        return createUserWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        return setDoc(doc(db, 'users', userCredential.user.uid), {
          username: username,
          birthdate: birthdate,
          image: image,
          email: email,
        });
      })
      .then(() => {
        resolve('Registro bem-sucedido!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          reject('O email fornecido já está em uso.');
        } else if (error.code === 'auth/invalid-email') {
          reject('Por favor, digite um email válido.');
        } else if (error.code === 'auth/weak-password') {
          reject('Por favor, digite uma senha válida.');
        } else {
          reject(error.message);
        }
      });
  });
};
