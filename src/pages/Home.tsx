import React, { ReactNode, useState, SetStateAction} from "react";
import { SafeAreaView, Text, Image, View, StyleSheet, TouchableOpacity, TextInput, FlatList, ListRenderItemInfo, Alert} from 'react-native'
import SearchIcon from '../assets/icons/icon-search.svg'
import { globalColors } from "../utils/global.style";
import GitItem, { GitItemTypes } from "../utils/components/GitItem";
import { Api } from "../Api";
import Separator from "../utils/components/Separator";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Estilos Do Componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.colorBase
    },
    content: {
        flex: 1,
        backgroundColor: globalColors.colorBase,
        justifyContent: 'flex-start',
        position: 'relative'
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
    searchArea: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 'auto',
        zIndex: 2
    },
    input: {
        backgroundColor: globalColors.colorPrimaryDark,
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 10,
        textAlign: 'left',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        width: '81%',
    },
    searchButton: {
        width: '11%',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColors.colorPrimaryLight,
    },

    flatListStyle: {
        backgroundColor: globalColors.colorBase,
        width: '100%',
        paddingTop: 60
    }
})


//Componente a ser renderizado
const Home : () => ReactNode = () => {

    //Variaves de estado
    const [search, setSearch] = useState< string >('')
    const [gitList, setGitList] = useState<GitItemTypes[]>([]) 
    

    //Procurar e adiciona usuarios
    async function handleSearchUser(user: string) {

        try {

            //Verificação se já existe o usuário
            if(gitList.find(el => el.login == user.toLowerCase())) {
                throw new Error('Usuário já cadastrado');
                return
            }

            let response = await Api(user)
            if(response.message) {
                throw new Error('Nenhum usuario encontrado')
            } else {
                const { login, avatar_url, html_url, name, bio, followers, following } = response
                let newUser: GitItemTypes = {
                    login,
                    avatar_url,
                    html_url, 
                    name,
                    bio, 
                    followers,
                    following,
                    deleteFunction: handleRemoveUser
                }

                
            
                let newRefreshedArray = [newUser, ...gitList]

                setSearch('')
                setGitList(newRefreshedArray)
                await AsyncStorage.setItem('list', JSON.stringify(newRefreshedArray))
            }
        } catch(e: any){console.warn(e)}
        
    }

    //Remove usuarios
    async function handleRemoveUser(user: string) {
        let currentGitList = gitList
        let gitItemToBeExclude = currentGitList.find(el => el.login == user.toLowerCase())
        let indexItemExclude: number = currentGitList.indexOf(gitItemToBeExclude)
        currentGitList.splice(indexItemExclude, 1)

        let newRefreshedArray = [...currentGitList]
        setGitList(newRefreshedArray)
        await AsyncStorage.setItem('list', JSON.stringify(newRefreshedArray))
    }

    async function handleCheckIfHaveUsers(){
        let list = await AsyncStorage.getItem('list')
        if(list) {
            list = JSON.parse(list)
            setGitList(list)
        } else return
    }

    //Renderizador dos usuarios
    function renderItem({ item }: ListRenderItemInfo<GitItemTypes>) {
        return <GitItem {...item} deleteFunction={handleRemoveUser}/>;
    }


    useState(() => {
        handleCheckIfHaveUsers()
    })

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.searchArea}>
                    <TextInput value={search} onChangeText={value => setSearch(value)} 
                        style={styles.input} placeholder="Digite o user GitHub" placeholderTextColor={'#7C7C8A'}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={() => handleSearchUser(search)}>
                        <SearchIcon height={28} width={28} fill={'#fff'}/>
                    </TouchableOpacity>
                </View>
                <FlatList 
                    data={gitList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.login}
                    style={styles.flatListStyle}
                    ItemSeparatorComponent={() => <Separator />}
                />

            </View>
        </SafeAreaView>
    )
}

export default Home