import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import DarkMode from '../styles/DarkMode';

const CalculatorScreen = () => {
  const [display, setDisplay] = useState('');
  const [parenthesesCount, setParenthesesCount] = useState(0);
  const [lastButton, setLastButton] = useState(null);
  const [result, setResult] = useState('');
  // in CalculatorScreen.js
  const theme = useTheme();
  // Use colors based on the current theme
   const displayContainerStyle = {
     ...styles.displayContainer,
     backgroundColor: theme.colors.background,
   };

   const displayTextStyle = {
     ...styles.displayText,
     color: theme.colors.text,
   };

   const resultTextStyle = {
     ...styles.resultText,
     color: theme.colors.text,
   };

   const buttonsContainerStyle = {
     ...styles.buttonsContainer,
     backgroundColor: theme.colors.background,
   };

   const buttonStyle = color => ({
     ...styles.button,
       backgroundColor: color || theme.colors.buttonBackground,
     borderColor:color || theme.colors.border
   });

   const buttonTextStyle = color => ({
     ...styles.buttonText,
     color: color || theme.colors.buttonText,
   });

  const onButtonPress = buttonValue => {
    if (buttonValue === 'AC') {
      setDisplay('');
      setParenthesesCount(0);
      setLastButton(null);
      setResult('');
    } else if (buttonValue === 'Del') {
      setDisplay(display.slice(0, -1));
    } else if (buttonValue === '.') {
      // Check if current number already contains a dot
      const currentNumber = display.split(/[\+\-\*\/]/).slice(-1)[0];
      if (!/\./.test(currentNumber)) {
        setDisplay(display + buttonValue);
      }
    } else if (buttonValue === '%') {
      // Check if current number already contains a percent sign
      const currentNumber = display.split(/[\+\-\*\/]/).slice(-1)[0];
      if (!/%/.test(currentNumber)) {
        setDisplay(display + buttonValue);
      }
    } else if (
      ['+', '-', '*', '/', '^2'].includes(buttonValue) &&
      (display.length === 0 || /[\+\-\*\/\^2\.%]$/.test(display))
    ) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Invalid input', ToastAndroid.SHORT);
      } else {
        Alert.alert('Invalid input');
      }
    } else if (buttonValue === '+/-') {
      // Split display string into an array of numbers and symbols
      let displayArray = display.split(/([+\-*/])/).filter(Boolean);
      if (displayArray.length > 0) {
        // Get the last element in the array
        let lastElement = displayArray[displayArray.length - 1];
        // Check if the last element is a number
        if (!isNaN(lastElement)) {
          // Check if the number is preceded by a minus sign
          if (
            displayArray.length > 1 &&
            displayArray[displayArray.length - 2] === '-'
          ) {
            // Remove the minus sign and replace the last number with its positive value
            displayArray.splice(displayArray.length - 2, 2, lastElement);
          } else {
            // Replace the last number with its negation
            displayArray[displayArray.length - 1] = '-' + lastElement;
          }
          // Join the array back into a string and set the display
          setDisplay(displayArray.join(''));
        }
      }
    } else if (buttonValue === '()') {
      if (parenthesesCount > 0 && !isNaN(lastButton)) {
        setDisplay(display + ')');
        setParenthesesCount(parenthesesCount - 1);
      } else {
        if (
          (!isNaN(lastButton) || display.endsWith(')')) &&
          !display.endsWith(')(')
        ) {
          setDisplay(display + '*(');
        } else if (!display.endsWith(')(')) {
          setDisplay(display + '(');
        }
        setParenthesesCount(parenthesesCount + 1);
      }
    } else if (buttonValue === '=') {
      try {
        let result = display.replace(/(\d+\.?\d*)\%/g, '($1/100)'); // Updated regex to match decimal numbers
        result = result.replace(/(\d+\.?\d*)\^(\d+\.?\d*)/g, 'Math.pow($1,$2)'); // Updated regex to match decimal numbers
        // Limit the result to 10 decimal places
        let computedResult = eval(result);
        computedResult = parseFloat(computedResult.toFixed(10));
        setDisplay(String(computedResult));
        setResult('');
      } catch (error) {
        setDisplay('Error');
        setResult('');
      }
    } else {
      // If the last button pressed was '=', clear the display when a new digit is entered
      if (!isNaN(buttonValue) && lastButton === '=') {
        setDisplay(buttonValue);
        setResult('');
        setLastButton(buttonValue);
        return;
      }
      if (
        ['+', '-', '*', '/'].includes(buttonValue) &&
        ['+', '-', '*', '/'].includes(lastButton)
      ) {
        setDisplay(display.slice(0, -1) + buttonValue);
      } else if (!isNaN(lastButton) && display.endsWith(')')) {
        setDisplay(display + '*' + buttonValue);
      } else if (!isNaN(buttonValue) && display.endsWith(')')) {
        setDisplay(display + '*' + buttonValue);
      } else {
        setDisplay(display + buttonValue);
      }
    }

    setLastButton(buttonValue);
  };

  useEffect(() => {
    try {
      let resultTemp = display;
      // Check if the last character is an operator, if so remove it
      if (['+', '-', '*', '/'].includes(resultTemp.slice(-1))) {
        resultTemp = resultTemp.slice(0, -1);
      }
      // Evaluate the expression
      let result = eval(resultTemp);
      // Check if result is a number (to avoid showing NaN or Infinity)
      if (typeof result === 'number' && isFinite(result)) {
        setResult(String(result));
      } else {
        setResult('');
      }
    } catch (error) {
      setResult('');
    }
  }, [display]);
  return (
    <View style={styles.container}>
      <View style={displayContainerStyle}>
        <Text style={displayTextStyle}>{display}</Text>
        <Text style={resultTextStyle}>{result}</Text>
      </View>

      <View style={buttonsContainerStyle}>
        {[
          {symbol: 'AC', value: 'AC', color: '#e67371', text: '#fff'},
          {symbol: '%', value: '%'},
          {symbol: '()', value: '()'},
          {symbol: '⌫', value: 'Del', color: '#e67371', text: '#fff'},
          {symbol: '1/x', value: '1/'},
          {symbol: 'x²', value: '^2'},
          {symbol: '√', value: 'sqrt'},
          {symbol: '/', value: '/'},
          {symbol: '7', value: '7'},
          {symbol: '8', value: '8'},
          {symbol: '9', value: '9'},
          {symbol: 'x', value: '*'},
          {symbol: '4', value: '4'},
          {symbol: '5', value: '5'},
          {symbol: '6', value: '6'},
          {symbol: '-', value: '-'},
          {symbol: '1', value: '1'},
          {symbol: '2', value: '2'},
          {symbol: '3', value: '3'},
          {symbol: '+', value: '+'},
          {symbol: '+/-', value: '+/-'},
          {symbol: '0', value: '0'},
          {symbol: '.', value: '.'},
          {symbol: '=', value: '=', color: '#2b840c', text: '#fff'},
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
  },
  displayContainer: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  displayText: {
    color: 'black',
    fontSize: 35,
    marginTop: 20,
  },
    buttonsContainer: {
      borderTopLeftRadius:30,
        borderTopRightRadius: 30,
      overflow:'hidden',
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '25%',
    height: '16.6667%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 28,
  },
  resultText: {
    color: 'gray',
    fontSize: 20,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
});

export default CalculatorScreen;
