/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React ,{useEffect,useState}from 'react';
import MainStack from './app/routing/MainStack';
import {Provider} from 'react-redux';
import CustomButton from './app/components/CustomButton'
import {StatusBar} from 'react-native';
import storePre from './app/redux/store';
import DropdownAlert from 'react-native-dropdownalert';
import {AlertHelper} from './app/utils/AlertHelper';
import {PersistGate} from 'redux-persist/integration/react';
import TabNavigationStack from './app/routing/TabNavigationStack';
import {navigationTypeTabs} from './app.json';
import Feather from 'react-native-vector-icons/Feather'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { setlng,getlang } from './app/screens/LanguageSetting/ChangeLangSave';
 import String from './app/language/LocalizedString'
MaterialIcons.loadFont()
Ionicons.loadFont()
FontAwesome.loadFont() 
Feather.loadFont()
MaterialCommunityIcons.loadFont()

export default function App ()  {
  const {persistor, store} = storePre;
 useEffect(() => {
  return () => { 
    SelectedLang()
  }; 
 }, [])
  
 const SelectedLang=async()=>{
    const langdata=await getlang()
    if (!!langdata) {
      String.setLanguage(langdata)
    }
    console.log("selected language",langdata);
 } 

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {navigationTypeTabs ? <TabNavigationStack/> : <MainStack />} 
        <DropdownAlert
          defaultContainer={{
            padding: 8,
            paddingTop: StatusBar.currentHeight,
            flexDirection: 'row',
          }} 
          ref={(ref) => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
       
      </PersistGate>
    </Provider>
  );
};

// export default App;
