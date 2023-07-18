import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';

const TemperatureConverterScreen = () => {
  const [display, setDisplay] = useState('0');
  const [fromUnit, setFromUnit] = useState('Celsius');
  const [toUnit, setToUnit] = useState('Fahrenheit');
  const [convertedTemperature, setConvertedTemperature] = useState('0');

  // Get the current theme colors
  const theme = useTheme();

  // Use colors based on the current theme
  const displayTextStyle = {
    ...styles.displayText,
    color: theme.colors.text,
  };

  const buttonsContainerStyle = {
    ...styles.buttonsContainer,
    backgroundColor: theme.colors.background,
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
    } else if (buttonValue === '+/-') {
      setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
    } else {
      setDisplay((display === '0' ? '' : display) + buttonValue);
    }
  };

  const convertTemperature = () => {
    let temperature = parseFloat(display);
    let convertedTemp;

    if (isNaN(temperature)) {
      setConvertedTemperature('0');
      return;
    }

    // convert the temperature to Kelvin first
    if (fromUnit === 'Celsius') {
      temperature += 273.15;
    } else if (fromUnit === 'Fahrenheit') {
      temperature = ((temperature - 32) * 5) / 9 + 273.15;
    }

    // convert from Kelvin to the target unit
    if (toUnit === 'Celsius') {
      convertedTemp = temperature - 273.15;
    } else if (toUnit === 'Fahrenheit') {
      convertedTemp = ((temperature - 273.15) * 9) / 5 + 32;
    } else {
      convertedTemp = temperature;
    }

    setConvertedTemperature(convertedTemp.toFixed(2));
  };

  useEffect(() => {
    convertTemperature();
  }, [display, fromUnit, toUnit]);

  return (
    <View style={styles.container}>
      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={fromUnit}
          style={{...styles.picker, color: theme.colors.text}}
          itemStyle={{backgroundColor: theme.colors.background}}
          onValueChange={itemValue => setFromUnit(itemValue)}>
          <Picker.Item label="Celsius °C" value="Celsius" />
          <Picker.Item label="Fahrenheit °F" value="Fahrenheit" />
          <Picker.Item label="Kelvin K" value="Kelvin" />
        </Picker>
        <Text style={displayTextStyle}>{display || '0'}</Text>
      </View>

      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={toUnit}
          style={{...styles.picker, color: theme.colors.text}}
          itemStyle={{backgroundColor: theme.colors.background}}
          onValueChange={itemValue => setToUnit(itemValue)}>
          <Picker.Item label="Celsius °C" value="Celsius" />
          <Picker.Item label="Fahrenheit °F" value="Fahrenheit" />
          <Picker.Item label="Kelvin K" value="Kelvin" />
        </Picker>
        <Text style={displayTextStyle}>{convertedTemperature || '0'}</Text>
      </View>

      <View style={buttonsContainerStyle}>
        {[
          {symbol: '7', value: '7'},
          {symbol: '8', value: '8'},
          {symbol: '9', value: '9'},
          {symbol: 'Del', value: 'Del'},
          {symbol: '4', value: '4'},
          {symbol: '5', value: '5'},
          {symbol: '6', value: '6'},
          {symbol: 'AC', value: 'AC'},
          {symbol: '1', value: '1'},
          {symbol: '2', value: '2'},
          {symbol: '3', value: '3'},
          {symbol: '.', value: '.'},
          {symbol: '0', value: '0'},
          {symbol: '+/-', value: '+/-'},
        ].map(button => (
          <TouchableOpacity
            key={button.value}
            style={buttonStyle()}
            onPress={() => onButtonPress(button.value)}>
            <Text style={buttonTextStyle()}>{button.symbol}</Text>
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
    borderWidth: 1,
    borderColor: '#ccc',
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

export default TemperatureConverterScreen;
