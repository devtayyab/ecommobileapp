import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable , StyleSheet} from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import Label from '../../components/Label';
import { appColors } from '../../utils/appColors';
import { SimpleStepper } from 'react-native-simple-stepper';
import { bestSellersList } from '../../utils/MockData';
import BottomButtons from '../../components/BottomButtons';
import { SwipeListView } from 'react-native-swipe-list-view';
import Feather from 'react-native-vector-icons/Feather';
import CheckOutItem from '../../components/CheckOutItem';
import { connect } from 'react-redux';
import ReduxWrapper from '../../utils/ReduxWrapper';
import { APP_CURRENY } from '../../utils/appConfig';
import Empty from '../../components/Empty';
import { useSelector } from 'react-redux';
import String from '../../language/LocalizedString';

function index({ wishList: { wishItemNames }, removeToWishList$, addToWishList$, removeFromCart$, navigation }) {
  const [cartItem, setCartItem] = useState([])
  const [lngs, setlng] = useState(false)

  const { cartItems } = useSelector(state => state?.cart)

  useEffect(() => {
    setCartItem(cartItems)
  }, [cartItems])
  const getAmount = () => {
    let amount = 0
    cartItems?.map(item => {
      const { price } = item
      amount += Number(price);
    })
    return `${APP_CURRENY.symbol} ${amount}`

  }
  const onDeletePress = (item) => {
    removeFromCart$(item?.id)
  }
  const isInWishList = (item) => {
    return wishItemNames?.includes(item?.name)
  }
  const onAddToWishListPress = (item) => {
    if (!isInWishList(item)) {
      addToWishList$(item)
    } else {
      removeToWishList$(item?.name)
    }

  }


  const ItemCard = ({ item }) => {
    // console.log(item.imageuri);
    const { title, description, price, imageuri, itemQuantity } = item;
    return (<CheckOutItem name={title} imageuri={imageuri} price={price} itemQuantity={itemQuantity} />);
  };
  return (
    <>
      <Container >

        <Text style={styles.appName}>{String.weekend}</Text>
        <View style={{ flex: 1, paddingVertical: scale(30) }}>

          <SwipeListView
            ListEmptyComponent={() => <Empty label={String.emptyCart} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}_${new Date().getTime()}`}
            ItemSeparatorComponent={() => <View style={{ padding: scale(10) }} />}
            data={cartItems || []}
            renderItem={({ item, index }) => <ItemCard item={item} />}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => onAddToWishListPress(data?.item)}
                  style={{
                    left: scale(-15),
                    flex: scale(0.3),
                    backgroundColor: appColors.yellow,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather
                    name={'star'}
                    size={scale(25)}
                    color={isInWishList(data?.item) ? appColors.primary : appColors.white}
                  />
                </Pressable>
                <Pressable
                  onPress={() => onDeletePress(data?.item)}
                  style={{
                    left: scale(15),
                    flex: scale(0.3),
                    backgroundColor: appColors.redOrange,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather
                    name={'trash'}
                    size={scale(25)}
                    color={appColors.white}
                  />
                </Pressable>
              </View>
            )}
            leftOpenValue={scale(85)}
            rightOpenValue={scale(-85)}
          />
        </View>
      </Container>
      <View style={{ backgroundColor: 'red', bottom: scale(-15) }}>
        <BottomButtons onPress={() => navigation.navigate("Checkout")} buttonLabel={String.checkout} price={getAmount()} />
      </View>
    </>
  );
}
/* 
const mapStateToProps = (state) => ({
  cartItems : state.cart.cartItems
});
const mapDispatchToProps = { 
};

export default connect(mapStateToProps, mapDispatchToProps)(index); */
export default ReduxWrapper(index)

const styles = StyleSheet.create({
  appName: {
    textAlign: 'center',
    color: appColors.primary,
    fontSize: 30,
    marginVertical: 10,
    fontFamily : 'serif',
    fontWeight: 'bold'
  },
});