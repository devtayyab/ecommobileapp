import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Container from '../../components/Container';
import Stepper from 'react-native-stepper-ui';
import CheckoutDelivery from './CheckoutDelivery';
import { appColors } from '../../utils/appColors';
import CustomButton from '../../components/CustomButton';
import { scale } from 'react-native-size-matters';
import ScreenHeader from '../../components/ScreenHeader';
import CheckoutAddress from './CheckoutAddress';
import CheckoutPayment from './CheckoutPayment';
import { AddOrderDetail } from '../../redux/wishListAction'
import writeData from '../../utils/writeData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AlertHelper } from '../../utils/AlertHelper';
import String from '../../language/LocalizedString';
const { height } = Dimensions.get('window');


export default function CheckOutSteper({ navigation }) {

  const dispatch = useDispatch()
  const [active, setActive] = useState(0);
  const user = AsyncStorage.getItem('user')
  const products = useSelector(state => state.cart)

  const [address, setAddress] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    country: ''
  })
  const [cardinfo, setcardInfo] = useState({
    cardname: '',
    cardnumber: '',
    expirydate: '',
    cvv: ''
  })
  const [dileveryMethod, setDileveryMethod] = useState('Cash On Delivery')

  const onFinish = () => {
    if ((!address.street1.trim())||(!address.street2.trim())||(!address.city.trim())||(!address.state.trim())||(!address.country.trim())) {
      alert("All fields are required")
    }
    else{
      dispatch(AddOrderDetail({
        address: address,
        cardinfo: cardinfo,
        product: products,
        dileveryMethod: dileveryMethod
      }))
      writeData('Orders', {
        address: address,
        cardinfo: cardinfo,
        products: products,
        dileveryMethod: dileveryMethod,
        buyer: user
      })
      if (dileveryMethod == 'Cash On Delivery') {
        AlertHelper.show('success', 'Your Order Placed Successfully');
        setAddress({street1: '',
        street2: '',
        city: '',
        state: '',
        country: ''})
        navigation.navigate('Home');
  
      } else {
        navigation.navigate("Summary")
      }
    }



    //Summary
  };
  return (
    <Container>
      <ScreenHeader label={String.checkout} navigation={navigation} />
      {
        dileveryMethod == 'Cash On Delivery' ?

          <Stepper
            stepStyle={styles.stepStyle}
            active={active}
            onFinish={onFinish}
            content={[
              <CheckoutDelivery dileveryMethod={dileveryMethod} setDileveryMethod={(v) => setDileveryMethod(v)} />,
              <CheckoutAddress address={address} setAddress={(address) => setAddress(address)} />,
              // <CheckoutPayment cardinfo={cardinfo} setcardInfo={(info) => setcardInfo(info)} />,
            ]}

            //showButton={false}
            onNext={() => setActive((p) => p + 1)}
            onBack={() => setActive((p) => p - 1)}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            wrapperStyle={styles.wrapperStyle}
          />
          : <Stepper
            stepStyle={styles.stepStyle}
            active={active}
            onFinish={onFinish}
            content={[
              <CheckoutDelivery dileveryMethod={dileveryMethod} setDileveryMethod={(v) => setDileveryMethod(v)} />,
              <CheckoutAddress address={address} setAddress={(address) => setAddress(address)} />,
              <CheckoutPayment cardinfo={cardinfo} setcardInfo={(info) => setcardInfo(info)} />,
            ]}

            //showButton={false}
            onNext={() => setActive((p) => p + 1)}
            onBack={() => setActive((p) => p - 1)}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            wrapperStyle={styles.wrapperStyle}
          />
      }
    </Container>
  );
}

const styles = StyleSheet.create({
  stepStyle: {
    backgroundColor: appColors.primary,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  buttonTextStyle: {
    fontSize: scale(16),
    fontWeight: '300',
    color: appColors.white,
    letterSpacing: scale(2),
    textTransform: 'uppercase',
  },
  buttonStyle: {
    /*  padding: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginRight: 10,
    backgroundColor: appColors.primary, */
    //top: scale(height / 9),
    height: scale(50),
    backgroundColor: appColors.primary,
    borderRadius: scale(5),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: scale(10),
    paddingHorizontal: scale(50),
    //position:'absolute',
    bottom: scale(-30)


  },
  wrapperStyle: {},
});
