import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("db.db")

console.log("CONECTADO COM O SQLITE");

export default db