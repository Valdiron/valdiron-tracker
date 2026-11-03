import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Page, Heading, Card, Action } from '../../src/components/UI';
import { colors } from '../../src/theme';
import { demoAccounts } from '../../src/data/demo';
export default function Monitor() {
  return <Page><ScrollView>
    <Heading eyebrow="Acompanhamento" title="Perfis monitorados" subtitle="Somente fontes conectadas de forma legítima e com autorização válida."/>
    {demoAccounts.map(a=><Card key={a.username}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{backgroundColor:colors.surface2,padding:12,borderRadius:14,marginRight:12}}><Ionicons name="person-circle-outline" size={28} color={colors.blue}/></View>
        <View style={{flex:1}}><Text style={{color:colors.text,fontWeight:'800'}}>{a.username}</Text><Text style={{color:colors.muted,fontSize:11,marginTop:4}}>{a.kind} · {a.status}</Text><Text style={{color:colors.muted,fontSize:10,marginTop:4}}>Último registro: {a.updated}</Text></View>
        <View style={{backgroundColor:'#12352F',paddingHorizontal:8,paddingVertical:5,borderRadius:9}}><Text style={{color:colors.green,fontSize:10,fontWeight:'700'}}>DEMO</Text></View>
      </View>
    </Card>)}
    <Card><Text style={{color:colors.text,fontWeight:'700'}}>Adicionar monitoramento</Text><Text style={{color:colors.muted,fontSize:12,lineHeight:19,marginTop:6}}>A inclusão real será liberada quando houver consentimento registrado e fonte de dados autorizada.</Text><Action title="Como funciona a autorização" secondary onPress={()=>{}}/></Card>
  </ScrollView></Page>;
}
