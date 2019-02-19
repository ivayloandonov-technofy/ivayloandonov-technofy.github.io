<template>
  <v-content>
    <!-- Employee profile -->
    <v-container>
      <v-card flat>
        <v-card-title class="headline grey lighten-3" primary-title>Employee profile</v-card-title>
        <div
          v-if="userProfile.noLongerEmployee == !false"
          class="display-1 red--text red lighten-4 pa-2 text-xs-center"
          dark
        >NO LONGER EMPLOYEE</div>
        <v-card-text>
          <v-container>
            <div class="mb-4 display-1 grey--text">
              Name:
              <span class="display-1 black--text">{{userProfile.name}}</span>
            </div>
            <div class="mb-3 title grey--text">
              Age:
              <span class="title black--text font-italic">{{userProfile.age}}</span>
            </div>
            <div class="mb-3 title grey--text">
              Arrival date:
              <span class="title black--text font-italic">{{userProfile.arrivalDate}}</span>
            </div>
            <div class="mb-3 title grey--text">
              Nationality:
              <span class="title black--text font-italic">{{userProfile.nationality}}</span>
            </div>
            <div class="mb-3 title grey--text">
              Salary:
              <span class="title black--text font-italic">{{userProfile.salary}}</span>
            </div>
            <div class="mb-3 title grey--text">
              Sector:
              <span class="title black--text font-italic">{{userProfile.sector}}</span>
            </div>
            <div class="mb-3 title grey--text">
              Skills:
              <span class="title black--text font-italic">{{userProfile.skill}}</span>
            </div>
            <div class="mb-3 title grey--text">
              Time in company:
              <span
                class="title black--text font-italic"
              >{{userProfile.timeInCompany}}</span>
            </div>
            <h3>Contacts</h3>
            <div
              v-for="(contact, key, index) in userProfile.contacts"
              :key="index"
              class="mb-2 title grey--text"
            >
              {{key}}:
              <span class="title black--text font-italic">{{contact}}</span>
            </div>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="userProfile.noLongerEmployee == false"
            depressed
            @click="archiveEmployee"
          >Archive</v-btn>
          <v-btn color="cyan" depressed dark @click="dialog = true">Edit</v-btn>
          <!-- <v-btn v-if="userProfile.noLongerEmployee == false" color="cyan" depressed dark @click="dialog = true">Edit</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-container>
    <!-- Add employee modal -->
    <div class="text-xs-center">
      <EmployeeModal
        mode="edit"
        :userProps="userProfile"
        :parentUpdataeTable="updataeTable"
        :dialog="dialog"
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
      userProfile: {},
      formSector: {
        sector: ""
      },
      sectors: [""],
      skills: [""],
      rules: {
        name: [
          v => !!v || "Field is required",
          v => (v && v.length <= 10) || "Input must be less than 10 characters"
        ]
      }
    };
  },
  methods: {
    getEmployee(name, id) {
      axios
        .get(`https://protected-inlet-44275.herokuapp.com/employees/${name}/${id}`)
        .then(({ data }) => {
          this.userProfile = data.user;
          this.skills = [""].concat(data.filters.skills);
          this.sectors = [""].concat(data.filters.sectors);
        //   console.log(data);
        })
        .catch(error => {
          console.log(error);
          this.submitBtnDisabled = false;
        });
    },
    archiveEmployee() {
      let name = this.$route.params.name;
      let id = this.$route.params.id;

      axios
        .post(`https://protected-inlet-44275.herokuapp.com/employees/${name}/${id}`, {
          archive: true
        })
        .then(({ data, status, statusText }) => {
          this.userProfile = data.user;
        //   console.log(data);
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
    this.getEmployee(this.$route.params.name, this.$route.params.id);
  }
};
</script>