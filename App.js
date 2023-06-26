import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import { useEffect } from 'react';
import key from './services/Keys';
import api from './services/Api';
const Separator = () => <View style={styles.separator} />;

export default function App() {
  const [infos, setInfos] = useState(<>
    <Text style={styles.title}>CAMPEONATOS</Text>
    <Text style={styles.subtitle}>Carregando...</Text>
  </>); 


  function sl_tabela(id){

        api.get("/campeonatos/" + id + "/tabela", {
            headers: {
                Authorization: key
            }
        }).then((response) => {
            d = response.data;
            console.log(d)
            var jsx = (
                <>
                  <Text style={styles.title}>Tabela</Text>
                  {d.map((element,i) =>{
                    return(<>
                      <Button onPress={() => {time(element)}} key={"po" + i} style={styles.button} title={element.posicao + " - " + element.time.nome_popular}></Button>
                      <Separator key={"se" + i}></Separator>
                    </>);
                  })}
                  
                  <Button title="Voltar" onPress={() => {camp_load()}}></Button>
                </>
            );
            setInfos(jsx);
        }).catch((err) => {
            console.log(err);
        });
  }

  function time(time){
    var message = "Pontos:" + time.pontos + "\n"+
    "Gols: " + time.gols_pro + "\n"+
    "Vitorias: " + time.vitorias + "\n" + 
    "Derrotas: " + time.derrotas;
    Alert.alert(time.time.nome_popular, message)
  }

  function camp_load(){
    api.get("/campeonatos", {
      headers: {
          Authorization: key
      }
  }).then((response) => {
      var d = response.data;
      var jsx = (<>
        <Text style={styles.title}>CAMPEONATOS</Text>
        {d.map((element, i) => {
          return(<>
            {console.log(element)}
            <Button onPress={() =>{sl_tabela(element.campeonato_id)}} key={"camp"+i} title={element.nome_popular}></Button>
            <Separator key={"sep" + i}></Separator>
          </>)
        })}
      </>);
      setInfos(jsx);
  }).catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }
  function ls_campeonato(){
    useEffect(() => {
       camp_load();
    }, []);
  }
  ls_campeonato();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {infos}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    padding:10,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  title:{
    fontSize: 30,
    margin: 10,
  },
  subtitle:{
    fontSize:15,
    textAlign: 'left',
    padding:10,
  },
  button:{
    paddingVertical:10,
    textAlign:'left',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
