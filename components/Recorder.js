import React, { useState, useRef } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const Recorder = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('');
  const recordingRef = useRef(null);

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert('Permission to access microphone is required.');
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setRecordingStatus('Recording...');
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setRecordingStatus('Recording stopped');
      onRecordingComplete(uri); // Pass the recording URI to parent
    }
  };

  return (
    <View style={styles.container}>
      <Text>{recordingStatus}</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});

export default Recorder;
