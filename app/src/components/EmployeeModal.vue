<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <v-card>
      <v-card-title
        v-if="mode === 'create'"
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
                <v-text-field
                  v-model="formCreate.name"
                  :rules="rules.inputCommonString"
                  label="Name"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="formCreate.age"
                  :rules="rules.inputCommonString"
                  label="Age"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <!-- row -->
          <v-container>
            <v-text-field
              v-model="formCreate.nationality"
              :rules="rules.inputCommonString"
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
                  :rules="rules.inputCommonString"
                  label="Salary"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-select
                  v-model="formCreate.sector"
                  :items="sectorsArr"
                  :rules="rules.inputCommonString"
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
                <v-menu
                  v-model="menuDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="formCreate.arrivalDate"
                    label="Pick arrival date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    v-model="formCreate.arrivalDate"
                    @input="menuDate = false"
                    :max="new Date().toJSON()"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="formCreate.timeInCompany"
                  :rules="rules.inputCommonString"
                  label="Time in company"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <!-- row -->
          <v-container>
            <v-select
              v-model="formCreate.skill"
              :items="skillsArr"
              :rules="rules.inputCommonString"
              color="blue"
              label="Select skill"
              required
            ></v-select>
          </v-container>

          <h3>Contacts</h3>
          <!-- row -->
          <v-container>
            <v-text-field
              v-model="formCreate.contacts.address"
              :rules="rules.inputCommonString"
              label="Address"
              required
            ></v-text-field>
          </v-container>
          <!-- row -->
          <v-container>
            <v-text-field
              v-model="formCreate.contacts.phoneNumber"
              :rules="rules.inputCommonString"
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
        <v-btn
          v-if="mode === 'create'"
          color="primary"
          depressed
          dark
          @click="createEmployee"
          :disabled="submitBtnDisabled"
        >Add</v-btn>
        <v-btn
          v-else
          color="primary"
          depressed
          dark
          @click="editEmployee"
          :disabled="submitBtnDisabled"
        >Edit</v-btn>
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
    },
    parentUpdataeTable: {
      type: Function,
      required: true
    },
    userProps: {
      type: Object,
      required: false
    },
    sectorsArr: {
      type: Array,
      required: true
    },
    skillsArr: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentDate: "",
      submitBtnDisabled: false,
      menuDate: false,
      valid: true,
      formCreate: {
        name: "",
        age: "",
        arrivalDate: new Date().toISOString().substr(0, 10),
        skill: "",
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
        inputCommonString: [
          v => !!v || "Field is required",
          v => (v && v.length <= 20) || "Input must be less than 10 characters"
        ],
        mail: [
          v => !!v || "Mail is required",
          v => (v && v.length <= 30) || "Mail must be less than 30 characters"
        ]
      },
    };
  },
  watch: {
    userProps(value) {
      this.formCreate = value || this.formCreate;
    }
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
    createEmployee() {
      if (this.validate()) {
        this.submitBtnDisabled = true;
        let payload = this.formCreate;
        axios
          .put(`https://guarded-mountain-73665.herokuapp.com/employees`, {
            payload
          })
          .then(({ data, status, statusText }) => {
            this.parentUpdataeTable();
            this.closeModal();
            console.log(data);
            console.log("Trades:", status, statusText);
          })
          .catch(error => {
            console.log(error);
            this.submitBtnDisabled = false;
          });
      }
    },
    editEmployee() {
      if (this.validate()) {
        this.submitBtnDisabled = true;
        let payload = this.formCreate;
        axios
          .post(
            `https://guarded-mountain-73665.herokuapp.com/employees/${payload.name}/${payload._id}`,
            {
              payload
            }
          )
          .then(({ data, status, statusText }) => {
            this.closeModal();
            this.submitBtnDisabled = false;
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
