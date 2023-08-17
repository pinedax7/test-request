const express = require("express");
const app = express();
const port = 9000;

const FormData = require("form-data");
const path = require("path");
const axios = require("axios");

const { readFile } = require("fs/promises");

app.listen(port, async () => {
  console.log("---test request---");

  const url = "http://10.114.3.52/api/uploads";

  // Read image from disk as a Buffer
  const image = await readFile("./icono.png");

  // Create a form and append image with additional fields
  const form = new FormData();
  form.append("archivo", image, "icono.png");

  // Send form data with axios
  try {
    const response = await axios.post(url, form, {
      headers: { ...form.getHeaders() },
    });
    console.log("response", response);
  } catch (error) {
    console.log("Error", error.response.data.msg);
  }
});
