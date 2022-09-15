import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../../utils/appColors';
import Label from '../../components/Label';
import {profileKeys} from '../../utils/MockData';
import AvatarImage from '../../components/AvatarImage';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

//auth().signOut()
export default function index({navigation}) {
  const [userdata, setUserData] = useState({});
  const [users, setusers] = useState([]);
  const [imageUri, setImageUri] = useState({
      name : '' ,
  });

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const Data = JSON.parse(user);

      setUserData(Data);
    } catch (e) {
      console.log(e);
    }
  };

  const getuser = async () => {
    const user = await firestore().collection('users').get();
    // console.log(product.docs);
    // console.log(product.size);
    const value = user.docs.map((doc) => {
      return {
        rid: doc.id,
        ...doc.data(),
      };
    });

    let specUsers = value.filter((item) => item.uid == userdata.uid);

    setusers(specUsers);

    return specUsers;
  };

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    getData();
    const res = await getuser();
    AsyncStorage.setItem('user', res[0]);
    setusers(res);
  }, []);

  const email = userdata?.email;
  const displayName = userdata?.displayName;
  const imgUri = userdata?.photoURL;

  const onLogout = () => {
    auth().signOut();
    removeUser();
  };
  const uploadImage = () => {
    // console.log('hii');

    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancel image picker');
      } else if (response.error) {
        console.log('Image Picker Error', response.error);
      } else if (response.customButton) {
        console.log('User Tapped custom button', response.customButton);
      } else {
        const source = {uri: response?.uri};
        setImageUri({
          uri: response?.assets[0]?.uri,
          name: response?.assets[0]?.fileName,
        });

        const refrence = storage().ref(`images/${imageUri?.name}`);
        refrence.putFile(imageUri.uri).then(async (res) => {
          await refrence.getDownloadURL().then((res) => {
            console.log('Image Url', res);
            firestore()
              .collection('users')
              .doc(users?.rid)
              .update({photoURL: res});
          });
        });
      }
    });
  };
  // users.length > 0 && console.log(users[0]);
   const ItemCard = ({item}) => {
    const {lebel, icon, isNew, route} = item;
    return (
      <Pressable
        onPress={() => {
          route == 'Login' && onLogout();
          route && navigation.navigate(route);
        }}
        style={styles.itemContainer}>
        <Pressable style={styles.iconContainer}>
          <Feather name={icon} size={scale(22)} color={appColors.black} />
        </Pressable>
        <View style={styles.itemInnerContainer}>
          <Label text={lebel} style={{fontFamily: 'BOD_R'}} />
          {isNew && (
            <View
              style={{
                paddingHorizontal: scale(10),
                backgroundColor: appColors.red,
                padding: scale(5),
                borderRadius: scale(4),
              }}>
              <Label
                text="New"
                style={{
                  fontSize: scale(10),
                  color: appColors.white,
                  fontFamily: 'BOD_R',
                }}
              />
            </View>
          )}
          <Feather name={'chevron-right'} size={scale(18)} />
        </View>
      </Pressable>
    );
  };
  console.log(imageUri);
  return (
    <Container>
      <View
        style={{
          paddingVertical: scale(20),
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        {/* <AvatarImage size={scale(110)} /> */}
        <View style={styles.imageContainer}>
          <Pressable onPress={uploadImage}>
            <Image style={styles.image} source={{uri: imageUri?.uri}} />
          </Pressable>
        </View>
        <View style={{marginLeft: scale(20)}}>
          <Label
            text={displayName}
            style={{fontSize: scale(28), fontFamily: 'BOD_R'}}
          />
          <Label
            text={email}
            style={{fontSize: scale(12), fontFamily: 'BOD_R'}}
          />
        </View>
      </View>
      <FlatList
        data={profileKeys}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <ItemCard key={index} item={item} />}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: scale(15),
  },
  itemInnerContainer: {
    flex: 1,

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
    borderColor: appColors.primary,
    borderRadius: 10,
    borderWidth: 2,
  },
  iconContainer: {
    borderRadius: scale(5),
    padding: scale(10),
    marginRight: scale(20),
    backgroundColor: appColors.lightGreen,
  },
});
