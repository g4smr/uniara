import React from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/ConfigScreen/ConfigStyles';

interface ConfigComponentProps {
  isPressed: boolean;
  handlePressIn: () => void;
  handlePressOut: () => void;
  handleLogout: () => void;
  modalVisible: boolean;
  handleCancelLogout: () => void;
  handleConfirmLogout: () => void;
}

const ConfigComponent: React.FC<ConfigComponentProps> = ({
  isPressed,
  handlePressIn,
  handlePressOut,
  handleLogout,
  modalVisible,
  handleCancelLogout,
  handleConfirmLogout,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button(isPressed)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleLogout}>
        <View style={styles.row}>
          <Icon name="power-off" size={24} color="#FFF" />
          <Text style={styles.text}>Sair</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancelLogout}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Você tem certeza que deseja sair?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirmLogout}>
                <Text style={styles.text}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancelLogout}>
                <Text style={styles.text}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfigComponent;
