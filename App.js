import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Recorder from './components/Recorder';
import VoiceNoteList from './components/VoiceNoteList';
import Settings from './components/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export default function App() {
  const [voiceNotes, setVoiceNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [recordingQuality, setRecordingQuality] = useState('HIGH');

  // Load notes from AsyncStorage
  const loadNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@voice_notes');
      if (jsonValue) {
        setVoiceNotes(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Error loading notes:', e);
    }
  };

  // Save notes to AsyncStorage
  const saveNotes = async (notes) => {
    try {
      const jsonValue = JSON.stringify(notes);
      await AsyncStorage.setItem('@voice_notes', jsonValue);
    } catch (e) {
      console.error('Error saving notes:', e);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes(voiceNotes);
  }, [voiceNotes]);

  const addVoiceNote = (uri) => {
    const newNote = {
      id: voiceNotes.length + 1,
      name: `Note ${voiceNotes.length + 1}`,
      date: new Date().toLocaleString(),
      uri,
    };
    setVoiceNotes((prev) => [...prev, newNote]);
  };

  const deleteVoiceNote = (id) => {
    setVoiceNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const playVoiceNote = async (uri) => {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri });
    await sound.playAsync();
  };

  const filteredNotes = voiceNotes.filter(
    (note) =>
      note.name.toLowerCase().includes(searchText.toLowerCase()) ||
      note.date.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search notes..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Settings onQualityChange={setRecordingQuality} />
      <Recorder
        onRecordingComplete={addVoiceNote}
        recordingQuality={recordingQuality}
      />
      <VoiceNoteList
        voiceNotes={filteredNotes}
        onDelete={deleteVoiceNote}
        onPlay={playVoiceNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 3, // Adds a shadow effect
  },
});
