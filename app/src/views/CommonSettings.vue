<template>
  <v-content>
    <v-layout justify-space-around="true">
      <v-flex xs12 sm4>
        <!-- Skills -->
        <v-container style="height: 100%;">
          <v-card flat style="height: 100%;">
            <v-card-title class="headline grey lighten-3" primary-title>List of all skills</v-card-title>
            <v-card-text>
              <span class="subheading" v-for="(skill, key, index) in skills" :key="index">
                {{skill}}
                <br>
              </span>
            </v-card-text>
            <v-card-actions>
              <v-form v-model="valid" ref="formSkills" @submit.prevent="submit" lazy-validation>
                <v-text-field
                  v-model="formSkills.skill"
                  :rules="rules.inputCommonString"
                  label="Enter skill"
                  solo
                ></v-text-field>
                <v-btn color="cyan" class="mb-4 ml-2" depressed dark @click="addSkill">Add skill</v-btn>
              </v-form>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-flex>

      <v-flex xs12 sm4>
        <!-- Sectors -->
        <v-container style="height: 100%;">
          <v-card flat style="height: 100%;">
            <v-card-title class="headline grey lighten-3" primary-title>List of all sectors</v-card-title>
            <v-card-text>
              <span class="subheading" v-for="(sector, key, index) in sectors" :key="index">
                {{sector}}
                <br>
              </span>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-form v-model="valid" ref="formSectors" @submit.prevent="submit" lazy-validation>
                <v-text-field
                  v-model="formSectors.sector"
                  :rules="rules.inputCommonString"
                  label="Enter sector"
                  solo
                ></v-text-field>
                <v-btn color="cyan" depressed dark @click="dialog = true">Add sector</v-btn>
              </v-form>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-content>
</template> 

 
 

<script>
import axios from "axios";

export default {
  components: {},

  data() {
    return {
      valid: true,
      sectors: [""],
      skills: [""],
      rules: {
        inputCommonString: [
          v => !!v || "Field is required",

          v => (v && v.length <= 20) || "Input must be less than 10 characters"
        ]
      },
      formSectors: {
        sector: ""
      },

      formSkills: {
        skill: ""
      }
    };
  },

  methods: {
    getTemplates() {
      axios
        .get(`http://localhost:3000/settings/templates`)
        .then(({ data }) => {
          console.log(data);
          this.skills = data.skills;
          this.sectors = data.sectors;
        })
        .catch(error => {
          console.log(error);
          this.submitBtnDisabled = false;
        });
    },

    addSkill() {
      console.log("addFilter");
      axios
        .post(`http://localhost:3000/settings/skills`, {formSkills})
        .then(({ data }) => {
          console.log(data.filters);
        })
        .catch(error => {
          console.log(error);
          this.submitBtnDisabled = false;
        });
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