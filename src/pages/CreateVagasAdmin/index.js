import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import vagas from '../../services/vagas';

const JobCreationScreen = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateJob = () => {
    // Lógica para criar uma nova vaga
    vagas.create(title, company, description);
    console.log('Vaga Criada:', { title, company, description });
    alert("Vaga criada com sucesso");
    // Resetar campos após criar a vaga
    setTitle('');
    setCompany('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Empresa:</Text>
      <TextInput
        style={styles.input}
        value={company}
        onChangeText={setCompany}
      />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.textarea}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button
        title="Criar Vaga"
        onPress={handleCreateJob}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textarea: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
});

export default JobCreationScreen;
