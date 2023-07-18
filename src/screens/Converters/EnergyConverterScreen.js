import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';

const EnergyConverterScreen = () => {
  const [display, setDisplay] = useState('0');
  const [fromUnit, setFromUnit] = useState('Joules');
  const [toUnit, setToUnit] = useState('Electron volts');
  const [convertedEnergy, setConvertedEnergy] = useState('0');

const energyUnits = {
  'Electron volts': 6.242e18,
  Joules: 1,
  Kilojoules: 1e-3,
  'Thermal calories': 0.239005736,
  'Food calories': 0.000239005736,
  'Foot-pounds': 0.737562149277,
  'British thermal units': 0.000947817077749,
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
      // Check if current number already contains a dot
      const currentNumber = display.split(/[\+\-\*\/]/).slice(-1)[0];
      if (!/\./.test(currentNumber)) {
        setDisplay(display + buttonValue);
      }
    } else {
      setDisplay((display === '0' ? '' : display) + buttonValue);
    }
  };

    const convertEnergy = () => {
      let energy = parseFloat(display);
      if (isNaN(energy) || energy < 0) {
        setConvertedEnergy('');
        return;
      }

      // Convert the energy to joules first
      energy /= energyUnits[fromUnit];

      // Convert from joules to the target unit
      let convertedEne = energy * energyUnits[toUnit];

      setConvertedEnergy(convertedEne.toFixed(4));
    };


  useEffect(() => {
    convertEnergy();
  }, [display, fromUnit, toUnit]);

  return (
    <View style={styles.container}>
      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={fromUnit}
          style={{...styles.picker, color: theme.colors.text}}
          onValueChange={itemValue => setFromUnit(itemValue)}>
          <Picker.Item label="Electron volts (eV)" value="Electron volts" />
          <Picker.Item label="Joules (J)" value="Joules" />
          <Picker.Item label="Kilojoules (kJ)" value="Kilojoules" />
          <Picker.Item
            label="Thermal calories (cal)"
            value="Thermal calories"
          />
          <Picker.Item label="Food calories (kcal)" value="Food calories" />
          <Picker.Item label="Foot-pounds (ft·lb)" value="Foot-pounds" />
          <Picker.Item
            label="British thermal units (BTU)"
            value="British thermal units"
          />
        </Picker>
        <Text style={displayTextStyle}>{display}</Text>
      </View>

      <View style={styles.conversionContainer}>
        <Picker
          selectedValue={toUnit}
          style={{...styles.picker, color: theme.colors.text}}
          onValueChange={itemValue => setToUnit(itemValue)}>
          <Picker.Item label="Electron volts (eV)" value="Electron volts" />
          <Picker.Item label="Joules (J)" value="Joules" />
          <Picker.Item label="Kilojoules (kJ)" value="Kilojoules" />
          <Picker.Item
            label="Thermal calories (cal)"
            value="Thermal calories"
          />
          <Picker.Item label="Food calories (kcal)" value="Food calories" />
          <Picker.Item label="Foot-pounds (ft·lb)" value="Foot-pounds" />
          <Picker.Item
            label="British thermal units (BTU)"
            value="British thermal units"
          />
        </Picker>
        <Text style={displayTextStyle}>{convertedEnergy || '0'}</Text>
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
          // Add more buttons as necessary
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

export default EnergyConverterScreen;
