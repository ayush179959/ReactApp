import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  Alert,
  Keyboard,
  Image,
} from 'react-native';

import React, {cloneElement, useState} from 'react';

const App = () => {
  const [item, setItem] = useState('');
  const [itemArray, addItemArray] = useState([
    {name: 'aryaman', completed: false},
  ]);

  const onPressBtn = () => {
    if (item == null) {
      Alert.alert('lode', 'chutiya samajh rakha hai?');
    } else {
      const newItem = {
        id: Math.random(),
        name: item,
        completed: false,
      };
      addItemArray([...itemArray, newItem]);

      setItem(null);
    }
  };
  const deleteItems = itemit => {
    const newItems = itemArray.filter(item => item.id != itemit);
    addItemArray(newItems);
  };

  const taskCompleted = itemid => {
    const newItem = itemArray.map(item => {
      if (item.id == itemid) {
        if (item.completed) {
          return {...item, completed: false};
        } else {
          return {...item, completed: true};
        }
      }
      return item;
    });
    addItemArray(newItem);
  };

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
      }}>
      <View style={styles.header}>
        <Text style={{fontSize: 30, color: 'black'}}>Activities</Text>
        <Text style={{paddingTop: 20, color: 'grey'}}>
          To add new activity, type in the bar below and click the add icon
        </Text>
      </View>
      <View id="listview" style={{flex: 1}}>
        {/* This part lists all the events */}

        <FlatList
          data={itemArray}
          renderItem={({item}) => (
            <View
              style={{
                height: 50,
                marginTop: 20,
                justifyContent: 'center',
                paddingLeft: 20,
                borderRadius: 36,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: item?.completed ? 'grey' : 'white',
                elevation: 0,
                borderWidth: 0.1,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                  flex: 1.8,
                }}>
                {item?.name}
              </Text>
              <TouchableOpacity
                style={{
                  height: '100%',
                  flex: 0.4,
                  marginRight: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => taskCompleted(item.id)}>
                <Image source={require('./icons/done.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.4,
                  height: '100%',
                  marginRight: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => deleteItems(item.id)}>
                <Image source={require('./icons/delete.png')} />
              </TouchableOpacity>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View id="footer" style={{flexDirection: 'row', marginTop: 5}}>
        <TextInput
          placeholder="Enter your tasks"
          style={{
            borderWidth: 0,
            backgroundColor: 'white',
            borderRadius: 36,
            paddingHorizontal: 20,
            flex: 1.5,
            elevation: 10,
          }}
          value={item}
          onChangeText={text => setItem(text)}
        />

        <TouchableOpacity
          style={{
            flex: 0.3,
            borderWidth: 0,
            borderRadius: 50,
            marginLeft: 20,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            elevation: 10,
          }}
          onPress={() => onPressBtn()}>
          <Image source={require('./icons/add.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 5,
  },
});

export default App;
