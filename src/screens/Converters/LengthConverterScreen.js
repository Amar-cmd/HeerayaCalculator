import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';
import Ripple from 'react-native-material-ripple'; // import Ripple

const LengthConverterScreen = () => {
  const [display, setDisplay] = useState('0');
  const [fromUnit, setFromUnit] = useState('Meters');
  const [toUnit, setToUnit] = useState('Feet');
  const [convertedLength, setConvertedLength] = useState('0');

  const lengthUnits = {
    Nanometers: 1e-9,
    Microns: 1e-6,
    Millimeters: 1e-3,
    Centimeters: 1e-2,
    Meters: 1,
    Kilometers: 1e3,
    Inches: 0.0254,
    Feet: 0.3048,
    Yards: 0.9144,
    Miles: 1609.34,
    'Nautical miles': 1852,
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
    } else {
      setDisplay((display === '0' ? '' : display) + buttonValue);
    }
  };

  const convertLength = () => {
    let length = parseFloat(display);
    if (isNaN(length) || length < 0) {
      setConvertedLength('');
      return;
    }

    // Convert the length to meters first
    length *= lengthUnits[fromUnit];

    // Convert from meters to the target unit
    let convertedLen = length / lengthUnits[toUnit];

    setConvertedLength(convertedLen.toFixed(4));
  };

  useEffect(() => {
    convertLength();
  }, [display, fromUnit, toUnit]);

  return (
    <View style={displayContainerStyle}>
      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={fromUnit}
          style={{...styles.picker, color: theme.colors.buttonText}}
          onValueChange={itemValue => setFromUnit(itemValue)}>
          <Picker.Item label="Nanometers (nm)" value="Nanometers" />
          <Picker.Item label="Microns (µm)" value="Microns" />
          <Picker.Item label="Millimeters (mm)" value="Millimeters" />
          <Picker.Item label="Centimeters (cm)" value="Centimeters" />
          <Picker.Item label="Meters (m)" value="Meters" />
          <Picker.Item label="Kilometers (km)" value="Kilometers" />
          <Picker.Item label="Inches (in)" value="Inches" />
          <Picker.Item label="Feet (ft)" value="Feet" />
          <Picker.Item label="Yards (yd)" value="Yards" />
          <Picker.Item label="Miles (mi)" value="Miles" />
          <Picker.Item label="Nautical miles (NM)" value="Nautical miles" />
        </Picker>
        <Text style={displayTextStyle}>{display}</Text>
      </View>

      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={toUnit}
          style={{...styles.picker, color: theme.colors.buttonText}}
          onValueChange={itemValue => setToUnit(itemValue)}>
          <Picker.Item label="Nanometers (nm)" value="Nanometers" />
          <Picker.Item label="Microns (µm)" value="Microns" />
          <Picker.Item label="Millimeters (mm)" value="Millimeters" />
          <Picker.Item label="Centimeters (cm)" value="Centimeters" />
          <Picker.Item label="Meters (m)" value="Meters" />
          <Picker.Item label="Kilometers (km)" value="Kilometers" />
          <Picker.Item label="Inches (in)" value="Inches" />
          <Picker.Item label="Feet (ft)" value="Feet" />
          <Picker.Item label="Yards (yd)" value="Yards" />
          <Picker.Item label="Miles (mi)" value="Miles" />
          <Picker.Item label="Nautical miles (NM)" value="Nautical miles" />
        </Picker>
        <Text style={displayTextStyle}>{convertedLength || '0'}</Text>
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
        ].map(button => (
          <Ripple
            rippleColor={theme.dark ? '#fff' : '#000'}
            key={button.value}
            style={buttonStyle()}
            onPress={() => onButtonPress(button.value)}>
            <Text style={buttonTextStyle(button.text)}>{button.symbol}</Text>
          </Ripple>
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

export default LengthConverterScreen;
