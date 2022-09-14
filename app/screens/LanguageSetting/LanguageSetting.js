import React,{useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import { LangChange } from '../../components/LangChange';
export default function LanguageSetting() {
  const [lngs, setlng] = useState(false);
 
  return (
    <View>
      <LangChange lngs={lngs} setlng={(lng) => setlng(lng)} />
      
      
    </View>
  );
}
