import React, { useState } from 'react';
import { View, Text, Pressable, Platform , StyleSheet,} from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import { appColors, shadow } from '../../utils/appColors';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken, Settings } from 'react-native-fbsdk-next';
import { AlertHelper } from '../../utils/AlertHelper';
import { CommonActions } from '@react-navigation/native';
import String from '../../language/LocalizedString';
import googleLogin from '../../services/googleLogin';
import writeData from '../../utils/writeData';
import ReduxWrapper from '../../utils/ReduxWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '814196118506-ru27brd2ej6r0m9dd0d6isoir2s7mqr7.apps.googleusercontent.com',
})
function index({ getProductsList$, loginUser$, navigation }) {
  const [credentials, setCredentials] = useState({});
  const [isloading, setisloading] = useState(false)
  const [lngs, setlng] = useState(false)
  const onGoogleLogin = async () => {


    try {

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      console.log(idToken)
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential)
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential).then(async (data) => {
        await AsyncStorage.setItem('user', JSON.stringify(data?.user))


        if (data?.additionalUserInfo?.isNewUser) {

          //create new user and login
          await writeData('users', { email: data?.user?.email, name: data?.user.displayName, uid: data?.user?.uid, photoURL: data?.user?.photoURL, providerId: data.user?.providerId, profile: data?.additionalUserInfo?.profile })
        }
        getProductsList$()
        loginUser$({ email: data?.user?.email, name: data?.user.displayName, uid: data?.user?.uid, photoURL: data?.user?.photoURL });

      })


    } catch (error) {
      console.log(error)
    }
  }


  const onFacebookLogin = async () => {

    try {
      Settings.setAppID('415356417129010');
      LoginManager.setLoginBehavior('native_only');

      const result = await LoginManager.logInWithPermissions(['public_profile', 'email', "user_friends"])
      console.log(result)
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      console.log("Successfully Login with Facebook:", data);

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(facebookCredential).then(
        async (data) => {
          await AsyncStorage.setItem('user', JSON.stringify(data?.user))
          console.log(data)

          if (data?.additionalUserInfo?.isNewUser) {

            //create new user and login
            await writeData('users', { email: data?.user?.email, name: data?.user.displayName, uid: data?.user?.uid, photoURL: data?.user?.photoURL, providerId: data.user?.providerId, profile: data?.additionalUserInfo?.profile })
          }
          getProductsList$()
          loginUser$({ email: data?.user?.email, name: data?.user.displayName, uid: data?.user?.uid, photoURL: data?.user?.photoURL });

        })

    } catch (error) {

      console.log(error)

    }

  }

  const onLogin = async () => {
    //auth().signOut()
    const { email, password } = credentials;

    try {
      if (email && password) {
        setisloading(true)
        const { user, additionalUserInfo } = await auth().signInWithEmailAndPassword(
          email?.toLowerCase(),
          password?.toLowerCase(),
        );
        console.log(user);
        await AsyncStorage.setItem('user', JSON.stringify(user))
        if (user?.uid) {
          if (additionalUserInfo?.isNewUser) {
            const { providerId, profile } = additionalUserInfo
            //create new user and login
            await writeData('users', { email: user?.email, name: user?.displayName, uid: user?.uid, photoURL: user?.photoURL, providerId, profile })
          }
          loginUser$({ email: user?.email, name: user?.displayName ? user?.displayName : "User", uid: user?.uid });
          getProductsList$()
          AlertHelper.show('success', 'Welcome to WeekEnd');
          navigation.navigate('Home');
        }
      } else {
        setisloading(false)
        AlertHelper.show('error', 'Email and password is required!!');
      }

    } catch (error) {
      AlertHelper.show('error', 'Something went woring');
    }
  };

  const onChangeText = (name, text) => {
    setCredentials({ ...credentials, [name]: text });
  };

  return (
    <Container isScrollable>
      <Text style={styles.appName}>{String.weekend}</Text>
      <View
        style={{
          marginTop: scale(10),
          backgroundColor: appColors.white,
          ...shadow,
          padding: scale(15),
          borderRadius: scale(5),
        }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Label
            text={String.Wellcome}
            style={{ fontSize: scale(30), fontWeight: '700', fontFamily: 'serif' }}
          />
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Label
              text={String.signup}
              style={{
                fontSize: scale(14),
                fontWeight: '500',
                color: appColors.primary,
                fontFamily: 'serif'
              }}
            />
          </Pressable>
        </View>
        <View style={{ paddingVertical: scale(15) }}>
          <Label
            text={String.toContinue}
            style={{
              fontSize: scale(16),
              //fontWeight: '500',
              color: appColors.darkGray,
              fontFamily: 'serif'
            }}
          />
        </View>
        <View style={{ paddingVertical: scale(10) }}>
          <CustomInput
            onChangeText={(text) => onChangeText('email', text)}
            keyboardType="email-address"
            label={String.email}
            placeholder="john@doe.com"
          />
        </View>
        <View style={{ paddingVertical: scale(10) }}>
          <CustomInput
            onChangeText={(text) => onChangeText('password', text)}
            secureTextEntry
            label={String.password}
            placeholder={String.password}
          // value="*******"
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate('Verification')}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingVertical: scale(10),
          }}>
          <Label
            text={String.fpassword}
            style={{
              fontSize: scale(14),
              fontFamily: 'serif'
            }}
          />
        </Pressable>
        <CustomButton isLoading={isloading} onPress={onLogin} label={String.signin} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: scale(20),
        }}>
        <Label
          text={String.or}
          style={{
            fontSize: scale(18),
            fontFamily: 'serif'
          }}
        />
      </View>
      <CustomButton
        onPress={onGoogleLogin}
        icon="google"
        label={String.signin}
        unFilled
      />
      <CustomButton onPress={onFacebookLogin} icon="facebook" label={String.signin} unFilled />
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
