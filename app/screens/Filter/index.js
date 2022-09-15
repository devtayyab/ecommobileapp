import React,{useState} from 'react'
import { View, Text,Pressable,FlatList } from 'react-native'
import Container from '../../components/Container'
import ScreenHeader from '../../components/ScreenHeader'
import TitleComp from '../../components/TitleComp'
import Feather from 'react-native-vector-icons/Feather';
import { scale } from 'react-native-size-matters'
import { appColors } from '../../utils/appColors'
import BottomButtons from '../../components/BottomButtons'
import String from '../../language/LocalizedString'
import { LangChange } from '../../components/LangChange';

export default function index({navigation}) {
    const [colorFilter, setColorFilter] = useState(false)
    const [lngs, setlng] = useState(false)

    return (
        <>
        <Container isScrollable>
      <LangChange lngs={lngs} setlng={(lng) => setlng(lng)} />

            <ScreenHeader label={String.filter} navigation={navigation} showSearch rightIcon="x-octagon"/>
             <View style={{paddingVertical:scale(20)}}>
                <TitleComp subLabel="No Settings" heading={String.popularity} renderRight={()=> <Feather name="chevron-down" size={scale(20)}  />} />
             </View>
             <View style={{paddingVertical:scale(20)}}>
                <TitleComp subLabel="Weekend, Apple, Mi" heading={String.brand} renderRight={()=> <Feather name="chevron-down" size={scale(20)}  />} />
             </View>

             <View style={{paddingVertical:scale(20)}}>
                <TitleComp subLabel="$20 - $ 1200" heading={String.price} renderRight={()=> <Feather name="chevron-down" size={scale(20)}  />} />
             </View>

             <View style={{paddingVertical:scale(20)}}>
                <TitleComp subLabel={!colorFilter ? "Red" : null} heading={String.color} renderRight={()=> <Pressable onPress={()=>setColorFilter(!colorFilter)} ><Feather name={colorFilter ? "chevron-up":"chevron-down"} size={scale(20)}  /></Pressable> } /> 
                {colorFilter&&<View style={{paddingVertical:scale(20)}}> 
                    <FlatList showsHorizontalScrollIndicator={false} keyExtractor={(item)=> item} ItemSeparatorComponent={()=> <View style={{padding:scale(10)}} />} horizontal renderItem={({item,index}) =>  <View  key={index}  style={{backgroundColor:item, height:scale(40), width:scale(40), borderRadius:scale(10)}}/>}  data={Object.values(appColors)} /> 
                </View>}
             </View>
             

             <View style={{paddingVertical:scale(20)}}>
                <TitleComp subLabel="4 Star" heading={String.rating} renderRight={()=> <Feather name="chevron-down" size={scale(20)}  />} />
             </View>

             <View style={{paddingVertical:scale(20)}}>
                <TitleComp subLabel="No Settings" heading={String.shiped} renderRight={()=> <Feather name="chevron-down" size={scale(20)}  />} />
             </View> 
              
              
        </Container>
        <BottomButtons buttonLabel={String.apply} priceLabel={String.filter} />
        </>
    )
}
