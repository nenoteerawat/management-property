<template>
  <v-container
    id="room"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Room
            </div>
          </template>

          <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          >
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                <v-radio-group 
                  v-model="room.level" 
                  :rules="levelRules" 
                  required 
                  row
                >
                  <v-radio label="Chill" color="cyan accent-3" value="01"></v-radio>
                  <v-radio label="Alert" color="orange lighten-1" value="02"></v-radio>
                  <v-radio label="Critical" color="red lighten-2" value="03"></v-radio>
                </v-radio-group>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="room.listingCode"
                    label="Listing Code"
                    :rules="noEmptyRules"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="room.ownerName"
                    label="Owner Name"
                    :rules="noEmptyRules"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                <v-autocomplete
                  v-model="room.project"
                  :items="projectItems"
                  item-text="Description"
                  label="project"
                  hide-no-data
                  return-object
                ></v-autocomplete>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
               <v-select
                  v-model="room.status"
                  :items="unitStatusSel"
                  label="Standard"
                ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                <v-select
                  v-model="room.grade"
                  :items="gradeSel"
                  label="Grade"
                ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                <v-text-field
                    label="Price"
                    class="purple-input"
                    type="Number"
                    v-model="room.price"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                <v-text-field
                    label="LastPrice"
                    class="purple-input"
                    type="Number"
                    v-model="room.price"
                    disabled
                  />
                </v-col>
                
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                  />
                </v-col>

                <!-- <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Adress"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="City"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Country"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-col> -->

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-0"
                    v-on:click="validate"
                  >
                    Create Room
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          
          
        >
        <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Daily Plan
            </div>
          </template>

          <!-- <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              CEO / CO-FOUNDER
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              Alec Thompson
            </h4>

            <p class="font-weight-light grey--text">
              Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
            </p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn>
          </v-card-text> -->
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
      unitStatusSel : ['Broken', 'Old', 'Good', 'Perfect'],
      projectItems : ["lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8","lumpini rama 8111","lum1pini ram11a 8","lumpini rama 18","lumpini rama 8","lumpini r11ama 8","lumpini rama 1448","lumfdfdfpini rama 8","lumpini rama 8","lumpini rama 8", "lumpini rama 7", "lumpini rama 6", "lumpini rama 9", "Rhythm Asoke"],
      gradeSel : ['A', 'B', 'C'],
      lastPrice : "100,000",

      //validate field
      levelRules: [
        v => !!v || 'level is required',
      ],
      noEmptyRules: [
        v => !!v || 'field is required',
      ],

      //Object 
      room : {
        level : "",
        listingCode : '',
        ownerName : "",
        project : "",
        standard : "",
        grade : "",
        price : "",
      }
    }),

    // computed: {
    //   fields () {
    //     if (!this.model) return []

    //     return Object.keys(this.model).map(key => {
    //       return {
    //         key,
    //         value: this.model[key] || 'n/a',
    //       }
    //     })
    //   },
    //   items () {
    //     return this.entries.map(entry => {
    //       const Description = entry.Description.length > this.descriptionLimit
    //         ? entry.Description.slice(0, this.descriptionLimit) + '...'
    //         : entry.Description

    //       return Object.assign({}, entry, { Description })
    //     })
    //   },
    // },

    // watch: {
    //   search (val) {
    //     // Items have already been loaded
    //     if (this.items.length > 0) return

    //     // Items have already been requested
    //     if (this.isLoading) return

    //     this.isLoading = true

    //     // Lazily load input items
    //     fetch('https://api.publicapis.org/entries')
    //       .then(res => res.json())
    //       .then(res => {
    //         const { count, entries } = res
    //         this.count = count
    //         this.entries = entries
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //       .finally(() => (this.isLoading = false))
    //   },
    // },

    methods: {
      validate () {
        console.log("validate")
        this.$refs.form.validate()
      },
    }
  }
</script>
