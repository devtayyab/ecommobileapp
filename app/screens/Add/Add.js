import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Form,
  FormItem,
  Picker,
  Label,
  Modal,
} from 'react-native-form-component';
import React, {useState} from 'react';
import { appColors } from '../../utils/appColors';

export default function Add() {
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [concentration, setConcentration] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');


  return (
    <View style={styles.main}>
      <ScrollView>
      <Form buttonText="Add Product" buttonStyle={{backgroundColor:appColors.primary,}} onButtonPress={() => console.log('do something')}>
        <FormItem
          isRequired
          placeholder="Title"
          value={title}
          onChangeText={(e) => setTitle(e)}
        />
        <Picker
          items={[
            {label: 'Male', value: 'Male'},
            {label: 'Female', value: 'Female'},
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
            {label: '0/15ml', value: '0/15ml'},
            {label: '15/30ml', value: '15/30ml'},
            {label: '30/50ml', value: '30/50ml'},
            {label: '50/70ml', value: '50/70ml'},
            {label: '70/100ml', value: '70/100ml'},
            {label: '100/150ml', value: '100/150ml'},
            {label: '150/200ml', value: '150/200ml'},
            {label: '200ml', value: '200ml'},
            {label: 'Other', value: 'Other'},
          ]}
          placeholder="Quantity"
          isRequired
          selectedValue={quantity}
          onSelection={(item) => setQuantity(item.value)}
        />
        <Picker
          items={[
            {label: 'eau de cologne', value: 'eau de cologne'},
            {label: 'eau de toilette', value: 'eau de toilette'},
            {label: 'eau de parfume', value: 'eau de parfume'},
            {label: 'Other', value: 'Other'},
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
        />
      </Form>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  main:{
    margin: 20,
  },
  
});