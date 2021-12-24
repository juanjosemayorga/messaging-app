import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface ToolbarProps {
  isFocused: boolean;
  onChangeFocus?: (value: boolean) => void;
  onSubmit?: (text: string) => void;
  onPressCamera?: () => void;
  onPressLocation?: () => void;
}

interface ToolbarButtonProps {
  title: string;
  onPress: () => void;
}

interface IToolbarState {
  text: string;
}

const initialState = {
  text: '',
}

const ToolbarButton = ({title, onPress}: ToolbarButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

export const Toolbar = ({
  isFocused,
  onChangeFocus = () => { /* This is an intentional empty function */ },
  onSubmit = () => { /* This is an intentional empty function */ },
  onPressCamera = () => { /* This is an intentional empty function */ },
  onPressLocation = () => { /* This is an intentional empty function */ },
}: ToolbarProps) => {

  const [{ text }, setState] = useState<IToolbarState>(initialState)
  const inputRef = useRef(null)

  const handleChangeText = (text: string) => {
    setState({ text })
  }

  const handleSubmitEditing = () => {
    if (!text) return;

    onSubmit(text);
    setState(initialState);
  }

  const handleFocus = () => {
    onChangeFocus(true);
  }

  const handleBlur = () => {
    onChangeFocus(false);
  }

  return (
    <View style={styles.toolbar}>
      <ToolbarButton title={'📷'} onPress={onPressCamera} />
      <ToolbarButton title={'📍'} onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Type something"
          placeholderTextColor="#999"
          blurOnSubmit={false}
          value={text}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
  },
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: 'grey',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  // ...
});