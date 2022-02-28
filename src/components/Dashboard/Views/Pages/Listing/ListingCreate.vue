<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submit)">
      <div class="row center">
        <div class="col-md-11">
          <card>
            <h5 slot="header" class="card-title">
              Owner
              <hr />
            </h5>
            <div class="row">
              <div class="col-md-5">
                <fieldset>
                  <div class="form-group">
                    <label class="control-label">Level</label>
                    <div class="col-md-12">
                      <p-radio
                        label="1"
                        v-model="radios.level"
                        value="1"
                        :inline="true"
                        >Chill</p-radio
                      >
                      <p-radio
                        label="2"
                        v-model="radios.level"
                        value="2"
                        :inline="true"
                        >Alert</p-radio
                      >
                      <p-radio
                        label="3"
                        v-model="radios.level"
                        value="3"
                        :inline="true"
                        >Critical</p-radio
                      >
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-7">
                <fieldset>
                  <div class="form-group">
                    <label class="control-label">Type</label>
                    <div class="col-md-12">
                      <p-checkbox :inline="true" v-model="typeSale"
                        >Sale</p-checkbox
                      >
                      <p-checkbox :inline="true" v-model="typeAvailable"
                        >Rent</p-checkbox
                      >
                      <p-checkbox :inline="true" v-model="typeSaleWithTenant"
                        >Sale with tenant</p-checkbox
                      >
                      <p-checkbox :inline="true" v-model="typeReSaleDownPayment"
                        >Resale down payment</p-checkbox
                      >
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6" v-show="false">
                    <fg-input
                      disabled
                      label="Listing Code"
                      v-model="owner.listingCode"
                    ></fg-input>
                  </div>
                  <div class="col-md-6">
                    <fg-input
                      label="Listing Code"
                      v-model="owner.listingCodeManual"
                      :error="listingCodeDublicateMsg"
                    ></fg-input>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <ValidationProvider
                  name="ownerName"
                  rules="required"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder="ชื่อ"
                    label="Owner Name"
                    v-model="owner.name"
                    :error="failed ? fieldRequired : null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-4" v-show="otherUserView">
                <ValidationProvider
                  name="email"
                  rules="email"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder="Email"
                    label="Email"
                    v-model="owner.email"
                    :error="failed ? 'The Email format ' : null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-4" v-show="otherUserView">
                <fg-input
                  placeholder="Line"
                  label="Line"
                  v-model="owner.line"
                ></fg-input>
              </div>
              <div class="col-md-4" v-show="otherUserView">
                <fg-input
                  placeholder="0123456789"
                  label="Phone"
                  v-model="owner.phone"
                ></fg-input>
              </div>
              <div class="col-md-4" v-if="getUser.roles[0] == 'ROLE_ADMIN'">
                <div>
                  <label>Sale</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="select"
                  v-model="userSelects.select"
                  @change="getListingCode($event)"
                >
                  <el-option
                    v-for="option in userSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <fg-input
                  placeholder="Link Google map"
                  label="link Google map"
                  v-model="owner.linkGoogleMap"
                ></fg-input>
              </div>
            </div>
          </card>
          <!-- end card -->
        </div>
        <div class="col-md-11">
          <card>
            <h5 slot="header" class="card-title">
              Listing
              <hr />
            </h5>
            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-12">
                    <label>Project : </label>
                    <span style="font-size: 25px"> {{ project.name }} </span>
                    <span>({{ project.zone }})</span>
                    <p-button
                      type="success"
                      class="pull-right"
                      outline
                      round
                      @click="goToPageCreateProject"
                    >
                      <i class="nc-icon nc-simple-add"></i> Add
                    </p-button>
                  </div>
                  <div class="col-md-12">
                    <model-select
                      :options="projectSelects"
                      v-model="projectChoose"
                      class="select"
                      placeholder="select project"
                    >
                    </model-select>
                  </div>
                </div>
                <!-- <autocomplete
                  :search="search"
                  @submit="projectSearch"
                ></autocomplete> -->
              </div>
              <div class="col-md-3" v-show="propertySelects.select != 3">
                <div>
                  <label>ตึก</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="select"
                  v-model="buildingSelects.select"
                  @change="switchBuilding($event)"
                >
                  <el-option
                    v-for="option in buildingSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-3">
                <div>
                  <label>ประเภท</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="select"
                  disabled
                  v-model="propertySelects.select"
                  @change="switchProperty($event)"
                >
                  <el-option
                    v-for="option in propertySelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6" v-show="propertySelects.select != 3">
                <div class="row">
                  <div class="col-md-4">
                    <fg-input
                      :disabled="true"
                      label="ชั้น"
                      v-model="project.floor"
                    ></fg-input>
                  </div>
                  <div class="col-md-4">
                    <fg-input
                      :disabled="true"
                      label="ตึก"
                      v-model="project.building"
                    ></fg-input>
                  </div>
                  <div class="col-md-4">
                    <fg-input
                      :disabled="true"
                      label="ปีที่สร้างเสร็จ"
                      v-model="project.develop"
                    ></fg-input>
                  </div>
                </div>
              </div>
              <div class="col-md-6" v-show="propertySelects.select != 3">
                <fg-input
                  :disabled="true"
                  label="ที่อยู่"
                  v-model="project.address"
                ></fg-input>
              </div>

              <div class="col-md-12" v-show="propertySelects.select != 3">
                <div class="row-">
                  <div>
                    <label>การเดินทาง</label>
                  </div>
                  <div class="col-md-12">
                    <el-table :data="transports">
                      <el-table-column
                        label="ประเภท"
                        property="type"
                      ></el-table-column>
                      <el-table-column
                        label="สถานี"
                        property="name"
                      ></el-table-column>
                      <el-table-column
                        label="ระยาทาง"
                        property="range"
                      ></el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-3" v-show="propertySelects.select != 1">
                    <ThailandAutoComplete
                      v-model="district"
                      type="district"
                      @select="select"
                      label="ตำบล"
                      placeholder="ตำบล..."
                    />
                  </div>
                  <div class="col-md-3" v-show="propertySelects.select != 1">
                    <ThailandAutoComplete
                      v-model="amphoe"
                      type="amphoe"
                      @select="select"
                      label="อำเภอ"
                      placeholder="อำเภอ..."
                    />
                  </div>
                  <div class="col-md-3" v-show="propertySelects.select != 1">
                    <ThailandAutoComplete
                      v-model="province"
                      type="province"
                      @select="select"
                      label="จังหวัด"
                      placeholder="จังหวัด..."
                    />
                  </div>
                  <div class="col-md-3" v-show="propertySelects.select != 1">
                    <ThailandAutoComplete
                      v-model="zipcode"
                      type="zipcode"
                      @select="select"
                      label="รหัสไปรษณีย์"
                      placeholder="รหัสไปรษณีย์..."
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-6" v-show="propertySelects.select != 3">
                <div>
                  <label>Standard</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="standardSelects.select"
                >
                  <el-option
                    v-for="option in standardSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6" v-show="propertySelects.select != 3">
                <div>
                  <label>Grade</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="gradeSelects.select"
                >
                  <el-option
                    v-for="option in gradeSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6" v-show="propertySelects.select != 3">
                <div>
                  <label>ห้องนอน</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="bedSelects.select"
                >
                  <el-option
                    v-for="option in bedSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6" v-show="propertySelects.select != 3">
                <div><label>ประเภทห้อง</label></div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="roomTypeSelects.select"
                >
                  <el-option
                    v-for="option in roomTypeSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="col-md-6" v-show="propertySelects.select != 3">
                <div>
                  <label>ห้องเมด</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="mateRoomSelects.select"
                >
                  <el-option
                    v-for="option in mateRoomSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6" v-show="propertySelects.select != 3">
                <div>
                  <label>ห้องเก็บของ</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="storageRoomSelects.select"
                >
                  <el-option
                    v-for="option in storageRoomSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6" v-show="propertySelects.select != 3">
                <div>
                  <label>ห้องน้ำ</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="toiletSelects.select"
                >
                  <el-option
                    v-for="option in toiletSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <div>
                  <label>พื้นที่ ({{ summaryUnit }})</label>
                </div>
                <div class="row">
                  <div class="col-md-7">
                    <div class="input-group">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="0"
                        v-model="room.area"
                        @keyup="calculatorUnit(room.area)"
                      />
                      <div class="input-group-append">
                        <span
                          class="input-group-text bg-grey"
                          id="basic-addon2"
                          >{{ unit }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div v-show="propertySelects.select == 3">
                  <label>หน้ากว้าง</label>
                </div>
                <div class="row">
                  <div class="col-md-6" v-show="propertySelects.select != 3">
                    <div>
                      <label>{{ floorText }}</label>
                    </div>
                    <el-select
                      class="select-primary"
                      placeholder="Select"
                      v-model="floorSelects.select"
                    >
                      <el-option
                        v-for="option in floorSelects.data"
                        class="select-primary"
                        :value="option.value"
                        :label="option.label"
                        :key="option.label"
                      ></el-option>
                    </el-select>
                    <!-- <fg-input type="number" label="อยู่ชั้น" v-model="room.floor"></fg-input> -->
                  </div>
                  <div class="col-md-6" v-show="propertySelects.select == 3">
                    <div class="row">
                      <div class="col-md-7">
                        <div class="input-group">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="0"
                            v-model="room.widthLand"
                          />
                          <div class="input-group-append">
                            <span
                              class="input-group-text bg-grey"
                              id="basic-addon2"
                              >ม.</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div>
                  <label>ทิศ (ประตูหน้าบ้าน)</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="directionSelects.select"
                >
                  <el-option
                    v-for="option in directionSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <fg-input
                      placeholder
                      label="ราคา"
                      v-model="room.price"
                      @keyup="formatCurrency(room.price, 'PRICE')"
                    ></fg-input>
                  </div>
                  <div class="col-md-6" v-show="activeRent">
                    <fg-input
                      placeholder
                      label="เช่า"
                      v-model="room.priceRent"
                      @keyup="formatCurrency(room.priceRent, 'PRICE_RENT')"
                    ></fg-input>
                  </div>
                </div>
              </div>
              <div class="col-md-6" v-show="propertySelects.select != 3">
                <div>
                  <label>ตำแหน่งห้อง</label>
                </div>
                <el-select
                  multiple
                  class="select-primary"
                  collapse-tags
                  v-model="positionSelects.select"
                  placeholder="Select"
                >
                  <el-option
                    v-for="option in positionSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <!--              <div v-show="activeSell || typeSaleWithTenant" class="col-md-3">-->
              <!--                <div>-->
              <!--                  <label>รายละเอียดการซื้อ</label>-->
              <!--                </div>-->
              <!--                <el-select-->
              <!--                  class="select-primary"-->
              <!--                  placeholder="Select"-->
              <!--                  v-model="sellDetailSelects.select"-->
              <!--                >-->
              <!--                  <el-option-->
              <!--                    v-for="option in sellDetailSelects.data"-->
              <!--                    class="select-primary"-->
              <!--                    :value="option.value"-->
              <!--                    :label="option.label"-->
              <!--                    :key="option.label"-->
              <!--                  ></el-option>-->
              <!--                </el-select>-->
              <!--              </div>-->
              <div v-show="activeSell || typeSaleWithTenant" class="col-md-6">
                <div class="row">
                  <div class="col-md-12">
                    <fieldset>
                      <div class="form-group">
                        <label class="control-label">ภาษี หัก ณ ที่จ่าย</label>
                        <div class="col-md-12">
                          <p-radio
                            label="1"
                            v-model="radios.tax"
                            value="1"
                            :inline="true"
                            >ผู้ซื้อ</p-radio
                          >
                          <p-radio
                            label="2"
                            v-model="radios.tax"
                            value="2"
                            :inline="true"
                            >ผู้ขาย</p-radio
                          >
                          <p-radio
                            label="3"
                            v-model="radios.tax"
                            value="3"
                            :inline="true"
                            >50/50</p-radio
                          >
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-md-12">
                    <fieldset>
                      <div class="form-group">
                        <label class="control-label"
                          >ภาษีธุรกิจเฉพาะ หรือ อากรแสตมป์</label
                        >
                        <div class="col-md-12">
                          <p-radio
                            label="1"
                            v-model="radios.businessTax"
                            value="1"
                            :inline="true"
                            >ผู้ซื้อ</p-radio
                          >
                          <p-radio
                            label="2"
                            v-model="radios.businessTax"
                            value="2"
                            :inline="true"
                            >ผู้ขาย</p-radio
                          >
                          <p-radio
                            label="3"
                            v-model="radios.businessTax"
                            value="3"
                            :inline="true"
                            >50/50</p-radio
                          >
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-md-12">
                    <fieldset>
                      <div class="form-group">
                        <label class="control-label">ค่าโอน</label>
                        <div class="col-md-12">
                          <p-radio
                            label="1"
                            v-model="radios.transferFee"
                            value="1"
                            :inline="true"
                            >ผู้ซื้อ</p-radio
                          >
                          <p-radio
                            label="2"
                            v-model="radios.transferFee"
                            value="2"
                            :inline="true"
                            >ผู้ขาย</p-radio
                          >
                          <p-radio
                            label="3"
                            v-model="radios.transferFee"
                            value="3"
                            :inline="true"
                            >50/50</p-radio
                          >
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
              <div v-show="activeRent" class="col-md-3">
                <fg-input
                  placeholder="จำนวนเงินประกันกี่เดือน"
                  label="รายละเอียดการเช่า"
                  v-model="room.rentDetail"
                ></fg-input>
              </div>
              <div v-show="typeReSaleDownPayment" class="col-md-3">
                <fg-input
                  placeholder=""
                  label="เงิน Down"
                  v-model="room.priceDown"
                  @keyup="formatCurrency(room.priceDown, 'PRICE_DOWN')"
                ></fg-input>
              </div>
              <div v-show="activeCondo" class="col-md-6">
                <div>
                  <label>ลักษณะห้อง</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="featureSelects.select"
                >
                  <el-option
                    v-for="option in featureSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-4 col-offset-8">
                <fg-input label="วิว" v-model="scenery"></fg-input>
              </div>
              <div class="col-md-12" v-show="propertySelects.select != 3">
                <div>
                  <label>ส่วนกลาง</label>
                </div>
                <el-select
                  multiple
                  class="select-primary select-width-100"
                  placeholder="Select"
                  disabled
                  v-model="facilitySelects.selects"
                >
                  <el-option
                    v-for="option in facilitySelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-12" v-show="propertySelects.select != 3">
                <div>
                  <label>คุณสมบัติพิเศษ</label>
                </div>
                <el-tag
                  :key="tag"
                  v-for="(tag, index) in tags.dynamicTags"
                  size="small"
                  type="primary"
                  :closable="true"
                  :close-transition="false"
                  @close="handleClose(index)"
                  >{{ tag }}</el-tag
                >

                <input
                  type="text"
                  placeholder="เพิ่ม"
                  class="form-control input-new-tag"
                  v-model="tags.inputValue"
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    style="min-height: 450px"
                    rows="40"
                    class="form-control border-input"
                    placeholder="Here can be your description"
                    v-model="room.description"
                  ></textarea>
                  <p-button size="sm" @click="genDesc"
                    >Gen Description</p-button
                  >
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Remark</label>
                  <textarea
                    rows="5"
                    class="form-control border-input"
                    placeholder="Here can be your Remark"
                    v-model="room.remark"
                  ></textarea>
                </div>
              </div>
              <div class="col-md-12">
                <div>
                  <label>รูป</label>
                </div>
                <vue-upload-multiple-image
                  @upload-success="uploadImageSuccess"
                  @before-remove="beforeRemove"
                  @edit-image="editImage"
                  @mark-is-primary="markIsPrimary"
                  :data-images="fileList"
                  idUpload="myIdUpload"
                  editUpload="myIdEdit"
                  :maxImage="20"
                  browseText="Browse Photo"
                  dragText="click to upload"
                  primaryText="Primary"
                  markIsPrimaryText="mark is Primary"
                  popupText="info"
                  ref="myImages"
                ></vue-upload-multiple-image>
                <!-- <el-upload
                  class="upload"
                  drag
                  action="string"
                  accept="image/jpeg, image/png"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :before-upload="onBeforeUploadImage"
                  :http-request="UploadImage"
                  multiple
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    Drop file here or
                    <em>click to upload</em>
                  </div>
                </el-upload>-->
              </div>
              <!-- <vue-preview :slides="slides" @close="handleCloseImage"></vue-preview> -->
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-4">
                    <div>
                      <label>Exclusive</label>
                    </div>
                    <p-switch v-model="exclusive"></p-switch>
                  </div>
                  <div class="col-md-6" v-show="exclusiveShow">
                    <div>
                      <label>วันที่สิ้นสุด</label>
                    </div>
                    <fg-input>
                      <el-date-picker
                        v-model="room.exclusiveDate"
                        type="date"
                        placeholder="Pick a day"
                      ></el-date-picker>
                    </fg-input>
                  </div>
                </div>
              </div>
            </div>

            <template slot="footer">
              <hr />
              <div class="stats">
                <p-button
                  type="info"
                  round
                  @click="submit"
                  v-loading.fullscreen.lock="fullscreenLoading"
                  >{{ btnAction }}</p-button
                >
              </div>
            </template>
          </card>
          <!-- end card -->
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import Vue from "vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import { Card } from "src/components/UIComponents";
import PSwitch from "src/components/UIComponents/Switch.vue";
import axios from "axios";
import { required, email, confirmed } from "vee-validate/dist/rules";
import { extend } from "vee-validate";
import { mapGetters } from "vuex";
import VuePreview from "vue-preview";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import { ModelSelect } from "vue-search-select";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";
import { Select } from "element-ui";

// defalut install
Vue.use(VuePreview);

extend("email", email);
extend("required", required);

export default {
  components: {
    Card,
    PSwitch,
    VueUploadMultipleImage,
    ModelSelect,
    ThailandAutoComplete,
    [Select.name]: Select,
  },

  created: function () {
    const AXIOS = axios.create({
      baseURL: process.env.VUE_APP_BACKEND_URL,
    });
    if (this.getUser.roles[0] === "ROLE_SALE") {
      this.getListingCode(this.getUser.username);
    }

    this.getProject();

    if (this.getUser.roles[0] == "ROLE_ADMIN") {
      let postBody = {};
      AXIOS.post(`api/user/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        // console.log("getUser all resp : " + JSON.stringify(resp));
        this.userSelects.data = resp.data.map((item) => {
          return {
            value: item.username,
            label: item.firstName + " " + item.lastName,
          };
        });
      });
    }
    //edit
    if (this.$route.query.id) {
      let postBody = {
        role: "",
        id: this.$route.query.id,
      };
      // console.log("edit postBody : " + JSON.stringify(postBody));
      AXIOS.post(`api/listing/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        // console.log("listing : " + JSON.stringify(resp.data[0]));
        let fullName = this.getUser.firstName + " " + this.getUser.lastName;
        // console.log("fullName : " + fullName)

        if (fullName == resp.data[0].createdBy) this.otherUserView = true;
        else this.otherUserView = false;

        this.owner.listingCode = resp.data[0].owner.listingCode;
        this.owner.name = resp.data[0].owner.name;
        this.owner.line = resp.data[0].owner.line;
        this.owner.phone = resp.data[0].owner.phone;
        this.owner.name = resp.data[0].owner.name;
        this.owner.email = resp.data[0].owner.email;
        this.owner.listingCodeManual = resp.data[0].owner.listingCodeManual;
        this.owner.linkGoogleMap = resp.data[0].owner.linkGoogleMap;
        this.userSelects.select = resp.data[0].saleUser;
        this.project.id = resp.data[0].room.projectId;
        let types = resp.data[0].room.type.split(",");
        (this.typeSale = types[0] == "true"),
          (this.typeAvailable = types[1] == "true"),
          (this.typeSaleWithTenant = types[2] == "true"),
          (this.typeReSaleDownPayment = types[3] == "true"),
          // this.typeRoles = resp.data[0].room.type;
          (this.radios.level = resp.data[0].room.level);
        this.standardSelects.select = resp.data[0].room.standard;
        this.gradeSelects.select = resp.data[0].room.grade;
        this.toiletSelects.select = resp.data[0].room.toilet;
        this.roomTypeSelects.select = resp.data[0].room.roomType;
        this.mateRoomSelects.select = resp.data[0].room.mateRoom;
        this.storageRoomSelects.select = resp.data[0].room.storageRoom;
        this.bedSelects.select = resp.data[0].room.bed;
        this.room.area = resp.data[0].room.area;
        this.room.floor = resp.data[0].room.floor;
        this.formatCurrency(resp.data[0].room.price, "PRICE");
        this.formatCurrency(resp.data[0].room.priceRent, "PRICE_RENT");
        this.formatCurrency(resp.data[0].room.priceDown, "PRICE_DOWN");
        this.room.rentDetail = resp.data[0].room.rentDetail;
        this.propertySelects.select = resp.data[0].room.propertyType;
        this.directionSelects.select = resp.data[0].room.direction;
        this.positionSelects.select = resp.data[0].room.position;
        this.scenery = resp.data[0].room.scenery;
        this.featureSelects.select = resp.data[0].room.feature;
        // this.sellDetailSelects.select = resp.data[0].room.sellDetail;
        this.radios.tax = resp.data[0].room.tax;
        this.radios.businessTax = resp.data[0].room.businessTax;
        this.radios.transferFee = resp.data[0].room.transferFee;
        this.tags.dynamicTags = resp.data[0].room.tags;
        this.room.description = resp.data[0].room.description;
        this.room.remark = resp.data[0].room.remark;
        this.exclusive = resp.data[0].room.exclusive;
        this.room.exclusiveDate = resp.data[0].room.exclusiveDate;
        this.district = resp.data[0].room.district;
        this.amphoe = resp.data[0].room.amphoe;
        this.province = resp.data[0].room.province;
        this.zipcode = resp.data[0].room.zipcode;
        this.fileList = resp.data[0].files;
        this.room.widthLand = resp.data[0].room.widthLand;
        // for (let value of resp.data[0].files) {
        //   this.slides.push({
        //     id: value.id,
        //     src: value.url,
        //     msrc: value.url,
        //     alt: value.id,
        //     title: value.name,
        //     w: 1100,
        //     h: 800,
        //   });
        // }
        this.projectSearch(resp.data[0].projects[0].name);
        this.buildingSelects.select = resp.data[0].room.building;
        setTimeout(() => {
          this.switchBuilding(resp.data[0].room.building);
          this.floorSelects.select = Number(resp.data[0].room.floor);
        }, 500);
        this.btnAction = "Edit";
      });
    }
  },

  data() {
    return {
      otherUserView: true,
      slides: [
        // {
        //   src:
        //     "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
        //   msrc:
        //     "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg",
        //   alt: "picture1",
        //   title: "Image Caption 1",
        //   w: 600,
        //   h: 400,
        // },
        // {
        //   src:
        //     "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
        //   msrc:
        //     "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg",
        //   alt: "picture2",
        //   title: "Image Caption 2",
        //   w: 1200,
        //   h: 900,
        // },
      ],
      summaryUnit: "",
      unit: "ตร.ม.",
      fieldRequired: "The field is required",
      btnAction: "Add",
      activeCondo: false,
      activeHome: false,
      activeRent: false,
      activeSell: true,
      loading: false,
      fullscreenLoading: false,
      projects: [],
      bakProjects: [],
      exclusiveShow: false,
      exclusive: false,
      maxImage: 10,
      radios: {
        level: "",
        tax: "",
        businessTax: "",
        transferFee: "",
      },
      typeSale: true,
      typeAvailable: false,
      typeSaleWithTenant: false,
      typeReSaleDownPayment: false,
      // checkboxTypeRoles: [
      //   {key: "typeSale", value: "1", label: "sale" },
      //   {key: "typeAvailable", status: false, value: "2", label: "available" },
      //   {key: "typeSaleWithTenant", status: false, value: "3", label: "sale with tenant" },
      //   {key: "typeReSaleDownPayment", status: false, value: "4", label: "resale down payment" },
      // ],
      projectSelects: [],
      projectChoose: { value: "", text: "" },
      propertySelects: {
        select: "",
        data: [
          { value: "1", label: "คอนโด" },
          { value: "2", label: "บ้าน" },
          { value: "3", label: "ที่ดิน" },
        ],
      },
      userSelects: {
        select: "",
        data: [],
      },
      buildingSelects: {
        select: "",
        data: [],
      },
      buildings: [],
      standardSelects: {
        select: "",
        data: [
          { value: "broken", label: "Broken" },
          { value: "old", label: "Old" },
          { value: "good", label: "Good" },
          { value: "perfect", label: "Perfect" },
        ],
      },
      gradeSelects: {
        select: "",
        data: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
        ],
      },
      bedSelects: {
        select: "",
        data: [
          { value: "0", label: "ห้องสตูดิโอ" },
          { value: "1", label: "1 ห้องนอน" },
          { value: "2", label: "2 ห้องนอน" },
          { value: "3", label: "3 ห้องนอน" },
          { value: "4", label: "4 ห้องนอน" },
        ],
      },
      roomTypeSelects: {
        select: "",
        data: [
          { value: "0", label: "Single floor" },
          { value: "1", label: "Loft" },
          { value: "2", label: "Duplex" },
          { value: "3", label: "Combine" },
          { value: "4", label: "Mini penthouse" },
          { value: "5", label: "Penthouse" },
        ],
      },
      mateRoomSelects: {
        select: "",
        data: [
          { value: "0", label: "ไม่มี" },
          { value: "1", label: "1 ห้อง" },
          { value: "2", label: "2 ห้อง" },
          { value: "3", label: "3 ห้อง" },
          { value: "4", label: "4 ห้อง" },
        ],
      },
      storageRoomSelects: {
        select: "",
        data: [
          { value: "0", label: "ไม่มี" },
          { value: "1", label: "1 ห้อง" },
          { value: "2", label: "2 ห้อง" },
          { value: "3", label: "3 ห้อง" },
          { value: "4", label: "4 ห้อง" },
        ],
      },
      toiletSelects: {
        select: "",
        data: [
          { value: "0", label: "ไม่มี" },
          { value: "1", label: "1 ห้องน้ำ" },
          { value: "2", label: "2 ห้องน้ำ" },
          { value: "3", label: "3 ห้องน้ำ" },
          { value: "4", label: "4 ห้องน้ำ" },
        ],
      },
      directionSelects: {
        select: "",
        data: [
          { value: "0", label: "เลือกทิศ" },
          { value: "1", label: "เหนือ" },
          { value: "2", label: "ตะวันตกเฉียงใต้" },
          { value: "3", label: "ตะวันตกเฉียงเหนือ" },
          { value: "4", label: "ตะวันออก" },
          { value: "5", label: "ตะวันตก" },
          { value: "6", label: "ตะวันออกเฉียงใต้" },
          { value: "7", label: "ตะวันออกเฉียงเหนือ" },
          { value: "8", label: "ใต้" },
        ],
      },
      // sellDetailSelects: {
      //   select: "",
      //   data: [
      //     { value: "1", label: "ค่าโอนฯคนละครึ่ง" },
      //     { value: "2", label: "รวมโอนฯ" },
      //     { value: "3", label: "ภาษีทั้งหมดคนละครึ่ง" },
      //   ],
      // },
      positionSelects: {
        select: "",
        data: [
          { value: "1", label: "ห้องมุม" },
          { value: "2", label: "ติดลิฟ" },
          { value: "3", label: "ใกล้ห้องขยะ" },
          { value: "4", label: "ใกล้บันไดหนีไฟ" },
        ],
      },
      featureSelects: {
        select: "",
        data: [
          { value: "0", label: "ห้องมีตำหนิ" },
          { value: "1", label: "ห้องเปล่า" },
          { value: "2", label: "ตกแต่งไปแล้วบางส่วน" },
          { value: "3", label: "ตกแต่งครบพร้อม" },
        ],
      },
      facilitySelects: {},
      scenery: "",
      transports: [],
      tags: {
        dynamicTags: ["ครัวปิด", "สระน้ำส่วนตัว"],
        inputVisible: true,
        inputValue: "",
      },
      district: "",
      amphoe: "",
      province: "",
      zipcode: "",
      owner: {
        listingCode: "",
        name: "",
        line: "",
        phone: "",
        name: "",
        email: "",
        listingCodeManual: "",
        linkGoogleMap: "",
      },
      room: {
        area: "",
        floor: "",
        rentDetail: "",
        priceRent: "",
        priceDown: "",
        price: "",
        exclusiveDate: "",
        description: "",
        remark: "",
        widthLand: "",
      },
      project: {
        id: "",
        type: "",
        name: "",
        floor: "",
        building: "",
        develop: "",
        address: "",
        price: "",
        zone: "",
      },
      floorText: "อยู่ชั้น",
      floorSelects: {
        select: "",
        data: [],
      },
      comment: "",
      fileList: [
        // {
        //   path:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        //   default: 1,
        //   highlight: 1,
        //   caption: "caption to display. receive",
        // },
        // {
        //   id: "",
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
        // {
        //   id: "",
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
      ],
      listingCodeDublicateMsg: "",
      awaitingCheckListingCode: false,
    };
  },

  computed: {
    ...mapGetters({ getUser: "getUser" }),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },

  watch: {
    typeSale: function (event) {
      event ? (this.activeSell = true) : (this.activeSell = false);
    },
    typeAvailable: function (event) {
      if (event) this.activeRent = true;
      else if (!event && !this.typeSaleWithTenant) this.activeRent = false;
    },
    typeSaleWithTenant: function (event) {
      if (event) this.activeRent = true;
      else if (!event && !this.typeAvailable) this.activeRent = false;
    },
    exclusive: function (event) {
      if (event) this.exclusiveShow = true;
      else this.exclusiveShow = false;
    },
    projectChoose: function (event) {
      this.projectSearch(event.text);

      // let listing = this.listings.filter((listing) => {
      //   if (listing.id == event.value) return true;
      // });
      // // console.log("listing : "+ JSON.stringify(listing))
      // this.listingByLead.propertyType = this.dataPropertyType.filter((data) => {
      //   if (data.value == listing[0].room.propertyType) return true;
      // })[0].label;
      // this.listingByLead.area = listing[0].room.area + " ตร.ม.";
      // this.listingByLead.floor = listing[0].room.floor;
      // this.listingByLead.direction = this.dataDirection.filter((data) => {
      //   if (data.value == listing[0].room.direction) return true;
      // })[0].label;
    },
    "owner.listingCodeManual"(value, event) {
      if (value != "") {
        if (!this.awaitingCheckListingCode) {
          setTimeout(() => {
            let postBody = {
              code: value,
              id: this.$route.query.id,
            };
            const AXIOS = axios.create({
              baseURL: process.env.VUE_APP_BACKEND_URL,
            });
            AXIOS.post(`api/listing/code`, postBody, {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then((resp) => {
                if (resp.data == null || resp.data.length == 0) {
                  this.listingCodeDublicateMsg = "";
                } else {
                  this.listingCodeDublicateMsg =
                    postBody.code + " มีการใช้งานแล้ว กรุณาเปลี่ยน";
                }
              })
              .catch((err) => {
                // console.log("err : " + JSON.stringify(err));
                reject(err);
              });
            this.awaitingCheckListingCode = false;
          }, 200);
        }
        this.awaitingCheckListingCode = true;
      }
    },
  },

  methods: {
    select(address) {
      this.district = address.district;
      this.amphoe = address.amphoe;
      this.province = address.province;
      this.zipcode = address.zipcode;
    },
    calculatorUnit(num) {
        console.log("debug 1");
      if (
        this.propertySelects.select == 2 ||
        this.propertySelects.select == 3
      ) {
        var farmUnit = num / 400;
        var jobUnit = (num % 400) / 100;
        var vaUnit = (num % 400) % 100;
        var text =
          "ไร่ : " + farmUnit + " งาน : " + jobUnit + " ตารางวา : " + vaUnit;
        this.summaryUnit = text;
      } else {
        var text = "";
        this.summaryUnit = text;
      }
        console.log("debug 2");
    },
    formatCurrency(num, text) {
      num = num + "";
      var number = num.replace(/[^\d.-]/g, "");
      var splitArray = number.split(".");
      var integer = splitArray[0];
      var mantissa = splitArray.length > 1 ? "." + splitArray[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(integer)) {
        integer = integer.replace(rgx, "$1" + "," + "$2");
      }
      if (text === "PRICE_RENT")
        this.room.priceRent = integer + mantissa.substring(0, 3);
      else if (text === "PRICE")
        this.room.price = integer + mantissa.substring(0, 3);
      else if (text === "PRICE_DOWN")
        this.room.priceDown = integer + mantissa.substring(0, 3);
    },
    getProject: function () {
      let postBody = {
        role: "",
        id: "",
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/project/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        // console.log("getProject all resp : " + JSON.stringify(resp));
        this.projectSelects = resp.data.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        });
        // this.projects = resp.data.map((item) => {
        //   return item.name;
        // });
        // this.bakProjects = resp.data.map((item) => {
        //   return { name: item.name, type: item.type };
        // });
        // console.log("projects : " + JSON.stringify(this.projects));
      });
    },
    projectSearch(result) {
      this.project.id = "";
      this.project.name = "";
      this.project.type = "";
      this.project.floor = "";
      this.project.develop = "";
      this.project.address = "";
      this.project.floor = "";
      this.project.building = "";
      this.project.develop = "";
      this.facilitySelects.selects = "";
      this.propertySelects.select = "";
      this.buildingSelects.select = "";
      this.buildingSelects.data = [];
      this.buildings = [];
      this.transports = [];
      let postBody = {
        role: "",
        id: "",
        name: result,
      };
      // console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/project/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        // console.log("resp : " + JSON.stringify(resp.data[0]));
        this.project.id = resp.data[0].id;
        this.project.name = resp.data[0].name;
        this.project.type = resp.data[0].type;
        this.project.floor = resp.data[0].floor;
        this.project.develop = resp.data[0].develop;
        this.project.address = resp.data[0].address;
        this.project.zone = resp.data[0].zone;
        this.facilitySelects.selects = resp.data[0].facilities;
        this.propertySelects.select = resp.data[0].type;
        this.buildingSelects.data = resp.data[0].buildings.map((item) => {
          return {
            value: item.building,
            label: item.building,
          };
        });
        this.buildings = resp.data[0].buildings;
        this.transports = resp.data[0].transports.map((item) => {
          return {
            type: item.type,
            name: item.name,
            range: item.range + " ม.",
          };
        });
        this.switchProperty(resp.data[0].type);
      });
    },
    switchProperty(event) {
      // console.log("event : " + event);
      if (event == 1) {
        this.floorText = "อยู่ชั้น";
        this.unit = "ตร.ม.";
        this.activeCondo = true;
      } else if (event == 2) {
        this.floorText = "จำนวนชั้น";
        this.activeCondo = true;
      } else {
        this.unit = "ตร.ว.";
        this.activeCondo = false;
      }
    },
    switchBuilding(event) {
      // console.log("switchBuilding event : ", JSON.stringify(event));
      let building = this.buildings.filter(function (item) {
        if (item.building == event) {
          return {
            floor: item.floor,
            building: item.building,
            develop: item.develop,
          };
        }
      });
      this.project.floor = building[0].floor;
      this.project.building = building[0].building;
      this.project.develop = building[0].develop;
      this.floorSelects.data = [];
      for (let index = 1; index <= this.project.floor; index++) {
        this.floorSelects.data.push({
          label: "ชั้น " + index,
          value: index,
        });
      }
    },
    getListingCode(value) {
      let paramsValue = {
        saleUser: value,
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get(`api/listing/getLastCode`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: paramsValue,
      }).then((resp) => {
        // console.log("getListingCode : " + JSON.stringify(resp.data));
        this.owner.listingCode = resp.data;
      });
    },
    genDesc() {
      let type = this.typeRoles;
      let position = "";
      for (let index = 0; index < this.positionSelects.data.length; index++) {
        for (
          let index2 = 0;
          index2 < this.positionSelects.select.length;
          index2++
        ) {
          if (
            this.positionSelects.data[index].value ===
            this.positionSelects.select[index2]
          )
            position += this.positionSelects.data[index].label + ",";
        }
      }
      let direction = this.directionSelects.select;
      this.directionSelects.data.filter(function (item) {
        if (item.value == direction) {
          direction = item.label;
        }
      });
      let floor = this.floorSelects.select;
      this.floorSelects.data.filter(function (item) {
        if (item.value == floor) {
          floor = item.label;
        }
      });
      let feature = this.featureSelects.select;
      this.featureSelects.data.filter(function (item) {
        if (item.value == feature) {
          feature = item.label;
        }
      });
      // let sellDetail = this.sellDetailSelects.select;
      // this.sellDetailSelects.data.filter(function (item) {
      //   if (item.value == sellDetail) {
      //     sellDetail = item.label;
      //   }
      // });
      // console.log("position : ", JSON.stringify(position));
      var listSellDetail = ["ผู้ซื้อ", "ผู้ขาย", "50/50"];
      this.room.description =
        this.project.name +
        "\n" +
        // "Near Phraram Kao 9 MRT Station\n" +
        "(FOR " +
        type +
        ")\n" +
        "\n" +
        "Details :\n" +
        "- " +
        this.room.area +
        " Sqm.\n" +
        "- " +
        floor +
        " Floor\n" +
        "- " +
        this.bedSelects.select +
        " Bedrooms / " +
        this.toiletSelects.select +
        " Bathrooms\n" +
        "- " +
        position +
        "\n" +
        "- Building " +
        this.project.building +
        "\n" +
        "- " +
        direction +
        "\n" +
        "- " +
        feature +
        " \n" +
        "\n" +
        "*** " +
        this.room.price +
        "*** " +
        "\n" +
        "_________________________________________\n" +
        "\n" +
        "เรานำเสนอบริการด้านอสังหาริมทรัพย์ ให้กับทุกๆท่านที่กำลังหาซื้อ หรือเช่า คอนโด, บ้าน, ทาวน์เฮ้าส์, ที่ดิน และอื่นๆอีกมากมาย หรือท่านอาจเป็นเจ้าของทรัพย์ ที่กำลังต้องการฝากขายหรือให้เช่าทรัพย์ของท่าน กับบริษัทที่มีความเชี่ยวชาญและเชื่อถือได้ เรายินดีให้บริการท่านเสมอ!\n" +
        "\n" +
        "ที่ๆคุณมองหา อยู่ที่นี่แล้ว..\n" +
        "\n" +
        "We provide real estate service for anyone that are looking to buy or rent a condominium, house, townhouse, land and much more, Or you might be the owner that wish to sell your property by a professional and trustworthy agency company. We are here to be at your service!\n" +
        "\n" +
        "The place youre looking for, is here..\n" +
        "\n" +
        "__________________________________________\n" +
        "\n" +
        "For appointment and more info please contact\n" +
        "\n" +
        "หากต้องการนัดชมห้องหรือต้องการข้อมูลเพิ่มเติม ติดต่อได้ที่\n" +
        "\n" +
        "Contact Us [Mon - Fri 9.00 - 18.00]\n" +
        "\n" +
        "TEL : 062-879-5289 (Ploy)\n" +
        "\n" +
        "LINE : @homethailand (with @ symbol)\n" +
        "\n" +
        "__________________________________________\n" +
        "\n" +
        "Follow Us On\n" +
        "\n" +
        "Website : https://www.facebook.com/homerealestate.official/" +
        "\n" +
        "IG : homerealestate.official";
    },
    handleClose(tag) {
      this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1);
    },
    markIsPrimary(index, fileList) {
      // console.log("mark", JSON.stringify(index), JSON.stringify(fileList));
      this.fileList = fileList;
      // console.log("mark fileList", JSON.stringify(this.fileList));
    },
    uploadImageSuccess(formData, index, fileList) {
      this.fullscreenLoading = true;
      // console.log("formData", JSON.stringify(formData));
      // console.log("index", JSON.stringify(index));
      // console.log("fileList[index]", JSON.stringify(fileList[index]));
      // console.log(
      //   "fileList[index].path : ",
      //   JSON.stringify(fileList[index].path)
      // );
      // Upload image api
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/v2/file/upload`, fileList[index], {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          this.fullscreenLoading = false;
          this.$notify({
            message: "Upload Success",
            icon: "fa fa-gift",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });
          // console.log("upload resp : " + JSON.stringify(resp.data));
          let file;
          if (index == 0) {
            file = {
              id: resp.data.id,
              name: resp.data.name,
              path: resp.data.path,
              default: fileList.default,
              highlight: fileList.highlight,
            };
          } else {
            file = {
              id: resp.data.id,
              name: resp.data.name,
              path: resp.data.path,
              default: fileList.default,
              highlight: fileList.highlight,
            };
          }
          this.fileList.push(file);
          // console.log("fileList : ", JSON.stringify(this.fileList));
          // this.fileList = fileList;
          // console.log("fileList : ", fileList);
        })
        .catch((err) => {
          this.fullscreenLoading = false;
          this.$notify({
            message: "Error",
            // icon: 'fa fa-gift',
            // component: NotificationTemplate,
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "warning",
          });
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    beforeRemove(index, done, fileList) {
      // console.log("fileList beforeRemove", JSON.stringify(fileList));
      var r = confirm("remove image");
      if (r == true) {
        done();
        this.fullscreenLoading = true;

        const formData = new FormData();
        formData.append("id", fileList.id);

        const AXIOS = axios.create({
          baseURL: process.env.VUE_APP_BACKEND_URL,
        });
        AXIOS.post(`api/file/delete`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((resp) => {
          this.fullscreenLoading = false;
          this.$notify({
            message: "Deleted Success",
            icon: "fa fa-gift",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });
          // console.log("deleted resp : " + JSON.stringify(resp.data));
          this.fileList = fileList;
          // this.fileList = this.fileList.filter(function (item) {
          //   if (item.id == file.id) {
          //     return false;
          //   }
          //   return true;
          // });
        });
        // console.log("fileList afterRemove", JSON.stringify(fileList));
        // console.log("this.fileList ", JSON.stringify(this.fileList));
      } else {
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
    },
    // onBeforeUploadImage(file) {
    //   const isIMAGE = file.type === "image/jpeg" || "image/jpg" || "image/png";
    //   const isLt1M = file.size / 1024 / 1024 < 1;
    //   if (!isIMAGE) {
    //     this.$message.error("Upload file can only be in image format!");
    //   }
    //   if (!isLt1M) {
    //     this.$message.error("Upload file size cannot exceed 1MB!");
    //   }
    //   return isIMAGE && isLt1M;
    // },
    // handleCloseImage() {
    //   console.log("close event");
    // },
    // handlePreview(file) {
    //   console.log("Preview", JSON.stringify(file));
    //   // let myWindow = window.open();
    //   // myWindow.document.write(JSON.stringify(file.url));
    //   // myWindow.document.close();
    // },
    handleRemove(file, fileList) {
      console.log(
        "handleRemove ",
        JSON.stringify(file),
        JSON.stringify(fileList)
      );
      const formData = new FormData();
      formData.append("id", file.id);

      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/file/delete`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        this.fullscreenLoading = false;
        this.$notify({
          message: "Deleted Success",
          icon: "fa fa-gift",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });
        // console.log("deleted resp : " + JSON.stringify(resp.data));
        this.fileList = fileList;
        this.slides = this.slides.filter(function (item) {
          if (item.id == file.id) {
            return false;
          }
          return true;
        });
      });
    },
    handleInputConfirm() {
      let inputValue = this.tags.inputValue;
      if (inputValue) {
        this.tags.dynamicTags.push(inputValue);
      }
      this.tags.inputVisible = false;
      this.tags.inputValue = "";
    },
    validateComment(input) {
      if (input == null || input.length < 1) {
        return "โปรดระบุรายละเอียดและเหตุผลของการแก้ไขข้อมูล";
      } else {
        this.comment = input;
        return true;
      }
    },
    openBoxComment() {
      this.$prompt("ระบุรายละเอียดและเหตุผลของการแก้ไขข้อมูล", "Comment", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputValidator: this.validateComment,
      })
        .then(({ value }) => {
          this.createListing();
        })
        .catch(() => {
          return false;
        });
    },
    submit() {
      if (this.getUser.roles[0] === "ROLE_SALE") {
        this.openBoxComment();
      } else {
        this.createListing();
      }
    },
    createListing() {
      this.fullscreenLoading = true;
      let owner = {
        listingCode: this.owner.listingCode,
        name: this.owner.name,
        line: this.owner.line,
        phone: this.owner.phone,
        email: this.owner.email,
        listingCodeManual: this.owner.listingCodeManual,
        linkGoogleMap: this.owner.linkGoogleMap,
      };
      var num = this.room.price;
      var numberPrice = num.replace(/[^\d.-]/g, "");
      num = this.room.priceRent;
      var numberPriceRent = num.replace(/[^\d.-]/g, "");
      num = this.room.priceDown;
      var numberPriceDown = num.replace(/[^\d.-]/g, "");
      let room = {
        projectId: this.project.id,
        building: this.buildingSelects.select,
        type:
          this.typeSale +
          "," +
          this.typeAvailable +
          "," +
          this.typeSaleWithTenant +
          "," +
          this.typeReSaleDownPayment,
        propertyType: this.propertySelects.select,
        level: this.radios.level,
        standard: this.standardSelects.select,
        grade: this.gradeSelects.select,
        toilet: this.toiletSelects.select,
        bed: this.bedSelects.select,
        roomType: this.roomTypeSelects.select,
        mateRoom: this.mateRoomSelects.select,
        storageRoom: this.storageRoomSelects.select,
        area: this.room.area,
        floor: this.floorSelects.select,
        price: numberPrice,
        priceRent: numberPriceRent,
        priceDown: numberPriceDown,
        rentDetail: this.room.rentDetail,
        direction: this.directionSelects.select,
        position: this.positionSelects.select,
        // sellDetail: this.sellDetailSelects.select,
        tax: this.radios.tax,
        businessTax: this.radios.businessTax,
        transferFee: this.radios.transferFee,
        scenery: this.scenery,
        feature: this.featureSelects.select,
        tags: this.tags.dynamicTags,
        description: this.room.description,
        remark: this.room.remark,
        exclusive: this.exclusive,
        exclusiveDate: this.room.exclusiveDate,
        district: this.district,
        amphoe: this.amphoe,
        province: this.province,
        zipcode: this.zipcode,
        widthLand: this.room.widthLand,
      };
      let path = "api/listing/create";
      let postBody = {
        ownerRequest: owner,
        roomRequest: room,
        files: this.fileList,
        comment: this.comment,
        saleUser: this.userSelects.select,
      };
      if (this.$route.query.id) {
        path = "api/listing/edit";
        postBody = {
          id: this.$route.query.id,
          ownerRequest: owner,
          roomRequest: room,
          files: this.fileList,
          comment: this.comment,
          saleUser: this.userSelects.select,
        };
      }
      // console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(path, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          this.fullscreenLoading = false;
          this.$notify({
            message: "Success",
            icon: "fa fa-gift",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });
          this.$router.push("/admin/listing");
        })
        .catch((err) => {
          this.fullscreenLoading = false;
          this.$notify({
            message: "Error",
            // icon: 'fa fa-gift',
            // component: NotificationTemplate,
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "warning",
          });
          // console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },

    goToPageCreateProject: function () {
      this.$confirm("ข้อมูลที่กรอกจะหายครับ", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/admin/project/create");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "canceled",
          });
        });
    },
  },
};
</script>
<style lang="scss">
.center {
  justify-content: center;
}

.bg-grey {
  background-color: #c1c5caa6 !important;
}

.select-width-100 {
  width: 100%;
}

.el-tag.el-tag--info {
  color: #ffffff !important;
}

#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

// ul {
//   list-style-type: none;
//   padding: 0;
// }

// li {
//   display: inline-block;
//   margin: 0 10px;
// }

a {
  color: #42b983;
}
</style>
