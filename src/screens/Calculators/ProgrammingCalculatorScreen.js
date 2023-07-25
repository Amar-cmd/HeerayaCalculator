import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Ripple from 'react-native-material-ripple'; // import Ripple

const ProgrammerCalculatorScreen = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('decimal'); // Default to decimal
  const [selectedOperation, setSelectedOperation] = useState(null);
const [firstOperand, setFirstOperand] = useState('');
  const [nextInputClears, setNextInputClears] = useState(false);

  const [convertedValues, setConvertedValues] = useState({
    dec: '',
    hex: '',
    oct: '',
    bin: '',
  });

   const theme = useTheme();

   const displayContainerStyle = {
     ...styles.displayArea,
     backgroundColor: theme.dark ? theme.colors.buttonBackground : '#fff',
   };
   // Use colors based on the current theme
   const displayTextStyle = {
     ...styles.displayText,
     color: theme.dark? theme.colors.text : '#000',
   };

   const buttonsContainerStyle = {
     ...styles.buttonContainer,
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
  
   const columnButton = color => ({
     ...styles.buttonText,
     color: color === '#2b840c' ? '#fff' : color || theme.colors.buttonText,
   });
    
  const buttonColumnTextStyle = {
    ...styles.buttonTextBlack,
    color: theme.colors.text,
  };
  
const formatHexBin = str => {
  const reversedStr = str.split('').reverse().join('');
  const formattedReversedStr = reversedStr.replace(/(.{4})/g, '$1 ').trim();
  return formattedReversedStr.split('').reverse().join('');
};

const formatOct = str => {
  const reversedStr = str.split('').reverse().join('');
  const formattedReversedStr = reversedStr.replace(/(.{3})/g, '$1 ').trim();
  return formattedReversedStr.split('').reverse().join('');
};

const formatDec = str => Number(str).toLocaleString('en-IN');

 useEffect(() => {
 const convertValue = (value, system) => {
     let lastNumber = value
       .split(/\s/)
       .reverse()
       .find(v => v !== '' && (!isNaN(v) || /^[0-9a-fA-F]+$/.test(v)));
     let number;
     if (!lastNumber) {
       number = 0;
     } else {
       switch (system) {
         case 'hexa':
           number = parseInt(lastNumber, 16);
           break;
         case 'decimal':
           number = parseInt(lastNumber, 10);
           break;
         case 'octal':
           number = parseInt(lastNumber, 8);
           break;
         case 'binary':
           number = parseInt(lastNumber, 2);
           break;
         default:
           number = 0;
       }
     }

   let bin;
   let hex;
   let oct;

   if (number < 0) {
     // Compute two's complement for negative numbers
     bin = (number >>> 0).toString(2);
     hex = (number >>> 0).toString(16);
     oct = (number >>> 0).toString(8);
   } else {
     bin = number.toString(2);
     hex = number.toString(16);
     oct = number.toString(8);
   }

   setConvertedValues({
     hex: formatHexBin(hex),
     dec: formatDec(number.toString(10)),
     oct: formatOct(oct),
     bin: formatHexBin(bin),
   });
 };


   convertValue(displayValue, selectedSystem);
 }, [displayValue, selectedSystem]);

  const handlePress = value => {
    if (value === 'Del') {
      setDisplayValue(prevDisplayValue => prevDisplayValue.slice(0, -1));
    } else if (
      ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', '+', '*', '/'].includes(value)
    ) {
      setDisplayValue(prevDisplayValue => prevDisplayValue + ' ' + value + ' ');
      setNextInputClears(false);
    } else if (value === '-') {
      setDisplayValue(prevDisplayValue =>
        prevDisplayValue === '' ? value : prevDisplayValue + ' ' + value + ' ',
      );
    } else if (value === '=') {
      const operationArray = displayValue.split(' ');

      let result;
      let operand1 = operationArray[0].startsWith('0x')
        ? parseInt(operationArray[0].substring(2), 16)
        : selectedSystem === 'binary'
        ? parseInt(operationArray[0], 2)
        : parseInt(operationArray[0]);
      let operatorIndex = 1;
      let operand2Index = 2;
      while (operatorIndex < operationArray.length) {
        let operator = operationArray[operatorIndex];
        let operand2 = operationArray[operand2Index].startsWith('0x')
          ? parseInt(operationArray[operand2Index].substring(2), 16)
          : selectedSystem === 'binary'
          ? parseInt(operationArray[operand2Index], 2)
          : parseInt(operationArray[operand2Index]);
        switch (operator) {
          case 'AND':
            result = operand1 & operand2;
            break;
          case 'OR':
            result = operand1 | operand2;
            break;
          case 'NOT':
            result = ~operand1;
            break;
          case 'NAND':
            result = ~(operand1 & operand2);
            break;
          case 'NOR':
            result = ~(operand1 | operand2);
            break;
          case 'XOR':
            result = operand1 ^ operand2;
            break;
          case '+':
            result = operand1 + operand2;
            break;
          case '-':
            result = operand1 - operand2;
            break;
          case '*':
            result = operand1 * operand2;
            break;
          case '/':
            result = operand1 / operand2;
            break;
          default:
            break;
        }
        operand1 = result;
        operatorIndex += 2;
        operand2Index += 2;
      }
      setDisplayValue(result.toString());
    } else {
      if (nextInputClears) {
        setDisplayValue(value);
        setNextInputClears(false);
      } else {
        setDisplayValue(prevDisplayValue => prevDisplayValue + value);
      }
    }
  };



   const handleSystemPress = system => {
     setSelectedSystem(system);
     setDisplayValue('');
   };

  const buttonEnabled = button => {
    if (selectedSystem === 'binary') {
      return [
        '0',
        '1',
        'AND',
        'OR',
        'NOT',
        'NAND',
        'NOR',
        'XOR',
        'Del',
        '/',
        '*',
        '-',
        '+',
        '=',
        '(',
        ')',
      ].includes(button);
    } else if (selectedSystem === 'octal') {
      return [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        'AND',
        'OR',
        'NOT',
        'NAND',
        'NOR',
        'XOR',
        'Del',
        '/',
        '*',
        '-',
        '+',
        '=',
        '(',
        ')',
      ].includes(button);
    } else if (selectedSystem === 'decimal') {
      return [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'AND',
        'OR',
        'NOT',
        'NAND',
        'NOR',
        'XOR',
        'Del',
        '/',
        '*',
        '-',
        '+',
        '=',
        '(',
        ')',
      ].includes(button);
    } else if (selectedSystem === 'hexa') {
      return true;
    } else {
      return false;
    }
  };

  const buttonColumnStyle = system => {
    return theme.dark
      ? system === selectedSystem
        ? {
            ...styles.buttonColumnButtonSelected,
          backgroundColor: theme.colors.background,
            padding:8,
          }
        : {
            ...styles.buttonColumnButton,
          }
      : system === selectedSystem
      ? styles.buttonColumnButtonSelected
      : styles.buttonColumnButton;
  };

  return (
    <View style={styles.container}>
      {/* Display Area */}
      <View style={displayContainerStyle}>
        <Text style={displayTextStyle}>{displayValue}</Text>
      </View>

      <View
        style={[
          displayContainerStyle,
          {margin: 0, alignItems: 'center', justifyContent: 'space-evenly'},
        ]}>
        <Ripple
          onPress={() => handleSystemPress('binary')}
          style={buttonColumnStyle('binary')}>
          <Text style={buttonColumnTextStyle}>BIN</Text>
          <Text style={buttonColumnTextStyle}>{convertedValues.bin}</Text>
        </Ripple>
        <Ripple
          onPress={() => handleSystemPress('octal')}
          style={buttonColumnStyle('octal')}>
          <Text style={buttonColumnTextStyle}>OCT</Text>
          <Text style={buttonColumnTextStyle}>{convertedValues.oct}</Text>
        </Ripple>
        <Ripple
          onPress={() => handleSystemPress('decimal')}
          style={buttonColumnStyle('decimal')}>
          <Text style={buttonColumnTextStyle}>DEC</Text>
          <Text style={buttonColumnTextStyle}>{convertedValues.dec}</Text>
        </Ripple>
        <Ripple
          onPress={() => handleSystemPress('hexa')}
          style={buttonColumnStyle('hexa')}>
          <Text style={buttonColumnTextStyle}>HEX</Text>
          <Text style={buttonColumnTextStyle}>
            {convertedValues.hex.toUpperCase()}
          </Text>
        </Ripple>
      </View>

      {/* Button Container */}
      <View style={buttonsContainerStyle}>
        {[
          {symbol: 'A', value: 'A'},
          {symbol: 'AND', value: 'AND'},
          {symbol: 'OR', value: 'OR'},
          {symbol: 'NOT', value: 'NOT'},
          {symbol: '⌫', value: 'Del', text: '#e67371'},
          {symbol: 'B', value: 'B'},
          {symbol: 'NAND', value: 'NAND'},
          {symbol: 'NOR', value: 'NOR'},
          {symbol: 'XOR', value: 'XOR'},
          {symbol: '/', value: '/'},
          {symbol: 'C', value: 'C'},
          {symbol: '7', value: '7'},
          {symbol: '8', value: '8'},
          {symbol: '9', value: '9'},
          {symbol: '*', value: '*'},
          {symbol: 'D', value: 'D'},
          {symbol: '4', value: '4'},
          {symbol: '5', value: '5'},
          {symbol: '6', value: '6'},
          {symbol: '-', value: '-'},
          {symbol: 'E', value: 'E'},
          {symbol: '1', value: '1'},
          {symbol: '2', value: '2'},
          {symbol: '3', value: '3'},
          {symbol: '+', value: '+'},
          {symbol: 'F', value: 'F'},
          {symbol: '0', value: '0'},
          {symbol: '=', value: '=', color: '#2b840c', text: '#fff'},
        ].map(button => (
          <Ripple
            rippleColor={theme.dark ? '#fff' : '#000'}
            key={button.value}
            style={buttonStyle(button.color)}
            onPress={() =>
              buttonEnabled(button.value) && handlePress(button.value)
            }
            disabled={!buttonEnabled(button.value)}>
            <Text
              style={[
                buttonEnabled(button.value)
                  ? buttonTextStyle(button.text)
                  : {opacity: 0.3},
              ]}>
              {button.symbol}
            </Text>
          </Ripple>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 10,
  },
  displayArea: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingRight: 10,
    padding: 10,
  },
  displayText: {
    fontSize: 36,
    padding: 0,
    margin: 0,
    color: '#000',
  },
  buttonColumn: {
    marginVertical: 10,
    width: '100%',
    padding: 10,
  },
  buttonColumnButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 5,
    padding: 5,
  },
  buttonColumnButtonSelected: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 5,
    borderLeftColor: 'blue',
    borderLeftWidth: 5,
    // borderRadius: 3,
    padding: 5,
  },
  button: {
    width: '19%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  buttonSelected: {
    width: '19%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    backgroundColor: '#bbb', // Selected button color
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    // color: '#fff',
  },
  buttonTextBlack: {
    textAlign: 'right',
    fontSize: 15,
    // color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#003F78',
    overflow: 'hidden',
  },
  resultText: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  buttonEnabled: {
    width: '19%', // approximately 100%/5 for 5 columns, with a bit off for margins
    height: 50, // or whatever height you want
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    // backgroundColor: '#003F78',
    borderRadius: 4,
  },
  buttonDisabled: {
    width: '19%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    backgroundColor: '#fff2', // Disabled button color
    borderRadius: 4,
  },
});

export default ProgrammerCalculatorScreen;
