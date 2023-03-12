import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Screen from "../components/Screen";
import { Formik } from "formik";
import * as Yup from "yup";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import userApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import ErrorMessage from "../components/ErrorMessage";
import useApi from "../hooks/useApi";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Nmae"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const RegisterScreen = () => {
  const registerApi = useApi(userApi.register);
  const loginApi = useApi(authApi.login);
  const [error, setError] = useState();
  const auth = useAuth();

  const handleSubmit = async (userInfo) => {
    setError("");
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) {
        setError(result.data.error);
      } else {
        setError("An unexpected error accurred.");
        console.log(result);
      }
      return;
    }
    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };
  return (
    <>
      {loginApi.loading || registerApi.loading ? (
        <ActivityIndicator
          animating={loginApi.loading || registerApi.loading}
          size={40}
          color={colors.primary}
          style={styles.loading}
        />
      ) : null}
      <Screen>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(value) => handleSubmit(value)}
          validationSchema={validationSchema}
        >
          <>
            <ErrorMessage error={error} visible={error ? true : false} />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Name"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              // keyboardType="Password"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="Register" />
          </>
        </Formik>
      </Screen>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});
