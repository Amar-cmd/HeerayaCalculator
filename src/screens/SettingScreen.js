import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import {useTheme} from '@react-navigation/native'; // import useTheme

const SettingScreen = ({toggleTheme}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme(); // use the theme here

    const itemStyle = {
      ...styles.item,
      backgroundColor: theme.colors.card, // use theme color for background
    };

    const textStyle = {
      ...styles.text,
      color: theme.colors.text, // use theme color for text
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={itemStyle}>
        <Text style={textStyle}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={itemStyle} onPress={() => setModalVisible(true)}>
        <Text style={textStyle}>Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity style={itemStyle}>
        <Text style={textStyle}>About</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose a Mode</Text>
            <View style={styles.buttonContainer}>
              <Button title="Light Mode" onPress={() => toggleTheme('light')} />
              <Button title="Dark Mode" onPress={() => toggleTheme('dark')} />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
            {/* rest of your Modal code */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    backgroundColor: '#ddd',
    marginVertical: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default SettingScreen;
