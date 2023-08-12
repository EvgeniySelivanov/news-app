import React, { useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import Goalkeeper from '../components/Goalkeeper';
const BALL_POSITION={
  x: 178, y: 388, 
}
const STEP_DURATION=50;


const Field = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: start;
`;
const StyledText = styled.Text`
  position: absolute;
  top: 100px;
  left: 5px;
  color: #f6ff00;
  font-size: 50px;
  font-weight: 700;
`;
const initialGameState = {
  score: 0,
  game: true,
  xGoalkeeperPosition: 175,
  durationSpeed: 2500,
};
export const FootballField = () => {
  const [dataGame, setGame] = useState(initialGameState);

  const goalkeeperValueChange = (value) => {
    setGame((dataGame) => ({ ...dataGame, xGoalkeeperPosition: value }));
  };

  const ballPosition = useRef(new Animated.ValueXY(BALL_POSITION)).current;

  const moveBallToGoal = () => {
    setGame((dataGame) => ({ ...dataGame, game: initialGameState.game }));
    if (dataGame.durationSpeed >= 300) {
      setGame((dataGame) => ({
        ...dataGame,
        durationSpeed: dataGame.durationSpeed - STEP_DURATION,
      }));
    }
    ballPosition.setValue(BALL_POSITION);
    Animated.timing(ballPosition, {
      toValue: { x: Math.floor(Math.random() * (230 - 110 + 1)) + 110, y: 710 }, // Координаты ворот
      duration: dataGame.durationSpeed,
      useNativeDriver: false,
    }).start();
  };

  const checkReboundBall = () => {
    setGame((dataGame) => ({ ...dataGame, score: dataGame.score + 1 }));
  };
  const checkDontReboundBall = () => {
    setGame((dataGame) => ({
      ...dataGame,
      score: initialGameState.score,
      durationSpeed: initialGameState.durationSpeed,
      game: false,
      
    }));
  };
  const ballX = ballPosition.x._value; // Получаем текущие координаты мяча по X
  const ballY = ballPosition.y._value; // Получаем текущие координаты мяча по Y
  const ballWidth = 30; //диаметр шара
  const ballHeight = 30;
  const blockX = dataGame.xGoalkeeperPosition; /*X координата вратаря */
  const blockY = 640; //Y координата вратаря
  const blockWidth = 50; //габарит вратаря
  const blockHeight = 50;

  if (
    ballX >= blockX - ballWidth &&
    ballX <= blockX + blockWidth &&
    ballY >= blockY - ballWidth &&
    ballY <= blockY + blockHeight
  ) {
    checkReboundBall();
    moveBallToGoal();
  } else if (ballY > blockY + blockHeight) {
    ballPosition.setValue(BALL_POSITION);
    checkDontReboundBall();
  }

  return (
    <Field
      source={{
        uri: 'https://img.freepik.com/free-vector/soccer-green-field_225004-1137.jpg?w=740&t=st=1691660062~exp=1691660662~hmac=f44980c3cd82ce465db7059e7b945e5f2f41b49e69f29bf80097a94e1f0b8e85',
      }}
      resizeMode="cover"
    >
      <TouchableOpacity onPress={moveBallToGoal}>
        <View style={styles.button}>
          {dataGame.game ? (
            <Text style={styles.buttonText}>Start game</Text>
          ) : (
            <Text style={styles.buttonGameOver}>
              Game Over {`\n`}Press to start
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <Goalkeeper xValueChange={goalkeeperValueChange} />
      <StyledText>Score:{dataGame.score}</StyledText>
      <Animated.View style={[styles.ball, ballPosition.getLayout()]} />
    </Field>
  );
};

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor:  "white",
  },
  button: {
    position: 'absolute',
    top:90,
    left:20,
    backgroundColor: 'black',
    padding: 20,
    borderRadius:15,
  },
  buttonText: {
    color: 'white',
  },
  buttonGameOver: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    color: 'red',
  },
});
