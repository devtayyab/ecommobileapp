import React from 'react';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5Pro"
import AsyncStorage from '@react-native-community/async-storage'
import UserAvatar from "../assets/logo.jpeg";
import { GlobalContext } from '../context/Context';
import String from '../../language/LocalizedString'
const DrawerContent = (props) => {
    
    const Logout =()=>{
       //setAuth(null)
        AsyncStorage.clear()
    }
    return (
        <View style={styles.main}>
            <View style={styles.topView}>
                <Image style={{ width: 220, height: 220, borderRadius: 50 }} source={UserAvatar} />
            </View>
            <DrawerContentScrollView {...props}>
                <TouchableOpacity style={styles.touchDesign} onPress={() => props.navigation.navigate("Setting")}>
                    <View style={styles.subView}>
                        <Icon name='home' size={25} color="white" />
                        <Text style={styles.text}>{String.setting}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchDesign}>
                    <View style={styles.subView}>
                        <FontAwesome name='shopware' size={25} color="white" />
                        <Text style={styles.text}>{String.order}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchDesign} onPress={() => props.navigation.navigate("Home")}>
                    <View style={styles.subView}>
                        <Icon name="bars" size={25} color="white" />
                        <Text style={styles.text}>{String.aboutus}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchDesign} onPress={() => props.navigation.navigate("Home")}>
                    <View style={styles.subView}>
                        <Icon name='infocirlceo' size={25} color="white" />
                        <Text style={styles.text}>{String.terms}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchDesign}>
                    <View style={styles.subView}>
                        <Icon name='login' size={25} color="white" />
                        <Text style={styles.text} onPress={()=>Logout()}>{String.signout}</Text>
                    </View>
                </TouchableOpacity>
            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#bad759",
    },
    touchDesign: {
        padding: 10
    },
    subView: {
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontSize: 20,
        color: "white",
        marginLeft: 10
    },
    topView: {
        flexDirection: "column",
        justifyContent: "center",
        paddingVertical: 0,
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 25,
        color: "white"
    }
})