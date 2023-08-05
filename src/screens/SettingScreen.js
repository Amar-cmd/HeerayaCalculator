import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import {RadioButton} from 'react-native-paper'; // Import RadioButton
import {useTheme} from '@react-navigation/native'; // import useTheme
import Ripple from 'react-native-material-ripple'; // import Ripple
import {BlueTheme, RedTheme, GreenTheme, PurpleTheme} from '../colorMode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import ic_launcher from '../styles/ic_launcher.png';

const SettingScreen = ({toggleTheme}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState('light'); // for RadioButton
    const [checkedColor, setCheckedColor] = useState('blue');
  const [colorModalVisible, setColorModalVisible] = useState(false);
const [aboutModalVisible, setAboutModalVisible] = useState(false);

  const theme = useTheme(); // use the theme here

  const colorHexCodes = {
    blue: '#7ad7fd',
    red: '#c4302b',
    green: '#1B5E20',
    purple: '#6A1B9A',
    yellow: '#ffd400',
    pink: '#F48FB1',
    orange: '#FF5722',
    violet: '#7B1FA2',
    maroon: '#800000',
    grey: '#3f3f3f',
    brown: '#964B00',
    white: '#FFFFFF',
    lime: '#32cd32',
    crimson: '#DC143C',
    olive: '#808000',
    silver: '#C0C0C0',
    aqua: '#00FFFF',
    aquamarine: '#7FFFD4',
    teal: '#008080',
    burgundy: '#800020',
    scarlet: '#FF2400',
    indigo: '#4B0082',
    magenta: '#cc00cc',
    beige: '#F5F5DC',
    charcoal: '#36454F',
  };

  const itemStyle = {
    ...styles.item,
    backgroundColor: theme.colors.card, // use theme color for background
  };

  const textStyle = {
    ...styles.text,
    color: theme.colors.text, // use theme color for text
  };

  const toggleColor = async (color) => {
    console.log(color); // print color to console
    toggleTheme(color);
    setCheckedColor(color);
        await AsyncStorage.setItem('themeColor', color); // save color to AsyncStorage

  };

  useEffect(() => {
    const loadThemeColor = async () => {
      const storedColor = await AsyncStorage.getItem('themeColor');
      if (storedColor) {
        toggleTheme(storedColor);
        setCheckedColor(storedColor);
      }
    };

    loadThemeColor();
  }, []);

  const renderAboutContent = () => {
    return (
      <ScrollView style={styles.aboutContentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../styles/ic_launcher.png')}
            style={styles.logo}
          />
        </View>

        {/* <Text style={styles.aboutHeader}>About the App</Text>
        <Text style={styles.aboutText}>
          This is a versatile calculator and converter application. It includes
          the following calculators and converters:
        </Text>
        <Text style={styles.aboutSubHeader}>Calculators:</Text>
        <Text style={styles.aboutListItem}>- Standard Calculator</Text>
        <Text style={styles.aboutListItem}>- Scientific Calculator</Text>
        <Text style={styles.aboutListItem}>- Programming Calculator</Text>
        <Text style={styles.aboutListItem}>- Date Calculator</Text>
        <Text style={styles.aboutListItem}>- Interest Calculator</Text>
        <Text style={styles.aboutSubHeader}>Converters:</Text>
        <Text style={styles.aboutListItem}>- Angle</Text>
        <Text style={styles.aboutListItem}>- Area</Text>
        <Text style={styles.aboutListItem}>- Currency</Text>
        <Text style={styles.aboutListItem}>- Data</Text>
        <Text style={styles.aboutListItem}>- Data Transfer Rate</Text>
        <Text style={styles.aboutListItem}>- Energy</Text>
        <Text style={styles.aboutListItem}>- Frequency</Text>
        <Text style={styles.aboutListItem}>- Length</Text>
        <Text style={styles.aboutListItem}>- Power</Text>
        <Text style={styles.aboutListItem}>- Pressure</Text>
        <Text style={styles.aboutListItem}>- Speed</Text>
        <Text style={styles.aboutListItem}>- Temperature</Text>
        <Text style={styles.aboutListItem}>- Time</Text>
        <Text style={styles.aboutListItem}>- Volume</Text>
        <Text style={styles.aboutListItem}>- Weight & Mass</Text>
        <Text style={styles.aboutText}>
          The application also includes light and dark mode and the following
          color options: Blue, Red, Green, Purple, Yellow, Pink, Orange, Violet,
          Maroon, Grey, Brown, White, Lime, Crimson, Olive, Silver, Aqua,
          Aquamarine, Teal, Burgundy, Scarlet, Indigo, Magenta, Beige, and
          Charcoal.
        </Text> */}

        <Text style={styles.aboutHeader}>Heeraya Calculator</Text>
        <Text style={styles.aboutText}>
          Welcome to our advanced multi-functional calculator and converter
          application, designed with versatility and precision in mind. This
          application is a comprehensive tool that brings together various
          calculators and converters, all under one roof, to cater to a wide
          array of computational and conversion needs.
        </Text>
        <Text style={styles.aboutSubHeader}>Integrated Calculators:</Text>
        <Text style={styles.aboutText}>
          Our application boasts an array of specialized calculators, each
          designed to handle specific computational requirements effectively.
          These include:
        </Text>
        <Text style={styles.aboutListItem}>
          - Standard Calculator: For routine arithmetic operations.
        </Text>
        <Text style={styles.aboutListItem}>
          - Scientific Calculator: For advanced mathematical calculations,
          including trigonometric and logarithmic functions.
        </Text>
        <Text style={styles.aboutListItem}>
          - Programming Calculator: Designed for developers, this calculator
          handles computations in various bases and supports bitwise operations.
        </Text>
        <Text style={styles.aboutListItem}>
          - Date Calculator: An invaluable tool for calculating the difference
          between dates or adding/subtracting days from a given date.
        </Text>
        <Text style={styles.aboutListItem}>
          - Interest Calculator: Simplifies the computation of simple and
          compound interest.
        </Text>

        <Text style={styles.aboutSubHeader}>Comprehensive Converters:</Text>
        <Text style={styles.aboutText}>
          Our application includes a comprehensive set of converters to
          facilitate the conversion between various units of measurement. The
          categories include:
        </Text>
        <Text style={styles.aboutListItem}>
          - Angle, Area, Currency, Data, Data Transfer Rate
        </Text>
        <Text style={styles.aboutListItem}>
          - Energy, Frequency, Length, Power, Pressure
        </Text>
        <Text style={styles.aboutListItem}>
          - Speed, Temperature, Time, Volume, Weight & Mass
        </Text>

        <Text style={styles.aboutText}>
          In addition to the above features, our application recognizes the need
          for personalized user experience. It offers both light and dark modes,
          and an assortment of color themes: Blue, Red, Green, Purple, Yellow,
          Pink, Orange, Violet, Maroon, Grey, Brown, White, Lime, Crimson,
          Olive, Silver, Aqua, Aquamarine, Teal, Burgundy, Scarlet, Indigo,
          Magenta, Beige, and Charcoal.
        </Text>
        <Text style={styles.aboutText}>
          We are continuously working to enhance this application and your
          feedback is invaluable to us. We hope you find this tool useful and
          look forward to serving your computational and conversion needs.
        </Text>
      </ScrollView>
    );
  };


  return (
    <View style={styles.container}>
      <Ripple style={itemStyle} onPress={() => setColorModalVisible(true)}>
        <Text style={textStyle}>Theme</Text>
      </Ripple>
      <Ripple style={itemStyle} onPress={() => setModalVisible(true)}>
        <Text style={textStyle}>Mode</Text>
      </Ripple>
      <Ripple style={itemStyle} onPress={() => setAboutModalVisible(true)}>
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
     
      <Modal
        animationType="slide"
        transparent={true}
        visible={colorModalVisible}
        onRequestClose={() => {
          setColorModalVisible(!colorModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setColorModalVisible(!colorModalVisible)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Choose a Theme Color</Text>
            <View style={styles.colorContainer}>
              {Object.entries(colorHexCodes).map(([colorName, colorCode]) => (
                <TouchableOpacity
                  key={colorName}
                  style={{...styles.colorOption, backgroundColor: colorCode}}
                  onPress={() => {
                    console.log(colorName);
                    toggleColor(colorName);
                    setCheckedColor(colorName);
                    setColorModalVisible(!colorModalVisible);
                  }}>
                  {checkedColor === colorName && (
                    <Icon name="checkmark" size={30} color="#FFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={aboutModalVisible}
        onRequestClose={() => {
          setAboutModalVisible(!aboutModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.aboutModalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAboutModalVisible(!aboutModalVisible)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            {renderAboutContent()}
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
    padding: 5,
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
    color:'black'
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  colorText: {
    fontSize: 18,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorOption: {
    width: '18%', // approx for 5 items per row, leaving some space for margins
    height: 50,
    margin: '1%', // simple margin for each item
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  aboutContentContainer: {
    marginTop: 20,
  },
  aboutHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  aboutSubHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  aboutText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  aboutListItem: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  aboutModalView: {
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
    width: '90%', // adjust as needed
    height: '90%', // adjust as needed
  },
});

export default SettingScreen;
