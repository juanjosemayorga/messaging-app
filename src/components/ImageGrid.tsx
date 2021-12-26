import React, { useEffect, useState } from 'react'
import CameraRoll from '@react-native-community/cameraroll'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Grid } from './Grid';
import { ImageGridItem, ImageItem } from '../interfaces/interfaces';

interface ImageGridProps {
  onPressImage?: () => void;
}

const initialState = {
  images: [
    {uri: 'https://picsum.photos/600/600?image=10'},
    {uri: 'https://picsum.photos/600/600?image=20'},
    {uri: 'https://picsum.photos/600/600?image=30'},
    {uri: 'https://picsum.photos/600/600?image=40'},
  ],
};

const keyExtractor = ({ uri }: ImageItem): string => uri

export const ImageGrid = ({
  onPressImage = () => { /* This is an intentional empty function */ },
}: ImageGridProps) => {

  const [{ images }, setState] = useState(initialState)

  const renderItem = ({
    item: { uri },
    size,
    marginTop,
    marginLeft
  }: ImageGridItem) => {

    const style = {
      width: size,
      height: size,
      marginTop,
      marginLeft,
    }

    return (
      <Image source={{ uri }} style={style} />
    )
  }

  return (
    <Grid
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});