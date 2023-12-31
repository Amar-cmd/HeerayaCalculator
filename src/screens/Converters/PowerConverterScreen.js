import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Vibration} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';

const PowerConverterScreen = () => {
  const [display, setDisplay] = useState('0');
  const [fromUnit, setFromUnit] = useState('Watts');
  const [toUnit, setToUnit] = useState('Kilowatts');
  const [convertedPower, setConvertedPower] = useState('0');

  const powerUnits = {
    Watts: {value: 1, symbol: 'W'},
    Kilowatts: {value: 0.001, symbol: 'kW'},
    Horsepower: {value: 0.001341022, symbol: 'hp'},
    'Foot-pounds/min': {value: 44.25373, symbol: 'ft·lb/min'},
    'BTUs/min': {value: 0.05686902, symbol: 'BTU/min'},
  };

     const theme = useTheme();
  const displayContainerStyle = {
    ...styles.conversionContainer,
    backgroundColor: theme.dark ? theme.colors.buttonBackground : '#fff',
  };
     // Use colors based on the current theme
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
      const currentNumber = display.split(/[\+\-\*\/]/).slice(-1)[0];
      if (!/\./.test(currentNumber)) {
        setDisplay(display + buttonValue);
      }
    } else {
      setDisplay((display === '0' ? '' : display) + buttonValue);
    }
  };

  const convertPower = () => {
    let power = parseFloat(display);
    if (isNaN(power) || power < 0) {
      setConvertedPower('');
      return;
    }

    // Convert to the base unit (Watts) first, then convert to the target unit
    power = (power / powerUnits[fromUnit].value) * powerUnits[toUnit].value;

    setConvertedPower(power.toFixed(7));
  };

  useEffect(() => {
    convertPower();
  }, [display, fromUnit, toUnit]);

  return (
    <View style={displayContainerStyle}>
      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={fromUnit}
          style={{...styles.picker, color: theme.colors.buttonText}}
          onValueChange={itemValue => setFromUnit(itemValue)}>
          {Object.entries(powerUnits).map(([unit, {symbol}]) => (
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
          style={{...styles.picker, color: theme.colors.buttonText}}
          onValueChange={itemValue => setToUnit(itemValue)}>
          {Object.entries(powerUnits).map(([unit, {symbol}]) => (
            <Picker.Item
              key={unit}
              label={`${unit} (${symbol})`}
              value={unit}
            />
          ))}
        </Picker>
        <Text style={displayTextStyle}>{convertedPower || '0'}</Text>
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

export default PowerConverterScreen;
