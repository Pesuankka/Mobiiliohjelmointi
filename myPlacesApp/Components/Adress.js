
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Header, Icon, ListItem } from'react-native-elements';

const db = SQLite.openDatabase('myplaces.db');

function AdressSaver({route, navigation }) {
  const [places, setPlaces] = useState('');
  const [myArea, setMyAreas] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists list (id integer primary key not null, places text);');
    });
    updateList();
  }, []);
  
  //Save item
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into list (places) values (?);', [places]);
    }, null, updateList
    )
    setPlaces('')
  }

  //update list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from list;', [], (_, { rows }) =>
        setMyAreas(rows._array)
      ); 
    });
  }

  // Delete item
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from list where id = ?;`, [id]);
      }, null, updateList
    )    
  }
  
  const navigateToPressed = (item) => {
    navigation.navigate("Map", { itemId: item.id, itemPlaces: item.places });
  };

  return (
    <View style={styles.container}>
        <Input placeholder='Type in places' label="PLACEFINDER" style={{ marginTop: 10, fontSize: 18, width: 200, padding: 10}}
        onChangeText={(places) => setPlaces(places)}
        value={places}/> 
        <View style={{width: '50%'}}>
          <Button buttonStyle={{backgroundColor: '#4e9ffa'}} icon={{ name: "add-location", color: "#fff", size: 25 }} onPress={saveItem} title="SAVE"></Button>
        </View>
        <FlatList  style={styles.flatlist}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ListItem bottomDivider style={{width: '100%'}}>
                <ListItem.Title 
                style={{width: '60%'}}
                >
                {item.places}
                </ListItem.Title>
                <View style={{alignContent: 'flex-end'}}>
                  <Button 
                  titleStyle={{color:'lightgray'}} 
                  type='clear' title="show on map"
                  icon={{name: 'chevron-right', color:'lightgray'}}
                  iconRight={true} 
                  onPress={() => navigateToPressed(item)}
                  onLongPress={() => deleteItem(item.id)}>
                  </Button>
                </View>
            </ListItem>
          )}
          data={myArea} 
        />
    </View>
    
  );
}

export default AdressSaver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   },
   flatlist: {
    marginTop: 30, 
    marginBottom: 10,
   },
});

