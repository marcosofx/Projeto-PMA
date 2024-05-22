import db from "./databaseConnect"; 

const criaTabelaAdmin = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, senha TEXT);"
    );
  });
};

const deletartabelaAdmin = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE admin;"
      );
    });
  };

export default {
    criaTabelaAdmin,
    deletartabelaAdmin,
}
