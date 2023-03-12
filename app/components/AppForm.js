import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Formik } from "formik";

const AppForm = ({ initialValues, onSubmit, validationSchema, Children }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{Children}</>}
    </Formik>
  );
};

export default AppForm;
