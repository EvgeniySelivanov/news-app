import React from 'react';
import axios from 'axios';
import styled from 'styled-components/native';
import { format } from 'date-fns';
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


const PostView = styled.View`
  /* flex-direction: row; */
  justify-content:'center';
  margin-top: 30px;
  padding: 15px;
  border-width: 1px;
  border-color: rgb(154, 5, 5);
  border-style: solid;
`;
const PostText = styled.Text`
  flex-direction: row;
  text-align:center;
  padding: 15px;
  border-width: 3px;
  border-color: rgb(187, 242, 8);
  border-style: solid;
  border-radius: 9px;
  background-color:black;
  color:rgb(187, 242, 8);
  font-weight: 700;
  font-size: 18px;

`;
export const HomeScreen = ({ navigation }) => {
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
    return <Loading />;
  }
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('WebViewScreen')}>
        <PostView>
          <PostText>Go to Facebook with WebView</PostText>
        </PostView>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FootballField')}>
        <PostView>
          <PostText>Go to FootballField</PostText>
        </PostView>
      </TouchableOpacity>
    {/* //FlatList обеспечивает скрол */}

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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FullPost', {
                title: item.name.title,
                firstName: item.name.first,
                lastName: item.name.last,
                imageUrl: item.picture.large,
                createdAt: item.dob.date.substring(0, 10),
                age: item.dob.age,
              })
            }
          >
            <Post
              title={item.name.first}
              imageUrl={item.picture.thumbnail}
              createdAt={item.dob.date.substring(0, 10)}
              age={item.dob.age}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
