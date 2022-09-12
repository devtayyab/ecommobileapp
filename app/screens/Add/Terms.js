import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
export default function Terms(item) {
  const [checked, setChecked] = useState();
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginBottom:20}}>Terms And Conditions</Text>
        <Text>
          THE SELLER ASSUMES FULL LIABILITY FOR THE SALE OF THE OBJECT,
          GUARANTEEING ITS AUTHENTICITY ACCORDING TO THE TERMS OF LAW AND
          DECLINES THE OWNERS OF THE APP FROM ANY LIABILITY.
        </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <Button onClick={() => setChecked(true)} title="Accept" />
          <Button onClick={() => setChecked(false)} title="Denied" />
        </View>
      
    </View>
  );
  module.exports=checked
}
