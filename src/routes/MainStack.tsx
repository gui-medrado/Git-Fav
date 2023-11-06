import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Splash from "../pages/Splash";
import Welcome from "../pages/Welcome";
import Home from "../pages/Home";
import SingleUser from "../pages/SingleUser";
import { GitItemTypes } from "../utils/components/GitItem";


type StackParamsList ={
    Splash: undefined,
    Welcome: undefined,
    Home: undefined,
    SingleUser: GitItemTypes
}

export type StackTypes = NativeStackNavigationProp<StackParamsList>
const Stack = createNativeStackNavigator<StackParamsList>();

const MainStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen component={Splash} name="Splash" options={{headerShown: false}}/>
            <Stack.Screen component={Welcome} name="Welcome" options={{headerShown: false}}/>
            <Stack.Screen component={Home} name="Home" options={{headerShown: false}}/>
            <Stack.Screen component={SingleUser} name="SingleUser" options={{
                headerBackTitle: undefined,
                headerBackTitleVisible: false,
                headerTitle: '',
                headerTintColor: '#fff',
                headerStyle: {backgroundColor: '#000'}
            }}/>
        </Stack.Navigator>
    )
}

export default MainStack