import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function TodoItem({ item, onToggle, onDelete }) {
  return (
    <View style={styles.item}>
      <Pressable
        style={[styles.checkbox, item.completed && styles.checkboxDone]}
        onPress={onToggle}
      >
        {item.completed ? <Text style={styles.checkmark}>0</Text> : null}
      </Pressable>
      <Text
        style={[
          styles.text,
          item.completed && { textDecorationLine: 'line-through', opacity: 0.6 },
        ]}
      >
        {item.text}
      </Text>
      <Pressable onPress={onDelete}>
        <Text style={styles.delete}>Hapus</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    elevation: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxDone: {
    backgroundColor: '#2563EB',
  },
  checkmark: {
    color: '#fff',
    fontWeight: '700',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  delete: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '500',
  },
});

