import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RegisterForm from '../components/RegisterComponents/Register';
import { styles } from '../styles/RegisterScreen/RegisterStyles';

export default function Register() {
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [image, setImage] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const handleDismiss = () => {
    setModalVisible(false);
  };

  return (
    <>
      <RegisterForm
        username={username}
        setUsername={setUsername}
        birthdate={birthdate}
        setBirthdate={setBirthdate}
        image={image}
        setImage={setImage}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        navigation={navigation}
        setModalVisible={setModalVisible}
        setModalMessage={setModalMessage}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleDismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleDismiss}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
