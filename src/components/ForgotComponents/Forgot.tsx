import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { auth } from '../../services/firebase';
import { styles } from '../../styles/ForgotScreen/ForgotStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { resetPassword } from '../../helpers/ForgotHelper/forgot';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type ForgotFormProps = {
  email: string;
  setEmail: (email: string) => void;
  setShowModal: (showModal: boolean) => void;
  setModalMessage: (modalMessage: string) => void;
  navigation: NavigationProp;
};

const ForgotForm: React.FC<ForgotFormProps> = ({
  email,
  setEmail,
  setShowModal,
  setModalMessage,
  navigation,
}) => {
  const handleForgot = () => {
    resetPassword(auth, email, setModalMessage, setShowModal, navigation);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TouchableOpacity style={styles.forgotButton} onPress={handleForgot}>
          <Text style={styles.forgotButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotForm;
