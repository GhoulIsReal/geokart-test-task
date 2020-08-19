import axios from "axios";

export default {
  getContacts() {
    return axios.get("/list").then((res) => {
      return res.data;
    });
  },

  createContact(payload) {
    return axios.post("/create", payload);
  },

  editContact(id, payload) {
    return axios.post("/update/" + id, payload);
  },

  deleteContact(id) {
    return axios.get("/delete/" + id).then((res) => {
      if (res) console.log("deleted");
    });
  },
};
