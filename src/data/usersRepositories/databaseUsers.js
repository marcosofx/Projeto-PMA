import db from "./databaseConnect"; 

const criaTabelaUsers = () => {
  db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cpf TEXT, email TEXT, senha TEXT);"
    );
  });
};

const deletartabelaUsers = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE users;"
      );
    });
  };

export default {
    criaTabelaUsers,
    deletartabelaUsers,
}