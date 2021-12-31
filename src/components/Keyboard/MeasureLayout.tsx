import React, { useState } from 'react'
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { View, Platform, StyleSheet } from 'react-native';

interface MeasureLayoutProps {
  children: (layout: any) => {};
}

interface MeasureLayoutState {
  layout: any;
}

const initialState: MeasureLayoutState = {
  layout: null,
};

export const MeasureLayout = ({ children }: MeasureLayoutProps) => {

  const [{ layout }, setState] = useState<MeasureLayoutState>(initialState)

  const handleLayout = (event: any) => {
    const { nativeEvent: { layout } } = event;

    setState({
      layout: {
        ...layout,
        y:
          layout.y +
          (Platform.OS === 'android' ? getStatusBarHeight() : 0),
      }
    });
  }

  if (!layout) {
    return (
      <View onLayout={handleLayout} style={styles.container} />
    )
  }

  return children(layout)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});