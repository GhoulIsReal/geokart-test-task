<template>
  <nav>
    <div class="navbar-heading">
      <p>{{ navbarHeading }}</p>
    </div>
    <ul class="navbar">
      <li><router-link :to="{ name: 'Home' }">Главная</router-link></li>
      <li><router-link :to="{ name: 'About' }">Контакты</router-link></li>
    </ul>
  </nav>
</template>

<script>
import "./Navbar.css";

export default {
  name: "Navbar",
  props: {
    navbarHeading: String,
  },
};
</script>

<style>
</style>