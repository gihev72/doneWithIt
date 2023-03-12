import { StyleSheet } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";

import { Formik } from "formik";

import AppFormField from "../components/AppFormField";
import AppFormPicker from "../components/AppFormPicker";
import SubmitButton from "../components/SubmitButton";
import Screen from "../components/Screen";
import FormImagePicker from "../components/FormImagePicker";
import useLocation from "../hooks/useLocation";
import listingsApi from "../api/listings";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

const ListingEditScreen = () => {
  const [uploadVisisble, setUploadVisisble] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisisble(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );
    setUploadVisisble(false);

    if (!result.ok) {
      return alert("Could not save the listing.");
    }
    resetForm();
    alert("Success");
  };
  return (
    <Screen>
      <Formik
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <>
          <FormImagePicker name="images" />
          <AppFormField maxLength={255} name="title" placeholder="Title" />
          <AppFormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
          />
          <AppFormPicker
            items={categories}
            name="category"
            numberOfColumns={3}
            placeholder="Category"
            width="50%"
          />
          <AppFormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={2}
            placeholder="Description"
          />
          <SubmitButton title="Post" />
        </>
      </Formik>
      <UploadScreen progress={progress} visible={uploadVisisble} />
    </Screen>
  );
};

export default ListingEditScreen;

const styles = StyleSheet.create({});
