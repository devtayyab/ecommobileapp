import React from 'react'
import { View, Text, Pressable } from 'react-native'

export default function TestComp({name,onPress}) {
    return (
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Pressable onPress={onPress}>
                <Text style={{fontFamily : 'serif'}}>{name}</Text>
             </Pressable>
        </View>
    )
}
