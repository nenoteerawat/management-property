<template>
  <div id="settings-wrapper">
    <v-card
      id="settings"
      class="py-2 px-4"
      color="rgba(0, 0, 0, .3)"
      dark
      flat
      link
      min-width="100"
      style="position: fixed; top: 115px; right: -15px; border-radius: 8px;"
    >
          <strong class="d-inline-block" color="red">Daily Plan</strong>
    </v-card>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="#settings"
      bottom
      content-class="v-settings"
      left
      nudge-left="8"
      offset-x
      origin="top right"
      transition="scale-transition"
    >
      <v-card class="text-center mb-0" width="400">
        <v-card-text>
          <strong class="mb-3 d-inline-block">DAILY PLAN</strong>
        </v-card-text>
          <v-data-table :headers="headers" :items="dailyPlanList" hide-default-footer>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" color="blue" @click="edit(item)">{{ icons.mdiPencil }}</v-icon>
              <v-icon small color="red" @click="delete(item.id)">{{ icons.mdiDelete }}</v-icon>
            </template>
            <!-- <v-data-table :headers="headers" :items="desserts" :search="search"> -->
          </v-data-table>
          <!-- model Daily plan create  -->
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <div class="my-2">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">Open Dialog</v-btn>
                </div>
              </template>
              <v-card>
                <v-card-title class="headline">Use Google's location service?</v-card-title>
                <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
                  <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mdiAccount, mdiPencil, mdiShareVariant, mdiDelete } from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        mdiAccount,
        mdiPencil,
        mdiShareVariant,
        mdiDelete
      },
      dialog: false,
      search: "",
      headers: [
        {
          text: "Type",
          align: "start",
          //   sortable: false,
          value: "dailyPlanType"
        },
        { text: "Detail", value: "detail" },
        { text: "Action", value: "action", sortable: false }
      ],
      dailyPlanList: [
        {
          dailyPlanType: "Frozen Yogurt",
          detail: "test"
        }
      ]
    };
  }
};
</script>