<template>
  <div class="home">
    <Header />
    <ContactList />
  </div>
</template>

<script>
import "./Home.css";
import Header from "@/components/Header/Header";
import ContactList from "@/components/ContactList/ContactList";

export default {
  name: "Home",
  components: {
    Header,
    ContactList
  },
};
</script>

