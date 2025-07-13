import { View, StyleSheet } from 'react-native';
import LoginForm from '@/components/LoginForm';
import UserProfile from '@/components/UserProfile';
import { useAuth } from '@/app/auth-context';

export default function MeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {user ? <UserProfile user={user} /> : <LoginForm />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
