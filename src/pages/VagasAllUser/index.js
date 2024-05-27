import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import vagas from '../../services/vagas';

const JobListScreen = () => {
  const [vaga, setVagas] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const vagasLista = await vagas.all();
        setVagas(vagasLista);
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      }
    };

    fetchJobs();
  }, []);

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      
      <Text style={styles.label}>Título:</Text>
      <Text style={styles.jobData}>{item.titulo}</Text>
      <Text style={styles.label}>Empresa:</Text>
      <Text style={styles.jobData}>{item.empresa}</Text>
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.jobData}>{item.descricao}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vagas disponíveis</Text>
      {vaga.map((job) => (
        <View key={job.id}>
          {renderJobItem({ item: job })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  jobItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6, 
  },
  jobData: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default JobListScreen;
