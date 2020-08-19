import Vue from 'vue'
import VueRouter from 'vue-router'
import Contacts from '@/pages/Contacts/Contacts.vue'
import Home from '@/pages/Home/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
  }
]

const router = new VueRouter({
  routes
})

export default router
