import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default async function () {
  console.log('googleLogin');
  try {
    GoogleSignin.configure({
      webClientId: '260811097856-0vogth8fgdld5bkodn8q0kjs3fkgf7re.apps.googleusercontent.com',
    });
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