<template>
  <v-container id="daily-plan" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Create Daily Plan</div>
          </template>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" md="12">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="dailyplan.status"
                      :items="dailyPlanStatusSel"
                      label="Status Daily Plan"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="date" label="Date" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-textarea
                      v-model="dailyplan.detail"
                      :clearable="true"
                      filled
                      auto-grow
                      label="Detail"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <!-- <v-col cols="12" md="6" class="px-5">
                <v-date-picker
                  class="mg-10"
                  ref="picker"
                  v-model="dailyplan.date"
                  full-width
                  color="green"
                ></v-date-picker>
              </v-col> -->
            </v-row>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn :disabled="!valid" color="success" class="mr-0" v-on:click="validate">Add</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <daily-plan-core />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    noEmptyRules: [v => !!v || "field is required"],

    //default data
    dailyPlanStatusSel: ["A", "B"],
    date: new Date().toISOString().substr(0, 10),
    menu: false,

    //object
    dailyplan: {
      status: "",
      date: new Date().toISOString().substr(0, 10),
      detail: ""
    }
  }),

  components: {
    DailyPlanCore: () => import("../../components/core/DailyPlan")
  },

  methods: {
    validate() {
      console.log("validate");
      this.$refs.form.validate();
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>
