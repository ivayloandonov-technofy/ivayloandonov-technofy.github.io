<template>
  <v-content>
    <!-- Skills -->
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
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-form v-model="valid" ref="formCreate" @submit.prevent="submit" lazy-validation>
            <v-text-field
              v-model="formCreate.age"
              :rules="rules.inputCommonString"
              label="Age"
              required
            ></v-text-field>
            <v-btn color="cyan" depressed dark @click="dialog = true">Edit</v-btn>
          </v-form>
        </v-card-actions>
      </v-card>
    </v-container>
    <!-- Sectors -->
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
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-form v-model="valid" ref="formCreate" @submit.prevent="submit" lazy-validation>
            <v-text-field
              v-model="formCreate.age"
              :rules="rules.inputCommonString"
              label="Age"
              required
            ></v-text-field>
            <v-btn color="cyan" depressed dark @click="dialog = true">Edit</v-btn>
          </v-form>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  methods: {
    getTemplates() {
      axios.get(`http://localhost:3000/employees`).then(
        ({ data }) => {
          this.userProfile = data.user;
          console.log(data.filters);
        },
        error => reject(error)
      );
    },
    addFilter() {
      console.log("addFilter");
    },
    addSector() {
      console.log("addSector");
    }
  },
  created() {
    this.getTemplates();
  }
};
</script>
