import React, { useState } from 'react';
import { Platform, StyleSheet, StatusBar, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface IStatusState {
  isConnected: boolean | null;
}

const statusHeight =
  (Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(true))

const initialState = {
  isConnected: false,
}

export const Status = () => {

  const [{ isConnected }, setState] = useState<IStatusState>(initialState);
  const backgroundColor = isConnected ? 'white' : 'red'

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
    />
  )

  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents={'none'}>
      {statusBar}
      {!isConnected && (
        <View style={styles.bubble}>
          <Text style={styles.text}>No network connection</Text>
        </View>
      )}
    </View>
  )

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.status, { backgroundColor }]}></View>
    )
  }

  return messageContainer;
}

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});
