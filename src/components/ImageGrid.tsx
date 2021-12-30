import React, { useEffect, useState } from 'react'
import CameraRoll from '@react-native-community/cameraroll'
import { Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Grid } from './Grid';
import { ImageGridItem, ImageItem } from '../interfaces/interfaces';

interface ImageGridProps {
  onPressImage?: (uri: string) => void;
}

interface ImageGridState {
  images: ImageItem[];
  loading: boolean;
  cursor: string | null | undefined;
}

const initialState = {
  images: [],
  loading: false,
  cursor: null,
};

const keyExtractor = ({ uri }: ImageItem): string => uri

export const ImageGrid = ({
  onPressImage = () => { /* This is an intentional empty function */ },
}: ImageGridProps) => {

  const [state, setState] = useState<ImageGridState>(initialState)
  const {images, loading, cursor} = state

  useEffect(() => {
    getImages()
  }, [])

  const getImages = async (after?: string | undefined) => {

    if (loading) return
    setState({ ...state, loading: true })

    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE

    const hasPermission = await PermissionsAndroid.check(permission)

    const status = await PermissionsAndroid.request(permission)
    if (status !== 'granted') {
      console.log('Camera roll permission denied')
      return
    }

    const results = await CameraRoll.getPhotos({
      first: 32,
      after,
      assetType: 'Photos',
    })

    const {
      edges,
      page_info: { has_next_page, end_cursor },
    } = results

    const loadImages = edges.map(item => item.node.image)

    setState({
      images: images.concat(loadImages),
      loading: false,
      cursor: has_next_page ? end_cursor : null,
    })

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
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image source={{ uri }} style={style} />
      </TouchableOpacity>
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