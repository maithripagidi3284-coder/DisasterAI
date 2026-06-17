import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';

interface MicButtonProps {
  onResult: (text: string) => void;
}

export default function MicButton({ onResult }: MicButtonProps) {
  const [recording, setRecording] = useState(false);
  const [rec, setRec] = useState<Audio.Recording | null>(null);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow microphone access');
        return;
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRec(recording);
      setRecording(true);
    } catch (err) {
      Alert.alert('Error', 'Could not start recording');
    }
  };

  const stopRecording = async () => {
    try {
      if (!rec) return;
      await rec.stopAndUnloadAsync();
      setRecording(false);
      setRec(null);
      Alert.alert('Recorded!', 'Voice recorded successfully. Whisper AI will be enabled in next update.');
    } catch (err) {
      setRecording(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.micBtn, recording && styles.micBtnActive]}
      onPress={recording ? stopRecording : startRecording}
    >
      <Text style={styles.micText}>
        {recording ? '⏹ Stop' : '🎤 Speak'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  micBtn: {
    backgroundColor: '#2E6DA4',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  micBtnActive: {
    backgroundColor: '#E74C3C',
  },
  micText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});