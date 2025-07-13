import { ScrollView, StyleSheet } from 'react-native';
import CreateUserForm from '@/components/CreateUserForm';
import UserListWrapper from '@/components/UsersListWrapper';

export default function UsersScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CreateUserForm />
      <UserListWrapper />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
});
