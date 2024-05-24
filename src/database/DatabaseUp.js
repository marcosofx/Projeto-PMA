import db from "./databaseConnect"; 

const databaseBuilder = () => {
  db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cpf TEXT, email TEXT, senha TEXT);"
    );


    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, senha TEXT);"
      );

      tx.executeSql (
        `CREATE TABLE IF NOT EXISTS vagas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT NOT NULL,
          empresa TEXT NOT NULL,
          descricao TEXT NOT NULL
        );`
      );
  
      tx.executeSql (
        `CREATE TABLE IF NOT EXISTS inscricoes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id INTEGER NOT NULL,
          vaga_id INTEGER NOT NULL,
          FOREIGN KEY (usuario_id) REFERENCES users(id),
          FOREIGN KEY (vaga_id) REFERENCES vagas(id)
        );`
      );


  });

  console.log("subiu database");
};



const deletartabelas = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE admin;"
      );
    });
  };

  export default {
    databaseBuilder,
  }