import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const DateCalculatorScreen = () => {
  const [selectedOption, setSelectedOption] = useState('Difference');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatepicker, setShowFromDatepicker] = useState(false);
  const [showToDatepicker, setShowToDatepicker] = useState(false);
  const [baseDate, setBaseDate] = useState(new Date());
  const [showBaseDatePicker, setShowBaseDatePicker] = useState(false);
  const [addSubtractOption, setAddSubtractOption] = useState('Add');
  const [numYears, setNumYears] = useState('0');
  const [numMonths, setNumMonths] = useState('0');
  const [numWeeks, setNumWeeks] = useState('0');
  const [numDays, setNumDays] = useState('0');

    const theme = useTheme();

    const displayContainerStyle = {
      ...styles.container,
      backgroundColor: theme.dark ? theme.colors.buttonBackground : '#fff',
  };
  
   const displayTextStyle = {
     ...styles.heading,
     color: theme.colors.text,
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
    
  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatepicker(false);
    setFromDate(currentDate);
  };

  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatepicker(false);
    setToDate(currentDate);
  };

  const onBaseDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || baseDate;
    setShowBaseDatePicker(false);
    setBaseDate(currentDate);
  };

  const calculateDateDifference = () => {
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(totalDays / 365);
    let remainingDays = totalDays % 365;

    const months = Math.floor(remainingDays / 30);
    remainingDays = remainingDays % 30;

    const weeks = Math.floor(remainingDays / 7);
    remainingDays = remainingDays % 7;

    const days = remainingDays;

    return {years, months, weeks, days};
  };

  const calculateAddSubtractDate = () => {
    let resultDate = new Date(baseDate);
    const totalDays =
      parseInt(numYears) * 365 +
      parseInt(numMonths) * 30 +
      parseInt(numWeeks) * 7 +
      parseInt(numDays);
    if (addSubtractOption === 'Add') {
      resultDate.setDate(resultDate.getDate() + totalDays);
    } else if (addSubtractOption === 'Subtract') {
      resultDate.setDate(resultDate.getDate() - totalDays);
    }
    return resultDate;
  };

  const difference = calculateDateDifference();
  const resultDate = calculateAddSubtractDate();

    return (
      <ScrollView style={displayContainerStyle}>
        <View style={displayContainerStyle}>
          <Text style={displayTextStyle}>Conversion Type:</Text>
          <View style={{borderWidth: 1, borderColor: '#fff', marginTop: 20}}>
            <Picker
              selectedValue={selectedOption}
              style={{color: theme.colors.text}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedOption(itemValue)
              }>
              <Picker.Item
                label="Difference between Dates"
                value="Difference"
              />
              <Picker.Item label="Add/Subtract Days" value="AddSubtract" />
            </Picker>
          </View>
          {selectedOption === 'Difference' && (
            <View style={styles.section}>
              <View style={styles.datePickersContainer}>
                <View style={styles.datePickerContainer}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    From
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#e67371',
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setShowFromDatepicker(true)}>
                    <Text style={{color: '#fff'}}>
                      {fromDate.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                  {showFromDatepicker && (
                    <DateTimePicker
                      value={fromDate}
                      mode="date"
                      display="default"
                      onChange={onFromDateChange}
                    />
                  )}
                </View>

                <View style={styles.datePickerContainer}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    To
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#e67371',
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setShowToDatepicker(true)}>
                    <Text style={{color: '#fff'}}>
                      {fromDate.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                  {showToDatepicker && (
                    <DateTimePicker
                      value={toDate}
                      mode="date"
                      display="default"
                      onChange={onToDateChange}
                    />
                  )}
                </View>
              </View>
              <View style={styles.resultContainer}>
                <View style={styles.row}>
                  <Text style={styles.resultText}>
                    Years:{'\n'}
                    {difference.years === 0
                      ? '0'
                      : `${difference.years > 0 ? `${difference.years}` : ''}`}
                  </Text>
                  <Text style={styles.resultText}>
                    Months:{'\n'}
                    {difference.months === 0
                      ? '0'
                      : `${
                          difference.months > 0 ? `${difference.months}` : ''
                        }`}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.resultText}>
                    Weeks:{'\n'}
                    {difference.weeks === 0
                      ? '0'
                      : `${difference.weeks > 0 ? `${difference.weeks}` : ''}`}
                  </Text>
                  <Text style={styles.resultText}>
                    Days:{'\n'}
                    {difference.days === 0
                      ? '0'
                      : `${difference.days > 0 ? `${difference.days}` : ''}`}
                  </Text>
                </View>
                <View style={styles.center}>
                  <Text style={styles.resultText}>
                    Total Days:{'\n'}
                    {difference.years === 0 &&
                    difference.months === 0 &&
                    difference.weeks === 0 &&
                    difference.days === 0
                      ? 'Same day'
                      : `${
                          difference.years * 365 +
                          difference.months * 30 +
                          difference.weeks * 7 +
                          difference.days
                        }`}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {selectedOption === 'AddSubtract' && (
            <View style={styles.section}>
              <TouchableOpacity onPress={() => setShowBaseDatePicker(true)}>
                <Text style={styles.selectBaseDate}>
                  Selected Base Date: {baseDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {showBaseDatePicker && (
                <DateTimePicker
                  value={baseDate}
                  mode="date"
                  display="default"
                  onChange={onBaseDateChange}
                />
              )}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={
                    addSubtractOption === 'Add'
                      ? styles.buttonSelected
                      : styles.button
                  }
                  onPress={() => setAddSubtractOption('Add')}>
                  <Text
                    style={
                      addSubtractOption === 'Add'
                        ? {color: '#fff', fontSize: 18}
                        : {color: '#2B840C', fontSize: 18}
                    }>
                    Add
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    addSubtractOption === 'Subtract'
                      ? styles.buttonSelected
                      : styles.button
                  }
                  onPress={() => setAddSubtractOption('Subtract')}>
                  <Text
                    style={
                      addSubtractOption === 'Subtract'
                        ? {color: '#fff', fontSize: 18}
                        : {color: '#2B840C', fontSize: 18}
                    }>
                    Subtract
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={theme.dark ? {color: '#fff'} : {color: '#000'}}>
                Number of Years: {numYears}
              </Text>
              <TextInput
                keyboardType="numeric"
                value={numYears}
                onChangeText={setNumYears}
                placeholder="0"
                // style={styles.input}
                style={theme.dark ? {color: '#fff'} : {color: '#000'}}
              />
              <Text style={theme.dark ? {color: '#fff'} : {color: '#000'}}>
                Number of Months: {numMonths}
              </Text>

              <TextInput
                keyboardType="numeric"
                value={numMonths}
                onChangeText={setNumMonths}
                placeholder="0"
                // style={styles.input}
                style={theme.dark ? {color: '#fff'} : {color: '#000'}}
              />
              <Text style={theme.dark ? {color: '#fff'} : {color: '#000'}}>
                Number of Weeks: {numWeeks}
              </Text>

              <TextInput
                keyboardType="numeric"
                value={numWeeks}
                onChangeText={setNumWeeks}
                placeholder="0"
                // style={styles.input}
                style={theme.dark ? {color: '#fff'} : {color: '#000'}}
              />
              <Text style={theme.dark ? {color: '#fff'} : {color: '#000'}}>
                Number of Days: {numDays}
              </Text>

              <TextInput
                keyboardType="numeric"
                value={numDays}
                onChangeText={setNumDays}
                placeholder="0"
                // style={styles.input}
                style={theme.dark ? {color: '#fff'} : {color: '#000'}}
              />

              <Text style={styles.resultText}>
                {numYears > 0 ? `${numYears} years, ` : ''}
                {numMonths > 0 ? `${numMonths} months, ` : ''}
                {numWeeks > 0 ? `${numWeeks} weeks, ` : ''}
                {numDays > 0 ? `${numDays} days, ` : ''}
                {'\n'}
                {resultDate.getDate().toString().padStart(2, '0')}/
                {(resultDate.getMonth() + 1).toString().padStart(2, '0')}/
                {resultDate.getFullYear()}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 100,
    marginVertical: 10,
    backgroundColor: '#eee',
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    paddingLeft: 10,
  },

  diffText: {
    fontSize: 20,
    textAlign: 'center',
  },
  datePickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePickerContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginVertical: 20,
  },
  selectBaseDate: {
    fontSize: 18,
    backgroundColor: '#e67371',
    padding: 10,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  baseDate: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth:1,
    borderColor: '#2B840C',
    marginHorizontal: 10,
    // backgroundColor: '#0008',
    color: '#2B840C',
  },
  buttonSelected: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: '#2B840C',
    color: '#fff',
  },
  row: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#2b840c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
export default DateCalculatorScreen;
