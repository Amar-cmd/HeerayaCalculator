import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {useTheme} from '@react-navigation/native';
import Ripple from 'react-native-material-ripple'; // import Ripple

const CurrencyConverterScreen = () => {
  const [display, setDisplay] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedCurrency, setConvertedCurrency] = useState('0');
const [isInitialInput, setIsInitialInput] = useState(true);
const [initialLoad, setInitialLoad] = useState(true);

    const currencies = [
      {code: 'INR', name: 'Indian rupee'},
      {code: 'USD', name: 'US dollar'},
      {code: 'JPY', name: 'Japanese yen'},
      {code: 'BGN', name: 'Bulgarian lev'},
      {code: 'CZK', name: 'Czech koruna'},
      {code: 'DKK', name: 'Danish krone'},
      {code: 'GBP', name: 'Pound sterling'},
      {code: 'HUF', name: 'Hungarian forint'},
      {code: 'PLN', name: 'Polish zloty'},
      {code: 'RON', name: 'Romanian leu'},
      {code: 'SEK', name: 'Swedish krona'},
      {code: 'CHF', name: 'Swiss franc'},
      {code: 'ISK', name: 'Icelandic krona'},
      {code: 'NOK', name: 'Norwegian krone'},
      {code: 'TRY', name: 'Turkish lira'},
      {code: 'AUD', name: 'Australian dollar'},
      {code: 'BRL', name: 'Brazilian real'},
      {code: 'CAD', name: 'Canadian dollar'},
      {code: 'CNY', name: 'Chinese yuan renminbi'},
      {code: 'HKD', name: 'Hong Kong dollar'},
      {code: 'IDR', name: 'Indonesian rupiah'},
      {code: 'ILS', name: 'Israeli shekel'},
      {code: 'KRW', name: 'South Korean won'},
      {code: 'MXN', name: 'Mexican peso'},
      {code: 'MYR', name: 'Malaysian ringgit'},
      {code: 'NZD', name: 'New Zealand dollar'},
      {code: 'PHP', name: 'Philippine peso'},
      {code: 'SGD', name: 'Singapore dollar'},
      {code: 'THB', name: 'Thai baht'},
      {code: 'ZAR', name: 'South African rand'},
    ];

    const theme = useTheme();

   const displayContainerStyle = {
     ...styles.currencyContainer,
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
    

  // const onButtonPress = buttonValue => {
  //   if (buttonValue === 'AC') {
  //     setDisplay('1');
  //   } else if (buttonValue === 'Del') {
  //     setDisplay(display.length > 1 ? display.slice(0, -1) : '1');
  //   } else if (buttonValue === '.') {
  //     const currentNumber = display.split(/[\+\-\*\/]/).slice(-1)[0];
  //     if (!/\./.test(currentNumber)) {
  //       setDisplay(display + buttonValue);
  //     }
  //   } else {
  //     setDisplay((display === '1' ? '' : display) + buttonValue);
  //   }
  // };
  const onButtonPress = buttonValue => {
    if (buttonValue === 'AC') {
      setDisplay('1');
      setIsInitialInput(true);
    } else if (buttonValue === 'Del') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '1');
      setIsInitialInput(false);
    } else if (buttonValue === '.') {
      const currentNumber = display.split(/[\+\-\*\/]/).slice(-1)[0];
      if (!/\./.test(currentNumber)) {
        setDisplay(display + buttonValue);
      }
      setIsInitialInput(false);
    } else {
      setDisplay((isInitialInput ? '' : display) + buttonValue);
      setIsInitialInput(false);
    }
  };


  const convertCurrency = async () => {
    try {
      if (display === '0') {
        setConvertedCurrency('0');
      } else if (fromCurrency === toCurrency) {
        setConvertedCurrency(display);
      } else {
        const response = await axios.get(
          `https://api.frankfurter.app/latest?amount=${display}&from=${fromCurrency}&to=${toCurrency}`,
        );
        const data = response.data;
        setConvertedCurrency(data.rates[toCurrency].toFixed(4));
        setInitialLoad(false);

      }
    } catch (error) {
      console.error('Failed to convert currency:', error);
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [display, fromCurrency, toCurrency]);

  return (
    <View style={displayContainerStyle}>
      {initialLoad ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // The rest of your code...
        <>
          <View style={styles.currencyContainer}>
            <Picker
              selectedValue={fromCurrency}
              style={{...styles.picker, color: theme.colors.buttonText}}
              onValueChange={itemValue => setFromCurrency(itemValue)}>
              {currencies.map(currency => (
                <Picker.Item
                  key={currency.code}
                  label={`${currency.code} - ${currency.name}`}
                  value={currency.code}
                />
              ))}
            </Picker>
            <Text style={displayTextStyle}>{display}</Text>
          </View>

          <View style={styles.currencyContainer}>
            <Picker
              selectedValue={toCurrency}
              style={{...styles.picker, color: theme.colors.buttonText}}
              onValueChange={itemValue => setToCurrency(itemValue)}>
              {currencies.map(currency => (
                <Picker.Item
                  key={currency.code}
                  label={`${currency.code} - ${currency.name}`}
                  value={currency.code}
                />
              ))}
            </Picker>
            <Text style={displayTextStyle}>{convertedCurrency || '0'}</Text>
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
                <Text style={buttonTextStyle(button.text)}>
                  {button.symbol}
                </Text>
              </Ripple>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyContainer: {
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

export default CurrencyConverterScreen;
