<template>
  <v-container id="roomList" fluid tag="section">
    <v-row justify="left">
      <v-col cols="12" md="9">
        <v-card>
          <v-card-title>
            <!-- Nutrition -->
            <v-btn color="success" class="mr-0" to="/pages/room/create">Create Room</v-btn>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search"></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            :hide-default-header="hideHeaders"
            :show-select="showSelect"
            :loading="isLoading"
            item-key="name"
            class="elevation-1"
          >
            <!-- <template v-slot:item.action="{ item }">
              <v-icon medium class="mr-2" color="blue" @click="edit(item)">{{ icons.mdiPencil }}</v-icon>
              <v-icon medium color="red" @click="delete(item.id)">{{ icons.mdiDelete }}</v-icon>
            </template> -->
            <!-- <v-data-table :headers="headers" :items="desserts" :search="search"> -->
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <daily-plan-core />  
        <!-- <v-card>
          <v-card-text>
            <strong class="d-inline-block">DAILY PLAN</strong>
          </v-card-text>
          <v-data-table :headers="headers" :items="dailyPlanList" hide-default-footer>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" color="blue" @click="edit(item)">{{ icons.mdiPencil }}</v-icon>
              <v-icon small color="red" @click="delete(item.id)">{{ icons.mdiDelete }}</v-icon>
            </template>
            <v-data-table :headers="headers" :items="desserts" :search="search">
          </v-data-table>
        </v-card>

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
        </v-row> -->
      </v-col>
    </v-row>
  </v-container>
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
      search: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          //   sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        // { text: "Fat (g)", value: "fat" },
        // { text: "Carbs (g)", value: "carbs" },
        // { text: "Protein (g)", value: "protein" },
        // { text: "Iron (%)", value: "iron" },
        { text: "Action", value: "action", sortable: false }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ]
    };
  },

  components: {
    // DailyPlanCore: () => import('../components/core/DailyPlan')
    DailyPlanCore: () => import('../components/core/DailyPlan')
  }
};
</script>