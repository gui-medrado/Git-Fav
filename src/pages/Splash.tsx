import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, StyleSheet} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../routes/MainStack";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        maxWidth: 180
    }
})

const Splash = () => {
    const navigation = useNavigation<StackTypes>()

    function goToWelcome () {
        setTimeout(() => {
            navigation.navigate('Welcome')
        }, 1800)
    }

    useEffect(goToWelcome)
    return(
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/icon-gitHub.png')} resizeMode="contain" style={styles.image}/>
        </SafeAreaView>
    )
}

export default Splash