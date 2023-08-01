import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Platform,
  Alert,
  Clipboard,
  Modal,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import * as math from 'mathjs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 

const ScientificCalculatorScreen = () => {
  const [display, setDisplay] = useState('');
  const [mode, setMode] = useState(null); // null = default, 'trigonometry', 'functions'
  const [secondMode, setSecondMode] = useState(false);
  const [result, setResult] = useState('');
  const [parenthesesCount, setParenthesesCount] = useState(0);
  const [isDeg, setIsDeg] = useState(true); 
  const [resetDisplay, setResetDisplay] = useState(false);
  const [secondTrigoMode, setSecondTrigoMode] = useState(false); 
  const [hypMode, setHypMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
const [history, setHistory] = useState([]);

  
  const copyToClipboard = () => {
    Clipboard.setString(display);
  };

  const theme = useTheme();
  const displayContainerStyle = {
    ...styles.displayContainer,
    backgroundColor: theme.dark ? theme.colors.buttonBackground : '#fff',
  };
  const displayTextStyle = {
    ...styles.displayText,
    color: theme.colors.buttonText,
  };
  const resultTextStyle = {
    ...styles.resultText,
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
  const buttonTextStyle = (color, size) => ({
    ...styles.buttonText,
    color: color || theme.colors.buttonText,
  });

   const functionButtonStyle = {
     ...styles.functionButton,
     backgroundColor: theme.colors.card,
   };
   const functionButtonTextStyle = {
     ...styles.functionButtonText,
     color: theme.colors.text,
   };
   const trigoButtonStyle = {
     ...styles.upperContainerButton,
     backgroundColor: theme.colors.card,
   };
   const trigoButtonTextStyle = {
     ...styles.buttonText,
     color: theme.colors.text,
   };
  const modeButtons = [
    {
      symbol: '',
      value: 'trigonometry',
      text: '#e67371',
      iconName: 'math-sin',
    },
    {
      symbol: '',
      value: 'functions',
      text: '#e67371',
      iconName: 'function-variant',
    },
    {
      symbol: isDeg ? 'DEG' : 'RAD',
      value: 'deg',
      text: '#e67371',
    },
  ];

  const onDegreeRadianToggle = () => {
    setIsDeg(!isDeg);
    console.log(isDeg ? 'Degree mode' : 'Radian mode');
  };

  const TrigonometryButtons = () => {
    let buttons = [];

    if (secondTrigoMode && hypMode) {
      buttons = [
        {symbol: 'sinh⁻¹', value: 'asinh'},
        {symbol: 'cosh⁻¹', value: 'acosh'},
        {symbol: 'tanh⁻¹', value: 'atanh'},
        {symbol: 'coth⁻¹', value: 'acoth'},
        {symbol: 'sech⁻¹', value: 'asech'},
        {symbol: 'csch⁻¹', value: 'acsch'},
      ];
    } else if (secondTrigoMode) {
      buttons = [
        {symbol: 'sin⁻¹', value: 'asin'},
        {symbol: 'cos⁻¹', value: 'acos'},
        {symbol: 'tan⁻¹', value: 'atan'},
        {symbol: 'cot⁻¹', value: 'acot'},
        {symbol: 'sec⁻¹', value: 'asec'},
        {symbol: 'csc⁻¹', value: 'acsc'},
      ];
    } else if (hypMode) {
      buttons = [
        {symbol: 'sinh', value: 'sinh'},
        {symbol: 'cosh', value: 'cosh'},
        {symbol: 'tanh', value: 'tanh'},
        {symbol: 'coth', value: 'coth'},
        {symbol: 'sech', value: 'sech'},
        {symbol: 'csch', value: 'csch'},
      ];
    } else {
      buttons = [
        {symbol: 'sin', value: 'sin'},
        {symbol: 'cos', value: 'cos'},
        {symbol: 'tan', value: 'tan'},
        {symbol: 'cot', value: 'cot'},
        {symbol: 'sec', value: 'sec'},
        {symbol: 'csc', value: 'csc'},
      ];
    }

    return (
      <View style={styles.upperContainer}>
        <View style={styles.upperContainerRow}>
          <TouchableOpacity
            style={trigoButtonStyle}
            onPress={() => setSecondTrigoMode(!secondTrigoMode)}>
            <Text style={trigoButtonTextStyle}>
              {secondTrigoMode ? '1st' : '2nd'}
            </Text>
          </TouchableOpacity>
          {buttons.slice(0, 3).map(button => (
            <TouchableOpacity
              key={button.value}
              style={trigoButtonStyle}
              onPress={() => onButtonPress(button.value)}>
              <Text style={trigoButtonTextStyle}>{button.symbol}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.upperContainerRow}>
          <TouchableOpacity
            style={trigoButtonStyle}
            onPress={() => setHypMode(!hypMode)}>
            <Text style={trigoButtonTextStyle}>{hypMode ? 'hyp-' : 'hyp'}</Text>
          </TouchableOpacity>
          {buttons.slice(3, 7).map(button => (
            <TouchableOpacity
              key={button.value}
              style={trigoButtonStyle}
              onPress={() => onButtonPress(button.value)}>
              <Text style={trigoButtonTextStyle}>{button.symbol}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };



    const FunctionButtons = () => {
    const buttons = [
      {symbol: '⌈x⌉', value: 'ceil'},
    {symbol: ' ⌊x⌋', value: 'floor'},
    {symbol: '|x|', value: 'abs'},
    {symbol: '🎲', value: 'rand'},
    ];

    return (
      <View style={styles.upperContainer}>
        <View style={styles.upperContainerRow}>
          {buttons.slice(0, 2).map(button => (
            <TouchableOpacity
              key={button.value}
              style={trigoButtonStyle}
              onPress={() => onButtonPress(button.value)}>
              <Text style={trigoButtonTextStyle}>{button.symbol}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.upperContainerRow}>
          {buttons.slice(2, 4).map(button => (
            <TouchableOpacity
              key={button.value}
              style={trigoButtonStyle}
              onPress={() => onButtonPress(button.value)}>
              <Text style={trigoButtonTextStyle}>{button.symbol}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const buttons = secondMode
    ? [
        {symbol: '2nd', value: '2nd'},
        {symbol: 'π', value: 'π'},
        {symbol: 'e', value: 'e'},
        {symbol: 'C', value: 'C', text: '#e67371'},
        {symbol: '⌫', value: 'Del', text: '#e67371'},
        {symbol: 'x³', value: '^3'},
        {symbol: '1/x', value: '1/x'},
        {symbol: '%', value: '%'},
        {symbol: 'exp', value: 'exp'},
        {symbol: 'mod', value: 'mod'},
        {symbol: '∛', value: 'cbrt'},
        {symbol: '(', value: '('},
        {
          symbol: ')',
          value: ')',
          disabled: parenthesesCount === 0,
        },
        {symbol: 'n!', value: 'n!'},
        {symbol: '/', value: '/'},
        {symbol: 'ʸ√x', value: 'y root x'},
        {symbol: '7', value: '7'},
        {symbol: '8', value: '8'},
        {symbol: '9', value: '9'},
        {symbol: '*', value: '*'},
        {symbol: '2ˣ', value: '2^x'},
        {symbol: '4', value: '4'},
        {symbol: '5', value: '5'},
        {symbol: '6', value: '6'},
        {symbol: '-', value: '-'},
        {symbol: 'logᵧx', value: 'logx base y'},
        {symbol: '1', value: '1'},
        {symbol: '2', value: '2'},
        {symbol: '3', value: '3'},
        {symbol: '+', value: '+'},
        {symbol: 'eʸ', value: 'e^y'},
        {symbol: '+/-', value: '+/-'},
        {symbol: '0', value: '0'},
        {symbol: '.', value: '.'},
        {symbol: '=', value: '=', color: '#2b840c', text: '#fff'},
      ]
    : [
        {symbol: '2nd', value: '2nd'},
        {symbol: 'π', value: 'π'},
        {symbol: 'e', value: 'e'},
        {symbol: 'C', value: 'C', text: '#e67371'},
        {symbol: '⌫', value: 'Del', text: '#e67371'},
        {symbol: 'x²', value: '^2'},
        {symbol: '1/x', value: '1/x'},
        {symbol: '%', value: '%'},
        {symbol: 'exp', value: 'exp'},
        {symbol: 'mod', value: 'mod'},
        {symbol: '√', value: 'sqrt'},
        {symbol: '(', value: '('},
        {
          symbol: ')',
          value: ')',
          disabled: parenthesesCount === 0,
        },
        {symbol: 'n!', value: 'n!'},
        {symbol: '/', value: '/'},
        {symbol: 'xʸ', value: 'x^y'},
        {symbol: '7', value: '7'},
        {symbol: '8', value: '8'},
        {symbol: '9', value: '9'},
        {symbol: '*', value: '*'},
        {symbol: '10ˣ', value: '10^x'},
        {symbol: '4', value: '4'},
        {symbol: '5', value: '5'},
        {symbol: '6', value: '6'},
        {symbol: '-', value: '-'},
        {symbol: 'log', value: 'log'},
        {symbol: '1', value: '1'},
        {symbol: '2', value: '2'},
        {symbol: '3', value: '3'},
        {symbol: '+', value: '+'},
        {symbol: 'ln', value: 'ln'},
        {symbol: '+/-', value: '+/-'},
        {symbol: '0', value: '0'},
        {symbol: '.', value: '.'},
        {symbol: '=', value: '=', color: '#2b840c', text: '#fff'},
      ];

  const onButtonPress = buttonValue => {
    
    if (buttonValue === 'C') {
      setDisplay('');
      setResult('');
      setParenthesesCount(0);
    } else if (['+', '-', '*', '/'].includes(buttonValue)) {
    // If the last character in the display is an operator, replace it with the new operator
    if (/[+\-*/]$/.test(display)) {
      setDisplay(display.slice(0, -1) + buttonValue);
    } else {
      // If the last character is not an operator, append the new operator
      setDisplay(display + buttonValue);
    }
  } else if (buttonValue === '.') {
      // Check if current number already contains a dot
      const currentNumber = display.split(/[\+\-\*\/]/).slice(-1)[0];
      if (!/\./.test(currentNumber)) {
        // Check if display is empty or ends with an operator, if so prepend '0.'
        if (display === '' || /[\+\-\*\/]$/.test(display)) {
          setDisplay(display + '0' + buttonValue);
        } else {
          setDisplay(display + buttonValue);
        }
      }
    } else if (buttonValue === 'Del') {
      setDisplay(display.slice(0, -1));
      if (display.endsWith('(')) {
        setParenthesesCount(parenthesesCount - 1);
      } else if (display.endsWith(')')) {
        setParenthesesCount(parenthesesCount + 1);
      }
    } else if (buttonValue === 'exp') {
      // Insert 'e+' into the display
      setDisplay(display + 'e+');
    } else if (buttonValue === '%') {
      const lastNumber = parseFloat(display.split(/[\+\-\*\/]/).pop() || '0');
      const displayWithoutLastNumber = display.slice(
        0,
        display.lastIndexOf(lastNumber),
      );
      const percentage = lastNumber / 100;
      setDisplay(displayWithoutLastNumber + percentage.toString());
    } else if (buttonValue === '2nd') {
      setSecondMode(!secondMode);
    } else if (buttonValue === 'cbrt') {
      if (display !== '' && !/[+\-*/]$/.test(display)) {
        // If display ends with a number, append '*∛('
        if (/[\d)]$/.test(display)) {
          setDisplay(display + '*∛(');
        } else {
          // If display does not end with a number (i.e., ends with '(' or '∛('), append '∛('
          setDisplay(display + '∛(');
        }
      } else {
        // If display is empty or ends with an operator, append '∛('
        setDisplay(display + '∛(');
      }
      setParenthesesCount(parenthesesCount + 1);
    } else if (buttonValue === '2^x') {
      if (display !== '' && !/[+\-*/]$/.test(display)) {
        setDisplay(display + '*2^');
      } else {
        setDisplay(display + '2^');
      }
    } else if (buttonValue === '1/x') {
      // Check if the display is not empty and does not end with an operator
      if (display !== '' && !/[+\-*/]$/.test(display)) {
        // If true, there is a number before, so multiply it with the function
        setDisplay(display + '*1/');
        if (parenthesesCount > 0) setDisplay(display + '1/');
      } else {
        // If false, there is no number before, so just append the function
        setDisplay(display + '1/');
      }
    } else if (buttonValue === '10^x') {
      if (display !== '' && !/[+\-*/]$/.test(display)) {
        setDisplay(display + '*10^');
      } else {
        setDisplay(display + '10^');
      }
    } else if (buttonValue === 'x^y') {
      if (display !== '' && !/[+\-*/]$/.test(display)) {
        setDisplay(display + '^');
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Invalid input', ToastAndroid.SHORT);
          setResult('');
          setDisplay('Error!');
        } else {
          Alert.alert('Error', 'Invalid input');
        }
      }
    } else if (buttonValue === 'logx base y') {
      // Check if the display is empty or ends with an operator
      if (display === '' || /[+\-*/]$/.test(display)) {
        // If true, show an error
        if (Platform.OS === 'android') {
          ToastAndroid.show('Invalid input', ToastAndroid.SHORT);
        } else {
          Alert.alert('Error', 'Invalid input');
        }
      } else {
        // If false, there is a number before, so start the function
        setDisplay(display + ' log base ');
      }
    } else if (!isNaN(buttonValue)) {
      // Check if the button value is a number
      if (resetDisplay) {
        setDisplay(buttonValue);
        setResult('');
        setResetDisplay(false);
      } else {
        setDisplay(display + buttonValue);
      }
    } else if (buttonValue === 'y root x') {
      // Check if the display is not empty and does not end with an operator
      if (display !== '' && !/[+\-*/]$/.test(display)) {
        // If true, there is a number before, so multiply it with the function
        setDisplay(display + '^(1/');
      } else {
        // If false, there is no number before, so just append the function
        setDisplay(display + '^(1/');
        if (Platform.OS === 'android') {
          ToastAndroid.show('Invalid input', ToastAndroid.SHORT);
          setResult('');
          setDisplay('');
        } else {
          Alert.alert('Error', 'Invalid input');
        }
      }
      setParenthesesCount(parenthesesCount + 1);
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
    } else if (buttonValue === '=') {
      try {
        let expr = display.replace(/√/g, 'sqrt(');
        expr = expr.replace(/∛\(/g, 'cbrt('); // Replace "cbrt(" with JavaScript's cube root calculation
        expr = expr.replace(/ yroot /g, ', ');
        expr = expr.replace(/log\(/g, 'log10('); // Use the base-10 logarithm for 'log'
        expr = expr.replace(/ln\(/g, 'log('); // Use the natural logarithm for 'ln'

        // Handle "log base"
        let exprArray = expr.split(' log base ');
        if (exprArray.length === 2) {
          // If "log base" exists in the expression, compute the logarithm of the number (exprArray[0])
          // divided by the logarithm of the base (exprArray[1])
          expr = `log(${exprArray[0]}) / log(${exprArray[1]})`;
        }

        // Handle "e+" notation
        expr = expr.replace(/e\+/g, 'e');

        // If there are unmatched open parentheses, add closing parentheses at the end
        const openParentheses = (expr.match(/\(/g) || []).length;
        const closeParentheses = (expr.match(/\)/g) || []).length;
        const exprWithParentheses =
          expr + ')'.repeat(openParentheses - closeParentheses);

        // Evaluate the current expression using math.js
        const result = math.evaluate(exprWithParentheses);
        setResult(result);
        setDisplay(result.toString());
        setParenthesesCount(0);
        setResetDisplay(true);
                setHistory([
                  ...history,
                  {display, result: String(result)},
                ]);

      } catch (error) {
        // If the expression is invalid, show an error
        setDisplay(display + buttonValue);
        setResetDisplay(false);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Invalid expression', ToastAndroid.SHORT);
          setResult('');
          setDisplay('Error!');
        } else {
          Alert.alert('Error', 'Invalid expression');
        }
      }
    } else if (buttonValue === '(') {
      setDisplay(display + buttonValue);
      setParenthesesCount(parenthesesCount + 1);
    } else if (buttonValue === ')') {
      if (parenthesesCount > 0) {
        setDisplay(display + buttonValue);
        setParenthesesCount(parenthesesCount - 1);
      }
    } else if (buttonValue === 'log' || buttonValue === 'ln') {
      // Check if the display is not empty and does not end with an operator
      if (display !== '' && !/[+\-*/]$/.test(display)) {
        // If true, there is a number before, so multiply it with the function
        setDisplay(display + '*' + buttonValue + '(');
      } else {
        // If false, there is no number before, so just append the function
        setDisplay(display + buttonValue + '(');
      }
      setParenthesesCount(parenthesesCount + 1);
    } else if (buttonValue === 'e^y') {
      // Check if the display is not empty and does not end with an operator
      if (display !== '' && !/[+\-*/]$/.test(display)) {
        // If true, there is a number before, so multiply it with the function
        setDisplay(display + '*e^');
      } else {
        // If false, there is no number before, so just append the function
        setDisplay(display + 'e^');
      }
    }
    // else if (buttonValue === 'π') {
    //   setDisplay(display + Math.PI.toString());
    // } else if (buttonValue === 'e') {
    //   setDisplay(display + Math.E.toString());
    // }
    else if (buttonValue === 'e') {
      // If the last character in the display is 'e', replace it with the value of e
      if (/e$/.test(display)) {
        setDisplay(display.slice(0, -1) + Math.E.toString());
      } else if (/\d$/.test(display)) {
        // If the last character is a digit, append a multiplication sign and the value of e
        setDisplay(display + '*' + Math.E.toString());
      } else {
        // If the last character is not 'e' or a digit, append the value of e
        setDisplay(display + Math.E.toString());
      }
    } else if (buttonValue === 'π') {
      // If the last character in the display is 'π', replace it with the value of π
      if (/π$/.test(display)) {
        setDisplay(display.slice(0, -1) + Math.PI.toString());
      } else if (/\d$/.test(display)) {
        // If the last character is a digit, append a multiplication sign and the value of π
        setDisplay(display + '*' + Math.PI.toString());
      } else {
        // If the last character is not 'π' or a digit, append the value of π
        setDisplay(display + Math.PI.toString());
      }
    } else if (buttonValue === 'mod') {
      setDisplay(display + ' mod ');
    } else if (buttonValue === '%') {
      const lastNumber = parseFloat(display.split(/[\+\-\*\/]/).pop() || '0');
      const displayWithoutLastNumber = display.slice(
        0,
        display.lastIndexOf(lastNumber),
      );
      const percentage = lastNumber / 100;
      setDisplay(displayWithoutLastNumber + percentage.toString());
      // } else if (buttonValue === 'n!') {
      //   try {
      //     const num = parseFloat(display);
      //     if (isNaN(num)) {
      //       throw new Error('Invalid input');
      //     }
      //     const result = math.factorial(num);
      //     setResult(result);
      //     setDisplay(result.toString());
      //   } catch (error) {
      //     if (Platform.OS === 'android') {
      //       ToastAndroid.show('Invalid input', ToastAndroid.SHORT);
      //       setResult('');
      //       setDisplay('Error!');
      //     } else {
      //       Alert.alert('Error', 'Invalid input');
      //     }
      //   }
      // }
    } else if (buttonValue === 'n!') {
      try {
        // Split the display string into an array of numbers and operators
        let displayArray = display.split(/([+\-*/])/).filter(Boolean);

        // Get the last number in the array (the number to factorialize)
        let lastNumber = displayArray.pop();

        // Check if the last number is a valid number
        if (isNaN(lastNumber)) {
          throw new Error('Invalid input');
        }

        // Calculate the factorial of the last number
        let factorial = math.factorial(parseFloat(lastNumber));

        // Push the factorial back onto the array
        displayArray.push(factorial.toString());

        // Join the array back into a string and set the display
        const newDisplay = displayArray.join('');
        setDisplay(newDisplay);
        setResult(newDisplay);
        setResetDisplay(true);
        // setHistory([...history, {display, result: String(newDisplay)}]);
        setHistory([
          ...history,
          {display: display + '!', result: String(newDisplay)},
        ]);

      } catch (error) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Invalid input', ToastAndroid.SHORT);
          setResult('');
          setDisplay('Error!');
        } else {
          Alert.alert('Error', 'Invalid input');
        }
      }
    }  else if (buttonValue === 'sqrt') {
      setDisplay(display + '√(');
      setParenthesesCount(parenthesesCount + 1);
    } else if (
      buttonValue === 'sin' ||
      buttonValue === 'cos' ||
      buttonValue === 'tan' ||
      buttonValue === 'cot' ||
      buttonValue === 'sec' ||
      buttonValue === 'csc' ||
      buttonValue === 'sinh' ||
      buttonValue === 'cosh' ||
      buttonValue === 'tanh' ||
      buttonValue === 'coth' ||
      buttonValue === 'sech' ||
      buttonValue === 'csch' ||
      buttonValue === 'asin' ||
      buttonValue === 'acos' ||
      buttonValue === 'atan' ||
      buttonValue === 'acot' ||
      buttonValue === 'asec' ||
      buttonValue === 'acsc' ||
      buttonValue === 'asinh' ||
      buttonValue === 'acosh' ||
      buttonValue === 'atanh' ||
      buttonValue === 'acoth' ||
      buttonValue === 'asech' ||
      buttonValue === 'acsch'
    ) {
      try {
        // Check if the display is not empty and does not end with an operator
        if (
          [
            'sin',
            'cos',
            'tan',
            'cot',
            'sec',
            'csc',
            'sinh',
            'cosh',
            'tanh',
            'coth',
            'sech',
            'csch',
            'asin',
            'acos',
            'atan',
            'acot',
            'asec',
            'acsc',
            'asinh',
            'acosh',
            'atanh',
            'acoth',
            'asech',
            'acsch',
          ].includes(buttonValue)
        ) {
          const lastNumber = parseFloat(
            display.split(/[\+\-\*\/]/).pop() || '0',
          );
          const displayWithoutLastNumber = display.slice(
            0,
            display.lastIndexOf(lastNumber),
          );
          let result = 0;
          let inputValue;
          let radianValue = isDeg ? (lastNumber * Math.PI) / 180 : lastNumber; // convert to radian if isDeg is true
          inputValue = lastNumber || 0;

          if (
            (buttonValue === 'acos' ||
              buttonValue === 'asin' ||
              buttonValue === 'atanh' ||
              buttonValue === 'acosh') &&
            (inputValue < -1 || inputValue > 1)
          ) {
            setResult('');
            setDisplay('Error: Out of domain');
            return;
          }
          switch (buttonValue) {
            case 'sin':
              result = Math.sin(radianValue);
              break;
            case 'cos':
              result = Math.cos(radianValue);
              break;
            case 'tan':
              result = Math.tan(radianValue);
              break;
            case 'cot':
              result = 1 / Math.tan(radianValue);
              break;
            case 'sec':
              result = 1 / Math.cos(radianValue);
              break;
            case 'csc':
              result = 1 / Math.sin(radianValue);
              break;
            case 'sinh':
              result = Math.sinh(lastNumber);
              break;
            case 'cosh':
              result = Math.cosh(lastNumber);
              break;
            case 'tanh':
              result = Math.tanh(lastNumber);
              break;
            case 'coth':
              result = Math.cosh(lastNumber || 0) / Math.sinh(lastNumber || 0); // correct formula for coth
              break;
            case 'sech':
              result = 1 / Math.cosh(lastNumber || 0); // correct formula for sech
              break;
            case 'csch':
              result = 1 / Math.sinh(lastNumber || 0); // correct formula for csch
              break;
            case 'asin':
              result = isDeg
                ? (Math.asin(inputValue) * 180) / Math.PI
                : Math.asin(inputValue); // convert to degree if isDeg is true
              break;
            case 'acos':
              result = isDeg
                ? (Math.acos(inputValue) * 180) / Math.PI
                : Math.acos(inputValue); // convert to degree if isDeg is true
              break;
            case 'atan':
              result = isDeg
                ? (Math.atan(inputValue) * 180) / Math.PI
                : Math.atan(inputValue); // convert to degree if isDeg is true
              break;
            case 'acot':
              result = isDeg
                ? (Math.atan(1 / inputValue) * 180) / Math.PI
                : Math.atan(1 / inputValue);
              break;
            case 'asec':
              result = isDeg
                ? (Math.acos(1 / inputValue) * 180) / Math.PI
                : Math.acos(1 / inputValue);
              break;
            case 'acsc':
              result = isDeg
                ? (Math.asin(1 / inputValue) * 180) / Math.PI
                : Math.asin(1 / inputValue);
              break;
            case 'asinh':
              result = isDeg
                ? (Math.asinh(inputValue) * 180) / Math.PI
                : Math.asinh(inputValue);
              break;
            case 'acosh':
              result = isDeg
                ? (Math.acosh(inputValue) * 180) / Math.PI
                : Math.acosh(inputValue);
              break;
            case 'atanh':
              result = isDeg
                ? (Math.atanh(inputValue) * 180) / Math.PI
                : Math.atanh(inputValue);
              break;
            case 'acoth':
              result = isDeg
                ? (Math.atanh(1 / inputValue) * 180) / Math.PI
                : Math.atanh(1 / inputValue);
              break;
            case 'asech':
              result = isDeg
                ? (Math.acosh(1 / inputValue) * 180) / Math.PI
                : Math.acosh(1 / inputValue);
              break;
            case 'acsch':
              result = isDeg
                ? (Math.asinh(1 / inputValue) * 180) / Math.PI
                : Math.asinh(1 / inputValue);
              break;

            default:
              break;
          }

          setDisplay(displayWithoutLastNumber + result.toString());
          setResult(result.toString());
        } else {
          // If the display is empty or ends with an operator, show an error
          if (Platform.OS === 'android') {
            ToastAndroid.show('Invalid input', ToastAndroid.SHORT);
            setResult('');
            setDisplay('Error!');
          } else {
            Alert.alert('Error', 'Invalid input');
          }
        }
      } catch (error) {
        // If an error occurs (e.g., if the input is not a number), show an error
        if (Platform.OS === 'android') {
          ToastAndroid.show('Invalid input', ToastAndroid.SHORT);
          setResult('');
          setDisplay('Error!');
        } else {
          Alert.alert('Error', 'Invalid input');
        }
      }
    } else if (
      buttonValue === 'ceil' ||
      buttonValue === 'floor' ||
      buttonValue === 'abs'
    ) {
      if (display !== '') {
        let result = Math[buttonValue](parseFloat(display));
        setDisplay(result.toString());
        setResult(result.toString());
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Enter a number first', ToastAndroid.SHORT);
        } else {
          Alert.alert('Error', 'Enter a number first');
        }
      }
    }
    // Rand function
    else if (buttonValue === 'rand') {
      let rand = Math.random();
      setDisplay(rand.toString());
      setResult(rand.toString());
    } else {
      setDisplay(display + buttonValue);
    }
  };

  useEffect(() => {
    if (
      isDeg &&
      [
        'sin',
        'cos',
        'tan',
        'cot',
        'sec',
        'csc',
        'sinh',
        'cosh',
        'tanh',
        'coth',
        'sech',
        'csch',
        'asin',
        'acos',
        'atan',
        'acot',
        'asec',
        'acsc',
        'asinh',
        'acosh',
        'atanh',
        'acoth',
        'asech',
        'acsch',
      ].some(func => display.startsWith(func))
    ) {
      // If we're in degree mode and the display starts with a trigonometric function
      // First get the name of the function and the argument
      const funcName = display.slice(0, 3);
      const arg = display.slice(4, -1);

      // Then calculate the result in radians
      const resultInRadians = math.evaluate(display);

      // Convert the argument to degrees
      const argInDegrees = math.evaluate(arg) * (180 / Math.PI);

      // Then evaluate the function again with the argument in degrees
      const resultInDegrees = math.evaluate(`${funcName}(${argInDegrees})`);

      // If the results are not equal, update the display to use degrees
      if (resultInRadians !== resultInDegrees) {
        setDisplay(`${funcName}(${argInDegrees})`);
      }
    }
  }, [display, isDeg]);

  useEffect(() => {
    try {
      // Prepare the expression
      let expr = display.replace(/√/g, 'sqrt(');
      expr = expr.replace(/∛\(/g, 'cbrt(');
      expr = expr.replace(/ yroot /g, ', ');
      expr = expr.replace(/log\(/g, 'log10(');
      expr = expr.replace(/ln\(/g, 'log(');

      // If there are unmatched open parentheses, add closing parentheses at the end
      const openParentheses = (expr.match(/\(/g) || []).length;
      const closeParentheses = (expr.match(/\)/g) || []).length;
      const exprWithParentheses =
        expr + ')'.repeat(openParentheses - closeParentheses);

      // Evaluate the current expression using math.js
      const tempResult = math.evaluate(exprWithParentheses);
      setResult(tempResult);
    } catch (error) {
      // If the expression is invalid, do nothing
    }
  }, [display]);

  const onModeButtonPress = modeValue => {
    if (mode === modeValue) {
      setMode(null);
    } else {
      setMode(modeValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={displayContainerStyle}>
        <Text style={displayTextStyle}>{display}</Text>
        <Text style={resultTextStyle}>{result}</Text>

        <View
          style={{
            position: 'absolute',
            left: 20,
            bottom: '10%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 70, // adjust this as needed
            zIndex: 1000,
          }}>
          <TouchableOpacity onPress={copyToClipboard}>
            <Feather
              name="copy"
              size={20}
              color={theme.dark ? '#555' : '#000'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Feather
              name="clock"
              size={20}
              color={theme.dark ? '#555' : '#000'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.modeButtonsContainer}>
        {modeButtons.map(button => (
          <TouchableOpacity
            key={button.value}
            style={[buttonStyle(button.color), styles.modeButton]}
            onPress={() =>
              button.value === 'deg'
                ? onDegreeRadianToggle()
                : onModeButtonPress(button.value)
            }>
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons
                name={button.iconName}
                size={30}
                color="#e67371"
              />

              <Text style={buttonTextStyle(button.text)}>{button.symbol}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {mode === 'trigonometry' && <TrigonometryButtons />}
      {mode === 'functions' && <FunctionButtons />}

      <View style={buttonsContainerStyle}>
        {buttons.map(button => (
          <TouchableOpacity
            key={button.value}
            style={buttonStyle(button.color)}
            onPress={() => onButtonPress(button.value)}
            disabled={button.disabled}>
            <Text style={buttonTextStyle(button.text)}>
              {button.symbol}
              {button.symbol === '(' && (
                <Text style={{fontSize: 10, bottom: -2}}>
                  {parenthesesCount}
                </Text>
              )}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={styles.eraseButton}
                onPress={() => setHistory([])}>
                <FontAwesome5 name="eraser" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {history.map((item, index) => (
                <View key={index}>
                  <ScrollView horizontal>
                    <Text style={styles.modalText}>{item.display}</Text>
                  </ScrollView>
                  <Text style={styles.modalResult}>{item.result}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  modeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
  },
  trigonometryButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: '50%',
  },

  modeButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '20%',
    height: '14.28571%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  resultText: {
    color: 'gray',
    fontSize: 20,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  upperContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  upperContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upperContainerButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 5,
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '60%',
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    // position: 'absolute',
    // top: 10,
    // right: 10,
    padding: 10, // added padding
    // backgroundColor: 'red',
  },

  marginBar: {
    width: '100%',
    height: 2,
    backgroundColor: 'gray',
    marginTop: 10,
  },
  modalText: {
    fontSize: 25,
    width: '100%',
    marginLeft: 10,
    color: 'black',
  },
  modalResult: {
    fontSize: 18,
    color: 'grey',
    marginLeft: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default ScientificCalculatorScreen;
