import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ForgotForm from '../components/ForgotComponents/Forgot';
import { styles } from '../styles/ForgotScreen/ForgotStyles';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Forgot() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleDismiss = () => {
    setShowModal(false);
  };

  return (
    <>
      <ForgotForm
        email={email}
        setEmail={setEmail}
        setShowModal={setShowModal}
        setModalMessage={setModalMessage}
        navigation={navigation}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
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
