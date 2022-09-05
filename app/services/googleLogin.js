import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '814196118506-0dnalgas4raan9p50rkc244vr53r4gm0.apps.googleusercontent.com',
});
export default async function () {
  console.log('googleLogin');
  try {
   
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    console.log(idToken)
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.log(error)
  }
} 