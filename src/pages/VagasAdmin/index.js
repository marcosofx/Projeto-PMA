import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import vagasServices from '../../services/vagas';

const TelaListaVagas = () => {
  const [vagas, setVagas] = useState([]);
  const [modalVisivelEditar, setModalVisivelEditar] = useState(false);
  const [modalVisivelExcluir, setModalVisivelExcluir] = useState(false);
  const [vagaEditando, setVagaEditando] = useState(null); // Novo estado para armazenar os dados editados temporariamente
  const [vagaAtual, setVagaAtual] = useState(null);
  const [vagaParaExcluir, setVagaParaExcluir] = useState(null);

  const buscarVagas = async () => {
    try {
      const listaDeVagas = await vagasServices.all();
      setVagas(listaDeVagas);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    }
  };

  useEffect(() => {
    buscarVagas();
  }, []);

  const editarVaga = (vaga) => {
    setVagaAtual(vaga);
    setVagaEditando({ ...vaga }); // Inicializar os dados editados temporariamente
    setModalVisivelEditar(true);
    setVagaParaExcluir(null);
  };

  const salvarEdicao = () => {
    // Atualizar a vaga no banco de dados
    vagasServices.update(vagaEditando.id, vagaEditando.titulo, vagaEditando.empresa, vagaEditando.descricao);
    console.log('Vaga atualizada com sucesso!');
    alert("vaga atualizada com sucesso!");
    // Atualizar a lista de vagas
    buscarVagas();
    // Fechar o modal
    setModalVisivelEditar(false);
  };


  const confirmarExclusao = (vaga) => {
    setVagaParaExcluir(vaga);
    setModalVisivelExcluir(true);
  };

  const cancelarExclusao = () => {
    setVagaParaExcluir(null);
    setModalVisivelExcluir(false);
  };

  const excluirVaga = async () => {
    await vagasServices.remove(vagaParaExcluir.id); // Excluir a vaga
    console.log("Vaga excluida com sucesso!");
    alert("Vaga excluida com sucesso!");
    buscarVagas(); // Atualizar a lista de vagas
    setModalVisivelExcluir(false); // Fechar o modal
    setVagaParaExcluir(null); // Limpar a vaga para exclusão
  };

  const renderizarItemVaga = ({ item }) => (
    <View style={styles.itemVaga}>
      <Text style={styles.rotulo}>Título:</Text>
      <Text style={styles.dadosVaga}>{item.titulo}</Text>
      <Text style={styles.rotulo}>Empresa:</Text>
      <Text style={styles.dadosVaga}>{item.empresa}</Text>
      <Text style={styles.rotulo}>Descrição:</Text>
      <Text style={styles.dadosVaga}>{item.descricao}</Text>
      <View style={styles.botoesContainer}>
        <Button title="Editar" onPress={() => editarVaga(item)} />
        <Button title="Excluir" onPress={() => confirmarExclusao(item)} />
      </View>
    </View>
  );

  // modais pra alterar vagas e remover vagas

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Vagas disponíveis</Text>
      {vagas.map((vaga) => (
        <View key={vaga.id}>
          {renderizarItemVaga({ item: vaga })}
        </View>
      ))}


      
      {vagaAtual && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisivelEditar}
          onRequestClose={() => setModalVisivelEditar(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalConteudo}>
              <Text style={styles.modalTitulo}>Editar Vaga</Text>
              <View style={styles.containerInput}>
                <Text style={styles.rotulo}>Título:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Título"
                  value={vagaEditando.titulo} // Usar os dados editados temporariamente
                  onChangeText={(text) => setVagaEditando({ ...vagaEditando, titulo: text })} // Atualizar os dados editados temporariamente
                />
              </View>
              <View style={styles.containerInput}>
                <Text style={styles.rotulo}>Empresa:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Empresa"
                  value={vagaEditando.empresa} // Usar os dados editados temporariamente
                  onChangeText={(text) => setVagaEditando({ ...vagaEditando, empresa: text })} // Atualizar os dados editados temporariamente
                />
              </View>
              <View style={styles.containerInput}>
                <Text style={styles.rotulo}>Descrição:</Text>
                <TextInput
                  style={[styles.input, styles.descricaoInput]}
                  placeholder="Descrição"
                  value={vagaEditando.descricao} // Usar os dados editados temporariamente
                  onChangeText={(text) => setVagaEditando({ ...vagaEditando, descricao: text })} // Atualizar os dados editados temporariamente
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
              <View style={styles.containerBotoes}>
                <TouchableOpacity style={styles.botaoModal} onPress={salvarEdicao}>
                  <Text style={styles.textoBotaoModal}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoModal} onPress={() => setModalVisivelEditar(false)}>
                  <Text style={styles.textoBotaoModal}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}


      {vagaParaExcluir && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisivelExcluir}
          onRequestClose={cancelarExclusao}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalConteudo}>
              <Text style={styles.modalTitulo}>Confirmar Exclusão</Text>
              <Text style={styles.textoModal}>Tem certeza que deseja excluir esta vaga?</Text>
              <View style={styles.containerBotoes}>
                <TouchableOpacity style={styles.botaoModal} onPress={excluirVaga}>
                  <Text style={styles.textoBotaoModal}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoModal} onPress={cancelarExclusao}>
                  <Text style={styles.textoBotaoModal}>Não</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
     </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 16,
  },
  itemVaga: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
  },
  rotulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  dadosVaga: {
    fontSize: 16,
    marginBottom: 8,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalConteudo: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitulo: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  containerInput: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
  },
  descricaoInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  botaoModal: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  textoBotaoModal: {
    color: 'white',
    textAlign: 'center',
  },
});

export default TelaListaVagas;
