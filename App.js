import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = useState();

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
      } else {
        Alert.alert("Ruhusa", "Ruhusu mic kurekodi.");
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    Alert.alert("AMAR STUDIO", "Sauti imerekodiwa!");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AMAR STUDIO</Text>
      <TouchableOpacity 
        style={[styles.btn, recording && styles.active]} 
        onPress={recording ? stopRecording : startRecording}>
        <Text style={styles.btnText}>{recording ? "STOP" : "REC"}</Text>
      </TouchableOpacity>
      <Text style={styles.status}>{recording ? "Inarekodi..." : "Gusa kuanza"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  header: { fontSize: 35, color: 'gold', fontWeight: 'bold', marginBottom: 50 },
  btn: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#fff' },
  active: { borderColor: 'red' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  status: { color: '#888', marginTop: 20 }
});
