import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { styles } from '../../styles/RegisterScreen/RegisterStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  registerUser,
  useShowState,
  onChange,
  showDatepicker,
  pickImage,
  validatePassword,
  usePasswordValidation,
  PasswordValidationChecklist,
} from '../../helpers/RegisterHelper/Register';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface RegisterFormProps {
  username: string;
  setUsername: (username: string) => void;
  birthdate: string;
  setBirthdate: (birthdate: string) => void;
  image: string;
  setImage: (image: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  navigation: StackNavigationProp<any, any>;
  setModalVisible: (visible: boolean) => void;
  setModalMessage: (message: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  username,
  setUsername,
  birthdate,
  setBirthdate,
  image,
  setImage,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  navigation,
  setModalVisible,
  setModalMessage,
}) => {
  const { show, setShow } = useShowState();
  const { passwordValidation, setPasswordValidation } = usePasswordValidation();

  const handleShowDatepicker = () => {
    showDatepicker(setShow);
  };

  const handleRegister = () => {
    registerUser(username, birthdate, image, email, password, confirmPassword)
      .then((message) => {
        setModalMessage(message);
        setModalVisible(true);
        navigation.navigate('Login');
      })
      .catch((error) => {
        setModalMessage(error);
        setModalVisible(true);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          placeholderTextColor="#9ca3af"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('80%') }}>
          <TextInput
            style={[styles.input, { flex: 4, height: wp('11%') }]}
            placeholder="Data de nascimento"
            placeholderTextColor="#9ca3af"
            value={birthdate}
            editable={false}
          />
          <View>
            <TouchableOpacity
              style={[styles.datePickerButton, { width: wp('10%'), height: wp('11%') }]}
              onPress={handleShowDatepicker}>
              <Icon name="calendar" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => onChange(setShow, setBirthdate, event, selectedDate)}
          />
        )}
        <TouchableOpacity style={styles.imageSelector} onPress={() => pickImage(setImage)}>
          <Text style={styles.imageSelectorText}>Selecionar imagem</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 10 }} />
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordValidation(validatePassword(text));
          }}
          secureTextEntry
        />
        <PasswordValidationChecklist validation={passwordValidation} />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#9ca3af"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterForm;
