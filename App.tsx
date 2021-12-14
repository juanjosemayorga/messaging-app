import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const App = () => {

  const renderMessageList = () => {
    return (
      <View style={styles.content}></View>
    )
  }

  const renderInputMethodEditor = () => {
    return (
      <View style={styles.inputMethodEditor}></View>
    )
  }

  const renderToolbar = () => {
    return (
      <View style={styles.toolbar}></View>
    )
  }

  return (
    <View style={styles.container}>
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
    </View>
  )
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
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
});

export default App
