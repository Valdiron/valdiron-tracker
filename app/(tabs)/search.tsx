import React, {useState} from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Page, Heading, Card, Action } from '../../src/components/UI';
import { colors } from '../../src/theme';
export default function Search() {
  const [handle,setHandle] = useState('');
  const [searched,setSearched] = useState(false);
  const clean = handle.trim().replace(/^@/,'');
  return <Page><ScrollView keyboardShouldPersistTaps="handled">
    <Heading eyebrow="Descoberta" title="Buscar perfil" subtitle="Pesquise um identificador para iniciar uma análise de dados públicos ou autorizados."/>
    <Card>
      <Text style={{color:colors.text,fontWeight:'700',marginBottom:10}}>Nome de usuário do Instagram</Text>
      <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#0A1221',borderColor:colors.border,borderWidth:1,borderRadius:12,paddingHorizontal:12}}>
        <Text style={{color:colors.muted,fontSize:16}}>@</Text>
        <TextInput value={handle} onChangeText={v=>{setHandle(v);setSearched(false)}} placeholder="usuario" placeholderTextColor="#64748B" autoCapitalize="none" style={{color:colors.text,padding:14,flex:1}}/>
      </View>
      <Action title="Pesquisar perfil" onPress={()=>setSearched(true)}/>
    </Card>
    {searched && <Card>
      <Ionicons name="information-circle-outline" size={26} color={colors.blue}/>
      <Text style={{color:colors.text,fontWeight:'800',fontSize:16,marginTop:8}}>{clean ? '@'+clean : 'Digite um usuário'}</Text>
      <Text style={{color:colors.muted,lineHeight:20,marginTop:6}}>{clean ? 'A busca real será ativada após configurar o backend e as permissões oficiais da Meta. Esta versão não consulta nem coleta dados do Instagram.' : 'Informe um nome de usuário para continuar.'}</Text>
    </Card>}
    <Card>
      <Text style={{color:colors.text,fontWeight:'700'}}>Acesso responsável</Text>
      <Text style={{color:colors.muted,lineHeight:20,fontSize:12,marginTop:7}}>Contas privadas exigem autorização e um meio de acesso permitido pela plataforma. O app não solicita senha do Instagram e não tenta contornar privacidade.</Text>
    </Card>
  </ScrollView></Page>;
}
