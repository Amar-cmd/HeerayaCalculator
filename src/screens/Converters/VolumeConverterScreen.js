import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Vibration} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';

const VolumeConverterScreen = () => {
  const [display, setDisplay] = useState('0');
  const [fromUnit, setFromUnit] = useState('Liter');
  const [toUnit, setToUnit] = useState('US liquid gallon');
  const [convertedVolume, setConvertedVolume] = useState('0');

  const volumeUnits = {
    'US liquid gallon': 3.78541,
    'US liquid quart': 0.946353,
    'US liquid pint': 0.473176,
    'US legal cup': 0.24,
    'Fluid ounce': 0.0295735,
    'US tablespoon': 0.0147868,
    'US teaspoon': 0.00492892,
    'Cubic meter': 1000,
    Liter: 1,
    Milliliter: 0.001,
    'Imperial gallon': 4.54609,
    'Imperial quart': 1.13652,
    'Imperial pint': 0.568261,
    'Imperial cup': 0.284131,
    'Imperial fluid ounce': 0.0284131,
    'Imperial tablespoon': 0.0177582,
    'Imperial teaspoon': 0.00591939,
    'Cubic foot': 28.3168,
    'Cubic inch': 0.0163871,
  };

    const theme = useTheme();

  const displayContainerStyle = {
    ...styles.conversionContainer,
    backgroundColor: theme.dark ? theme.colors.buttonBackground : '#fff',
  };
   const displayTextStyle = {
     ...styles.displayText,
     color: theme.colors.buttonText,
   };

   const buttonsContainerStyle = {
     ...styles.buttonsContainer,
     backgroundColor: theme.dark ? theme.colors.buttonBackground : '#fff',
   };

   const buttonStyle = color => ({
     ...styles.button,
     backgroundColor: color || theme.colors.buttonBackground,
     borderColor: color || theme.colors.border,
   });

   const buttonTextStyle = color => ({
     ...styles.buttonText,
     color: color || theme.colors.buttonText,
  });
  
  const onButtonPress = buttonValue => {
         Vibration.vibrate(60); 

    if (buttonValue === 'AC') {
      setDisplay('0');
    } else if (buttonValue === 'Del') {
      setDisplay(display.slice(0, -1));
    } else if (buttonValue === '.') {
      // Check if current number already contains a dot
      const currentNumber = display.split(/[\+\-\*\/]/).slice(-1)[0];
      if (!/\./.test(currentNumber)) {
        setDisplay(display + buttonValue);
      }
    } else if (buttonValue === '+/-') {
      setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
    } else {
      setDisplay((display === '0' ? '' : display) + buttonValue);
    }
  };

  const convertVolume = () => {
    let volume = parseFloat(display);
    if (isNaN(volume) || volume < 0) {
      setConvertedVolume('');
      return;
    }

    // Convert the volume to liters first
    volume *= volumeUnits[fromUnit];

    // Convert from liters to the target unit
    let convertedVol = volume / volumeUnits[toUnit];

    setConvertedVolume(convertedVol.toFixed(4));
  };

  useEffect(() => {
    convertVolume();
  }, [display, fromUnit, toUnit]);

  return (
    <View style={displayContainerStyle}>
      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={fromUnit}
          style={{...styles.picker, color: theme.colors.buttonText}}
          onValueChange={itemValue => setFromUnit(itemValue)}>
          <Picker.Item label="US liquid gallon" value="US liquid gallon" />
          <Picker.Item label="US liquid quart" value="US liquid quart" />
          <Picker.Item label="US liquid pint" value="US liquid pint" />
          <Picker.Item label="US legal cup" value="US legal cup" />
          <Picker.Item label="Fluid ounce" value="Fluid ounce" />
          <Picker.Item label="US tablespoon" value="US tablespoon" />
          <Picker.Item label="US teaspoon" value="US teaspoon" />
          <Picker.Item label="Cubic meter" value="Cubic meter" />
          <Picker.Item label="Liter" value="Liter" />
          <Picker.Item label="Milliliter" value="Milliliter" />
          <Picker.Item label="Imperial gallon" value="Imperial gallon" />
          <Picker.Item label="Imperial quart" value="Imperial quart" />
          <Picker.Item label="Imperial pint" value="Imperial pint" />
          <Picker.Item label="Imperial cup" value="Imperial cup" />
          <Picker.Item
            label="Imperial fluid ounce"
            value="Imperial fluid ounce"
          />
          <Picker.Item
            label="Imperial tablespoon"
            value="Imperial tablespoon"
          />
          <Picker.Item label="Imperial teaspoon" value="Imperial teaspoon" />
          <Picker.Item label="Cubic foot" value="Cubic foot" />
          <Picker.Item label="Cubic inch" value="Cubic inch" />
        </Picker>
        <Text style={displayTextStyle}>{display}</Text>
      </View>

      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={toUnit}
          style={{...styles.picker, color: theme.colors.buttonText}}
          onValueChange={itemValue => setToUnit(itemValue)}>
          <Picker.Item label="US liquid gallon" value="US liquid gallon" />
          <Picker.Item label="US liquid quart" value="US liquid quart" />
          <Picker.Item label="US liquid pint" value="US liquid pint" />
          <Picker.Item label="US legal cup" value="US legal cup" />
          <Picker.Item label="Fluid ounce" value="Fluid ounce" />
          <Picker.Item label="US tablespoon" value="US tablespoon" />
          <Picker.Item label="US teaspoon" value="US teaspoon" />
          <Picker.Item label="Cubic meter" value="Cubic meter" />
          <Picker.Item label="Liter" value="Liter" />
          <Picker.Item label="Milliliter" value="Milliliter" />
          <Picker.Item label="Imperial gallon" value="Imperial gallon" />
          <Picker.Item label="Imperial quart" value="Imperial quart" />
          <Picker.Item label="Imperial pint" value="Imperial pint" />
          <Picker.Item label="Imperial cup" value="Imperial cup" />
          <Picker.Item
            label="Imperial fluid ounce"
            value="Imperial fluid ounce"
          />
          <Picker.Item
            label="Imperial tablespoon"
            value="Imperial tablespoon"
          />
          <Picker.Item label="Imperial teaspoon" value="Imperial teaspoon" />
          <Picker.Item label="Cubic foot" value="Cubic foot" />
          <Picker.Item label="Cubic inch" value="Cubic inch" />
        </Picker>
        {/* <Text>Display converted volume here</Text> */}
        <Text style={displayTextStyle}>{convertedVolume || '0'}</Text>
      </View>

      <View style={buttonsContainerStyle}>
        {[
          {symbol: '7', value: '7'},
          {symbol: '8', value: '8'},
          {symbol: '9', value: '9'},
          {symbol: 'Del', value: 'Del', text: '#e67371'},
          {symbol: '4', value: '4'},
          {symbol: '5', value: '5'},
          {symbol: '6', value: '6'},
          {symbol: 'AC', value: 'AC', text: '#e67371'},
          {symbol: '1', value: '1'},
          {symbol: '2', value: '2'},
          {symbol: '3', value: '3'},
          {symbol: '.', value: '.', text: '#e67371'},
          {symbol: '0', value: '0'},
          // Add more buttons as necessary
        ].map(button => (
          <TouchableOpacity
            key={button.value}
            style={buttonStyle()}
            onPress={() => onButtonPress(button.value)}>
            <Text style={buttonTextStyle(button.text)}>{button.symbol}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversionContainer: {
    flex: 1,
    width: '100%',
  },
  displayText: {
    fontSize: 35,
    marginHorizontal: 10,
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '25%',
    height: '25%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  picker: {
    height: 50,
    width: 'auto',
  },
});

export default VolumeConverterScreen;

