<template>
  <v-container id="room" fluid tag="section">
    <base-material-card class="mx-auto">
      <template v-slot:heading>
        <div class="display-2 font-weight-light">Create Room</div>
      </template>
      <v-row justify="center">
        <v-col cols="12" md="12">
          <base-material-card>
            <template v-slot:heading>
        <div class="display-2 font-weight-light">Create Room</div>
      </template>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-radio-group v-model="room.level" :rules="levelRules" row>
                      <v-radio label="Chill" color="cyan lighten-3" value="01"></v-radio>
                      <v-radio label="Alert" color="orange lighten-1" value="02"></v-radio>
                      <v-radio label="Critical" color="red lighten-2" value="03"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-radio-group v-model="room.type" :rules="emptyRules" required row>
                      <v-radio label="Sale" color="green lighten-3" value="01"></v-radio>
                      <v-radio label="Available" color="green lighten-1" value="02"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="room.listingCode"
                      label="Listing Code"
                      :rules="noEmptyRules"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="room.ownerName"
                      label="Owner Name"
                      :rules="noEmptyRules"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Email Address" class="purple-input" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Line" class="purple-input" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Phone" class="purple-input" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      v-model="room.project"
                      :items="projectItems"
                      item-text="Description"
                      label="project"
                      hide-no-data
                      return-object
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </v-col>
        <v-col cols="12" md="12">
          <v-card>
            <v-card-title>
              <h2>Room</h2>
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="2">
                    <v-select v-model="room.status" :items="unitStatusSel" label="Standard"></v-select>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-select v-model="room.grade" :items="gradeSel" label="Grade"></v-select>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      label="Price"
                      class="purple-input"
                      type="Number"
                      v-model="room.price"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select v-model="room.bedroom" :items="bedroomSel" label="ห้องนอน"></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select v-model="room.toilet" :items="toiletSel" label="ห้องน้ำ"></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select v-model="room.bedroom" :items="bedroomSel" label="ห้องรับแขก"></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select v-model="room.toilet" :items="toiletSel" label="ห้องแม่บ้าน"></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field label="พื้นที่ (กว้าง)" prepend-inner-icon="mdi-map-marker"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field label="พื้นที่ (ยาว)" prepend-inner-icon="mdi-map-marker"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field label="จำนวนชั้น"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field label="อยู่ขั้น"></v-text-field>
                      </v-col>
                      <!-- <v-col cols="12" md="6">
                      <v-text-field label="จำนวนชั้น"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field label="อยู่ขั้น"></v-text-field>
                      </v-col>-->
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-select v-model="room.car" :items="positionSel" attach chips label="ตำแหน่ง"></v-select>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-select v-model="room.car" :items="carSel" label="car"></v-select>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-switch v-model="dense" label="เลี้ยงสัตว์"></v-switch>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-switch v-model="dense" label="สูบบุหรี่ได้"></v-switch>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-select v-model="room.indetail" :items="indetailSel" label="ลักษณะห้อง"></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="value"
                      :items="facilitySel"
                      attach
                      chips
                      label="Facility"
                      multiple
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select v-model="value" :items="shopSel" attach chips label="Shops" multiple></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="value"
                      :items="shopSel"
                      attach
                      chips
                      label="Transportation"
                      multiple
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="value"
                      :items="locationSel"
                      attach
                      chips
                      label="Nearby Locations"
                      multiple
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-textarea :clearable="true" filled auto-grow label="Detail" />
                  </v-col>

                  <v-col cols="12" md="12">
                    <v-switch v-model="dense" label="Exclusive"></v-switch>
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn :disabled="!valid" color="success" class="mr-0" v-on:click="validate">Add</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <v-col cols="12" class="text-right">
        <v-btn :disabled="!valid" color="success" class="mr-0" v-on:click="validate">Add</v-btn>
      </v-col>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    dropdown_font: ["Arial", "Calibri", "Courier", "Verdana"],
    unitStatusSel: ["Broken", "Old", "Good", "Perfect"],
    projectItems: [
      "lumpini rama 8",
      "lumpini rama 8111",
      "lum1pini ram11a 8",
      "lumpini rama 18",
      "lumpini r11ama 8",
      "lumpini rama 1448",
      "lumfdfdfpini rama 8",
      "lumpini rama 7",
      "lumpini rama 6",
      "lumpini rama 9",
      "Rhythm Asoke"
    ],
    gradeSel: ["A", "B", "C"],
    bedroomSel: ["ห้องสตูดิโอ", "1 ห้องนอน", "2 ห้องนอน"],
    toiletSel: ["ไม่มี", "1 ห้องน้ำ", "2 ห้องน้ำ"],
    carSel: ["1", "2", "3"],
    facilitySel: ["fitness", "swimming pool Indoor", "swimming pool Outdoor"],
    positionSel: ["ห้องมุม", "ติดลิฟ", "ใกล้ห้องขยะ", "ใกล้บันไดหนีไฟ"],
    locationSel: ["ห้าง"],
    shopSel: ["ร้านกาแฟ", "ร้านอาหาร"],
    indetailSel: [
      "Fully Furnished",
      "Partially Furnished",
      "Fully Fitted",
      "Empty Room",
      "Broken"
    ],
    lastPrice: "100,000",
    //validate field
    levelRules: [v => !!v || "level is required"],
    noEmptyRules: [v => !!v || "field is required"],

    //Object
    room: {
      level: "",
      listingCode: "",
      ownerName: "",
      project: "",
      standard: "",
      grade: "",
      price: ""
    }
  }),

  components: {},

  methods: {
    validate() {
      console.log("validate");
      this.$refs.form.validate();
    }
  }

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
};
</script>
