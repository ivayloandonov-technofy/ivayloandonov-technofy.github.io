<template>
  <nav>
    <!-- Drawer -->
    <v-navigation-drawer :clipped="clipped" :width="width" v-model="drawer" fixed app dark>
      <v-list>
        <v-list-tile>
          <router-link tag="li" to="/">
            <a>Home</a>
          </router-link>
        </v-list-tile>
        <v-list-tile>
          <router-link tag="li" to="/employees">
            <a>Employees</a>
          </router-link>
        </v-list-tile>
        <v-list-group no-action prepend-icon="settings">
          <v-list-tile slot="activator">
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Dark theme</v-list-tile-title>
            <v-list-tile-action>
              <v-switch v-model="darkTheme" color="info" @change="setTheme"/>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-toolbar :clipped-left="clipped" fixed app color="primary" dark>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-spacer/>
      <div>
        <h3>Welcome, user</h3>
      </div>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      darkTheme: false,
      clipped: true,
      drawer: false,
      width: "250",
      right: false
    };
  },
  methods: {
    setTheme() {
      console.log("darkTheme");
    }
  }
};
</script>

<style lang="scss">
.v-navigation-drawer a {
  color: white;
}
</style>
