import React, { useState } from 'react';
import styled from 'styled-components/native';

import { View, StyleSheet, PanResponder, ImageBackground } from 'react-native';

const bgImage = require('../assets/goalkeeper.png');

const Goalkeeper = ({ xValueChange }) => {
  const [position, setPosition] = useState({ x: 175, y: 590 });
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      xValueChange(gesture.moveX);
      if (gesture.moveX >= 110 && gesture.moveX <= 240)
        setPosition({
          x: gesture.moveX,
        });
    },
  });
  return (
    <View
      style={[styles.draggable, { left: position.x, top: 590 }]}
      {...panResponder.panHandlers}
    >
      <ImageBackground source={bgImage} style={styles.containerImg}>
        {/* Контент компонента */}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  draggable: {
    position: 'absolute',
    width: 50,
    height: 50,
    zIndex:10,
  },
  containerImg: {
    width: 50,
    height: 50,
  },
});
export default Goalkeeper;
