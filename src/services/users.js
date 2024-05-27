import db from "../database/databaseConnect";


const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (nome, cpf , email, senha) values (?, ?, ?, ?);",
        [obj.nome, obj.cpf, obj.email, obj.password],
        
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj));
        },
        (_, error) => reject(error)
      );
    });
  });
};


const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      
      tx.executeSql(
        "UPDATE users SET nome=?, cpf=?, email=?, senha=? WHERE id=?;",
        [obj.nome, obj.cpf, obj.email,obj.senha, id],
        
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id); 
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
        "SELECT * FROM users;",
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
        "DELETE FROM users WHERE id=?;",
        [id],
        
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error) 
      );
    });
  });
};

const verificarCredenciaisUsers = (email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE email = ? AND senha = ?;",
        [email, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve({ ...rows.item(0), userType: 'user' }); 
          } else {
            reject("Usuário não encontrado"); 
          }
        },
        (_, error) => reject(error) 
      );
    });
  });
};




export default{
  create,
  all,
  update,
  remove,
  verificarCredenciaisUsers,
};