import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Vibration} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';

const AreaConverterScreen = () => {
  const [display, setDisplay] = useState('0');
  const [fromUnit, setFromUnit] = useState('Square meters');
  const [toUnit, setToUnit] = useState('Square inches');
  const [convertedArea, setConvertedArea] = useState('0');

  const areaUnits = {
    'Square millimeters': 1e-6,
    'Square centimeters': 1e-4,
    'Square meters': 1,
    Hectares: 1e4,
    'Square kilometers': 1e6,
    'Square inches': 0.00064516,
    'Square feet': 0.092903,
    'Square yards': 0.836127,
    Acres: 4046.86,
    'Square miles': 2.59e6,
  };

    const theme = useTheme();

   const displayContainerStyle = {
     ...styles.areaContainer,
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
      // Check if current number already contains a dot
      const currentNumber = display.split(/[\+\-\*\/]/).slice(-1)[0];
      if (!/\./.test(currentNumber)) {
        setDisplay(display + buttonValue);
      }
    } else {
      setDisplay((display === '0' ? '' : display) + buttonValue);
    }
  };

  const convertArea = () => {
    let area = parseFloat(display);
    if (isNaN(area) || area < 0) {
      setConvertedArea('');
      return;
    }

    // Convert the area to square meters first
    area *= areaUnits[fromUnit];

    // Convert from square meters to the target unit
    let convertedAr = area / areaUnits[toUnit];

    setConvertedArea(convertedAr.toFixed(7));
  };

  useEffect(() => {
    convertArea();
  }, [display, fromUnit, toUnit]);

  return (
    <View style={displayContainerStyle}>
      <View style={styles.areaContainer}>
        <Picker
          selectedValue={fromUnit}
          style={{...styles.picker, color: theme.colors.buttonText}}
          onValueChange={itemValue => setFromUnit(itemValue)}>
          {Object.keys(areaUnits).map(unit => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
        <Text style={displayTextStyle}>{display}</Text>
      </View>

      <View style={styles.areaContainer}>
        <Picker
          selectedValue={toUnit}
          style={{...styles.picker, color: theme.colors.buttonText}}
          onValueChange={itemValue => setToUnit(itemValue)}>
          {Object.keys(areaUnits).map(unit => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
        <Text style={displayTextStyle}>{convertedArea || '0'}</Text>
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
  areaContainer: {
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

export default AreaConverterScreen;
