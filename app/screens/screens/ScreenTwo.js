import React from 'react';
// import Boy from "../assets/boy.jpg";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';

const ScreenTwo = ({ navigation }) => {
    return (
        <Animatable.View animation="fadeInRight" duration={500} style={styles.mainView}>
            <View style={{ flex: 1.5, justifyContent: "flex-end", alignContent: "center" }}>
                {/* <Image style={{ width: 370, height: 350 }} source={Boy} /> */}
            </View>
            <View style={styles.radioView}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Delivered To You</Text>
                </View>
                <View style={styles.radioButtonsMain}>
                    <View style={styles.radioBox}></View>
                    <View style={[styles.radioBox, styles.active]}></View>
                    <View style={styles.radioBox}></View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Three")}>
                        <Text style={styles.nextBtn}>Next</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{ fontSize: 18, color: "#999999" }}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>
    )
}

export default ScreenTwo;

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
        marginRight: 5
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
    active: {
        backgroundColor: "#bad759",
        borderColor: '#bad759',
    },
    nextBtn: {
        backgroundColor: "#bad759",
        color: "white",
        fontSize: 18,
        paddingLeft: 130,
        paddingRight: 130,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50
    }
})