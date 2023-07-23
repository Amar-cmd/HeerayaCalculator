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
       backgroundColor: theme.dark
         ? color === '#2b840c'
           ? color
           : theme.colors.buttonBackground
         : color || '#fff',
       borderColor: theme.dark ? theme.colors.border : color || '#fff',
     });

     const buttonTextStyle = color => ({
       ...styles.buttonText,
       color: color === '#2b840c' ? '#fff' : color || theme.colors.buttonText,
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
    <View style={displayContainerStyle}>
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
          {symbol: '7', value: '7', color: '#fff'},
          {symbol: '8', value: '8', color: '#fff'},
          {symbol: '9', value: '9', color: '#fff'},
          {symbol: 'Del', value: 'Del', color: '#fff', text: '#e67371'},
          {symbol: '4', value: '4', color: '#fff'},
          {symbol: '5', value: '5', color: '#fff'},
          {symbol: '6', value: '6', color: '#fff'},
          {symbol: 'AC', value: 'AC', color: '#fff', text: '#e67371'},
          {symbol: '1', value: '1', color: '#fff'},
          {symbol: '2', value: '2', color: '#fff'},
          {symbol: '3', value: '3', color: '#fff'},
          {symbol: '.', value: '.', color: '#fff', text: '#e67371'},
          {symbol: '0', value: '0', color: '#fff'},
        ].map(button => (
          <TouchableOpacity
            key={button.value}
            style={buttonStyle(button.color)}
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
    backgroundColor:'#fff'
  },
  button: {
    width: '25%',
    height: '25%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff',
  },
  buttonText: {
    fontSize: 20,
  },
});

export default AngleConverterScreen;
