import {DarkTheme} from '@react-navigation/native';

const DarkMode = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#010101',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: '#171717',
    buttonBackground: '#171717',
    buttonText: 'rgb(229, 229, 231)',
  },
};

export default DarkMode