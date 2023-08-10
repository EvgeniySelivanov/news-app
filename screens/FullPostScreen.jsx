import React from 'react';
import axios from 'axios';

import styled from 'styled-components/native';
import { View } from 'react-native';
import { Loading } from '../components/Loading';

const PostImage = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;
const PostTitle = styled.Text`
  font-size: 24px;
  /* margin-bottom:5px; */
  font-weight: 700;
`;

export const FullPostScreen = ({ route, navigation }) => {
  //достаю параметры
  const { title, firstName, lastName, imageUrl, createdAt, age } = route.params;
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    //в заголовок идет имя человека чью анкету открыли
    navigation.setOptions({
      title: firstName + ` card`,
    });
  }, []);

  if (false) {
    return (
      <View>
        <Loading />
      </View>
    );
  }
  return (
    <View style={{ padding: 20 }}>
      <PostImage
        source={{
          uri: imageUrl,
        }}
      />
      <PostTitle>
        {title}. {firstName} {lastName}.{'\n'}
        Birthday: {createdAt} {'\n'}
      </PostTitle>
      <PostText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus eos
        rerum nisi quisquam in beatae. Rem maiores natus tenetur, quo ut ab?
        Sunt rem quas nobis suscipit, veniam ipsa in.
      </PostText>
    </View>
  );
};
