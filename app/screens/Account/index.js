import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import Feather from 'react-native-vector-icons/Feather';
import { appColors } from '../../utils/appColors';
import Label from '../../components/Label';
import { profileKeys } from '../../utils/MockData';
import AvatarImage from '../../components/AvatarImage'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

//auth().signOut()
export default function index({ navigation }) {

  const [userdata, setUserData] = useState({})

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      const Data = JSON.parse(user)

      setUserData(Data)
      console.log("user Data", Data);

    } catch (e) {
      console.log(e);
    }
  }
  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem('user')

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();

  }, [])

  const email = userdata?.email;
  const displayName = userdata?.displayName;

  const onLogout = () => {
    auth().signOut()
    removeUser();

  }
  const ItemCard = ({ item }) => {
    const { lebel, icon, isNew, route } = item;
    return (
      <Pressable onPress={() => {
        route == "Login" && onLogout()
        route && navigation.navigate(route)
      }} style={styles.itemContainer}>
        <Pressable style={styles.iconContainer}>
          <Feather name={icon} size={scale(22)} color={appColors.black} />
        </Pressable>
        <View style={styles.itemInnerContainer}>
          <Label text={lebel}  style={{fontfamily : 'Bodoni MT'}}/>
          {isNew && <View style={{ paddingHorizontal: scale(10), backgroundColor: appColors.red, padding: scale(5), borderRadius: scale(4) }}>
            <Label text="New" style={{ fontSize: scale(10), color: appColors.white , fontfamily : 'Bodoni MT' }} />
          </View>}
          <Feather name={"chevron-right"} size={scale(18)} />
        </View>
      </Pressable>
    );
  };
  return (
    <Container>
      <View style={{ paddingVertical: scale(20), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <AvatarImage size={scale(110)} />
        <View style={{ marginLeft: scale(20) }}>
          <Label text={displayName} style={{ fontSize: scale(28) , fontfamily : 'Bodoni MT' }} />
          <Label text={email} style={{ fontSize: scale(12) , fontfamily : 'Bodoni MT' }} />
        </View>
      </View>
      <FlatList
        data={profileKeys}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <ItemCard key={index} item={item} />}
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
  iconContainer: {
    borderRadius: scale(5),
    padding: scale(10),
    marginRight: scale(20),
    backgroundColor: appColors.lightGreen,
  },
});
