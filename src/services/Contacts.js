import axios from "axios";

export default {
  getContacts() {
    return axios.get("/list").then((res) => {
      return res.data;
    });
  },

  createContact(name, surname, phone, email, address) {
    return axios.post("/create", {
      name: name,
      surname: surname,
      phone: phone,
      email: email,
      address: address,
    });
  },

  editContact(id, name, surname, phone, email, address) {
    return axios.post("/update/" + id, {
      name: name,
      surname: surname,
      phone: phone,
      email: email,
      address: address,
    });
  },

  deleteContact(id) {
    return axios.get("/delete/" + id).then((res) => {
      if (res) console.log("deleted");
    });
  },
};
