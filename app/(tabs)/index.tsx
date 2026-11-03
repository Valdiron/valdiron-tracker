import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Page, Heading, Card } from '../../src/components/UI';
import { colors } from '../../src/theme';
import { demoStats, demoAlerts } from '../../src/data/demo';
export default function Dashboard() {
  return <Page><ScrollView showsVerticalScrollIndicator={false}>
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:26}}>
      <View><Text style={{color:colors.text,fontSize:19,fontWeight:'900',letterSpacing:1}}>VALDIRON <Text style={{color:colors.blue}}>TRACKER</Text></Text><Text style={{color:colors.muted,fontSize:10,letterSpacing:2,marginTop:3}}>INTELLIGENCE PLATFORM</Text></View>
      <View style={{backgroundColor:colors.surface2,padding:11,borderRadius:14}}><Ionicons name="scan-eye-outline" size={25} color={colors.blue}/></View>
    </View>
    <Heading eyebrow="Visão geral" title="Painel de controle" subtitle="Acompanhe atividades autorizadas e análises em um só lugar."/>
    <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
      {demoStats.map((s)=><Card key={s.label} style={{width:'31%',padding:11,minHeight:112}}>
        <Ionicons name={s.icon} size={20} color={s.color}/>
        <Text style={{color:colors.text,fontSize:23,fontWeight:'800',marginTop:12}}>{s.value}</Text>
        <Text style={{color:colors.muted,fontSize:10,lineHeight:14,marginTop:4}}>{s.label}</Text>
      </Card>)}
    </View>
    <Text style={{color:colors.text,fontSize:17,fontWeight:'800',marginTop:10,marginBottom:12}}>Atividade recente</Text>
    {demoAlerts.map((a)=><Card key={a.title}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{width:9,height:9,borderRadius:5,backgroundColor:a.color,marginRight:12}}/>
        <View style={{flex:1}}><Text style={{color:colors.text,fontWeight:'700'}}>{a.title}</Text><Text style={{color:colors.muted,fontSize:11,marginTop:4}}>{a.detail}</Text></View>
        <Text style={{color:colors.muted,fontSize:10}}>{a.time}</Text>
      </View>
    </Card>)}
    <Text style={{color:colors.amber,fontSize:11,lineHeight:17,marginTop:6,marginBottom:24}}>Modo demonstração: os números e eventos exibidos são fictícios. Nenhum perfil está sendo consultado.</Text>
  </ScrollView></Page>;
}
