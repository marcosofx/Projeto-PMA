import db from "../database/databaseConnect"; 


const create = (email, password) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "INSERT INTO admin (email, senha) values (?, ?);",
          [email, password],
          //-----------------------
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) resolve(insertId);
            else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };

  const update = (id, email, password) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "UPDATE admin SET email=?, senha=? WHERE id=?;",
          [email,password, id],
          //-----------------------
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) resolve(rowsAffected);
            else reject("Error updating obj: id=" + id); // nenhum registro alterado
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };

  const all = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "SELECT * FROM admin;",
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };

  const remove = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "DELETE FROM admin WHERE id=?;",
          [id],
          //-----------------------
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };

  const verificarCredenciaisAdmin = (email, password) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM admin WHERE email = ? AND senha = ?;",
          [email, password],
          (_, { rows }) => {
            if (rows.length > 0) {
              resolve({ ...rows.item(0), userType: 'admin' });
            } else {
              reject("Credenciais não encontrado");
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
    verificarCredenciaisAdmin,
  };
