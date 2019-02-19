<template>
  <v-content>
    <v-layout justify-space-around="true">

      <!-- Skills -->
      <v-flex xs12 sm4>
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

      <!-- Sectors -->
      <v-flex xs12 sm4>
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
              <v-form v-model="valid" ref="formSectors" @submit.prevent="submit" lazy-validation>
                <v-text-field
                  v-model="formSectors.sector"
                  :rules="rules.inputCommonString"
                  label="Enter sector"
                  solo
                ></v-text-field>
                <v-btn color="cyan" depressed dark @click="addSector">Add sector</v-btn>
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
        .get(`https://guarded-mountain-73665.herokuapp.com/settings/templates`)
        .then(({ data }) => {
          this.skills = data.skills;
          this.sectors = data.sectors;
          // console.log(data);
        })
        .catch(error => {
          console.log(error);
          this.submitBtnDisabled = false;
        });
    },
    addSkill() {
      let payload = this.formSkills.skill;
      axios
        .post(`https://protected-inlet-44275.herokuapp.com/settings/skills`, { skill: payload })
        .then(({ data }) => {
          this.skills = data.skills;
          // this.formSkills.skill = "";
          // console.log(data);
        })
        .catch(error => {
          console.log(error);
          this.submitBtnDisabled = false;
        });
    },
    addSector() {
      let payload = this.formSectors.sector;
      axios
        .post(`https://protected-inlet-44275.herokuapp.com/settings/sectors`, { sector: payload })
        .then(({ data }) => {
          this.sectors = data.sectors;
          // this.formSectors.sector = "";
          // console.log(data);
        })
        .catch(error => {
          console.log(error);
          this.submitBtnDisabled = false;
        });
    }
  },
  created() {
    this.getTemplates();
  }
};
</script> 
