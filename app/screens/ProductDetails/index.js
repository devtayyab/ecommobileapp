import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import Label from '../../components/Label';
import CustomButton from '../../components/CustomButton';
import { appColors } from '../../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import TitleComp from '../../components/TitleComp';
import { productDetail } from '../../utils/MockData';
import ReviewComp from '../../components/ReviewComp';
import BottomButtons from '../../components/BottomButtons';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cartAction';
import ReduxWrapper from '../../utils/ReduxWrapper';
import Chat from '../Chat/Chat';
import firestore from '@react-native-firebase/firestore';

function index({ wishList: { wishItemNames }, cart: { cartItems }, addToWishList$, addToCart$, navigation, route: { params } }) {



  const { id, title, name, description, detail, price, quantity, concentration, image, isFav, rating, imageuri , productSellerId } = params.item;
  //console.warn({cartItems});
  

  // const [receiverId, setReceiverId] = useState('');

//   const getProducts = async () => {
//     const product = await firestore().collection('Products').get();

// const value = product.docs.filter(doc => doc.data().id == id);
// const SID = value[0].data().productSellerId;
// // console.log(SID);
// setReceiverId(SID)
// return SID

//   }

  // useEffect(async() => {
  //   const r_ID = await getProducts();
  //   console.log("product Seller ID:",r_ID);
  //   setReceiverId(r_ID)
  //   // console.log("product Seller ID2:",receiverId);



  // },[])






  const onAddToCart = () => {
    addToCart$({ ...params.item, quantity: 1 });
  };
  const _renderBottom = () => {
    return (
      <BottomButtons
        onPress={() => {
          onAddToCart();
          navigation.navigate('Cart');
        }}
        price={price}
        buttonLabel="ADD"
      />
    );
  };


  return (
    <>

      <Container bodyStyle={{ paddingHorizontal: scale(0) }} isScrollable>
        <View>
          <ImageBackground
            style={{ height: scale(400), width: '100%' }}
            resizeMode="cover"
            source={{ uri: imageuri[0]}}>
            <View
              style={{
                marginTop: scale(40),
                paddingHorizontal: scale(20),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable onPress={() => navigation.goBack()}>
                <Feather
                  name="chevron-left"
                  size={scale(25)}
                  color={appColors.black}
                />
              </Pressable>

              <Pressable
                onPress={() => addToWishList$(params.item)}
                style={{
                  borderRadius: scale(25),
                  backgroundColor: appColors.white,
                  height: scale(45),
                  width: scale(45),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather name="star" size={scale(20)} color={wishItemNames?.includes(name) ? appColors.primary : appColors.black} />
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        <View style={{ paddingHorizontal: scale(20), marginBottom: scale(100) }}>
          <View style={{ paddingVertical: scale(20) }}>
            <Label
              text={title}
              style={{ fontWeight: '700', fontSize: scale(30)  , fontFamily : 'serif'}}
            />
          </View>

          <View
            style={{
              paddingVertical: scale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.sizeContainer}>
              {/* <Label text="quantity" style={{ fontSize: scale(15) }} /> */}
              <Label
                text={quantity}
                style={{ fontWeight: '700', fontSize: scale(15) , fontFamily : 'serif'}}
              />
            </View>

            <View style={styles.sizeContainer}>
              {/* <Label text="concentration" style={{ fontSize: scale(15) }} /> */}
              <Label
                text={concentration}
                style={{ fontWeight: '700', fontSize: scale(15) , fontFamily : 'serif'}}
              />

            </View>
          </View>

          <View style={{ paddingVertical: scale(20) }}>
            <TitleComp heading={'Details'} />
            <View style={{ paddingVertical: scale(20) }}>
              <Label
                text={description}
                style={{ fontSize: scale(14), lineHeight: scale(25) ,  }}
              />
            </View>
          </View>
          <View >
            <TitleComp heading={'Contact'} />
            <Pressable style={styles.chat}
              onPress={() => navigation.navigate('Chat', {productSellerId})}
            >
              <Label text="Contact with Supplier" style={styles.chatLabel} />
              <Entypo
                name={'chat'}
                size={scale(25)}
                color={appColors.primary}
              />
            </Pressable>

          </View>
          {/* <View>
            <TitleComp heading={'Reviews'} />
            <Pressable
              onPress={() => navigation.navigate('WriteReview', { name })}>
              <Label text="Write your review" style={styles.wrtitle} />
            </Pressable>

            <ReviewComp />
          </View> */}
        </View>
      </Container>
      {_renderBottom()}
    </>
  );
}
/* 
const mapStateToProps = (state) => ({
   cartItems : state.cart.cartItems
});
const mapDispatchToProps = {
  addToCart$: addToCart,
}; 
export default connect(mapStateToProps, mapDispatchToProps)(index); */
export default ReduxWrapper(index)

const styles = StyleSheet.create({
  sizeContainer: {
    flex: 0.47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: appColors.white,
    padding: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(20),
    borderWidth: scale(0.4),
    borderColor: appColors.gray,
  },
  itemColor: {
    height: scale(20),
    width: scale(20),
    backgroundColor: appColors.primary,
    borderRadius: scale(5),
  },
  wrtitle: {
    paddingVertical: scale(10),
    fontSize: scale(14),
    color: appColors.primary,
    fontFamily : 'serif'
  },
  chatLabel: {
    color: appColors.primary,
    fontSize: scale(14),
    paddingRight: scale(10),
    fontFamily : 'serif'
  },
  chat: {
    flexDirection: "row",
    // paddingHorizontal: scale(10),
  },
});
