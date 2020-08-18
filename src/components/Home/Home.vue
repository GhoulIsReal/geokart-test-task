<template>
  <div class="home">
    <Navbar navbarHeading="Get Contact" />
    <div class="header-contacts-holder">
      <Header />
      <Content />
    </div>
  </div>
</template>

<script>
import "./Home.css";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Content from "../Content/Content";

export default {
  name: "Home",
  components: {
    Header,
    Navbar,
    Content
  },
};
</script>

