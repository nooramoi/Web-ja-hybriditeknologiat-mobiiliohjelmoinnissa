import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import { firestore } from './firebase/Config';
import { convertFirebaseTimeStampToJS } from './helper/Function';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (newMessage) {
      await firestore.collection('message').add({
        text: newMessage,
        created: new Date(),
      });
      setNewMessage('');
    }
  };

  useEffect(() => {
    const query = firestore.collection('message').orderBy('created', 'desc');
    const unsubscribe = query.onSnapshot((snapshot) => {
      const updatedMessages = [];
      snapshot.forEach((doc) => {
        updatedMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Type your message..."
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
      />
      <Button title="Send" onPress={sendMessage} />
      {messages.map((message) => (
        <View key={message.id} style={styles.messageContainer}>
          <Text style={styles.messageText}>{message.text}</Text>
          <Text style={styles.messageInfo}>
            {convertFirebaseTimeStampToJS(message.created)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  messageText: {
    fontSize: 18,
  },
  messageInfo: {
    fontSize: 12,
  },
});

export default App;