import React from 'react';
import { View, Text, ViewStyle, TouchableOpacity } from 'react-native';
import { colors } from '../theme';
export function Page({children}: {children: React.ReactNode}) {
  return <View style={{flex:1, backgroundColor:colors.bg, paddingHorizontal:20, paddingTop:18}}>{children}</View>;
}
export function Heading({eyebrow,title,subtitle}: {eyebrow?:string;title:string;subtitle?:string}) {
  return <View style={{marginBottom:22}}>
    {!!eyebrow && <Text style={{color:colors.blue,fontSize:11,fontWeight:'800',letterSpacing:2,marginBottom:8}}>{eyebrow.toUpperCase()}</Text>}
    <Text style={{color:colors.text,fontSize:27,fontWeight:'800'}}>{title}</Text>
    {!!subtitle && <Text style={{color:colors.muted,fontSize:13,marginTop:7,lineHeight:19}}>{subtitle}</Text>}
  </View>;
}
export function Card({children,style}: {children:React.ReactNode;style?:ViewStyle}) {
  return <View style={[{backgroundColor:colors.surface,borderColor:colors.border,borderWidth:1,borderRadius:18,padding:16,marginBottom:12},style]}>{children}</View>;
}
export function Label({children}: {children:React.ReactNode}) {
  return <Text style={{color:colors.muted,fontSize:12,marginBottom:6}}>{children}</Text>;
}
export function Action({title,onPress,secondary=false}: {title:string;onPress?:()=>void;secondary?:boolean}) {
  return <TouchableOpacity onPress={onPress} style={{backgroundColor:secondary?colors.surface2:'#1D4ED8',borderWidth:1,borderColor:secondary?colors.border:'#2563EB',paddingVertical:14,paddingHorizontal:16,borderRadius:13,alignItems:'center',marginTop:8}}>
    <Text style={{color:colors.text,fontWeight:'700'}}>{title}</Text>
  </TouchableOpacity>;
}
