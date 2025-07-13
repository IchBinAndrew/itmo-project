import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '@/app/auth-context';
import { colors } from '@/constants/colors';

export default function UserProfile({ user }: { user: any }) {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.username}!</Text>
      <Text style={styles.subtitle}>You are logged in</Text>
      <Button
        title="Logout"
        onPress={logout}
        color={colors.danger}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.black,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 20,
  },
});
