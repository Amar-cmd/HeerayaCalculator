import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {RadioButton} from 'react-native-paper'; // Import RadioButton
import {useTheme} from '@react-navigation/native'; // import useTheme
import Ripple from 'react-native-material-ripple'; // import Ripple

const SettingScreen = ({toggleTheme}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState('light'); // for RadioButton
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
      <Ripple style={itemStyle}>
        <Text style={textStyle}>Theme</Text>
      </Ripple>
      <Ripple style={itemStyle} onPress={() => setModalVisible(true)}>
        <Text style={textStyle}>Mode</Text>
      </Ripple>
      <Ripple style={itemStyle}>
        <Text style={textStyle}>About</Text>
      </Ripple>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Choose a Mode</Text>
            <Ripple
              style={styles.radioContainer}
              onPress={() => {
                toggleTheme('light');
                setChecked('light');
              }}>
              <RadioButton
                value="light"
                status={checked === 'light' ? 'checked' : 'unchecked'}
              />
              <Text style={styles.radioText}>Light Mode</Text>
            </Ripple>
            <Ripple
              style={styles.radioContainer}
              onPress={() => {
                toggleTheme('dark');
                setChecked('dark');
              }}>
              <RadioButton
                value="dark"
                status={checked === 'dark' ? 'checked' : 'unchecked'}
              />
              <Text style={styles.radioText}>Dark Mode</Text>
            </Ripple>
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

  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding:5,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'red',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 18,
  },
});

export default SettingScreen;
