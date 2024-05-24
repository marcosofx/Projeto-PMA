import users from "./users";
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async (email , passaword) => {
    try{

        const usuario = await users.verificarCredenciaisUsers(email, passaword);
        await AsyncStorage.setItem('usuarioId', usuario.id.toString());
        return usuario;

    }catch(error) {
        throw error;
    }
}


const getUsuarioLogado = async () => {
    try {
        const usuarioId = await AsyncStorage.getItem('usuarioId');
        if (usuarioId !== null) {
          const usuarioIdInt = Number(usuarioId);
          if (isNaN(usuarioIdInt)) {
            throw new Error('O ID do usuário não é um número válido');
          }
          return usuarioIdInt;
        } else {
          throw new Error('Nenhum usuário logado');
        }
      } catch (error) {
        throw error;
      }
  };

  const logUsuarioLogado = async () => {
    try {
      const userId = await userServices.getUsuarioLogado();
      console.log("ID do usuário logado: " + userId);
    } catch (error) {
      console.error('Erro ao obter o ID do usuário:', error.message);
    }
  };

  export default {
    login,
    getUsuarioLogado,
    logUsuarioLogado,
  }
  