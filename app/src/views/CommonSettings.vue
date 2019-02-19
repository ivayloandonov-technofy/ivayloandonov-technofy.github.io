<template>
  <v-content>
    <!-- Skills -->
    <v-container>
      <v-card flat>
        <v-card-title class="headline grey lighten-3" primary-title>Employee profile</v-card-title>

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
          <v-form v-model="valid" ref="formSector" @submit.prevent="submit" lazy-validation>
            <v-text-field
              v-model="formSector.sector"
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
          <v-form v-model="valid" ref="formSkills" @submit.prevent="submit" lazy-validation>
            <v-text-field
              v-model="formSkills.skill"
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
  data() {
    return {
      valid: true,
      rules: {
        inputCommonString: [
          v => !!v || "Field is required",
          v => (v && v.length <= 20) || "Input must be less than 10 characters"
        ]
      },
      formSector: {
        sector: ""
      },
      formSkills: {
        skill: ""
      }
    };
  },
  methods: {
    getTemplates() {
      // axios.get(`http://localhost:3000/employees`).then(
      //   ({ data }) => {
      //     this.userProfile = data.user;
      //     console.log(data.filters);
      //   },
      //   error => reject(error)
      // );
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
