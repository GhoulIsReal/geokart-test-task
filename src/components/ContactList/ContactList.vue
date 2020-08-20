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
      <button
        @click="(formAction = 'addContact'), (form = {})"
        class="add-button"
      >
        Новый Контакт
      </button>
    </div>
    <div class="add-contact-field" v-if="formAction">
      <p v-if="(formAction == 'addContact')">Добавление нового контакта</p>
      <p v-else>Редактирование контакта</p>
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
          <input type="submit" value="Сохранить" />
        </div>
      </form>
    </div>
    <div class="loader" v-if="status == 'loading'"></div>
    <div class="success" v-if="status == 'success'">Сохранено!</div>
    <div class="error" v-if="status == 'error'">
      Opps, попробуйте позже!
    </div>
  </div>
</template>

<script>
import "./ContactList.css";
import ContactsAPI from "@/services/Contacts.js";

export default {
  name: "ContactList",
  data() {
    return {
      contacts: null,  //сохраняет контакты с get запроса в этот стейт
      formAction: "",  //состояние формы при нажатии на кнопки edit/новый контакт/закрыть
      status: "",      //состояние анимации колеса при отправке формы
      form: {          //один определенный контакт
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
    loadData() {
      ContactsAPI.getContacts().then((res) => {   //get запрос на /list для вывода всех сущ. контактов
        this.contacts = res;
      });
    },
    create() {
      this.status = "loading";
      const paylod = {
        name: this.form.name,
        surname: this.form.surname,
        phone: this.form.phone,
        email: this.form.email,
        address: this.form.address,
      };
      ContactsAPI.createContact(paylod)           //создание нового контакта
        .then((res) => {
          if (res.status == 200) {
            this.formAction = "";
            this.form = {};
            this.status = "success";
            setTimeout(() => (this.status = ""), 1200);
          } else {
            this.status = "error";
          }
        })
        .then(this.loadData);
    },
    showEditing(id) {                             //поиск контакта по id при нажатии на кнопку edit и заполнения их данных в форму
      this.formAction = "editContact";
      this.form.id = id;
      const editingContact = this.contacts.find((contact) => contact.id === id);
      this.form = { ...editingContact };
    },
    edit(id) {                                   //отправка запроса на изменение
      this.status = "loading";
      const payload = {
        name: this.form.name,
        surname: this.form.surname,
        phone: this.form.phone,
        email: this.form.email,
        address: this.form.address,
      };
      ContactsAPI.editContact(id, payload)
        .then((res) => {
          if (res.status == 200) {
            this.formAction = "";
            this.form = {};
            this.status = "success";
            setTimeout(() => (this.status = ""), 1200);
          } else {
            this.status = "error";
          }
        })
        .then(this.loadData);
    },
    deleteContact(id) {                          //удаление контакта
      ContactsAPI.deleteContact(id).then(this.loadData);
    },
    checkState() {                               //проверка при submit-е формы, какой метод выполнять create/edit
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
    this.loadData();
  },
};
</script>
