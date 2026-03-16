import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from '../components/TodoItem';

export function TodoScreen() {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  const { todos, remainingCount, addTodo, toggleTodo, deleteTodo } = useTodos(filter);

  const handleAdd = () => {
    addTodo(text);
    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TUGAS 4</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Tambahkan Tugas"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Tambah</Text>
        </Pressable>
      </View>

      <View style={styles.filterRow}>
        {['all', 'active', 'completed'].map((value) => {
          const active = filter === value;
          return (
            <Pressable
              key={value}
              style={[styles.filterButton, active && styles.filterButtonActive]}
              onPress={() => setFilter(value)}
            >
              <Text
                style={[
                  styles.filterText,
                  active && styles.filterTextActive,
                ]}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.summary}>
        {remainingCount} task{remainingCount === 1 ? '' : 's'} remaining
      </Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={() => toggleTodo(item.id)}
            onDelete={() => deleteTodo(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Libur dulu ya</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  filterButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: 13,
    color: '#111827',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  summary: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 8,
  },
  listContent: {
    paddingVertical: 8,
  },
  empty: {
    marginTop: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9CA3AF',
  },
});

