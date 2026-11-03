import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Page, Heading, Card } from '../../src/components/UI';
import { colors } from '../../src/theme';
const rows = [
  ['shield-checkmark-outline','Privacidade e autorizações','Consentimentos, escopo e revogação'],
  ['notifications-outline','Notificações','Preferências de alertas'],
  ['lock-closed-outline','Segurança','Sessões e proteção da conta'],
  ['information-circle-outline','Sobre o aplicativo','Valdiron Tracker · versão 1.0']
] as const;
export default function Settings() {
  return <Page><ScrollView>
    <Heading eyebrow="Configurações" title="Ajustes" subtitle="Controle sua conta, segurança e preferências."/>
    {rows.map(([icon,title,desc])=><Card key={title}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Ionicons name={icon} size={23} color={colors.blue}/>
        <View style={{marginLeft:13,flex:1}}><Text style={{color:colors.text,fontWeight:'700'}}>{title}</Text><Text style={{color:colors.muted,fontSize:11,marginTop:4}}>{desc}</Text></View>
        <Ionicons name="chevron-forward" size={18} color={colors.muted}/>
      </View>
    </Card>)}
    <Text style={{color:colors.muted,fontSize:11,lineHeight:18,marginTop:6}}>As integrações externas serão ativadas somente após configuração segura no servidor. Nunca informe sua senha do Instagram neste aplicativo.</Text>
  </ScrollView></Page>;
}
