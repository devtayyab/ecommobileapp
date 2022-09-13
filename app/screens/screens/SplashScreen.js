import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from "react-native";
import one from "../../assests/one.jpg";
import * as Animatable from 'react-native-animatable';
import { appColors } from '../../utils/appColors';
import Lottie from 'lottie-react-native';
const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => navigation.navigate("First"), 7000);
    }, [])

    return (
        <View style={styles.splash}>
            {/* <Animatable.Image animation="zoomIn" duration={1000} style={{ width: 250, height: 250 }} source={one} alt='WELLCOME' /> */}
            <Lottie source={require('./splash.json')} autoPlay loop = {false} />
            {/* <Text> Hello World</Text>
            <Text style={styles.text}> Hello World</Text> */}
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        backgroundColor: appColors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: 'BOD_R'
    }
})