import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

export const updateUserData = async (
  name: string,
  email: string,
  imageUri: string,
  password: string,
  newPassword: string,
  confirmPassword: string
) => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userRef = doc(db, 'users', user.uid);
    const updateData: any = {
      username: name,
      email: email,
      image: imageUri,
    };

    if (password) {
      if (newPassword !== confirmPassword) {
        alert('As senhas não correspondem');
        return;
      } else {
        if (user.email) {
          const credential = EmailAuthProvider.credential(user.email, password);
          try {
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            console.log('Password updated successfully');
          } catch (error) {
            console.log('Error reauthenticating:', error);
          }
        }
      }
    }

    try {
      await updateDoc(userRef, updateData);
      console.log('User updated successfully');
    } catch (error) {
      console.log('Error updating user:', error);
    }
  }
};
