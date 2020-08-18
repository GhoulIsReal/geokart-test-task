<template>
  <nav>
    <div class="navbar-heading">
      <p>{{ navbarHeading }}</p>
    </div>
    <ul class="navbar">
      <li><a href="">Главная</a></li>
      <li><a href="">Контакты</a></li>
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