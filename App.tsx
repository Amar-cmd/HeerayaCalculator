import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import CalculatorScreen from './src/screens/CalculatorScreen';
import SettingScreen from './src/screens/SettingScreen';
import DarkMode from './src/styles/DarkMode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import VolumeConverterScreen from './src/screens/Converters/VolumeConverterScreen';
import TemperatureConverterScreen from './src/screens/Converters/TemperatureConverterScreen';
import LengthConverterScreen from './src/screens/Converters/LengthConverterScreen';
import WeightAndMassConverterScreen from './src/screens/Converters/WeightAndMassConverterScreen';
import EnergyConverterScreen from './src/screens/Converters/EnergyConverterScreen';
import AreaConverterScreen from './src/screens/Converters/AreaConverterScreen';
import SpeedConverterScreen from './src/screens/Converters/SpeedConverterScreen';
import TimeConverterScreen from './src/screens/Converters/TimeConverterScreen';
import PowerConverterScreen from './src/screens/Converters/PowerConverterScreen';
import DataConverterScreen from './src/screens/Converters/DataConverterScreen';
import PressureConverterScreen from './src/screens/Converters/PressureConverterScreen';
import AngleConverterScreen from './src/screens/Converters/AngleConverterScreen';
import FrequencyConverterScreen from './src/screens/Converters/FrequencyConverterScreen';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const theme = useTheme(); // use the theme here
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{...styles.divider, borderBottomColor: theme.colors.border}}
      />
      <Text style={{...styles.heading, color: theme.colors.text}}>
        Calculator
      </Text>
      <View
        style={{...styles.divider, borderBottomColor: theme.colors.border}}
      />
      <DrawerItem
        label="Standard Calculator"
        onPress={() => props.navigation.navigate('Standard Calculator')}
        icon={({color, size}) => (
          <Icon name="calculator" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Scientific Calculator"
        onPress={() => props.navigation.navigate('Calculator')}
      />
      <DrawerItem
        label="Programming Calculator"
        onPress={() => props.navigation.navigate('Calculator')}
      />
      <DrawerItem
        label="Date Calculator"
        onPress={() => props.navigation.navigate('Calculator')}
      />
      <View
        style={{...styles.divider, borderBottomColor: theme.colors.border}}
      />
      <Text style={{...styles.heading, color: theme.colors.text}}>
        Converter
      </Text>
      <View
        style={{...styles.divider, borderBottomColor: theme.colors.border}}
      />

      <DrawerItem
        label="Currency"
        onPress={() => props.navigation.navigate('Time')}
      />
      <DrawerItem
        label="Volume"
        onPress={() => props.navigation.navigate('Volume')}
      />
      <DrawerItem
        label="Length"
        onPress={() => props.navigation.navigate('Length')}
      />
      <DrawerItem
        label="Weight And Mass"
        onPress={() => props.navigation.navigate('Weight And Mass')}
      />
      <DrawerItem
        label="Temperature"
        onPress={() => props.navigation.navigate('Temperature')}
      />
      <DrawerItem
        label="Energy"
        onPress={() => props.navigation.navigate('Energy')}
      />
      <DrawerItem
        label="Area"
        onPress={() => props.navigation.navigate('Area')}
      />
      <DrawerItem
        label="Speed"
        onPress={() => props.navigation.navigate('Speed')}
      />
      <DrawerItem
        label="Time"
        onPress={() => props.navigation.navigate('Time')}
      />
      <DrawerItem
        label="Power"
        onPress={() => props.navigation.navigate('Power')}
      />
      <DrawerItem
        label="Data"
        onPress={() => props.navigation.navigate('Data')}
      />
      <DrawerItem
        label="Pressure"
        onPress={() => props.navigation.navigate('Pressure')}
      />
      <DrawerItem
        label="Angle"
        onPress={() => props.navigation.navigate('Angle')}
      />
      <DrawerItem
        label="Frequency"
        onPress={() => props.navigation.navigate('Frequency')}
      />
      <View style={styles.divider} />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('SettingScreen')}
      />
      <View
        style={{...styles.divider, borderBottomColor: theme.colors.border}}
      />
    </DrawerContentScrollView>
  );
}

function MyDrawer({toggleTheme}: {toggleTheme: (mode: string) => void}) {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: theme.colors.text, // set header tint color based on theme
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Standard Calculator" component={CalculatorScreen} />
      <Drawer.Screen name="Volume" component={VolumeConverterScreen} />
      <Drawer.Screen name="Length" component={LengthConverterScreen} />
      <Drawer.Screen
        name="Weight And Mass"
        component={WeightAndMassConverterScreen}
      />
      <Drawer.Screen
        name="Temperature"
        component={TemperatureConverterScreen}
      />
      <Drawer.Screen name="Energy" component={EnergyConverterScreen} />
      <Drawer.Screen name="Area" component={AreaConverterScreen} />
      <Drawer.Screen name="Speed" component={SpeedConverterScreen} />
      <Drawer.Screen name="Time" component={TimeConverterScreen} />
      <Drawer.Screen name="Power" component={PowerConverterScreen} />
      <Drawer.Screen name="Data" component={DataConverterScreen} />
      <Drawer.Screen name="Pressure" component={PressureConverterScreen} />
      <Drawer.Screen name="Angle" component={AngleConverterScreen} />
      <Drawer.Screen
        name="Frequency"
        component={FrequencyConverterScreen}
      />
      <Drawer.Screen name="SettingScreen">
        {props => <SettingScreen {...props} toggleTheme={toggleTheme} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function App(): JSX.Element {
  const [theme, setTheme] = useState(DefaultTheme);
  const [loading, setLoading] = useState(true);
  const toggleTheme = async (mode: string) => {
    if (mode === 'light') {
      setTheme(DefaultTheme);
    } else if (mode === 'dark') {
      setTheme(DarkMode);
    }
    await AsyncStorage.setItem('theme', mode);
  };

useEffect(() => {
  const loadTheme = async () => {
    const storedTheme = await AsyncStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setTheme(DarkMode);
    } else {
      setTheme(DefaultTheme);
    }
    setLoading(false); // set loading to false after theme is loaded
  };

  loadTheme();
}, []);
  
if (loading) {
  return <ActivityIndicator size="large" style={{position:'absolute', top:0, bottom:0, left:0, right:0, backgroundColor:'black'}} />; // return ActivityIndicator when loading
}


  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer theme={theme}>
        <MyDrawer toggleTheme={toggleTheme} />
      </NavigationContainer>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
});

export default App;
