import db from "../database/databaseConnect";


const create = (titulo, empresa, descricao) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO vagas (titulo, empresa , descricao) values (?, ?, ?);",
        [titulo, empresa, descricao],
        
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error ao criar vaga: " + JSON.stringify(obj));
        },
        (_, error) => reject(error)
      );
    });
  });
};


const update = (id, titulo, empresa, descricao) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        
        tx.executeSql(
          "UPDATE vagas SET titulo=?, empresa=?, descricao=? WHERE id=?;",
          [titulo, empresa, descricao, id],
          
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) resolve(rowsAffected);
            else reject("Error ao fazer update: id=" + id); 
          },
          (_, error) => reject(error) 
        );
      });
    });
  };


  const all = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM vagas;",
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) 
        );
      });
    });
  };

  const remove = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM vagas WHERE id=?;",
          [id],
          
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error) 
        );
      });
    });
  };


  export default {
    create,
    update,
    all,
    remove,
  }