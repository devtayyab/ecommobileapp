import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appColors} from '../../utils/appColors';
import {scale} from 'react-native-size-matters';
import Label from '../../components/Label';
import {ScrollView} from 'react-native-gesture-handler';
import String from '../../language/LocalizedString';
// import Container from '../../components/Container';

export default function Announcement({navigation}) {
  const [userdata, setUserData] = useState({});
  const [product, setProduct] = useState([]);

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const Data = JSON.parse(user);

      setUserData(Data);
    } catch (e) {
      console.log(e);
    }
  };

  const getProducts = async () => {
    const product = await firestore().collection('Products').get();
    const value = product.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    });

    let specProducts = value.filter(
      (city) => city.productSellerId == userdata.uid,
    );

    setProduct(specProducts);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getProducts();
  }, [product]);

  return (
    <>
      <ScrollView >
        <Text
          style={{
            alignItems: 'center',
            textAlign: 'center',
            fontSize: 28,
            fontWeight: 'bold',
            color: appColors.primary,
            fontFamily: 'BOD_R',
            marginBottom:20
          }}>
          {String.announcement}
        </Text>
        {product.map((item, index) => {
          return (
            <View style={styles.design}>
              <Image style={styles.image} source={{uri: item.imageuri}} />
              <View>
                <Label
                  text={item.title}
                  style={{fontSize: scale(28), fontFamily: 'BOD_R'}}
                />
                <View>
                  <Label
                    text={item.price}
                    style={{fontSize: scale(16), fontFamily: 'BOD_R'}}
                  />
                  <Label
                    text={item.brand}
                    style={{fontSize: scale(16), fontFamily: 'BOD_R'}}
                  />
                </View>
              </View>
              <View></View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderWidth: 2,
  },
  text: {
    color: appColors.primary,
    fontFamily: 'BOD_R',
    // fontSize: scale(20)
  },
  design: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
