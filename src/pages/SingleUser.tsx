import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity, Linking} from 'react-native'
import { globalColors } from "../utils/global.style";
import GitItem, { GitItemTypes } from "../utils/components/GitItem";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.colorBase
    },
    content: {
        flex: 1,
        backgroundColor: globalColors.colorBase,
        justifyContent: 'flex-start',
        position: 'relative',
        paddingTop: 30,
        paddingHorizontal: 20
    },
    profileArea: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 20
    },
    imageProfile: {
        maxWidth: 200,
        width: '100%',
        height: 200,
        borderRadius: 200,
        marginBottom: 26
    },
    userName: {
        color: globalColors.colorWhite,
        fontWeight: "800",
        fontSize: 22
    },
    userLogin: {
        color: globalColors.colorWhite,
        fontWeight: "400",
        fontStyle: 'italic',
        fontSize: 18
    },
    userBio:{
        color: globalColors.colorWhite,
        fontWeight: "500",
        fontStyle: 'italic',
        fontSize: 18,
        textAlign: 'center'
    },

    socialArea: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    socialItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    titleSocial: {
        color: globalColors.colorWhite,
        fontWeight: "400",
        fontSize: 18,
        marginBottom: 8
    },
    socialInfo: {
        color: globalColors.colorWhite,
        fontWeight: "800",
        fontSize: 18
    },

    linkArea: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleLink: {
        color: globalColors.colorWhite,
        fontWeight: "300",
        fontSize: 18
    },
    textLink: {
        color: globalColors.colorPrimaryLight,
        fontWeight: "800",
        fontSize: 18
    }
})

const SingleUser = ({ route }): any => {

    const RouteParams: GitItemTypes = route.params

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.profileArea}>
                    <Image source={{uri: RouteParams.avatar_url}}resizeMethod={'resize'} resizeMode="contain" style={styles.imageProfile}/>
                    <Text style={styles.userName}>{RouteParams.name}</Text>
                    <Text style={styles.userLogin}>{RouteParams.login}</Text>
                    <Text style={styles.userBio}>{RouteParams.bio}</Text>
                </View>
                <View style={styles.socialArea}>
                    <View style={styles.socialItem}>
                        <Text style={styles.titleSocial}>Seguidores</Text>
                        <Text  style={styles.socialInfo}>{RouteParams.followers}</Text>
                    </View>
                    <View style={styles.socialItem}>
                        <Text style={styles.titleSocial}>Seguindo</Text>
                        <Text style={styles.socialInfo}>{RouteParams.following}</Text>
                    </View>
                </View>
                <View style={styles.linkArea}>
                    <Text style={styles.titleLink}>Acesse no gitHub:</Text>
                    <TouchableOpacity onPress={() => {
                        Linking.canOpenURL(RouteParams.html_url)
                            .then((res) => {
                                if(res) Linking.openURL(RouteParams.html_url)
                                else console.warn('Ocorreu um erro')
                            })
                    }}>
                        <Text style={styles.textLink}>{RouteParams.html_url}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SingleUser