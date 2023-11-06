import React, { ReactNode } from "react";
import { View } from "react-native";
import { globalColors } from "../global.style";


export default function Separator(){
    
    return <View style={{width: '100%', height: 1, backgroundColor: globalColors.colorPrimary}}/>
}