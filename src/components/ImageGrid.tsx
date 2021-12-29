import React, { useEffect, useState } from 'react'
import CameraRoll from '@react-native-community/cameraroll'
import { Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Grid } from './Grid';
import { ImageGridItem, ImageItem } from '../interfaces/interfaces';

interface ImageGridProps {
  onPressImage?: () => void;
}

interface ImageGridState {
  images: ImageItem[];
  loading: boolean;
  cursor: any;
}

const initialState = {
  images: [],
  loading: false,
  cursor: null,
};

const keyExtractor = ({ uri }: ImageItem): string => uri
// const keyExtractor = (objetito: any): string => {
//   console.log(objetito.uri);
//   return objetito.uri;
// }

export const ImageGrid = ({
  onPressImage = () => { /* This is an intentional empty function */ },
}: ImageGridProps) => {

  const [state, setState] = useState<ImageGridState>(initialState)
  const {images, loading, cursor} = state
  // let loading: boolean = false;
  // let cursor = null;

  useEffect(() => {
    console.log('Se volvió a renderizar la pantalla');
    getImages()
  }, [])

  const getImages = async (after) => {

    // console.log('after ', after)
    // console.log('typeof after ', typeof after);

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
      first: 30,
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
    console.log('getNextImages called!')
    console.log('cursor ', cursor)

    if (!cursor) return;
    getImages(cursor)
  }

  useEffect(() => {
    console.log('images ', state.images.length);
  }, [images])

  useEffect(() => {
    console.log('cursor ', state.cursor);
  }, [cursor]);

  useEffect(() => {
    console.log('loading ', state.loading);
  }, [loading]);

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