<template>
  <v-content>
    <v-container bg fill-height grid-list-md text-xs-center>
      <v-layout row wrap align-center>
        <v-flex>
          <h2>Employee</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  methods: {
    getEmployee(name, id) {
      axios
        .get(`http://localhost:3000/employees/${name}/${id}`)
        .then(
          ({ data }) => {
            console.log(data);
          },
          error => reject(error)
        );
    }
  },
  created() {
    this.getEmployee(this.$route.params.name, this.$route.params.id);
  }
};
</script>