import React, { useRef,useState,useEffect } from 'react';
import { View,Text,StyleSheet,  TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import Goalkeeper from '../components/Goalkeeper';

const Field = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const StyledText = styled.Text`
  position: absolute;
  top: 400;
  left: 5px;
  color: #f6ff00;
  font-size: 50px;
  font-weight: 700;
`;

export const FootballField = () => {
  let gameState=true;
  const [childValue, setChildValue] = useState('');
  
 

  const handleChildValueChange = (value) => {
    setChildValue(value);
  };

  
  const ballPosition = useRef(new Animated.ValueXY({ x: 180, y: 300 })).current;

  const moveBallToGoal = () => {
    gameState=true;
    ballPosition.setValue({ x: 180, y: 300 });
    Animated.timing(ballPosition, {
      toValue: { x: Math.floor(Math.random() * (230 - 110 + 1)) + 110, y: 30 }, // Координаты ворот
      duration: 2500,
      useNativeDriver: false,
    }).start();
   
  };
  const ballX = ballPosition.x._value; // Получаем текущие координаты мяча по X
  const ballY = ballPosition.y._value; // Получаем текущие координаты мяча по Y
  const ballWidth = 30;
  const ballHeight =30;
  const blockX =childValue  /*X координаты другого блока */;
  const blockY = 68;
  const blockWidth = 50;
  const blockHeight = 50;
if( ballX >= blockX &&
  ballX <= blockX + blockWidth &&
  ballY >= blockY &&
  ballY <= blockY + blockHeight){
    score+=1;
    moveBallToGoal();
  }else if(
    ballY + ballHeight < blockY  
  ){
    score=0;
    gameState=false;
    
   
  }

  return (
    <Field
      source={{
        uri: 'https://img.freepik.com/free-vector/soccer-green-field_225004-1137.jpg?w=740&t=st=1691660062~exp=1691660662~hmac=f44980c3cd82ce465db7059e7b945e5f2f41b49e69f29bf80097a94e1f0b8e85',
      }}
      resizeMode="cover"
    >
      <Animated.View style={[styles.ball, ballPosition.getLayout()]} />
      <TouchableOpacity onPress={moveBallToGoal}>
        <View style={styles.button}>
          {gameState?<Text style={styles.buttonText}>Start game</Text>:<Text style={styles.buttonGameOver}>Game Over {`\n`}Press to start</Text>}
        </View>
      </TouchableOpacity>
      <Goalkeeper onValueChange={handleChildValueChange}/>
      <StyledText>Score:{score}</StyledText>
    </Field>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    position:'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  button: {
    // position:'absolute',
    // left:-45,
    // top:60,
    marginTop: 20,
    backgroundColor: 'black',
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
  buttonGameOver: {
    color: 'white',
    fontSize:20,
    color:'red',
  },
});