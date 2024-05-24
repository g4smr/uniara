import React from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/ProfileScreen/ProfileStyles';

interface ProfileFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  imageUri: string;
  handleImageChange: () => void;
  handleUpdate: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  imageUri,
  handleImageChange,
  handleUpdate,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={handleImageChange}>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : {
                    uri: 'https://lh3.googleusercontent.com/a/ACg8ocKWBTvFy-1QkduBy44DbUkt5u6HyjYoX-3DTmoAfY0DLA=s288-c-no',
                  }
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nome"
          placeholderTextColor="white"
          style={styles.nameInput}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="white"
          style={styles.emailInput}
        />
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Nova Senha"
          secureTextEntry
          placeholderTextColor="white"
          style={styles.newPasswordInput}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Senha Antiga"
          secureTextEntry
          placeholderTextColor="white"
          style={styles.passwordInput}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirmar Nova Senha"
          secureTextEntry
          placeholderTextColor="white"
          style={styles.confirmPasswordInput}
        />
      </View>
      <View style={styles.updateButtonContainer}>
        <TouchableOpacity
          onPress={handleUpdate}
          style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Atualizar Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileForm;
