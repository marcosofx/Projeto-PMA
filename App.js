import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'
import users from './src/data/users';




const printUsers = (users) => {
  console.log(`id:${users.id}, nome:${users.nome}, cpf:${users.cpf}, email:${users.email}, senha:${users.senha}`)
}


users.all()
      	.then( 
      	users => users.forEach( u => printUsers(u) )
    )

export default function App() {


  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#00c6b1" barStyle="light-content"/>
      <Routes/>
    </NavigationContainer>


  );
}
