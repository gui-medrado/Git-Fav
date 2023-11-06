import React, { ReactNode } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalColors } from "../global.style";
import IconArrow from '../../assets/icons/arrow-right.svg'
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/MainStack";

export interface GitItemTypes {
    login: string,
    avatar_url: string,
    html_url: string, 
    name: string,
    bio: string, 
    followers: number,
    following: number,
    deleteFunction: (user: string) => void 
}

const styles = StyleSheet.create({
    gitItem: {
        width: '100%',
        paddingHorizontal: 18,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userContentArea:{
        flexDirection:  'row',
        alignItems: 'center'
    },
    userImage: {
        width: 55, 
        height: 55,
        marginRight: 12,
        overflow: "hidden",
        borderRadius: 55
    },  
    userInfo: {},
    userName: {
        color: globalColors.colorWhite,
        fontWeight: "800",
        fontSize: 16
    },
    userLogin: {
        color: globalColors.colorWhite,
        fontWeight: "400",
        fontStyle: 'italic',
        fontSize: 13
    },
    actionsArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeButton: {
        marginRight: 14
    },
    removeItemText: {
        fontSize: 18,
        fontWeight: '900',
        color: 'red'
    }
})


export default function GitItem(params: GitItemTypes){

    const navigation = useNavigation<StackTypes>()

    return(
        <View style={styles.gitItem}>
            <View style={styles.userContentArea}>
                <Image source={{uri: params.avatar_url}} resizeMode="contain" style={styles.userImage}/>
                {params.name || params.login 
                    ?
                        <View style={styles.userInfo}>
                            {params.name ? <Text style={styles.userName}>{params.name}</Text> : false}
                            {params.login ? <Text style={styles.userLogin}>{params.login}</Text>  : false}
                        </View>
                    : false
                }
            </View>
            <View style={styles.actionsArea}>
                <TouchableOpacity style={styles.removeButton} onPress={() => params.deleteFunction(params.login.toLowerCase())}>
                    <Text  style={styles.removeItemText} >X</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SingleUser', params)}>
                    <IconArrow width={26} height={26} fill={globalColors.colorWhite}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}