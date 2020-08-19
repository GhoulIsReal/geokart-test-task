<template>
  <nav>
    <div class="navbar-heading">
      <p>Контакты</p>
    </div>
    <ul class="navbar">
      <li><router-link :to="{ name: 'Home' }">Главная</router-link></li>
      <li><router-link :to="{ name: 'Contacts' }">Контакты</router-link></li>
    </ul>
  </nav>
</template>

<script>
import "./Navbar.css";

export default {
  name: "Navbar",
};
</script>

<style>
</style>