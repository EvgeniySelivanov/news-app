import React from 'react';
import axios from 'axios';
import {  format } from 'date-fns'
import {
  Text,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Post } from '../components/Post';
import { Loading } from '../components/Loading';


export const HomeScreen = ({navigation}) => {

  const [items, setItems] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://randomuser.me/api/?results=12&inc=name,dob,picture')
      .then(({ data }) => {
        setItems(data.results);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Error', 'Ошибка при получении юзеров');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return(
   <Loading/>);
  }
  return (
    //FlatList обеспечивает скрол
    <View>
      <FlatList
      //обновление страницы при перемотке вниз refreshControl
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
        } 
        data={items}
        //не забудь деструктуризацию
        renderItem={({ item }) => (
          //переход по нажатии на человека в его анкету
          //передаю параметры (похоже на пропсы)
          <TouchableOpacity onPress={() =>navigation.navigate('FullPost',{
            title:item.name.title,
            firstName:item.name.first,
            lastName:item.name.last,
            imageUrl:item.picture.large,
            createdAt:item.dob.date.substring(0,10),
            age:item.dob.age
            })}>
            <Post
              title={item.name.first}
              imageUrl={item.picture.thumbnail}
              createdAt={item.dob.date.substring(0,10)}
              age={item.dob.age}
            />
          </TouchableOpacity>
        )}
      />
     
    </View>
  );
};
