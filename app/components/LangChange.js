import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import String from '../language/LocalizedString';
import {useNavigation} from '@react-navigation/native';   
import { setslng } from '../screens/LanguageSetting/ChangeLangSave';
import { Picker} from 'react-native-form-component';
import RNRestart from 'react-native-restart'

export const LangChange = ({lngs, setlng}) => {
  const navigation = useNavigation();
 useEffect(() => {
    // language() 
 }, [])
  const [it, setit] = useState(false);
  // const language =(lng)=>{
  //     // setslng(lng)
  //     RNRestart.Restart()
  //   String.setLanguage(lng);
  //   setlng(!lngs);
  // }
  const onChangeLanguage = (lng) => {
    if (lng ==='en') {
      // RNRestart.Restart()
      setslng('en')
      String.setLanguage(lng);
      setlng(!lngs);
      return 
    }
    if (lng ==='it') {
      // RNRestart.Restart()
      setslng('it')
      String.setLanguage(lng);
      setlng(!lngs);
      return
    }
  };
   
  return (
    <SafeAreaView style={{margin: 10}}>
      <Picker
            items={[
              {label: 'English', value: 'en'},
              {label: 'Italian', value: 'it'},
            ]}
            placeholder='choose language'
            isRequired
            selectedValue={lngs}
            onSelection={(item) => {onChangeLanguage(item.value);}}
            />
      {/* <Text style={{fontSize: 20, textAlign: 'center',marginTop:10}}>App Language</Text>
      <View style={styles.btns}>
        <CustomButton
          onPress={() => {
            onChangeLanguage('en');
            navigation.goBack();
          }}
          label="English"
        />
        <CustomButton
          onPress={() => {
            onChangeLanguage('it');
            navigation.goBack();
          }}
          label="Italian" 
        />  
      </View> */}
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  btns: {
    justifyContent: 'space-around',
  },
});
