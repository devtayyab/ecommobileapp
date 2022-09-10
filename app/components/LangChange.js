import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import String from '../language/LocalizedString';






export const LangChange = ({lngs, setlng}) => {
  const [it, setit] = useState(false)
  const onChangeLanguage = (lng) => {
    String.setLanguage(lng)
    setlng(!lngs)
  }

  return (
    <View>
      {/* <Text >{String.Login}</Text> */}

      <Text>{String.how}</Text>
      <View style={styles.btns}>
        <Button onPress={() => onChangeLanguage('en')} title="English" />
        <Button onPress={() => onChangeLanguage('it')} title="Italian" />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({

  btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
