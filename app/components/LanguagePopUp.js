import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from '../screens/Login/index';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import String from '../constants/lng/LocalizedString';








export const LanguagePopUp = () => {

const onChangeLanguage=(lng)=>{

    if (lng === 'en') {
        String.setLanguage(lng)
        return;
    }
    if (lng === 'hi') {
        String.setLanguage(lng)
        return;
    }
    if (lng === 'fr') {
        String.setLanguage(lng)
        return;
    }
}



return(
  <View>
    {/* <Text >{String.Login}</Text> */}
    
    <Text>{String.how}</Text>
    <Menu>
      <MenuTrigger text="Language" />
      <MenuOptions>
        <MenuOption onSelect={() => onChangeLanguage('hi')} text="Hindi" />
        <MenuOption onSelect={() => onChangeLanguage('fr')} text="Franch" />
        <MenuOption onSelect={() => onChangeLanguage('en')} text="English" />
      </MenuOptions>
    </Menu>
  </View>
)
};
