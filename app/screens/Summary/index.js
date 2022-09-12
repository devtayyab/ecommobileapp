import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import ScreenHeader from '../../components/ScreenHeader';
import SelectAble from '../../components/SelectAble';
import Divider from '../../components/Divider';
import CustomButton from '../../components/CustomButton';
import ProductCard from '../../components/ProductCard';
import { bestSellersList } from '../../utils/MockData';
import TitleComp from '../../components/TitleComp';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '../../components/CheckBox';
import Label from '../../components/Label';
import { AlertHelper } from '../../utils/AlertHelper';
import paymentHelper from '../../services/paymentHelper';
import ReduxWrapper from '../../utils/ReduxWrapper';
import writeData from '../../utils/writeData';
import { useSelector } from 'react-redux';
import functions from '@react-native-firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import String from '../../language/LocalizedString';
function index(props) {
  const { navigation } = props

  const orders = useSelector(state => state?.orders)
  
  const user = AsyncStorage.getItem('user')
  console.log('userid', user?.user?.uid)
  useEffect(() => {
    functions()
      .httpsCallable('stripeCreateAccount')({ userid: user?.user?.uid })
      .then(response => {
        console.log('ready', response)

      })

  }, []);
  const onPaymentDone = (info) => {
    const { error } = info;
    if (!error) {
      AlertHelper.show('success', 'Your Order Placed Successfully');
      navigation.navigate('Home');
     
    } else {
      AlertHelper.show('error', 'Oops !! Something went wrong !');
    }
  };
  const onPay = async () => {
    const { email, name } = user;



    await paymentHelper(
      {
        description: 'Order at WeekEnd',
        currency: 'INR',
        amount: '5000',
        name: 'foo',
        prefill: {
          email: email,
          contact: '123456789',
          name: name,
        },
      },
      onPaymentDone,
    );
  };
  return (
    <>
      <Container isScrollable>
        <ScreenHeader label={String.summery} navigation={navigation} />

        <View style={{}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ padding: scale(10) }} />}
            horizontal
            data={bestSellersList}
            renderItem={({ item, index }) => (
              <ProductCard key={index} item={item} />
            )}
          />
        </View>
        <SelectAble
          item={{
            label: String.shipaddress,
            subLabel:
              '21, Alex Davidson Avenue, Opposite Omegatron, Vicent Smith Quarters, Victoria Island, Lagos, Nigeria',
          }}
          selected
        />
        <Divider isDark />
        <View style={{ paddingVertical: scale(20) }}>
          <TitleComp heading={String.payment} />
          <View
            style={{
              paddingVertical: scale(20),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Feather name={String.credit} size={scale(25)} />
            <View style={{}}>
              <Label
                text={String.master}
                style={{ fontSize: scale(13), opacity: scale(0.5) , fontFamily : 'BOD_R' }}
              />
              <Label text="**** **** **** 1234" style={{ fontSize: scale(17)  , fontFamily : 'BOD_R'}} />
            </View>
            <CheckBox isChecked />
          </View>
        </View>
        {/* <SelectAble
          item={{
            label: 'Shipping Address',
            subLabel:
              '21, Alex Davidson Avenue, Opposite Omegatron, Vicent Smith Quarters, Victoria Island, Lagos, Nigeria',
          }}
          selected
        /> */}
        <Divider isDark />
      </Container>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: scale(20),
          bottom: scale(10),
        }}>
        <CustomButton
          onPress={() => navigation.goBack()}
          label={String.back}
          unFilled
        />
        <CustomButton onPress={onPay} label={String.pay} />
      </View>
    </>
  );
}

export default ReduxWrapper(index);
