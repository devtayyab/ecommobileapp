import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import String from '../../language/LocalizedString'
export default function Terms({navigation,items}) {
  const [checked, setChecked] = useState(Boolean);
  return (
    <View>
      <View >
        <Text style={{marginBottom:20}}>{String.terms}</Text>
        <Text>
          {String.condition}
        </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            bottom:0,
            marginTop: 30,
            // backgroundColor:"yellow"
          }}>
            <View></View>
            <View></View>
          <Button onPress={() => {
            setChecked(true)
            navigation.navigate('Add', checked)
            
          }
        } title={String.acept}
        
        />
          <Button onPress={() => {
            setChecked(false)
            navigation.navigate('Add', checked)
           }
            } title={String.deny} />
        </View>
      
    </View>
  );
}
