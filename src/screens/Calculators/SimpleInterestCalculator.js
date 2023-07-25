import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';
import Ripple from 'react-native-material-ripple'; // import Ripple

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interest, setInterest] = useState(0);
  const [compound, setCompound] = useState(false);
  const [compoundingPeriodsInput, setCompoundingPeriodsInput] = useState('');
  const [compoundingPeriodsPicker, setCompoundingPeriodsPicker] = useState(1);
  const [nominalRate, setNominalRate] = useState('');
  const [effectiveRate, setEffectiveRate] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [initialBalance, setInitialBalance] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);

   const theme = useTheme();

   const displayContainerStyle = {
     ...styles.container,
     backgroundColor: theme.dark ? theme.colors.buttonBackground : '#fff',
   };
   // Use colors based on the current theme
   const displayTextStyle = {
     ...styles.displayText,
     color: theme.colors.text,
     marginBottom:20,
  };
  
   const headerTextStyle = {
     ...styles.header,
     color: theme.colors.text,
    };
    
   const resultValueTextStyle = {
     ...styles.resultValue,
     color: theme.colors.text,
   };

   const buttonsContainerStyle = {
     ...styles.buttonsContainer,
     backgroundColor: theme.dark ? theme.colors.buttonBackground : '#fff',
   };

    
  const compoundingPeriods = compoundingPeriodsInput
    ? parseInt(compoundingPeriodsInput)
    : compoundingPeriodsPicker;

      useEffect(() => {
        if (principal === '') {
          setInitialBalance(0);
          console.log(principal);
        } else {
          setInitialBalance(principal);
        }
      }, [principal]);

  
  useEffect(() => {
    calculateInterest();
    convertInterestRate();
    calculateFutureValue();
    calculateRateOfReturn();
  }, [
    principal,
    rate,
    time,
    compound,
    compoundingPeriods,
    nominalRate,
    interest,
    futureValue,
  ]);



  const calculateInterest = () => {
    if (principal !== '' && rate !== '' && time !== '') {
      if (compound) {
        const compoundInterest =
          principal *
            Math.pow(
              1 + rate / (100 * compoundingPeriods),
              compoundingPeriods * time,
            ) -
          principal;

        setInterest(compoundInterest);
      } else {
        const simpleInterest = (principal * rate * time) / 100;
        setInterest(simpleInterest);
      }
    }
  };

  const convertInterestRate = () => {
    if (nominalRate !== '' && compoundingPeriods !== '') {
      const effectiveInterestRate =
        Math.pow(
          1 + nominalRate / (100 * compoundingPeriods),
          compoundingPeriods,
        ) - 1;
      setEffectiveRate(effectiveInterestRate * 100);
    }
  };

  const calculateFutureValue = () => {
    if (principal !== '' && rate !== '' && time !== '') {
      if (compound) {
        const futureValueCompound =
          principal *
          Math.pow(
            1 + rate / (100 * compoundingPeriods),
            compoundingPeriods * time,
          );
        setFutureValue(futureValueCompound);
      } else {
        const futureValueSimple = principal * (1 + (rate / 100) * time);
        setFutureValue(futureValueSimple);
      }
    }
  };

  const calculateRateOfReturn = () => {
    if (initialBalance !== '' && futureValue !== '') {
      const rateOfReturn = (interest / principal) * 100;
        setRateOfReturn(rateOfReturn);
    }
  };

    return (
      <ScrollView style={displayContainerStyle}>
        <View style={displayContainerStyle}>
          <Text style={headerTextStyle}>Simple & Compound Interest</Text>
          <Ripple
            rippleColor={theme.dark ? '#fff' : '#000'}
            style={{backgroundColor: '#e67371', padding: 10, marginBottom: 10}}
            onPress={() => setCompound(!compound)}>
            <Text style={styles.text}>
              {compound
                ? 'Switch to Simple Interest'
                : 'Switch to Compound Interest'}
            </Text>
          </Ripple>
          <TextInput
            style={[styles.input, displayTextStyle]}
            placeholderTextColor={theme.colors.text}
            placeholder="Principal"
            keyboardType="numeric"
            onChangeText={text => setPrincipal(text)}
            value={principal}
          />
          <TextInput
            style={[styles.input, displayTextStyle]}
            placeholderTextColor={theme.colors.text}
            placeholder="Rate (%)"
            keyboardType="numeric"
            onChangeText={text => setRate(text)}
            value={rate}
          />
          <TextInput
            style={[styles.input, displayTextStyle]}
            placeholderTextColor={theme.colors.text}
            placeholder="Time (years)"
            keyboardType="numeric"
            onChangeText={text => setTime(text)}
            value={time}
          />

          {compound && (
            <>
              <TextInput
                style={[styles.input, displayTextStyle]}
                placeholderTextColor={theme.colors.text}
                placeholder="Compounding periods per year"
                keyboardType="numeric"
                onChangeText={text => setCompoundingPeriodsInput(text)}
                value={compoundingPeriodsInput}
              />
              {!compoundingPeriodsInput && (
                <Picker
                  selectedValue={compoundingPeriodsPicker}
                  style={{color: theme.colors.text}} // Set color here
                  onValueChange={(itemValue, itemIndex) =>
                    setCompoundingPeriodsPicker(itemValue)
                  }>
                  <Picker.Item label="Yearly" value={1} />
                  <Picker.Item label="Half Yearly" value={2} />
                  <Picker.Item label="Quarterly" value={4} />
                  <Picker.Item label="Monthly" value={12} />
                  <Picker.Item label="Weekly" value={52} />
                  <Picker.Item label="Daily" value={365} />
                </Picker>
              )}
            </>
          )}
          <View style={styles.resultsContainer}>
            <View style={styles.resultItem}>
              <Text style={resultValueTextStyle}>Interest</Text>
              <Text style={styles.resultValue}>₹ {interest.toFixed(2)}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={resultValueTextStyle}>Future Value</Text>
              <Text style={styles.resultValue}>₹ {futureValue.toFixed(2)}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={resultValueTextStyle}>Initial Balance</Text>
              <Text style={styles.resultValue}>
                ₹ {principal === '' ? '0' : principal}
              </Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={resultValueTextStyle}>Rate of Return</Text>
              <Text style={styles.resultValue}>
                {principal === '' ? '0.00' : rateOfReturn.toFixed(2)}%
              </Text>
            </View>
          </View>
          <TextInput
            style={[styles.input, displayTextStyle]}
            placeholderTextColor={theme.colors.text}
            placeholder="Nominal rate (%)"
            keyboardType="numeric"
            onChangeText={text => setNominalRate(text)}
            value={nominalRate}
          />
          <TextInput
            style={[styles.input, displayTextStyle]}
            placeholderTextColor={theme.colors.text}
            placeholder="Compounding periods per year (for conversion)"
            keyboardType="numeric"
            onChangeText={text => setCompoundingPeriodsInput(text)}
            value={compoundingPeriodsInput}
          />
          {!compoundingPeriodsInput && (
            <Picker
              selectedValue={compoundingPeriodsPicker}
              style={{color: theme.colors.text}} // Set color here
              onValueChange={(itemValue, itemIndex) =>
                setCompoundingPeriodsPicker(itemValue)
              }>
              <Picker.Item label="Yearly" value={1} />
              <Picker.Item label="Half Yearly" value={2} />
              <Picker.Item label="Quarterly" value={4} />
              <Picker.Item label="Monthly" value={12} />
              <Picker.Item label="Weekly" value={52} />
              <Picker.Item label="Daily" value={365} />
            </Picker>
          )}
          <Text style={[resultValueTextStyle, {textAlign:'center', marginBottom:30}]}>
            Effective rate:{'\n'} {effectiveRate.toFixed(2)}%
          </Text>
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    },
    text: { color: '#fff', textAlign: 'center', fontSize: 15 },
  
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  result: {
    fontSize: 18,
    marginVertical: 10,
  },
  resultsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
      justifyContent: 'space-between',
    marginBottom:10,
  },
  resultItem: {
    width: '50%',
    padding: 10,
  },
  resultLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 20,
    color: '#2b840c', // change to the color you want
    fontWeight:'bold',
  },
});

export default SimpleInterestCalculator;
