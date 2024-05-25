import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'
import users from './src/services/users';
import admin from './src/services/admin';
import vagas from './src/services/vagas';
import DatabaseUp from './src/database/DatabaseUp';
import inscricaoDeVagas from './src/services/inscricaoDeVagas'






/*

const printUsers = (users) => {
  console.log(`id:${users.id}, nome:${users.nome}, cpf:${users.cpf}, email:${users.email}, senha:${users.senha}`)
}


users.all()
      	.then( 
      	users => users.forEach( u => printUsers(u) )
    )

    */






   /*

    const printVagas = (vagas) => {
      console.log(`id: ${vagas.id}, titulo: ${vagas.titulo}, empresa: ${vagas.empresa}, desrição: ${vagas.descricao}`)
    }
    
    vagas.all()
          .then(
            vagas => vagas.forEach( v => printVagas(v))
          )

  */
        

  


/*
    const printAdmins = (admin) => {
      console.log(`id:${admin.id}, email:${admin.email}, senha:${admin.senha}`)
    }

    admin.all()
    .then(
      admin => admin.forEach( a => printAdmins(a))
    )

  */



  


export default function App() {


  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#00c6b1" barStyle="light-content"/>
      <Routes/>
    </NavigationContainer>


  );
}
