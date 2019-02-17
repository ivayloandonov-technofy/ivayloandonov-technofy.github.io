import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Employees from './views/Employees.vue'
import Employee from './views/Employee.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/employee/:name/:id',
      name: 'employee',
      component: Employee
    },
    {
      path: '/employees',
      name: 'employees',
      component: Employees
    },

  ]
})
