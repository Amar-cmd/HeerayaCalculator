import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';
import Ripple from 'react-native-material-ripple'; // import Ripple

const WeightAndMassConverterScreen = () => {
  const [display, setDisplay] = useState('0');
  const [fromUnit, setFromUnit] = useState('Grams');
  const [toUnit, setToUnit] = useState('Ounces');
  const [convertedWeight, setConvertedWeight] = useState('0');

  const weightUnits = {
    Carats: 0.2,
    Milligrams: 0.001,
    Centigrams: 0.01,
    Decigrams: 0.1,
    Grams: 1,
    Dekagrams: 10,
    Hectograms: 100,
    Kilograms: 1000,
    'Metric tonnes': 1000000,
    Ounces: 28.3495,
    Pounds: 453.592,
    Stone: 6350.29,
    'Short tons (US)': 907184.74,
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

  const convertWeight = () => {
    let weight = parseFloat(display);
    if (isNaN(weight) || weight < 0) {
      setConvertedWeight('');
      return;
    }

    // Convert the weight to grams first
    weight *= weightUnits[fromUnit];

    // Convert from grams to the target unit
    let convertedWt = weight / weightUnits[toUnit];

    setConvertedWeight(convertedWt.toFixed(7));
  };

  useEffect(() => {
    convertWeight();
  }, [display, fromUnit, toUnit]);

  return (
    <View style={displayContainerStyle}>
      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={fromUnit}
          style={{...styles.picker, color: theme.colors.text}}
          onValueChange={itemValue => setFromUnit(itemValue)}>
          <Picker.Item label="Carats (ct)" value="Carats" />
          <Picker.Item label="Milligrams (mg)" value="Milligrams" />
          <Picker.Item label="Centigrams (cg)" value="Centigrams" />
          <Picker.Item label="Decigrams (dg)" value="Decigrams" />
          <Picker.Item label="Grams (g)" value="Grams" />
          <Picker.Item label="Dekagrams (dag)" value="Dekagrams" />
          <Picker.Item label="Hectograms (hg)" value="Hectograms" />
          <Picker.Item label="Kilograms (kg)" value="Kilograms" />
          <Picker.Item label="Metric tonnes (t)" value="Metric tonnes" />
          <Picker.Item label="Ounces (oz)" value="Ounces" />
          <Picker.Item label="Pounds (lb)" value="Pounds" />
          <Picker.Item label="Stone (st)" value="Stone" />
          <Picker.Item label="Short tons (US) (t)" value="Short tons (US)" />
        </Picker>
        <Text style={displayTextStyle}>{display}</Text>
      </View>

      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={toUnit}
          style={{...styles.picker, color: theme.colors.text}}
          onValueChange={itemValue => setToUnit(itemValue)}>
          <Picker.Item label="Carats (ct)" value="Carats" />
          <Picker.Item label="Milligrams (mg)" value="Milligrams" />
          <Picker.Item label="Centigrams (cg)" value="Centigrams" />
          <Picker.Item label="Decigrams (dg)" value="Decigrams" />
          <Picker.Item label="Grams (g)" value="Grams" />
          <Picker.Item label="Dekagrams (dag)" value="Dekagrams" />
          <Picker.Item label="Hectograms (hg)" value="Hectograms" />
          <Picker.Item label="Kilograms (kg)" value="Kilograms" />
          <Picker.Item label="Metric tonnes (t)" value="Metric tonnes" />
          <Picker.Item label="Ounces (oz)" value="Ounces" />
          <Picker.Item label="Pounds (lb)" value="Pounds" />
          <Picker.Item label="Stone (st)" value="Stone" />
          <Picker.Item label="Short tons (US) (t)" value="Short tons (US)" />
        </Picker>
        <Text style={displayTextStyle}>{convertedWeight || '0'}</Text>
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

export default WeightAndMassConverterScreen;
