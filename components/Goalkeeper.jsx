import React, { useState } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';


const Goalkeeper = ({ onValueChange }) => {
  const [position, setPosition] = useState({ x: 110, y: 58 });
  const [inputValue, setInputValue] = useState('');
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      onValueChange(gesture.moveX);
      if(gesture.moveX>=110&&gesture.moveX<=230)
      setPosition({
        x: gesture.moveX,
      });
    },
  });
  return (
    <View
      style={[styles.draggable, { left: position.x, top: 68 }]}
      {...panResponder.panHandlers}
    >
      {/* Компонент, который вы хотите передвигать */}
    </View>
  );
}
const styles = StyleSheet.create({
  draggable: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'blue',
  },
});
export default Goalkeeper;
