import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Alert, Image, TouchableHighlight, BackHandler, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import { MessageList } from './src/components/MessageList'
import { Status } from './src/components/Status'
import { Toolbar } from './src/components/Toolbar';
import { ImageGrid } from './src/components/ImageGrid';
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage
} from './src/utils/messageUtils'

// TODO: To type the state of the component
const initialState = {
  fullscreenImageId: null,
  isInputFocused: false,
  messages: [
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('World'),
    createTextMessage('Hello'),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324,
    }),
  ],
}

const App = () => {

  const [state, setState] = useState(initialState)
  const { messages, fullscreenImageId, isInputFocused } = state

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (fullscreenImageId) {
        dismissFullscreenImage()
        return true
      }
      return false
    })

    return () => subscription.remove()
  }, [fullscreenImageId])

  const dismissFullscreenImage = () => {
    setState({
      ...state,
      fullscreenImageId: null,
    })
  }

  const handlePressToolbarCamera = () => {
    console.log('handlePressToolbarCamera')
  }

  const handlePressToolbarLocation = () => {
    Geolocation.getCurrentPosition((position) => {
      const { coords: { latitude, longitude } } = position

      setState({
        ...state,
        messages: [
          createLocationMessage({ latitude, longitude }),
          ...messages,
        ]
      })
    })
  }

  const handleChangeFocus = (isFocused: boolean) => {
    console.log('handleChangeFocus', isFocused)
    setState({
      ...state,
      isInputFocused: isFocused,
    })
  }

  const handleSubmit = (text: string) => {
    setState({
      ...state,
      messages: [createTextMessage(text), ...messages],
    })
  }

  const handlePressImage = (uri: string) => {
    setState({
      ...state,
      messages: [createImageMessage(uri), ...messages],
    })
  }

  const handlePressMessage = ({ id, type }: any) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                setState({
                  ...state,
                  messages: messages.filter(message => message.id !== id),
                })
              }
            }
          ]
        )
        break;
      case 'image':
        setState({
          ...state,
          fullscreenImageId: id,
          isInputFocused: false
        })
        break;

      default:
        break;
    }
  }

  const renderFullscreenImage = () => {
    if (!fullscreenImageId) return null

    const image = messages.find(message => message.id === fullscreenImageId)

    if (!image) return null
    const { uri } = image

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={dismissFullscreenImage}
      >
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    )
  }

  const renderMessageList = () => {
    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={handlePressMessage}
        />
      </View>
    )
  }

  const renderInputMethodEditor = () => {
    return (
      <View style={styles.inputMethodEditor}>
        <ImageGrid onPressImage={handlePressImage} />
      </View>
    )
  }

  const renderToolbar = () => {
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={handleSubmit}
          onChangeFocus={handleChangeFocus}
          onPressCamera={handlePressToolbarCamera}
          onPressLocation={handlePressToolbarLocation}
          />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Status />
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
      {renderFullscreenImage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default App
