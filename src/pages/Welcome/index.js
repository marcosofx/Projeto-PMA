import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";


export default function Welcome() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#0007FF", "#0007FF", "#0007FF"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <LinearGradient
              colors={["#5AACFF", "#0007FF"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              {
                <Animatable.Image
                  animation="flipInY"
                  source={require("../../assets/logo.png")}
                  style={{ width: "100%" }}
                  resizeMode="contain"
                  marginTop="25%"
                />
              }
            </LinearGradient>
          </View>

          <Animatable.View
            delay={600}
            animation="fadeInUp"
            style={styles.containerForm}
          >
            <Text style={styles.title}>
              O emprego que você procura está aqui!
            </Text>
            <Text style={styles.text}>Faça o login para começar</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text style={styles.buttonText}>Acessar</Text>
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

  containerLogo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  containerForm: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
  },
  text: {
    color: "#2E2E2E",
  },
  button: {
    position: "absolute",
    backgroundColor: "#0007FF",
    borderRadius: 50,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
