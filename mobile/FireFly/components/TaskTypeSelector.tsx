import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../constants/colors';

type TaskTypeSelectorProps = {
  taskType: 'text' | 'image';
  setTaskType: (type: 'text' | 'image') => void;
};

export default function TaskTypeSelector({ taskType, setTaskType }: TaskTypeSelectorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          taskType === 'text' && styles.activeButton,
        ]}
        onPress={() => setTaskType('text')}
      >
        <Text style={[
          styles.buttonText,
          taskType === 'text' && styles.activeButtonText,
        ]}>
          Text Task
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          taskType === 'image' && styles.activeButton,
        ]}
        onPress={() => setTaskType('image')}
      >
        <Text style={[
          styles.buttonText,
          taskType === 'image' && styles.activeButtonText,
        ]}>
          Image Task
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: colors.gray,
    fontWeight: '500',
  },
  activeButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});