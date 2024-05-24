import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const signInUser = (email: string, password: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          reject('Por favor, digite um e-mail válida para entrar.');
        } else if (error.code === 'auth/missing-password') {
          reject('Por favor, digite uma senha válida para entrar.');
        } else if (error.code === 'auth/invalid-credential') {
          reject('A senha digita é inválida.');
        } else {
          reject(error.message);
        }
      });
  });
};
