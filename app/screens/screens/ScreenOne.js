import React from 'react';
import Perfume from '../../assests/perfume.jpg';
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { appColors } from '../../utils/appColors';
import String from  '../../language/LocalizedString'
import Lottie from 'lottie-react-native';
const ScreenOne = ({ navigation }) => {
    return (
        <Animatable.View animation="fadeInRight" duration={500} style={styles.mainView}>
            <View style={{ flex: 1.5, justifyContent: "flex-end", alignContent: "center" }}>
                {/* <Image style={{ width: 365, height: 350 }} source={Perfume} /> */}
                <Lottie source={require('./two.json')} autoPlay loop  />
            </View>
            <View style={styles.radioView}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold",fontFamily: 'serif' }}>{String.foodlove}</Text>
                </View>
                <View style={styles.radioButtonsMain}>
                    <View style={[styles.radioBox, styles.active]}></View>
                    <View style={styles.radioBox}></View>
                    <View style={styles.radioBox}></View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Second")}>
                        <Text style={styles.nextBtn} >{String.next}</Text>

                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{ fontSize: 18, color: "#999999", fontFamily: 'serif' }}>{String.skip}</Text>
                    </TouchableOpacity>


                    {/* <Text>Next is a process THINGS</Text>
                    <Text style={styles.tex} >Next is a process THINGS</Text> */}

                </View>
            </View>
        </Animatable.View>
    )
}

export default ScreenOne;

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "white",
        flex: 1
    },
    radioBox: {
        height: 13,
        width: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#999999',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    active: {
        backgroundColor: appColors.primary,
        borderColor: '#bad759',
    },
    radioView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    radioButtonsMain: {
        flexDirection: "row",
    },
    nextBtn: {
        backgroundColor: appColors.primary,
        color: "white",
        fontSize: 18,
        paddingLeft: 130,
        paddingRight: 130,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        fontFamily: 'serif'
    },
})