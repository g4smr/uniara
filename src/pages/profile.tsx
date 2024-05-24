import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { updateUserData } from '../helpers/ProfileHelper/Profile';
import ProfileForm from '../components/ProfileComponents/Profile';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageUri, setImageUri] = useState('');

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const docRef = doc(db, 'users', user.uid);

      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data?.username);
            setEmail(data?.email);
            setImageUri(data?.image);
          } else {
            console.log('No such document!');
          }
        })
        .catch((error: Error) => {
          console.log('Error getting document:', error);
        });
    }
  }, []);

  const handleUpdate = () => {
    updateUserData(name, email, imageUri, password, newPassword, confirmPassword);
  };

  const handleImageChange = () => {};

  return (
    <ProfileForm
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      imageUri={imageUri}
      handleImageChange={handleImageChange}
      handleUpdate={handleUpdate}
    />
  );
};

export default Profile;