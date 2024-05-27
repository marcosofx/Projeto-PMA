import db from "./databaseConnect"; 

const databaseBuilder = () => {
  db.transaction((tx) => {
    // tem cria as tabelas um por um
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cpf TEXT, email TEXT, senha TEXT);"
    );
  });

  console.log("SUBIU DATABASE");
};



const deletartabelas = () => {
    db.transaction((tx) => {
      tx.executeSql(
        //executa comando pra derrubar tabelas
        // exeplo: "DROP TABLE admin;"
        
      );
    });
  };

  export default {
    databaseBuilder,
  }