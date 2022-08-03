import { View, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import {
  Form,
  FormItem,
  Picker,
  Label,
  Modal,
} from 'react-native-form-component';
import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { appColors } from '../../utils/appColors';
import Feather from 'react-native-vector-icons/dist/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

export default function Add() {
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [concentration, setConcentration] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');

  const uploadImage = () => {
    console.log("hii");

    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',

      },
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancel image picker");

      }
      else if (response.error) {
        console.log("Image Picker Error", response.error);
      }
      else if (response.customButton) {
        console.log("User Tapped custom button", response.customButton);
      }
      else {
        // const source = {uri:'data:image/jpeg,base64'+response.base64}
        const source = { uri: response?.uri };
        setImageUri({ uri: response?.assets[0]?.uri, name: response?.assets[0]?.fileName })
        console.log(response);
        console.log(response?.assets[0]?.uri);

      }
    })

  }
  const Submit = async () => {
    try {
      const refrence = storage().ref(`images/${imageUri?.name}`)
      refrence.putFile(imageUri?.uri).then(async (res) => {
        console.log("Image Uploaded", res.metadata.fullPath);
        const url = await refrence.getDownloadURL()
        firestore()
          .collection('Products')
          .add({
            title,
            gender,
            brand,
            quantity,
            concentration,
            price,
            description,
            imageuri: url,
          })
          .then(() => {
            console.log('Products added!');
          });
      }
      ).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <View style={styles.main}>

      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            // resizeMode='contain'
            style={styles.image}
            source={{ uri: imageUri?.uri }}
          />
          <Feather
            name={'camera'}
            size={40}
            color={appColors.primary}
            onPress={uploadImage}
            style={styles.icon}
          />
        </View>
        <Form buttonText="Add Product" buttonStyle={{ backgroundColor: appColors.primary, }} onButtonPress={() => Submit()}>
          <FormItem
            isRequired
            placeholder="Title"
            value={title}
            onChangeText={(e) => setTitle(e)}
          />
          <Picker
            items={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            placeholder="Choose Gender"
            isRequired
            selectedValue={gender}
            onSelection={(item) => setGender(item.value)}
          />
          <FormItem
            isRequired
            placeholder="Brand"
            value={brand}
            onChangeText={(e) => setBrand(e)}
          />

          <Picker
            items={[
              { label: '0/15ml', value: '0/15ml' },
              { label: '15/30ml', value: '15/30ml' },
              { label: '30/50ml', value: '30/50ml' },
              { label: '50/70ml', value: '50/70ml' },
              { label: '70/100ml', value: '70/100ml' },
              { label: '100/150ml', value: '100/150ml' },
              { label: '150/200ml', value: '150/200ml' },
              { label: '200ml', value: '200ml' },
              { label: 'Other', value: 'Other' },
            ]}
            placeholder="Quantity"
            isRequired
            selectedValue={quantity}
            onSelection={(item) => setQuantity(item.value)}
          />
          <Picker
            items={[
              { label: 'eau de cologne', value: 'eau de cologne' },
              { label: 'eau de toilette', value: 'eau de toilette' },
              { label: 'eau de parfume', value: 'eau de parfume' },
              { label: 'Other', value: 'Other' },
            ]}
            placeholder="Concentration"
            isRequired
            selectedValue={concentration}
            onSelection={(item) => setConcentration(item.value)}
          />

          <FormItem
            isRequired
            placeholder="Price"
            value={price}
            onChangeText={(e) => setPrice(e)}
          />
          <FormItem
            isRequired
            placeholder="Description"
            value={description}
            onChangeText={(e) => setDescription(e)}
            textArea
          />
        </Form>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    margin: 20,
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
    borderWidth: 2
  },
  icon: {
    paddingLeft: 10,
    paddingTop: 60,
  },

});
