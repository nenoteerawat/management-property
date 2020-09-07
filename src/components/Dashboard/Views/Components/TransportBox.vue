<template>
  <div class="row">
    <div class="col-md-2">
      <el-select class="select-primary" placeholder="Select" v-model="transportTypeSelect.simple">
        <el-option
          v-for="option in transportTypeSelect.data"
          class="select-primary"
          :value="option.value"
          :label="option.label"
          :key="option.label"
        ></el-option>
      </el-select>
    </div>
    <div class="col-md-2">
      <el-select class="select-primary" placeholder="Select" v-model="transportNameSelect.simple">
        <el-option
          v-for="option in transportNameSelect.data"
          class="select-primary"
          :value="option.value"
          :label="option.label"
          :key="option.label"
        ></el-option>
      </el-select>
    </div>
    <div class="col-md-2">
      <div class="input-group">
        <input type="number" class="form-control" placeholder="0" v-model="transportDistance" />
        <div class="input-group-append">
          <span class="input-group-text bg-grey" id="basic-addon2">ม.</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Transport-Box",
  props: ["type"],

  data() {
    return {
      transportTypeSelect: {
        simple: "",
        data: [
          { value: "1", label: "BTS" },
          { value: "2", label: "MRT" },
          { value: "3", label: "AIRLINK" },
        ],
      },
      transportNameSelect: {
        simple: "",
        data: [
          { value: "1", label: "บางนา" },
          { value: "2", label: "สีลม" },
          { value: "3", label: "สยาม" },
        ],
      },
      transportDistance: "",
      
    };
  },
};
