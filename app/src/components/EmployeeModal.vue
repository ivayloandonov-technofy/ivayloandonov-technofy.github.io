<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title
        v-if="mode === 'creare'"
        class="headline grey lighten-2"
        primary-title
      >Add employee</v-card-title>
      <v-card-title v-else class="headline grey lighten-2" primary-title>Edit employee</v-card-title>
      <!-- Inputs -->
      <v-card-text>
        <v-form v-model="valid" ref="formCreate" @submit.prevent="submit" lazy-validation>
          <!-- row -->
          <v-container>
            <v-layout>
              <v-flex xs12 md6>
                <v-text-field v-model="formCreate.name" :rules="rules.name" label="Name" required></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="formCreate.age" :rules="rules.age" label="Age" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <!-- row -->
          <v-container>
            <v-text-field
              v-model="formCreate.nationality"
              :rules="rules.nationality"
              label="Nationality"
              required
            ></v-text-field>
          </v-container>
          <!-- row -->
          <v-container>
            <v-layout>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="formCreate.salary"
                  :rules="rules.salary"
                  label="Salary"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-select
                  v-model="formCreate.sector"
                  :items="sectors"
                  :rules="rules.sector"
                  color="blue"
                  label="Select sector"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <!-- row -->
          <v-container>
            <v-layout>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="formCreate.arrivalDate"
                  :rules="rules.arrivalDate"
                  label="Arrival date"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="formCreate.timeInCompany"
                  :rules="rules.timeInCompany"
                  label="Time in company"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <!-- row -->
          <v-container>
            <v-select
              v-model="formCreate.skills"
              :items="skills"
              :rules="rules.skills"
              color="blue"
              label="Select skills"
              required
            ></v-select>
          </v-container>

          <h3>Contacts</h3>

          <!-- row -->
          <v-container>
            <v-text-field
              v-model="formCreate.contacts.address"
              :rules="rules.address"
              label="Address"
              required
            ></v-text-field>
          </v-container>
          <!-- row -->
          <v-container>
            <v-text-field
              v-model="formCreate.contacts.phoneNumber"
              :rules="rules.phoneNumber"
              label="Phone number"
              required
            ></v-text-field>
          </v-container>
          <!-- row -->
          <v-container>
            <v-text-field
              v-model="formCreate.contacts.mail"
              :rules="rules.mail"
              label="E-mail"
              required
            ></v-text-field>
          </v-container>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed @click="closeModal">Cancle</v-btn>
        <v-btn color="primary" depressed dark @click="createUser" :disabled="submitBtnDisabled">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "EmployeeModal",
  props: {
    mode: {
      type: String,
      required: true
    },
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      submitBtnDisabled: false,
      valid: true,
      formCreate: {
        name: "",
        age: "",
        arrivalDate: "",
        skills: "",
        salary: "",
        sector: "",
        nationality: "",
        timeInCompany: "",
        contacts: {
          address: "",
          phoneNumber: "",
          mail: ""
        }
      },
      rules: {
        name: [
          v => !!v || "Name is required",
          v => (v && v.length <= 10) || "Name must be less than 10 characters"
        ],
        age: [
          v => !!v || "Age is required",
          v => (v && v.length <= 10) || "Age must be less than 10 characters"
        ],
        nationality: [
          v => !!v || "Nationality is required",
          v => (v && v.length <= 10) || "Nationality must be less than 10 characters"
        ],
        salary: [
          v => !!v || "Salary is required",
          v => (v && v.length <= 10) || "Salary must be less than 10 characters"
        ],
        arrivalDate: [
          v => !!v || "Arrival date is required",
          v => (v && v.length <= 10) || "Arrival date must be less than 10 characters"
        ],
        skills: [
          v => !!v || "Skills is required",
          v => (v && v.length <= 10) || "Skills must be less than 10 characters"
        ],
        sector: [
          v => !!v || "Sector is required",
          v => (v && v.length <= 10) || "Sector must be less than 10 characters"
        ],
        timeInCompany: [
          v => !!v || "Time in company is required",
          v => (v && v.length <= 10) || "Time in company must be less than 10 characters"
        ],
        address: [
          v => !!v || "Address is required",
          v => (v && v.length <= 10) || "Address must be less than 10 characters"
        ],
        phoneNumber: [
          v => !!v || "Phone number is required",
          v => (v && v.length <= 10) || "Phone number must be less than 10 characters"
        ],
        mail: [
          v => !!v || "Mail is required",
          v => (v && v.length <= 30) || "Mail must be less than 10 characters"
        ]
      },
      sectors: ["", "Develop", "Managment", "Sells"],
      skills: ["", "JavaScript", "HTML", "CSS", "Project managment", "Sell"]
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    },
    validate() {
      if (this.$refs.formCreate.validate()) {
        this.snackbar = true;
        return true;
      }
      return false;
    },
    createUser() {
      if (this.validate()) {
        this.submitBtnDisabled = true;
        let payload = this.formCreate;
        axios
          .put(`http://localhost:3000/employees`, {
            payload
          })
          .then(({ data, status, statusText }) => {
            this.closeModal();
            console.log(data);
            console.log("Trades:", status, statusText);
          })
          .catch(error => {
            console.log(error);
            this.submitBtnDisabled = false;
          });
      }
    }
  }
};
</script>

<style lang="scss">
.v-dialog .container {
  padding: 0 16px !important;
}
</style>
