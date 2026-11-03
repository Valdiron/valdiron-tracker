import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Page, Heading, Card } from '../../src/components/UI';
import { colors } from '../../src/theme';
export default function Reports() {
  return <Page><ScrollView>
    <Heading eyebrow="Documentação" title="Relatórios" subtitle="Organize análises, fontes consultadas e eventos registrados."/>
    <Card>
      <Ionicons name="document-text-outline" size={30} color={colors.blue}/>
      <Text style={{color:colors.text,fontSize:16,fontWeight:'800',marginTop:12}}>Relatórios de investigação</Text>
      <Text style={{color:colors.muted,fontSize:12,lineHeight:20,marginTop:6}}>Os relatórios exportáveis em PDF serão habilitados após a conexão do backend. Cada conclusão deverá apontar sua fonte e data de coleta.</Text>
    </Card>
    <Card>
      <Text style={{color:colors.text,fontWeight:'700'}}>Modelo de relatório</Text>
      <Text style={{color:colors.muted,fontSize:12,lineHeight:20,marginTop:7}}>• Identificação do perfil{"\n"}• Escopo e autorização{"\n"}• Fontes permitidas{"\n"}• Eventos observados{"\n"}• Indicadores e limitações da análise{"\n"}• Data e responsável</Text>
    </Card>
  </ScrollView></Page>;
}
