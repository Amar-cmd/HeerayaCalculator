import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';

const SpeedConverterScreen = () => {
  const [display, setDisplay] = useState('0');
  const [fromUnit, setFromUnit] = useState('Meters per second');
  const [toUnit, setToUnit] = useState('Kilometers per hour');
  const [convertedSpeed, setConvertedSpeed] = useState('0');

  const speedUnits = {
    'Centimeters per second': {value: 1e-2, symbol: 'cm/s'},
    'Meters per second': {value: 1, symbol: 'm/s'},
    'Meters per hour': {value: 1 / 3600, symbol: 'm/h'},
    'Kilometers per second': {value: 1e3, symbol: 'km/s'},
    'Kilometers per hour': {value: 3.6, symbol: 'km/h'},
    'Inches per second': {value: 1 / 39.37, symbol: 'in/s'},
    'Inches per hour': {value: 1 / (3600 * 39.37), symbol: 'in/h'},
    'Feet per second': {value: 1 / 3.281, symbol: 'ft/s'},
    'Feet per hour': {value: 1 / (3600 * 3.281), symbol: 'ft/h'},
    'Miles per second': {value: 1609.34, symbol: 'mi/s'},
    'Miles per hour': {value: 1609.34 / 3600, symbol: 'mi/h'},
    'Yards per second': {value: 1 / 1.094, symbol: 'yd/s'},
    'Yards per hour': {value: 1 / (3600 * 1.094), symbol: 'yd/h'},
    Knots: {value: 1 / 1.944, symbol: 'knot'},
    Mach: {value: 343.3, symbol: 'Mach'},
  };

    const theme = useTheme();

  const displayContainerStyle = {
    ...styles.conversionContainer,
    backgroundColor: theme.dark ? theme.colors.buttonBackground : '#fff',
  };
    // Use colors based on the current theme
    const displayTextStyle = {
      ...styles.displayText,
      color: theme.colors.text,
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

  const convertSpeed = () => {
    // Use .value to access the value of the selected unit
    let speed = parseFloat(display) * speedUnits[fromUnit].value;
    // Convert the speed to the target unit
    let convertedSpd = speed / speedUnits[toUnit].value;
    // Set the converted speed as a state
    setConvertedSpeed(convertedSpd.toFixed(7));
  };

  useEffect(() => {
    convertSpeed();
  }, [display, fromUnit, toUnit]);

  return (
    <View style={displayContainerStyle}>
      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={fromUnit}
          style={{...styles.picker, color: theme.colors.text}}
          onValueChange={itemValue => setFromUnit(itemValue)}>
          {Object.entries(speedUnits).map(([unit, {symbol}]) => (
            <Picker.Item
              key={unit}
              label={`${unit} (${symbol})`}
              value={unit}
            />
          ))}
        </Picker>
        <Text style={displayTextStyle}>{display}</Text>
      </View>

      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={toUnit}
          style={{...styles.picker, color: theme.colors.text}}
          onValueChange={itemValue => setToUnit(itemValue)}>
          {Object.entries(speedUnits).map(([unit, {symbol}]) => (
            <Picker.Item
              key={unit}
              label={`${unit} (${symbol})`}
              value={unit}
            />
          ))}
        </Picker>
        <Text style={displayTextStyle}>{convertedSpeed || '0'}</Text>
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
});

export default SpeedConverterScreen;
