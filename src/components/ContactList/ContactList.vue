<template>
  <div class="main-content-wrapper">
    <div class="main-content">
      <table class="main-content-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.id">
            <td>{{ contact.name }}</td>
            <td>{{ contact.surname }}</td>
            <td>{{ contact.phone }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.address }}</td>
            <div class="edit-delete-buttons">
              <button v-on:click="showEditing(contact.id)">Edit</button>
              <button v-on:click="deleteContact(contact.id)">Delete</button>
            </div>
          </tr>
        </tbody>
      </table>
      <button v-on:click="formAction = 'addContact'" class="add-button">
        Add contact
      </button>
    </div>
    <div class="add-contact-field" v-if="formAction">
      <p>Добавление нового контакта</p>
      <form v-on:submit.prevent="checkState">
        <input
          required
          v-model="form.name"
          placeholder="Имя"
          type="text"
          name=""
        />
        <input
          required
          v-model="form.surname"
          placeholder="Фамилия"
          type="text"
          name=""
        />
        <input
          required
          v-model="form.phone"
          placeholder="Номер"
          type="tel"
          name=""
        />
        <input
          required
          v-model="form.email"
          placeholder="Почта"
          type="email"
          name=""
        />
        <input
          required
          v-model="form.address"
          placeholder="Адрес"
          type="text"
          name=""
        />
        <div class="submit-and-close-buttons">
          <button type="button" v-on:click="formAction = ''">
            Закрыть
          </button>
          <input type="submit" value="Добавить" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "./ContactList.css";
import axios from "axios";

export default {
  name: "ContactList",
  data() {
    return {
      contacts: null,
      formAction: "",
      form: {
        id: "",
        name: "",
        surname: "",
        phone: "",
        email: "",
        address: "",
      },
    };
  },
  methods: {
    create() {
      axios
        .post("/create", {
          name: this.form.name,
          surname: this.form.surname,
          phone: this.form.phone,
          email: this.form.email,
          address: this.form.address,
        })
        .then((res) => {
          if (res) this.formAction = "";
        });
    },
    showEditing(id) {
      return function () {
        this.form.id = id;
        const editingContact = this.contacts.find(
          (contact) => contact.id === id
        );
        this.form.name = editingContact.name;
        this.form.surname = editingContact.surname;
        this.form.phone = editingContact.phone;
        this.form.email = editingContact.email;
        this.form.address = editingContact.address;
        this.formAction = "editContact";
      }.bind(this)();
    },
    edit(id) {
      axios
        .post(`/update/${id}`, {
          name: this.form.name,
          surname: this.form.surname,
          phone: this.form.phone,
          email: this.form.email,
          address: this.form.address,
        })
        .then((res) => {
          if (res) this.formAction = "";
        });
    },
    deleteContact(id) {
      axios.get(`/delete/${id}`).then((res) => {
        if (res) console.log("deleted");
      });
    },
    checkState() {
      switch (this.formAction) {
        case "addContact":
          this.create();
          break;
        case "editContact":
          this.edit(this.form.id);
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    axios.get("/list").then((res) => {
      this.contacts = res.data;
    });
  },
};
</script>
