import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import CheckBox from '../../components/CheckBox';
import Label from '../../components/Label';
import CustomInput from '../../components/CustomInput';
import { add } from 'react-native-reanimated';
export default function CheckoutAddress({ address, setAddress }) {

  const hanndleChange = (name, value) => {

    setAddress({ ...address, [name]: value })

  }

  return (
    <View style={{ paddingVertical: scale(30) }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <CheckBox isChecked={true} />
        <View style={{ paddingLeft: scale(10) }}>
          <Label text="Billing address is the same as delivery address" style={{ fontSize: scale(15) , fontfamily : 'Bodoni MT' }} />
        </View>
      </View>

      <View style={{ paddingVertical: scale(10) }}>
        <CustomInput containerStyle={{ backgroundColor: 'transparent'  , fontfamily : 'Bodoni MT'}} name='street1' value={address?.street1} onChangeText={(v) => hanndleChange('street1', v)} label="Street 1" />
      </View>
      <View style={{ paddingVertical: scale(10) }}>
        <CustomInput containerStyle={{ backgroundColor: 'transparent' , fontfamily : 'Bodoni MT' }} name='street2' value={address?.street2} onChangeText={(v) => hanndleChange('street2', v)} label="Street 2" />
      </View>

      <View style={{ paddingVertical: scale(10) }}>
        <CustomInput containerStyle={{ backgroundColor: 'transparent' , fontfamily : 'Bodoni MT' }} name='city' value={address?.city} onChangeText={(v) => hanndleChange('city', v)} label="City" />
      </View>
      <View style={{ paddingVertical: scale(10) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontfamily : 'Bodoni MT' }}>
          <CustomInput containerStyle={{ backgroundColor: 'transparent' , fontfamily : 'Bodoni MT' }} name='state' value={address?.state} onChangeText={(v) => hanndleChange('state', v)} label="State" />
          <CustomInput containerStyle={{ backgroundColor: 'transparent' , fontfamily : 'Bodoni MT' }} name='country' value={address?.country} onChangeText={(v) => hanndleChange('country', v)} label="Country" />
        </View>
      </View>
    </View>
  );
}
