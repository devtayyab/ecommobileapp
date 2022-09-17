import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  NativeModules,
  Text,
  Pressable,
} from 'react-native';
import {
  Form,
  FormItem,
  Picker,
  Label,
  Modal,
} from 'react-native-form-component';
import storage from '@react-native-firebase/storage';

// import storage from '@react-native-firebase/storage';
import React, {useState, useEffect} from 'react';
import {appColors} from '../../utils/appColors';
import Feather from 'react-native-vector-icons/dist/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Checkbox} from 'react-native-paper';
// import CheckBox from '../../components/CheckBox';
import {LangChange} from '../../components/LangChange';
import String from '../../language/LocalizedString';

var ImagePicker = NativeModules.ImageCropPicker;

export default function Add({navigation,route: { params }}) {
  const [lngs, setlng] = useState(false);

  const [title, setTitle] = useState('');
  // const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');

  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [concentration, setConcentration] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [checked, setChecked] = React.useState(false);
  // const { flag } = params;
  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      const Data = JSON.parse(user)


      setSellerId(Data.uid)

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();

  }, [])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Weekend App Camera Permission",
          message:
            "Weekend App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const uploadImage = () => {

    console.log("hii");
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
    });
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
      selectionLimit: 6
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
        console.log(response)

        const FinalData = response.assets.map((res) => {
          return { uri: res?.uri, name: res?.fileName }
        })
        setImageUri(FinalData)
        console.log(response?.assets[0]?.uri);
      }
    })
  }
  const Submit = async () => {
    

    try {
      const id = uuid.v4();
      let myprom = new Promise((myResolve, myReject) => {
        const allurl = []
      const img =   imageUri.map(async (imag) => {
          const refrence = storage().ref(`images/${imag?.name}`)
          await refrence.putFile(imag?.uri).then(async (res) => {
            console.log("Image Uploaded", res.metadata.fullPath);
            const url = await refrence.getDownloadURL()
            allurl.push(url)
            return url
          })
        })
        if (img?.length > 0){
          myResolve(allurl)
        }

      })
      myprom.then((res) => {
        console.log(res)
        console.log('ruunning')
        firestore()
          .collection('Products')
          .add({
            id: id,
            productSellerId: sellerId,
            title,
            // gender,
            category,
            brand,
            quantity,
            concentration,
            price,
            description,
            imageuri: allurl,
          })
          .then((res) => {
            console.log("Product Added", res);
            console.log('Products added!');
            setBrand('');
            setCategory('');
            setConcentration('');
            setDescription('');
            // setGender('');
            setImageUri('');
            setPrice('');
            setQuantity('');
            setTitle('');


          }
          ).catch((error) => {
            console.log(error);
          })
      })

      // const refrence = storage().ref(`images/${imageUri?.name}`)
      // refrence.putFile(imageUri?.uri).then(async (res) => {
      //   console.log("Image Uploaded", res.metadata.fullPath);

      //     firestore()
      //       .collection('Products')
      //       .add({
      //         id: id,
      //         productSellerId: sellerId,
      //         title,
      //         gender,
      //         category,
      //         brand,
      //         quantity,
      //         concentration,
      //         price,
      //         description,
      //         imageuri: allurl,
      //       })
      //       .then((res) => {
      //         console.log("Product Added", res);
      //         console.log('Products added!');
      //         setBrand('');
      //         setCategory('');
      //         setConcentration('');
      //         setDescription('');
      //         setGender('');
      //         setImageUri('');
      //         setPrice('');
      //         setQuantity('');
      //         setTitle('');

      //       });
      //   }
      //     ).catch ((error) => {
      //   console.log(error);
      // })
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <View style={styles.main}>
      <ScrollView>
      <Text style={styles.appName}>{String.weekend}</Text>

        <View style={styles.imageContainer}>
          <Image
            // resizeMode='contain'
            style={styles.image}
            source={{ uri: imageUri[0]?.uri }}
          />
          <Feather
            name={'camera'}
            size={40}
            color={appColors.primary}
            onPress={uploadImage}
            style={styles.icon}
          />
        </View>
        <Form
          buttonText={String.addproduct}
          buttonStyle={{backgroundColor: appColors.primary}}
          onButtonPress={() => Submit()}>
          <FormItem
            isRequired
            placeholder={String.title}
            value={title}
            onChangeText={(e) => setTitle(e)}
          />
          <Picker
            items={[
              {label: String.men, value: 'men'},
              {label: String.women, value: 'women'},
              {label: 'Unisex', value: 'UniSex'},
            ]}
            placeholder={String.choseCat}
            isRequired 
            selectedValue={category}
            onSelection={(item) => setCategory(item.value)}
          />
          <FormItem
            isRequired
            placeholder={String.brand}
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
              {label: String.other, value: 'Other'},
            ]}
            placeholder={String.quantity}
            isRequired
            selectedValue={quantity}
            onSelection={(item) => setQuantity(item.value)}
          />
          <Picker
            items={[
              {label: 'eau de cologne', value: 'eau de cologne'},
              {label: 'eau de toilette', value: 'eau de toilette'},
              {label: 'eau de parfume', value: 'eau de parfume'},
              {label: String.other, value: 'Other'},
            ]}
            placeholder={String.concentration}
            isRequired
            selectedValue={concentration}
            onSelection={(item) => setConcentration(item.value)}
          />

          <FormItem
            isRequired
            placeholder={String.price}
            value={price}
            onChangeText={(e) => setPrice(e)}
          />
          <FormItem
            isRequired
            placeholder={String.descript}
            value={description}
            onChangeText={(e) => setDescription(e)}
            textArea
          />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Checkbox
            color='blue'
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text>
              {String.accept}
              <Pressable
              style={{paddingTop:5}}
                onPress={() => {
                  navigation.navigate('Terms');
                }}>
                <Text style={{color: appColors.primary,marginTop:5}}>{String.terms}</Text>
              </Pressable>
            </Text>
          </View>
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
    borderWidth: 2,
  },
  icon: {
    paddingLeft: 10,
    paddingTop: 60,
  },
  appName: {
    textAlign: 'center',
    color: appColors.primary,
    fontSize: 30,
    marginVertical: 10,
    fontFamily : 'serif',
    fontWeight: 'bold'
  },
});
