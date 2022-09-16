import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import {appColors, shadow} from '../../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import String from "../../language/LocalizedString"
export default function index({navigation}) {
  return (
    <Container isScrollable>
      <Pressable onPress={()=>navigation.goBack()} style={{marginTop: scale(30)}}>
        <Feather name={'chevron-left'} size={scale(25)} />
      </Pressable>
      <View
        style={{
          marginTop: scale(70),
          backgroundColor: appColors.white,
          ...shadow,
          padding: scale(15),
          borderRadius: scale(5),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Label
            text={String.verify}
            style={{fontSize: scale(30), fontWeight: '700' , fontFamily : 'serif'}}
          />
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text={String.pin}
            style={{
              fontSize: scale(16),
              //fontWeight: '500',
              color: appColors.darkGray,
              fontFamily : 'serif'
            }}
          />
        </View>
       
        <CustomButton label={String.continue} />
      </View>
    </Container>
  );
}
