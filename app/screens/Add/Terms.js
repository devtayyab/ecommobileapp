import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import String from '../../language/LocalizedString'
import CustomButton from '../../components/CustomButton/index'
import { appColors } from '../../utils/appColors'

export default function Terms({navigation,items}) {
  const [flag, setflag] = useState(false);
  return (
    <View>
      <View >
        <Text style={{marginBottom:20,fontSize:30,color:appColors.primary}}>{String.terms}</Text>
        <Text style={{}}>
          {String.condition}
        </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            bottom:0,
            marginTop: 30,
          }}>
            
          <CustomButton
          label={String.goBack}
           onPress={() => {
            setflag(true)
            navigation.navigate('Add', {flag})
            
          }
        }
        
        />
        
        </View>
      {console.log(flag)}
    </View>
  );
}
