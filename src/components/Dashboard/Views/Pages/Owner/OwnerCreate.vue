<template>
  <div class="row center">
    <div class="col-md-10">
      <card>
        <h4 slot="header" class="card-title">Owner</h4>
        <div class="row">
          <div class="col-md-6">
            <fieldset>
              <div class="form-group">
                <label class="control-label">Level</label>
                <div class="col-md-12">
                  <p-radio label="1" v-model="radios.radio1" :inline="true">Chill</p-radio>
                  <p-radio label="2" v-model="radios.radio1" :inline="true">Alert</p-radio>
                  <p-radio label="3" v-model="radios.radio1" :inline="true">Critical</p-radio>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-md-6">
            <fieldset>
              <div class="form-group">
                <label class="control-label">Type</label>
                <div class="col-md-12">
                  <p-radio label="1" v-model="radios.radio2" :inline="true">sale</p-radio>
                  <p-radio label="2" v-model="radios.radio2" :inline="true">Available</p-radio>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="col-md-6">
            <fg-input placeholder="TXXX" label="Listing Code" v-model="owner.listingCode"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input placeholder="ชื่อ" label="Owner Name" v-model="owner.name"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input placeholder="Line" label="Line" v-model="owner.line"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input placeholder="0123456789" label="Phone" v-model="owner.phone"></fg-input>
          </div>
        </div>

        <span slot="footer">
          <p-button type="primary" round>Add</p-button>
        </span>
      </card>
      <!-- end card -->
    </div>
    <div class="col-md-10">
      <card>
        <h4 slot="header" class="card-title">Room</h4>
        <div class="row">
          <div class="col-md-6">
            <label>Project</label>
            <autocomplete :search="search"></autocomplete>
          </div>
          <div class="col-md-6">
            <div>
              <label>Property</label>
            </div>
            <el-select
              class="select-primary"
              placeholder="select"
              v-model="propertySelects.simple"
              @change="switchProperty($event)"
            >
              <el-option
                v-for="option in propertySelects.toProperty"
                class="select-primary"
                :value="option.value"
                :label="option.label"
                :key="option.label"
              ></el-option>
            </el-select>
          </div>
          <div class="col-md-6">
            <fg-input placeholder="ชื่อ" label="Owner Name" v-model="owner.name"></fg-input>
          </div>
          <div v-show="activeCondo" class="col-md-6">
            <fg-input placeholder="Line" label="Line" v-model="owner.line"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input placeholder="0123456789" label="Phone" v-model="owner.phone"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input placeholder="0123456789" label="Phone" v-model="owner.phone"></fg-input>
          </div>
        </div>

        <span slot="footer">
          <p-button type="primary" round>Add</p-button>
        </span>
      </card>
      <!-- end card -->
    </div>
  </div>
</template>
<script>
import { Card } from "src/components/UIComponents";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";

export default {
  components: {
    Card,
    Autocomplete,
  },

  data() {
    return {
      activeCondo: false,
      activeHome: false,
      radios: {
        radio1: "",
        radio2: "",
      },
      projects: ["Lumpini", "Lumpini", "Lumpini", "Lumpini", "Rhythm Asoke"],
      propertySelects: {
        simple: "",
        toProperty: [
          { value: "1", label: "คอนโด" },
          { value: "2", label: "บ้าน" },
          { value: "3", label: "ทาวน์เฮาส์" },
        ],
      },

      owner: {
        listingCode: "",
        name: "",
        line: "",
        phone: "",
        name: "",
      },
      room: {},
    };
  },

  methods: {
    search(input) {
      if (input.length < 1) {
        return this.projects;
      }
      return this.projects.filter((project) => {
        return project.toLowerCase().startsWith(input.toLowerCase());
      });
    },
    switchProperty(event) {
      if (event == 1) {
        this.activeCondo = true;
        this.activeHome = false;
      } else {
        this.activeCondo = false;
        this.activeHome = false;
      }
    },
  },
};
</script>
<style lang="scss">
.center {
  justify-content: center;
}
</style>
