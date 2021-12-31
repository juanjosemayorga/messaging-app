import React, { useEffect, useState } from 'react'
import { Keyboard, View, Platform } from 'react-native';

interface KeyboardStateProps {
  layout: ILayoutProps;
  children: () => {};
}

interface ILayoutProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IKeyboardState {

}

const INITIAL_ANIMATION_DURATION = 250;

export const KeyboardState = ({ layout, children }: KeyboardStateProps) => {
  const { x, y, width, height } = layout;
  let subscriptions: any[] = [];

  const initialState = {
    contentHeight: height,
    keyboardHeight: 0,
    keyboardVisible: false,
    keyboardWillShow: false,
    keyboardWillHide: false,
    keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
  };

  const [state, setState] = useState(initialState)

  useEffect(() => {

    if (Platform.OS === 'ios') {
      subscriptions = [
        Keyboard.addListener('keyboardWillShow', keyboardWillShow),
        Keyboard.addListener('keyboardWillHide', keyboardWillHide),
        Keyboard.addListener('keyboardDidShow', keyboardDidShow),
        Keyboard.addListener('keyboardDidHide', keyboardDidHide),
      ];
    } else {
      subscriptions = [
        Keyboard.addListener('keyboardDidHide', keyboardDidHide),
        Keyboard.addListener('keyboardDidShow', keyboardDidShow),
      ];
    }

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    }

  }, []);

  const keyboardWillShow = (event: any) => {
    setState({
      ...state,
      keyboardWillShow: true,
    })
  }

  const keyboardDidShow = (event: any) => {
    setState({
      ...state,
      keyboardVisible: true,
      keyboardWillShow: false,
    })
  }

  const keyboardWillHide = (event: any) => {
    setState({
      ...state,
      keyboardWillHide: true,
    })
  }

  const keyboardDidHide = (event: any) => {
    setState({
      ...state,
      keyboardVisible: false,
      keyboardWillHide: false,
    })
  }

  return (
    <View>
      
    </View>
  )
}
