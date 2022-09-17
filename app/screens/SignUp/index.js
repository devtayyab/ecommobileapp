import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import { appColors, shadow } from '../../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import { AlertHelper } from '../../utils/AlertHelper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import writeData from '../../utils/writeData';
import ReduxWrapper from '../../utils/ReduxWrapper';
import String from '../../language/LocalizedString';
function index({ getProductsList$, loginUser$, navigation }) {
  const [userInfo, setUserInfo] = useState({});
  const onChnage = (name, text) => {
    setUserInfo({ ...userInfo, [name]: text });
  };

  const onSignUp = async () => {
    console.log(userInfo);
    const { email, password } = userInfo
    await auth().createUserWithEmailAndPassword(email.trim(), password).then(async (user) => {
      console.log(user)
      if (user?.user?.uid) {

        await AsyncStorage.setItem('user', JSON.stringify(user?.user))
        console.log('new user', user)


        //create new user and login
        await writeData('users', { email: user?.user?.email, name: user?.user.displayName ? user?.user?.displayName : userInfo?.displayName, uid: user?.user?.uid, photoURL: user?.user?.photoURL, providerId: user?.user?.providerId, profile: user?.additionalUserInfo?.profile ? user?.additionalUserInfo?.profile : user?.user?.metadata })
        AlertHelper.show("success", "Signup Success, Welcome to WeekEnd")
        navigation.navigate("Home")

        loginUser$({ email: user?.user?.email, name: user?.user.displayName ? user?.user?.displayName : userInfo?.displayName, uid: user?.user?.uid, photoURL: user?.user?.photoURL });


      } else {
        AlertHelper.show("error", "Signup Failed, Please Retry")
      }
    })

  };
  return (
    <Container isScrollable>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ marginTop: scale(20) }}>
        <Feather name={'chevron-left'} size={scale(25)} />
      </Pressable>
      <Text style={styles.appName}>{String.weekend}</Text>
      <View
        style={{
          marginTop: scale(10),
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
            fontFamily: 'serif'
          }}>
          <Label
            text={String.signup}
            style={{ fontSize: scale(30), fontWeight: '700', fontFamily: 'serif' }}
          />
        </View>
        <View style={{ paddingVertical: scale(15) }}>
          <Label
            text={String.toContinue}
            style={{
              fontSize: scale(16),
              fontFamily: 'serif',
              //fontWeight: '500',
              color: appColors.darkGray,
              fontFamily: 'serif'
            }}
          />
        </View>
        <View style={{ paddingVertical: scale(10) }}>
          <CustomInput
            onChangeText={(text) => onChnage('displayName', text)}
            label={String.name}
            placeholder="John"
          />
        </View>
        <View style={{ paddingVertical: scale(10) }}>
          <CustomInput
            onChangeText={(text) => onChnage('email', text)}
            keyboardType="email-address"
            label={String.email}
            placeholder="john@doe.com"
          />
        </View>
        <View style={{ paddingVertical: scale(10) }}>
          <CustomInput
            onChangeText={(text) => onChnage('password', text)}
            secureTextEntry
            label={String.password}
            placeholder={String.password}
          />
        </View>
        <CustomButton style={{ fontFamily: 'serif' }} onPress={onSignUp} label={String.signup} />
      </View>
    </Container>
  );
}
export default ReduxWrapper(index);

const styles = StyleSheet.create({
  appName: {
    textAlign: 'center',
    color: appColors.primary,
    fontSize: 30,
    marginVertical: 10,
    fontFamily : 'serif',
    fontWeight: 'bold'
  },
});