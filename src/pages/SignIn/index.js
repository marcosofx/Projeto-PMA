import React, { useState, useEffect } from "react";
import users from "../../data/usersRepositories/users"
import admin from "../../data/adminRepositories/admin"
import { useForm, Controller } from 'react-hook-form';
import { StatusBar } from "react-native";


import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Email invalido!").required("Informe seu email"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 digitos")
    .max(8, "A senha deve ter no maximo 8 dígitos")
    .required("informe sua senha"),
});

export default function SignIn() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect (() => {
    if(loggedIn && userType) {
      if(userType === 'admin'){
        navigation.navigate('HomeRecruiter');
      } else {
        navigation.navigate('HomeUser');
      }
    }
  }, [loggedIn, userType, navigation]);
  


  const handleSignIn = async (data) => {

    try{

    const user = await users.verificarCredenciaisUsers(data.email, data.password)
      setLoggedIn(true);
      setUserType(user.userType);
      console.log("Login de usuario bem-sucedido!");

    } catch(useError) {

      try {
        const adminUser = await admin.verificarCredenciaisAdmin(data.email, data.password);
        setLoggedIn(true);
        setUserType(adminUser.userType);
        console.log("Login de administrador bem-sucedido!");

      } catch (adminError) {

        console.log("Erro de autenticação:", adminError);
        alert("Email ou senha incorreto");
      }
    }
  };


  return (
  
        <LinearGradient
        colors={["#00c6b1","#00a5a8","#008398","#00637f","#004461"]}
        style={styles.gradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 1 }}
      >
        {
          <View style={styles.container}>
            <Animatable.View
              animation="fadeInLeft"
              delay={500}
              style={styles.containerHeader}
              
            >
              <Text style={styles.message}>Bem-vindo(a)</Text>
            </Animatable.View>
  
            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
              <Text style={styles.title}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.email && 1,
                        borderColor: errors.email && "#fa0707",
                        backgroundColor: errors.email && "#ffcfcf",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Digite um email"
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.labelError}>{errors.email?.message}</Text>
              )}
  
              <Text style={styles.title}>Senha</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.password && 1,
                        borderColor: errors.password && "#fa0707",
                        backgroundColor: errors.password && "#ffcfcf",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Digite sua senha"
                    secureTextEntry={true}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.labelError}>{errors.password?.message}</Text>
              )}
  
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(handleSignIn)}
              >
                <Text style={styles.buttonText}>Acessar</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={styles.buttonRegister}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.RegisterText}>
                  Não possui uma conta? Cadastre-se
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        }
      </LinearGradient>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    marginVertical: "1%",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    paddingStart: "2%",
  },
  button: {
    backgroundColor: "#004461",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  RegisterText: {
    color: "#2E2E2E",
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
});
