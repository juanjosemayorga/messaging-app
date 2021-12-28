import React, { useEffect, useState } from 'react'
import CameraRoll from '@react-native-community/cameraroll'
import { Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
  let loading = false;
  let cursor = null;

  useEffect(() => {
    getImages()
  }, [])

  const getImages = async (after) => {
    if (loading) return
    loading = true

    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE

    const hasPermission = await PermissionsAndroid.check(permission)

    const status = await PermissionsAndroid.request(permission)
    if (status !== 'granted') {
      console.log('Camera roll permission denied')
      return
    }

    const results = await CameraRoll.getPhotos({
      first: 30,
      after,
      assetType: 'Photos',
    })

    const {
      edges,
      page_info: { has_next_page, end_cursor },
    } = results

    const loadImages = edges.map(item => item.node.image)

    setState({ images: images.concat(loadImages) })

  }

  const getNextImages = () => {
    if (!cursor) return;
    getImages(cursor)
  }

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
      onEndReached={getNextImages}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});