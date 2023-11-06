import React from "react";
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../routes/MainStack";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        maxWidth: 180,
        width: '100%',
        height: 180,
        marginBottom: 26
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 18
    },
    buttonGoToHome: {
        backgroundColor: '#092D38',
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 12,
        textAlign: 'center'
    },
    buttonGoToHomeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
})

const Welcome = () => {
    const navigation = useNavigation<StackTypes>()

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/icon-gitHub.png')} resizeMode="contain" resizeMethod="resize" style={styles.image}/>
            </View>
            <Text style={styles.title}>Seja bem vindo ao Git Fav</Text>
            <TouchableOpacity style={styles.buttonGoToHome} onPress={()=> navigation.navigate('Home')}>
                <Text style={styles.buttonGoToHomeText}>Ir para Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Welcome