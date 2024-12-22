import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const VoiceNoteList = ({ voiceNotes, onDelete, onPlay }) => {
  return (
    <FlatList
      data={voiceNotes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.note}>
          <Text>{item.name}</Text>
          <Text>{item.date}</Text>
          <Button title="Play" onPress={() => onPlay(item.uri)} />
          <Button title="Delete" onPress={() => onDelete(item.id)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  note: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
});

export default VoiceNoteList;
