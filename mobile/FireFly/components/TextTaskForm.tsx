import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { colors } from '../constants/colors';

export default function TextTaskForm() {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Please enter some text');
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/tasks/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: text }),
      });
      setText('');
      Alert.alert('Success', 'Text task submitted successfully');
    } catch (error) {
      console.error('Failed to submit task:', error);
      Alert.alert('Error', 'Failed to submit task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your text task here..."
        placeholderTextColor={colors.gray}
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      <Button
        title={isSubmitting ? 'Submitting...' : 'Submit Task'}
        onPress={handleSubmit}
        color={colors.primary}
        disabled={isSubmitting || !text.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    minHeight: 120,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: colors.white,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});