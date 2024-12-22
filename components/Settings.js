import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const Settings = ({ onQualityChange }) => {
  const [quality, setQuality] = useState('HIGH');

  const handleQualityChange = (value) => {
    setQuality(value);
    onQualityChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recording Quality</Text>
      <Picker
        selectedValue={quality}
        onValueChange={handleQualityChange}
        style={styles.picker}
      >
        <Picker.Item label="High Quality" value="HIGH" />
        <Picker.Item label="Low Quality" value="LOW" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default Settings;
