import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TaskTypeSelector from '@/components/TaskTypeSelector';
import TextTaskForm from '@/components/TextTaskForm';
import ImageTaskForm from '@/components/ImageTaskForm';

export default function TasksScreen() {
  const [taskType, setTaskType] = useState<'text' | 'image'>('text');

  return (
    <View style={styles.container}>
      <TaskTypeSelector taskType={taskType} setTaskType={setTaskType} />
      
      {taskType === 'text' ? (
        <TextTaskForm />
      ) : (
        <ImageTaskForm />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
