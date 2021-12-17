import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView from 'react-native-maps'

import { Message } from '../interfaces/interfaces'

interface MessageListProps {
  messages: Message[];
  onPressMessage: (item: any) => void;
}

export const MessageList = ({
  messages,
  onPressMessage = () => { /* This is an intentional empty function */ }
}: MessageListProps) => {

  const keyExtractor = (item: any) => item.id.toString();

  const renderMessageItem = ({ item }: any) => {
    return (
      <View key={item.id} style={styles.messageRow}>
        <TouchableOpacity onPress={() => onPressMessage(item)}>
          {}
        </TouchableOpacity>
      </View>
    )
  }

  const renderMessageBody = ({ type, text, uri, cordinate }: any) => {
    switch (type) {
      case 'text':
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        )
      case 'image':
        return (
          <Image style={styles.image} source={{ uri }} />
        )
      case 'location':
        <MapView
          style={styles.map}
          initialRegion={{
            ...cordinate,
            latitudeDelta: 0.08,
            longitudeDelta: 0.04
          }}
        >
          <MapView.Marker coordinate={cordinate} />
        </MapView>
      default:
        return null;
    }
  }

  return (
    <FlatList
      style={styles.container}
      inverted
      data={messages}
      renderItem={renderMessageItem}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible', // Prevents clipping on resize!
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 60,
  },
  messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(16,135,255)',
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  map: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});
