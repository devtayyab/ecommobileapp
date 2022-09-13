import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { appColors } from '../../utils/appColors';
import { paymentMethods } from '../../utils/MockData';
import CustomInput from '../../components/CustomInput';
import CheckBox from '../../components/CheckBox';
import Label from '../../components/Label';
import { color } from 'react-native-reanimated';
import functions from '@react-native-firebase/functions';
import String from '../../language/LocalizedString';
export default function CheckoutPayment({ cardinfo, setcardInfo }) {
  const [selectedMethod, setSelectedMethod] = useState("credit-card")
  const hanndleChange = (name, value) => {

    setcardInfo({ ...cardinfo, [name]: value })

  }

  useEffect(() => {
    functions()
      .httpsCallable('stripeCreateAccount')()
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      });
  }, []);

  const SquareCard = ({ item }) => {
    return (
      <Pressable onPress={() => setSelectedMethod(item)} style={{ width: scale(100), height: scale(80), backgroundColor: selectedMethod === item ? appColors.primary : appColors.white, borderRadius: scale(5), justifyContent: 'center', alignItems: 'center' }}>
        <Feather name={item} size={scale(25)} color={selectedMethod === item ? appColors.white : appColors.gray} />
      </Pressable>
    );
  };
  return (
    <View style={{ paddingVertical: scale(50) }}>
      <View style={{ flexDirection: 'row' }}>
        <FlatList showsHorizontalScrollIndicator={false} ItemSeparatorComponent={() => <View style={{ padding: scale(5) }} />} horizontal data={paymentMethods} renderItem={({ item, index }) => <SquareCard item={item} />} />

      </View>
      <View style={{ paddingVertical: scale(10) }}>
        <CustomInput containerStyle={{ backgroundColor: 'transparent' , fontFamily : 'BOD_R' }} value={cardinfo?.cardname} label={String.cardName} onChangeText={(v)=>hanndleChange('cardname' , v)} />
      </View>
      <View style={{ paddingVertical: scale(10) }}>
        <CustomInput containerStyle={{ backgroundColor: 'transparent' , fontFamily : 'BOD_R' }} value={cardinfo?.cardnumber} label={String.cardNo} onChangeText={(v)=>hanndleChange('cardnumber' , v)} IconRight={() => <Feather name="credit-card" color={appColors.primary} size={scale(20)} />} />
      </View>

      <View style={{ paddingVertical: scale(10) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <CustomInput containerStyle={{ backgroundColor: 'transparent' , fontFamily : 'BOD_R' }} value={cardinfo?.expirydate} label={String.expiry} onChangeText={(v)=>hanndleChange('expirydate' ,v)}/>
          <CustomInput containerStyle={{ backgroundColor: 'transparent' , fontFamily : 'BOD_R' }} value={cardinfo?.cvv} onChangeText={(v)=>hanndleChange('cvv' ,v)} label={String.cvv} />
        </View>
      </View>

      <View style={{ paddingVertical: scale(10), flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <CheckBox isChecked={true} />
        <View style={{ paddingLeft: scale(10) }}>
          <Label text={String.savCard} style={{ fontSize: scale(15) , fontFamily : 'BOD_R' }} />
        </View>
      </View>

    </View>
  );
}
