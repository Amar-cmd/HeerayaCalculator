import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';
import Ripple from 'react-native-material-ripple'; // import Ripple

const DataConverterScreen = () => {
  const [display, setDisplay] = useState('0');
  const [fromUnit, setFromUnit] = useState('Bytes');
  const [toUnit, setToUnit] = useState('Kilobytes');
  const [convertedData, setConvertedData] = useState('0');

  const dataUnits = {
    Bits: {value: 8, symbol: 'bit'},
    Bytes: {value: 1, symbol: 'B'},
    Kilobits: {value: 0.008, symbol: 'Kb'},
    Kibibits: {value: 7.8125e-3, symbol: 'Kib'},
    Kilobytes: {value: 1e-3, symbol: 'KB'},
    Kibibytes: {value: 9.765625e-4, symbol: 'KiB'},
    Megabits: {value: 8e-6, symbol: 'Mb'},
    Mebibits: {value: 7.62939e-6, symbol: 'Mib'},
    Megabytes: {value: 1e-6, symbol: 'MB'},
    Mebibytes: {value: 9.53674e-7, symbol: 'MiB'},
    Gigabits: {value: 8e-9, symbol: 'Gb'},
    Gigabytes: {value: 1e-9, symbol: 'GB'},
    Gibibytes: {value: 9.31323e-10, symbol: 'GiB'},
    Terabits: {value: 8e-12, symbol: 'Tb'},
    Tebibits: {value: 7.276e-12, symbol: 'Tib'},
    Terabytes: {value: 1e-12, symbol: 'TB'},
    Tebibytes: {value: 9.09495e-13, symbol: 'TiB'},
    Petabits: {value: 8e-15, symbol: 'Pb'},
    Pebibits: {value: 7.105e-15, symbol: 'Pib'},
    Petabytes: {value: 1e-15, symbol: 'PB'},
    Pebibytes: {value: 8.88178e-16, symbol: 'PiB'},
    Exabits: {value: 8e-18, symbol: 'Eb'},
    Exbibits: {value: 6.87e-18, symbol: 'Eib'},
    Exabytes: {value: 1e-18, symbol: 'EB'},
    Exbibytes: {value: 8.673617e-19, symbol: 'EiB'},
    Zetabits: {value: 8e-21, symbol: 'Zb'},
    Zebibits: {value: 6.674e-21, symbol: 'Zib'},
    Zetabytes: {value: 1e-21, symbol: 'ZB'},
    Zebibytes: {value: 8.4507e-22, symbol: 'ZiB'},
    Yottabits: {value: 8e-24, symbol: 'Yb'},
    Yobibits: {value: 6.505e-24, symbol: 'Yib'},
    Yottabytes: {value: 1e-24, symbol: 'YB'},
    Yobibytes: {value: 8.271806e-25, symbol: 'YiB'},
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

  const convertData = () => {
    let data = parseFloat(display);
    if (isNaN(data) || data < 0) {
      setConvertedData('');
      return;
    }

    data = (data / dataUnits[fromUnit].value) * dataUnits[toUnit].value;

    if (data < 1e-7) {
      // If the result is very small, use exponential notation
      setConvertedData(data.toExponential(7));
    } else {
      setConvertedData(data.toFixed(7));
    }
  };


  useEffect(() => {
    convertData();
  }, [display, fromUnit, toUnit]);

  return (
    <View style={displayContainerStyle}>
      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={fromUnit}
          style={{...styles.picker, color: theme.colors.buttonText}}
          onValueChange={itemValue => setFromUnit(itemValue)}>
          {Object.entries(dataUnits).map(([unit, {symbol}]) => (
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
          {Object.entries(dataUnits).map(([unit, {symbol}]) => (
            <Picker.Item
              key={unit}
              label={`${unit} (${symbol})`}
              value={unit}
            />
          ))}
        </Picker>
        <Text style={displayTextStyle}>{convertedData || '0'}</Text>
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
});

export default DataConverterScreen;
