import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';

const AngleConverterScreen = () => {
  const [display, setDisplay] = useState('0');
  const [fromUnit, setFromUnit] = useState('Degree');
  const [toUnit, setToUnit] = useState('Radian');
  const [convertedAngle, setConvertedAngle] = useState('0');

  const angleUnits = {
    Degree: {value: 57.29577951308232, symbol: '°'},
    Radian: {value: 1, symbol: 'rad'},
    Gradian: {value: 63.66197723675813, symbol: 'gon'},
    Arcsecond: {value: 206264.80624709636, symbol: '″'},
    Milliradian: {value: 1000, symbol: 'mrad'},
    'Minute of arc': {value: 3437.7467707849396, symbol: '′'},
  };

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
      const currentNumber = display.split(/[\+\-\*\/]/).slice(-1)[0];
      if (!/\./.test(currentNumber)) {
        setDisplay(display + buttonValue);
      }
    } else {
      setDisplay((display === '0' ? '' : display) + buttonValue);
    }
  };

  const convertAngle = () => {
    let angle = parseFloat(display);
    if (isNaN(angle) || angle < 0) {
      setConvertedAngle('');
      return;
    }

    angle = (angle / angleUnits[fromUnit].value) * angleUnits[toUnit].value;

    setConvertedAngle(angle.toFixed(7));
  };

  useEffect(() => {
    convertAngle();
  }, [display, fromUnit, toUnit]);

  return (
    <View style={styles.container}>
      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={fromUnit}
          style={{...styles.picker, color: theme.colors.text}}
          onValueChange={itemValue => setFromUnit(itemValue)}>
          {Object.entries(angleUnits).map(([unit, {symbol}]) => (
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
          {Object.entries(angleUnits).map(([unit, {symbol}]) => (
            <Picker.Item
              key={unit}
              label={`${unit} (${symbol})`}
              value={unit}
            />
          ))}
        </Picker>
        <Text style={displayTextStyle}>{convertedAngle || '0'}</Text>
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
});

export default AngleConverterScreen;
