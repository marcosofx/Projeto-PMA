import db from "../database/databaseConnect";
import loginServices from "./loginServices";

const getTodasInscricoes = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM inscricoes;',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const inscreverUsuario = async (vagaId) => {
  try {
    const usuarioId = await loginServices.getUsuarioLogado();
    if (!usuarioId) throw new Error('Usuário não logado');

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO inscricoes (usuario_id, vaga_id) VALUES (?, ?);',
        [usuarioId, vagaId],
        (_, resultSet) => {
          console.log('Usuário inscrito com sucesso!', resultSet);
        },
        (_, error) => {
          console.error('Erro ao inscrever usuário:', error);
        }
      );
    });
  } catch (error) {
    console.error('Erro ao inscrever usuário:', error);
  }
};



  
  export default {
    getTodasInscricoes,
    inscreverUsuario,
  }