import styled from 'styled-components/native';
const PostView = styled.View`
  flex-direction: row;
  margin-top: 30px;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;
const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
`;
const PostDetails = styled.View`
  justify-content: center;
  flex: 1;
`;
const PostTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
`;
const PostDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;
//функция которая ограничивает длинну названия анкеты (статьи, новости и т.д.)
const truncateStr = (str) => {
  if (str.length >= 20) {
    return str.substring(0, 20) + '...';
  }
  return str;
};
export const Post = ({ title, imageUrl, createdAt, age }) => {
  return (
    <PostView>
      <PostImage
        source={{
          uri: imageUrl,
        }}
      />
      <PostDetails>
        <PostTitle>{truncateStr(title)}</PostTitle>
        <PostDate>{createdAt}</PostDate>
        <PostDate>{age}</PostDate>
      </PostDetails>
    </PostView>
  );
};
