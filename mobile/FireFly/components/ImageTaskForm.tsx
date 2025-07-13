import { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '@/constants/colors';

export default function ImageTaskForm() {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async (isRequired: boolean) => {
    if (images.length >= 2) return;
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    } else if (isRequired) {
      alert('You must select at least one image');
    }
  };

  const submitTask = async () => {
    if (images.length === 0) {
      alert('At least one image is required');
      return;
    }

    const formData = new FormData();
    images.forEach((uri, index) => {
      formData.append('images', {
        uri,
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
      } as any);
    });

    try {
      await fetch('api/tasks/upload/image', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImages([]);
      alert('Task submitted successfully');
    } catch (error) {
      console.error('Failed to submit task:', error);
      alert('Failed to submit task');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Add First Image (Required)"
          onPress={() => pickImage(true)}
          color={colors.primary}
          disabled={images.length >= 2}
        />
        {images.length > 0 && (
          <Button
            title="Add Second Image (Optional)"
            onPress={() => pickImage(false)}
            color={colors.secondary}
            disabled={images.length >= 2}
          />
        )}
      </View>

      {images.length > 0 && (
        <Button
          title="Submit Task"
          onPress={submitTask}
          color={colors.success}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    marginBottom: 20,
    gap: 10,
  },
});