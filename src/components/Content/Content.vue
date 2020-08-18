<template>
  <div class="main-content">
    <table class="main-content-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.surname }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "./Content.css";
import axios from "axios";

export default {
  name: "Content",
  data() {
    return {
      contacts: null,
    };
  },
  mounted() {
    axios.get("https://test.rgis.kz/api/contact/list").then((res) => {
      this.contacts = res.data;
      console.log(this.contacts)
    });
  },
};
</script>
