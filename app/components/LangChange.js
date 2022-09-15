import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import String from '../language/LocalizedString';
import {useNavigation} from '@react-navigation/native';   
import { setslng } from '../screens/LanguageSetting/ChangeLangSave';
import RNRestart from 'react-native-restart'

export const LangChange = ({lngs, setlng}) => {
  const navigation = useNavigation();

  const [it, setit] = useState(false);
  const onChangeLanguage = (lng) => {
    if (lng ==='en') {
      setslng('en')
      String.setLanguage(lng);
      setlng(!lngs);
      // RNRestart.Restart()
      return 
    }
    if (lng ==='it') {
      setslng('it')
      String.setLanguage(lng);
      setlng(!lngs);
      // RNRestart.Restart()
      return
    }



  };
   
  return (
    <SafeAreaView style={{margin: 10}}>
      <Text style={{fontSize: 20, textAlign: 'center',marginTop:10}}>App Language</Text>
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
      </View>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  btns: {
    justifyContent: 'space-around',
  },
});
