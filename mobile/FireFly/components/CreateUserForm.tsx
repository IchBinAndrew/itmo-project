import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export default function CreateUserForm() {
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    if (username.trim()) {
      try {
        await fetch('/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        });
        setUsername('');
      } catch (error) {
        console.error('Failed to create user:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={colors.gray}
      />
      <Button
        title="Create User"
        onPress={handleSubmit}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    backgroundColor: colors.white,
  },
});
