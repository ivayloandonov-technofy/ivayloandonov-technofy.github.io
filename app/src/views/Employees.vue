<template>
  <v-content>
    <!-- Filters -->
    <v-container>
      <v-card flat>
        <v-form ref="formFilter" @submit.prevent="submit">
          <v-container grid-list-xl fluid>
            <v-layout wrap>
              <v-flex xs12 sm3>
                <v-select
                  v-model="formFilter.sector"
                  :items="sectors"
                  color="blue"
                  label="Select sector"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm3>
                <v-select
                  v-model="formFilter.skill"
                  :items="skills"
                  color="blue"
                  label="Select skill"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm3>
                <v-select
                  v-model="formFilter.noLongerEmployee"
                  :items="statuses"
                  color="blue"
                  label="Select status"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm3 class="text-xs-center">
                <v-btn color="cyan" dark depressed @click="filterEmployees">Filter</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </v-container>
    <!-- Employees table -->
    <v-container>
      <v-toolbar flat color="white">
        <v-toolbar-title>Employees</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = true" depressed>add employee</v-btn>
      </v-toolbar>
      <v-data-table :headers="headers" :items="employeesList" :hide-actions="true">
        <template slot="items" slot-scope="props">
          <td>
            <router-link
              :to="{ name: 'employee', params: {name: props.item.name,  id: props.item._id} }"
            >{{ props.item.name }}</router-link>
          </td>
          <td>{{ props.item.sector }}</td>
          <td>{{ props.item.skill }}</td>
          <td>{{ props.item.salary }}</td>
          <td>{{ props.item.arrivalDate }}</td>
        </template>
      </v-data-table>
    </v-container>

    <!-- Add employee modal -->
    <div class="text-xs-center">
      <EmployeeModal
        mode="create"
        :dialog="dialog"
        :parentUpdataeTable="updataeTable"
        :sectorsArr="sectors"
        :skillsArr="skills"
        v-on:closeModal="closeModal($event)"
      />
    </div>
  </v-content>
</template>

<script>
import axios from "axios";

import EmployeeModal from "../components/EmployeeModal";

export default {
  components: { EmployeeModal },
  data() {
    return {
      dialog: false,
      formFilter: {
        sector: "",
        skill: "",
        noLongerEmployee: ""
      },
      sectors: [""],
      skills: [""],
      statuses: ["", "Curret employee", "Not curret employee"],
      headers: [
        { text: "Name", value: "name", align: "left" },
        { text: "Sector", value: "sector" },
        { text: "Skills", value: "skills" },
        { text: "Salary", value: "salary" },
        { text: "ArrivalDate", value: "arrivalDate" }
      ],
      employeesList: []
    };
  },
  methods: {
    getEmployees() {
      axios
        .get(`https://protected-inlet-44275.herokuapp.com/employees`)
        .then(({ data }) => {
          this.employeesList = data.employeesArr;
          this.skills = [""].concat(data.filters.skills);
          this.sectors = [""].concat(data.filters.sectors);
          // console.log(data.employeesArr);
          // console.log(data.filters);
        })
        .catch(error => {
          console.log(error);
          this.submitBtnDisabled = false;
        });
    },
    filterEmployees() {
      console.log("filterEmployees");
      let filters = this.formFilter;
      axios
        .get(`https://protected-inlet-44275.herokuapp.com/employees`, { params: { filters } })
        .then(({ data }) => {
          this.employeesList = data.employeesArr;
          this.skills = [""].concat(data.filters.skills);
          this.sectors = [""].concat(data.filters.sectors);
          // console.log(data.employeesArr);
          // console.log(data.filters);
        })
        .catch(error => {
          console.log(error);
          this.submitBtnDisabled = false;
        });
    },
    closeModal(eventDialog) {
      this.dialog = eventDialog;
    },
    updataeTable() {
      this.getEmployees();
    }
  },
  created() {
    this.getEmployees();
  }
};
</script>
