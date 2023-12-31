import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import CalculatorScreen from './src/screens/Calculators/CalculatorScreen';
import SettingScreen from './src/screens/SettingScreen';
import DarkMode from './src/styles/DarkMode';
import {
  BlueTheme,
  RedTheme,
  GreenTheme,
  YellowTheme,
  PinkTheme,
  PurpleTheme,
  OrangeTheme,
  VioletTheme,
  MaroonTheme,
  GreyTheme,
  BrownTheme,
  WhiteTheme,
  LimeTheme,
  CrimsonTheme,
  OliveTheme,
  SilverTheme,
  AquaTheme,
  AquamarineTheme,
  TealTheme,
  BurgundyTheme,
  ScarletTheme,
  IndigoTheme,
  MagentaTheme,
  BeigeTheme,
  CharcoalTheme,
} from './src/screens/ColorMode';

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
import DataTransferRateConverterScreen from './src/screens/Converters/DataTransferRateConverterScreen';
import CurrencyConverterScreen from './src/screens/Converters/CurrencyConverterScreen';
import DateCalculatorScreen from './src/screens/Calculators/DateCalculatorScreen';
import ProgrammingCalculatorScreen from './src/screens/Calculators/ProgrammingCalculatorScreen';
import ScientificCalculatorScreen from './src/screens/Calculators/ScientificCalculatorScreen';
import SimpleInterestCalculator from './src/screens/Calculators/SimpleInterestCalculator';

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
          <MaterialCommunityIcons
            name="calculator-variant-outline"
            color={color}
            size={size}
          />
        )}
        activeTintColor="blue"
        activeBackgroundColor="red"
      />
      <DrawerItem
        label="Scientific Calculator"
        onPress={() => props.navigation.navigate('Scientific Calculator')}
        icon={({color, size}) => (
          <Ionicons name="calculator-outline" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Programming Calculator"
        onPress={() => props.navigation.navigate('Programming Calculator')}
        icon={({color, size}) => (
          <AntDesign name="codesquareo" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Date Calculator"
        onPress={() => props.navigation.navigate('Date Calculator')}
        icon={({color, size}) => (
          <AntDesign name="calendar" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Interest Calculator"
        onPress={() => props.navigation.navigate('Interest Calculator')}
        icon={({color, size}) => (
          <MaterialCommunityIcons
            name="bank-outline"
            color={color}
            size={size}
          />
        )}
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
        label="Angle"
        onPress={() => props.navigation.navigate('Angle')}
        icon={({color, size}) => (
          <MaterialCommunityIcons
            name="angle-acute"
            color={color}
            size={size}
          />
        )}
        activeTintColor="blue"
        activeBackgroundColor="red"
      />
      <DrawerItem
        label="Area"
        onPress={() => props.navigation.navigate('Area')}
        icon={({color, size}) => (
          <MaterialCommunityIcons name="floor-plan" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Currency"
        onPress={() => props.navigation.navigate('Currency')}
        icon={({color, size}) => (
          <MaterialCommunityIcons
            name="currency-inr"
            color={color}
            size={size}
          />
        )}
      />
      <DrawerItem
        label="Data"
        onPress={() => props.navigation.navigate('Data')}
        icon={({color, size}) => (
          <MaterialCommunityIcons
            name="usb-flash-drive-outline"
            color={color}
            size={size}
          />
        )}
      />
      <DrawerItem
        label="Data Transfer Rate"
        onPress={() => props.navigation.navigate('Data Transfer Rate')}
        icon={({color, size}) => (
          <AntDesign name="clouduploado" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Energy"
        onPress={() => props.navigation.navigate('Energy')}
        icon={({color, size}) => (
          <FontAwesome5 name="fire" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Frequency"
        onPress={() => props.navigation.navigate('Frequency')}
        icon={({color, size}) => (
          <MaterialCommunityIcons name="sine-wave" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Length"
        onPress={() => props.navigation.navigate('Length')}
        icon={({color, size}) => (
          <MaterialCommunityIcons
            name="tape-measure"
            color={color}
            size={size}
          />
        )}
      />
      <DrawerItem
        label="Power"
        onPress={() => props.navigation.navigate('Power')}
        icon={({color, size}) => (
          <Ionicons name="flash-outline" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Pressure"
        onPress={() => props.navigation.navigate('Pressure')}
        icon={({color, size}) => (
          <Ionicons name="thermometer-outline" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Speed"
        onPress={() => props.navigation.navigate('Speed')}
        icon={({color, size}) => (
          <Ionicons name="speedometer-outline" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Temperature"
        onPress={() => props.navigation.navigate('Temperature')}
        icon={({color, size}) => (
          <MaterialCommunityIcons
            name="temperature-celsius"
            color={color}
            size={size}
          />
        )}
      />
      <DrawerItem
        label="Time"
        onPress={() => props.navigation.navigate('Time')}
        icon={({color, size}) => (
          <Ionicons name="timer-outline" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Volume"
        onPress={() => props.navigation.navigate('Volume')}
        icon={({color, size}) => (
          <Ionicons name="cube-outline" color={color} size={size} />
        )}
      />

      <DrawerItem
        label="Weight And Mass"
        onPress={() => props.navigation.navigate('Weight And Mass')}
        icon={({color, size}) => (
          <MaterialCommunityIcons
            name="weight-kilogram"
            color={color}
            size={size}
          />
        )}
      />
      <View style={styles.divider} />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('SettingScreen')}
        icon={({color, size}) => (
          <AntDesign name="setting" color={color} size={size} />
        )}
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
      <Drawer.Screen
        name="Scientific Calculator"
        component={ScientificCalculatorScreen}
      />
      <Drawer.Screen
        name="Programming Calculator"
        component={ProgrammingCalculatorScreen}
      />
      <Drawer.Screen name="Date Calculator" component={DateCalculatorScreen} />

      <Drawer.Screen
        name="Interest Calculator"
        component={SimpleInterestCalculator}
      />

      <Drawer.Screen name="Angle" component={AngleConverterScreen} />
      <Drawer.Screen name="Area" component={AreaConverterScreen} />
      <Drawer.Screen name="Currency" component={CurrencyConverterScreen} />
      <Drawer.Screen name="Data" component={DataConverterScreen} />
      <Drawer.Screen
        name="Data Transfer Rate"
        component={DataTransferRateConverterScreen}
      />
      <Drawer.Screen name="Energy" component={EnergyConverterScreen} />
      <Drawer.Screen name="Frequency" component={FrequencyConverterScreen} />
      <Drawer.Screen name="Length" component={LengthConverterScreen} />
      <Drawer.Screen name="Power" component={PowerConverterScreen} />
      <Drawer.Screen name="Pressure" component={PressureConverterScreen} />
      <Drawer.Screen name="Speed" component={SpeedConverterScreen} />
      <Drawer.Screen
        name="Temperature"
        component={TemperatureConverterScreen}
      />
      <Drawer.Screen name="Time" component={TimeConverterScreen} />
      <Drawer.Screen name="Volume" component={VolumeConverterScreen} />
      <Drawer.Screen
        name="Weight And Mass"
        component={WeightAndMassConverterScreen}
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
      setTheme(WhiteTheme);
    } else if (mode === 'dark') {
      setTheme(DarkMode);
    } else if (mode === 'blue') {
      setTheme(BlueTheme);
    } else if (mode === 'red') {
      setTheme(RedTheme);
    } else if (mode === 'green') {
      setTheme(GreenTheme);
    } else if (mode === 'purple') {
      setTheme(PurpleTheme);
    } else if (mode === 'pink') {
      setTheme(PinkTheme);
    } else if (mode === 'yellow') {
      setTheme(YellowTheme);
    } else if (mode === 'orange') {
      setTheme(OrangeTheme);
    } else if (mode === 'violet') {
      setTheme(VioletTheme);
    } else if (mode === 'maroon') {
      setTheme(MaroonTheme);
    } else if (mode === 'grey') {
      setTheme(GreyTheme);
    } else if (mode === 'charcoal') {
      setTheme(CharcoalTheme);
    } else if (mode === 'beige') {
      setTheme(BeigeTheme);
    } else if (mode === 'magenta') {
      setTheme(MagentaTheme);
    } else if (mode === 'indigo') {
      setTheme(IndigoTheme);
    } else if (mode === 'scarlet') {
      setTheme(ScarletTheme);
    } else if (mode === 'burgundy') {
      setTheme(BurgundyTheme);
    } else if (mode === 'teal') {
      setTheme(TealTheme);
    } else if (mode === 'aquamarine') {
      setTheme(AquamarineTheme);
    } else if (mode === 'aqua') {
      setTheme(AquaTheme);
    } else if (mode === 'silver') {
      setTheme(SilverTheme);
    } else if (mode === 'olive') {
      setTheme(OliveTheme);
    } else if (mode === 'crimson') {
      setTheme(CrimsonTheme);
    } else if (mode === 'lime') {
      setTheme(LimeTheme);
    } else if (mode === 'white') {
      setTheme(WhiteTheme);
    } else if (mode === 'brown') {
      setTheme(BrownTheme);
    }
    await AsyncStorage.setItem('theme', mode);
  };

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme === 'dark') {
        setTheme(DarkMode);
      } else if (storedTheme === 'light') {
        setTheme(WhiteTheme);
      } else if (storedTheme === 'blue') {
        setTheme(BlueTheme);
      } else if (storedTheme === 'red') {
        setTheme(RedTheme);
      } else if (storedTheme === 'green') {
        setTheme(GreenTheme);
      } else if (storedTheme === 'purple') {
        setTheme(PurpleTheme);
      } else if (storedTheme === 'pink') {
        setTheme(PinkTheme);
      } else if (storedTheme === 'yellow') {
        setTheme(YellowTheme);
      } else if (storedTheme === 'orange') {
        setTheme(OrangeTheme);
      } else if (storedTheme === 'violet') {
        setTheme(VioletTheme);
      } else if (storedTheme === 'maroon') {
        setTheme(MaroonTheme);
      } else if (storedTheme === 'grey') {
        setTheme(GreyTheme);
      } else if (storedTheme === 'charcoal') {
        setTheme(CharcoalTheme);
      } else if (storedTheme === 'beige') {
        setTheme(BeigeTheme);
      } else if (storedTheme === 'magenta') {
        setTheme(MagentaTheme);
      } else if (storedTheme === 'indigo') {
        setTheme(IndigoTheme);
      } else if (storedTheme === 'scarlet') {
        setTheme(ScarletTheme);
      } else if (storedTheme === 'burgundy') {
        setTheme(BurgundyTheme);
      } else if (storedTheme === 'teal') {
        setTheme(TealTheme);
      } else if (storedTheme === 'aquamarine') {
        setTheme(AquamarineTheme);
      } else if (storedTheme === 'aqua') {
        setTheme(AquaTheme);
      } else if (storedTheme === 'silver') {
        setTheme(SilverTheme);
      } else if (storedTheme === 'olive') {
        setTheme(OliveTheme);
      } else if (storedTheme === 'crimson') {
        setTheme(CrimsonTheme);
      } else if (storedTheme === 'lime') {
        setTheme(LimeTheme);
      } else if (storedTheme === 'white') {
        setTheme(WhiteTheme);
      } else if (storedTheme === 'brown') {
        setTheme(BrownTheme);
      } else {
        setTheme(DefaultTheme);
      }
      setLoading(false); // set loading to false after theme is loaded
    };

    loadTheme();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'black',
        }}
      />
    );
  }

  // function getBarStyle(color: string) {
  //   const rgb = parseInt(color.slice(1), 16); // Convert color from hex to decimal
  //   const r = (rgb >> 16) & 255; // Extract red component
  //   const g = (rgb >> 8) & 255; // Extract green component
  //   const b = rgb & 255; // Extract blue component
  //   const brightness = (r * 299 + g * 587 + b * 114) / 1000; // Calculate color brightness
  //   return brightness < 128 ? 'light-content' : 'dark-content';
  // }

  // function getBarStyle(backgroundColor: string) {
  //   const rgb = parseInt(backgroundColor.slice(1), 16); // Convert color from hex to decimal
  //   const r = (rgb >> 16) & 255; // Extract red component
  //   const g = (rgb >> 8) & 255; // Extract green component
  //   const b = rgb & 255; // Extract blue component
  //   const brightness = (r * 299 + g * 587 + b * 114) / 1000; // Calculate color brightness
  //   return brightness < 128 ? 'light-content' : 'dark-content';
  // }

  function rgbToLab(r: number, g: number, b: number) {
    // Step 1: Convert RGB to sRGB
    r /= 255;
    g /= 255;
    b /= 255;

    // Step 2: Convert sRGB to XYZ
    const gammaCorrect = (value: number) =>
      value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);

    r = gammaCorrect(r);
    g = gammaCorrect(g);
    b = gammaCorrect(b);

    const x = 0.4124 * r + 0.3576 * g + 0.1805 * b;
    const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const z = 0.0193 * r + 0.1192 * g + 0.9505 * b;

    // Step 3: Normalize XYZ with D65 illuminant
    const xD65 = x / 0.95047;
    const yD65 = y;
    const zD65 = z / 1.08883;

    // Step 4: Convert XYZ to L*a*b*
    const convertXYZ = (value: number) =>
      value > 0.008856 ? Math.pow(value, 1 / 3) : value * 7.787 + 16 / 116;

    const L = 116 * convertXYZ(yD65) - 16;
    return L;
  }

  function getBarStyle(backgroundColor: string) {
    const rgb = parseInt(backgroundColor.slice(1), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;

    const L = rgbToLab(r, g, b);
    return L < 50 ? 'light-content' : 'dark-content';
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <StatusBar
        backgroundColor={theme.dark ? '#171717' : 'white'}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      /> */}

      {/* <StatusBar
        backgroundColor={theme.colors.card}
        barStyle={getBarStyle(theme.colors.text)}
      /> */}

      <StatusBar
        backgroundColor={theme.colors.card}
        barStyle={getBarStyle(theme.colors.card)} // Use background color to determine bar style
      />

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
