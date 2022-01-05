import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
} from "react-native";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email address."
            onInputChange={() => {}}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorMessage="Please enter a valid password."
            onInputChange={() => {}}
            initialValue=""
          />
          <View style={styles.btnContainer}>
            <Button title="Login" color={Colors.primary} onPress={() => {}} />
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="Switch to Sign Up"
              color={Colors.accent}
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  btnContainer: {
    marginTop: 10,
  },
});