import { View, Text, } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Container from '../../components/Container';


export default function Announcement({navigation}) {

    const [userdata, setUserData] = useState({})
    const [product, setProduct] = useState([])

    const getData = async () => {
        try {
          const user = await AsyncStorage.getItem('user')
          const Data = JSON.parse(user)
    
          setUserData(Data)
          
        } catch (e) {
          console.log(e);
        }
      }
    

     

    const getProducts = async () => {
        const product = await firestore().collection('Products').get();
        const value = product.docs.filter(doc => doc.productSellerId == userdata.uid)
        setProduct(value)
        console.log(value);
      
      }

      useEffect(() => {
        getData();
      }, [])

      useEffect(() => {
        getProducts();
      }, [])
    
    return (
        <>
<Text>{userdata.uid}</Text>
       
        </>
        
    )
}