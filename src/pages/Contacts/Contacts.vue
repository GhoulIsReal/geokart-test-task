<template>
  <div class="contacts">
    <Header />
    <ContactList />
  </div>
</template>

<script>
import "./Contacts.css";
import Header from "@/components/Header/Header";
import ContactList from "@/components/ContactList/ContactList";

export default {
  name: "Contacts",
  components: {
    Header,
    ContactList
  },
};
</script>

