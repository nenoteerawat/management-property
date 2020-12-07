<template>
  <card>
    <template slot="header">
      <div class="row">
        <div class="col-md-3">
          <h4 class="card-title">{{ lead.firstName }} {{ lead.lastName }}</h4>
        </div>
        <div class="col-md-3 d-flex align-items-center">
          <span>
            Type :
            <span v-show="lead.typeBuy"> Buy</span>
            <span v-show="lead.typeRent"> Rent</span>
          </span>
        </div>
        <div class="col-md-3 d-flex align-items-center">
          <span>
            Job :
            <span> {{ lead.job }}</span>
          </span>
        </div>
        <div class="col-md-3 d-flex align-items-center">
          <span>
            Nationality :
            <span> {{ lead.nationality }}</span>
          </span>
        </div>
      </div>
      <hr />
    </template>
    <div class="row">
      <div class="col-md-3">
        <img
          v-if="imageUrl"
          style="width: 200px; height: 200px"
          :src="imageUrl"
          class="avatar border-gray"
        />
      </div>
      <!-- Content start -->
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-1">
                <i class="fa fa-phone fa-lg" aria-hidden="true"></i>
              </div>
              <div class="col-md-3 d-flex align-items-end">
                <span> {{ lead.phone }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-1">
                <i class="fa fa-mobile fa-2x" aria-hidden="true"></i>
              </div>
              <div class="col-md-3 d-flex align-items-center">
                <span> {{ lead.line }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-1">
                <i class="fa fa-envelope fa-lg" aria-hidden="true"></i>
              </div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ lead.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Content end -->
      <!-- Problems start -->
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-12">
            <h6>LifeStyle (A)</h6>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">โครงการ :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span>
                  {{ listingByLead.name }}
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">ตึก :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span>
                  {{ listingByLead.building }}
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">Type :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByLead.propertyType }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">Zone :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByLead.zone }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">พื้นที่ :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByLead.area }} ตร.ม.</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">ชั้น :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByLead.floor }} ชั้น</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">ห้องนอน :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByLead.bed }} ห้อง</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">ห้องน้ำ :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByLead.toilet }} ห้อง</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">วิว :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByLead.direction }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">Notes :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ lead.listingByLeadNotes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Problems end -->
      <!-- Project by admin start -->
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-12">
            <h6>Detail (B)</h6>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">โครงการ :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span>
                  {{ listingByAdmin.name }}
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">ตึก :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span>
                  {{ listingByAdmin.building }}
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">Type :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByAdmin.propertyType }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">Zone :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByAdmin.zone }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">พื้นที่ :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByAdmin.area }} ตร.ม.</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">ชั้น :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByAdmin.floor }} ชั้น</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">ห้องนอน :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByAdmin.bed }} ห้อง</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">ห้องน้ำ :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByAdmin.toilet }} ห้อง</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">วิว :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ listingByAdmin.direction }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">Notes :</div>
              <div class="col-md-5 d-flex align-items-end">
                <span> {{ lead.listingByAdminNotes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Project by admin end -->
    </div>
    <!-- Timeline start -->
    <div class="row">
      <div class="col-md-11 ml-auto mr-auto">
        <div class="Timeline" style="height: 100px">
          <!-- status Lead Start-->
          <div class="event1" v-if="timeline.lead">
            <svg height="20" width="20">
              <circle cx="10" cy="11" r="5" fill="#fbc658" />
            </svg>
            <div class="time">Lead</div>
          </div>
          <!-- line -->
          <svg height="5" width="150">
            <line x1="0" y1="0" x2="150" y2="0" class="active-line" />
          </svg>
          <!-- status Lead End -->
          <!-- status Action Start-->
          <div class="event1" v-if="timeline.action">
            <svg height="20" width="20">
              <circle cx="10" cy="11" r="5" fill="#fbc658" />
            </svg>
            <div class="time">Action</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="timeline.action">
            <line x1="0" y1="0" x2="150" y2="0" class="active-line" />
          </svg>
          <div class="event1" v-if="!timeline.action">
            <svg height="20" width="20">
              <circle cx="10" cy="11" r="5" fill="#004165" />
            </svg>
            <div class="time">Action</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="!timeline.action">
            <line x1="0" y1="0" x2="150" y2="0" class="active-no-line" />
          </svg>
          <!-- status Action End -->
          <!-- status Following Start-->
          <div class="event1" v-if="timeline.following">
            <svg height="20" width="20">
              <circle cx="10" cy="11" r="5" fill="#fbc658" />
            </svg>
            <div class="time">Following</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="timeline.following">
            <line x1="0" y1="0" x2="150" y2="0" class="active-line" />
          </svg>
          <div class="event1" v-if="!timeline.following">
            <svg height="20" width="20">
              <circle cx="10" cy="11" r="5" fill="#004165" />
            </svg>
            <div class="time">Following</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="!timeline.following">
            <line x1="0" y1="0" x2="150" y2="0" class="active-no-line" />
          </svg>
          <!-- status Following End -->
          <!-- status Appointment Start-->
          <div class="event1" v-if="timeline.appointment">
            <svg height="20" width="20">
              <circle
                cx="10"
                cy="11"
                r="5"
                fill="#fbc658"
                @click="showMatch('ALL')"
              />
            </svg>
            <div class="time" @click="showMatch('ALL')">Appointment</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="timeline.appointment">
            <line x1="0" y1="0" x2="150" y2="0" class="active-line" />
          </svg>
          <div class="event1" v-if="!timeline.appointment">
            <svg height="20" width="20">
              <circle
                cx="10"
                cy="11"
                r="5"
                fill="#004165"
                @click="showMatch('ALL')"
              />
            </svg>
            <div class="time" @click="showMatch('ALL')">Appointment</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="!timeline.appointment">
            <line x1="0" y1="0" x2="150" y2="0" class="active-no-line" />
          </svg>
          <!-- status Appointment End -->
          <!-- status Showing Start-->
          <div class="event1" v-if="timeline.showing">
            <svg height="20" width="20">
              <circle cx="10" cy="11" r="5" fill="#fbc658" />
            </svg>
            <div class="time">Showing</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="timeline.showing">
            <line x1="0" y1="0" x2="150" y2="0" class="active-line" />
          </svg>
          <div class="event1" v-if="!timeline.showing">
            <svg height="20" width="20">
              <circle cx="10" cy="11" r="5" fill="#004165" />
            </svg>
            <div class="time">Showing</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="!timeline.showing">
            <line x1="0" y1="0" x2="150" y2="0" class="active-no-line" />
          </svg>
          <!-- status Showing End -->
          <!-- status Negotiation Start-->
          <div class="event1" v-if="timeline.negotiation">
            <svg height="20" width="20">
              <circle
                cx="10"
                cy="11"
                r="5"
                fill="#fbc658"
                @click="showNegotiation"
              />
            </svg>
            <div class="time" @click="showNegotiation">Negotiation</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="timeline.negotiation">
            <line x1="0" y1="0" x2="150" y2="0" class="active-line" />
          </svg>
          <div class="event1" v-if="!timeline.negotiation">
            <svg height="20" width="20">
              <circle
                cx="10"
                cy="11"
                r="5"
                fill="#004165"
                @click="showNegotiation"
              />
            </svg>
            <div class="time" @click="showNegotiation">Negotiation</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="!timeline.negotiation">
            <line x1="0" y1="0" x2="150" y2="0" class="active-no-line" />
          </svg>
          <!-- status Negotiation End -->
          <!-- status Closing Start-->
          <div class="event1" v-if="timeline.closing">
            <svg height="20" width="20">
              <circle
                cx="10"
                cy="11"
                r="5"
                fill="#fbc658"
                @click="showClosing"
              />
            </svg>
            <div class="time">Closing</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="timeline.closing">
            <line x1="0" y1="0" x2="150" y2="0" class="active-line" />
          </svg>
          <div class="event1" v-if="!timeline.closing">
            <svg height="20" width="20">
              <circle
                cx="10"
                cy="11"
                r="5"
                fill="#004165"
                @click="showClosing"
              />
            </svg>
            <div class="time" @click="showClosing">Closing</div>
          </div>
          <!-- line -->
          <svg height="5" width="150" v-if="!timeline.closing">
            <line x1="0" y1="0" x2="150" y2="0" class="active-no-line" />
          </svg>
          <!-- status Closing End -->
          <!-- status Done start -->
          <div class="event1" v-if="timeline.closing">
            <svg height="20" width="20">
              <circle cx="10" cy="11" r="5" fill="#fbc658" />
            </svg>
            <div class="time">Done</div>
          </div>
          <div class="event1" v-if="!timeline.closing">
            <svg height="20" width="20">
              <circle cx="10" cy="11" r="5" fill="#004165" />
            </svg>
            <div class="time">Done</div>
          </div>
          <!-- status Done end-->
        </div>
      </div>
    </div>
    <!-- Timeline end -->
    <!-- Information start -->
    <hr />
    <div class="row">
      <!-- Requirement Lead start -->
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-12"></div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4"><h6>Grade :</h6></div>
              <div class="col-md-5 d-flex align-items-start">
                <span> {{ lead.grade }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4"><h6>Price :</h6></div>
              <div class="col-md-5 d-flex align-items-start">
                <span>
                  {{ Number(lead.priceMin).toLocaleString() }} <br />-<br />
                  {{ Number(lead.priceMax).toLocaleString() }}</span
                >
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4"><h6>Type :</h6></div>
              <div class="col-md-5 d-flex align-items-start">
                <span> {{ lead.typePay == 1 ? "Cash" : "Loan" }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4"><h6>สัญญา :</h6></div>
              <div class="col-md-5 d-flex align-items-start">
                <span> {{ lead.contract }} เดือน</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-4"><h6>เงื่อนไข :</h6></div>
              <div class="col-md-5 d-flex align-items-start">
                <span> {{ lead.condition }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-3"><h6>pain point :</h6></div>
              <div class="col-md-5 d-flex align-items-end">
                <el-tag
                  :key="tag"
                  v-for="tag in lead.painPoints"
                  type="primary"
                  :closable="false"
                  :close-transition="false"
                  >{{ tag }}</el-tag
                >
                <!-- <span v-for="painPoint in lead.painPoints" :key="painPoint"> {{ painPoint }}</span> -->
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <p-button
              type="success"
              @click.native="
                (modals.actionLog = true),
                  (modalBtn = 'Add'),
                  (actionDateTime = new Date()),
                  (comment = ''),
                  (actionTypeSelects.select = ''),
                  (radios.done = '1'),
                  (view = false),
                  (negotiationSelects.select = ''),
                  (reasonNegotiation = ''),
                  (whyNegotiation = ''),
                  (improveNegotiation = '')
              "
              outline
              round
            >
              <i class="nc-icon nc-simple-add"></i> Add Action
            </p-button>
          </div>
        </div>
      </div>
      <!-- Requirement Lead end -->
      <!-- Sale start -->
      <div class="col-md-9">
        <div class="row">
          <!-- Sale start -->
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-12">
                <h6>LifeStyle (A)</h6>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">โครงการ :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span>
                      {{ listingLifeStyleBySale.name }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">ตึก :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span>
                      {{ listingLifeStyleBySale.building }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">Pain :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <el-tag
                      :key="tag"
                      v-for="tag in lead.painSales"
                      type="primary"
                      :closable="false"
                      :close-transition="false"
                      >{{ tag }}</el-tag
                    >
                    <!-- <span> {{ lead.painSales }} </span> -->
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">Type :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingLifeStyleBySale.propertyType }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">Zone :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingLifeStyleBySale.zone }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">พื้นที่ :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingLifeStyleBySale.area }} ตร.ม.</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">ชั้น :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingLifeStyleBySale.floor }} ชั้น</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">ห้องนอน :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingLifeStyleBySale.bed }} ห้อง</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">ห้องน้ำ :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingLifeStyleBySale.toilet }} ห้อง</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">วิว :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingLifeStyleBySale.direction }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">Notes :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ lead.listingLifeStyleBySaleNotes }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Sale end -->
          <!-- Sale start -->
          <div class="col-md-4">
            <div class="row">
              <!-- <div class="col-md-12 d-flex justify-content-center"> -->
              <div class="col-md-12 d-flex">
                <h6>Detail (B)</h6>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">โครงการ :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span>
                      {{ listingBySale.name }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">ตึก :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span>
                      {{ listingBySale.building }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">Reason :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ lead.reason }} </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">Type :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingBySale.propertyType }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">Zone :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingBySale.zone }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">พื้นที่ :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingBySale.area }} ตร.ม.</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">ชั้น :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingBySale.floor }} ชั้น</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">ห้องนอน :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingBySale.bed }} ห้อง</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">ห้องน้ำ :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingBySale.toilet }} ห้อง</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">วิว :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ listingBySale.direction }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-4">Notes :</div>
                  <div class="col-md-5 d-flex align-items-end">
                    <span> {{ lead.listingBySaleNotes }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Sale end -->
          <!-- Financial start -->
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-12">
                <h6>Financial (D)</h6>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-7"><h6>career :</h6></div>
                  <div class="col-md-5">
                    <span> {{ lead.career }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-7"><h6>year Of Work :</h6></div>
                  <div class="col-md-5">
                    <span> {{ lead.yearOfWork }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-7"><h6>income Type :</h6></div>
                  <div class="col-md-5">
                    <span> {{ lead.incomeType }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-7"><h6>average Income :</h6></div>
                  <div class="col-md-5">
                    <span> {{ lead.averageIncome }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-7"><h6>liabilities :</h6></div>
                  <div class="col-md-5">
                    <span> {{ lead.liabilities }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-7"><h6>billing Amount :</h6></div>
                  <div class="col-md-5">
                    <span> {{ lead.billingAmount }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-7"><h6>pre-Approve :</h6></div>
                  <div class="col-md-5">
                    <span> {{ lead.preApprove }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-7"><h6>status :</h6></div>
                  <div class="col-md-5">
                    <span> {{ lead.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Financial end -->
        </div>
      </div>
      <!-- Sale end -->
    </div>
    <!-- Information end -->
    <hr />
    <div class="row">
      <!-- Action log start -->
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <el-table :data="queriedData">
              <!-- <el-table-column type="index"></el-table-column> -->
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
                sortable
              ></el-table-column>
              <el-table-column
                class-name="action-buttons td-actions"
                align="right"
                label="action"
                min-width="120"
              >
                <template slot-scope="props">
                  <p-button
                    v-if="props.row.done === 'COMPLETED'"
                    type="info"
                    round
                    icon
                    @click="getActionLogDetail(props.row, 'VIEW')"
                  >
                    <i class="fa fa-list"></i>
                  </p-button>
                  <p-button
                    v-if="props.row.done === 'PENDING'"
                    type="success"
                    round
                    icon
                    @click="handleActionCompleted(props.row)"
                  >
                    <i class="fa fa-check"></i>
                  </p-button>
                  <p-button
                    v-if="props.row.done === 'PENDING'"
                    type="info"
                    aria-label="edit button"
                    round
                    icon
                    class="btn-icon-mini btn-neutral"
                    @click="getActionLogDetail(props.row, 'EDIT')"
                  >
                    <i class="nc-icon nc-ruler-pencil"></i>
                  </p-button>
                  <p-button
                    v-if="props.row.done === 'PENDING'"
                    type="danger"
                    aria-label="remove button"
                    round
                    icon
                    class="btn-icon-mini btn-neutral"
                    @click="handleDeleteClick(props.$index, props.row)"
                  >
                    <i class="nc-icon nc-simple-remove"></i>
                  </p-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="col-md-6 pagination-info">
            <p class="category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <div class="col-md-6">
            <p-pagination
              class="pull-right"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="pagination.total"
            ></p-pagination>
          </div>
          <div class="col-md-6">
            <el-select
              class="select-default"
              v-model="pagination.perPage"
              placeholder="Per page"
            >
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- Action log end -->
      <!-- matched and other start -->
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-4">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4 pointer">
                  <i
                    class="fa fa-home fa-4x"
                    style="cursor: pointer"
                    aria-hidden="true"
                    @click="showMatch('MATCH')"
                  ></i>
                </div>
                <div class="col-md-6 text-center">
                  <span> Matched</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4">
                  <i class="fa fa-paper-plane fa-4x" aria-hidden="true"></i>
                </div>
                <div class="col-md-6 text-center">
                  <span> Sent</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4">
                  <i class="fa fa-calendar fa-4x" aria-hidden="true"></i>
                </div>
                <div class="col-md-6 text-center">
                  <span> Showing</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-11" style="margin-top: 30px">
            <div class="row">
              <div class="col-md-6">
                <span>Difficulty : {{ lead.difficulty }} %</span>
              </div>
              <div class="col-md-6">
                <div class="pull-right">
                  <span>ลูกค้าคุยง่ายแค่ไหน</span>
                </div>
              </div>
              <div class="col-md-12" style="height: 30px">
                <el-progress
                  status="exception"
                  :text-inside="true"
                  :stroke-width="15"
                  :percentage="lead.difficulty"
                ></el-progress>
              </div>
            </div>
          </div>
          <div class="col-md-11">
            <div class="row">
              <div class="col-md-6">
                <span>Rapport : {{ lead.rapport }} %</span>
              </div>
              <div class="col-md-6">
                <div class="pull-right">
                  <span>ลูกค้าเชื่อใจคุณแค่ไหน</span>
                </div>
              </div>
              <div class="col-md-12" style="height: 30px">
                <el-progress
                  status="success"
                  :text-inside="true"
                  :stroke-width="15"
                  :percentage="lead.rapport"
                ></el-progress>
              </div>
            </div>
          </div>
          <div class="col-md-11">
            <div class="row">
              <div class="col-md-6">
                <span>Info : {{ lead.info }} %</span>
              </div>
              <div class="col-md-6">
                <div class="pull-right">
                  <span>คุณรู้จักลูกค้าแค่ไหน</span>
                </div>
              </div>
              <div class="col-md-12" style="height: 30px">
                <el-progress
                  :text-inside="true"
                  :stroke-width="15"
                  :percentage="lead.info"
                ></el-progress>
              </div>
            </div>
          </div>
        </div>
        <!-- BookList start -->
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <h4 class="card-title">เอกสาร</h4>
            </div>
            <div class="col-md-6" v-show="timeline.closing">
              <div class="form-group">
                <p-button @click.native="modals.genLeasePDF = true"
                  >LEASE AGREEMENT
                </p-button>
              </div>
            </div>
            <div class="col-md-6" v-show="timeline.closing">
              <div class="form-group">
                <p-button @click.native="modals.genSellPDF = true"
                  >SELL AND PURCHASE AGREEMENT
                </p-button>
              </div>
            </div>
            <div class="col-md-6" v-show="timeline.closing">
              <div class="form-group">
                <p-button @click.native="modals.genAgentAgreementPDF = true"
                  >REAL ESTATE AGENT AGREEMENT
                </p-button>
              </div>
            </div>
            <div class="col-md-6" v-show="timeline.closing">
              <div class="form-group">
                <p-button @click.native="modals.genExclusivePDF = true"
                  >EXCLUSIVE AGENT AGREEMENT
                </p-button>
              </div>
            </div>
            <div class="col-md-6" v-show="timeline.closing">
              <div class="form-group">
                <p-button @click.native="modals.genCOBrokePDF = true"
                  >CO-BROKE
                </p-button>
              </div>
            </div>
            <div class="col-md-12" v-show="lead.books != null">
              <el-table :data="lead.books">
                <!-- <el-table-column type="index"></el-table-column> -->
                <el-table-column
                  v-for="column in bookTableColumns"
                  :key="column.label"
                  :min-width="column.minWidth"
                  :prop="column.prop"
                  :label="column.label"
                  sortable
                ></el-table-column>
                <el-table-column
                  class-name="action-buttons td-actions"
                  align="right"
                  label="action"
                  min-width="120"
                >
                  <template slot-scope="props">
                    <p-button
                      type="info"
                      round
                      icon
                      @click="downloadFile(props.row)"
                    >
                      <i class="fa fa-download"></i>
                    </p-button>
                    <p-button round icon @click="removeBook(props.row)">
                      <i class="fa fa-trash"></i>
                    </p-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <!-- BookList end -->
      </div>
      <!-- matched and other end -->
    </div>
    <!-- modals.actionLog start -->
    <modal :show.sync="modals.actionLog" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Action Log</h4>

      <div class="col-md-12">
        <div>
          <label>Type</label>
        </div>
        <el-select
          :disabled="view"
          class="select-primary select-width-100"
          placeholder="select"
          v-model="actionTypeSelects.select"
          @change="getListingByAppointment($event)"
        >
          <el-option
            v-for="option in actionTypeSelects.data"
            class="select-primary"
            :value="option.value"
            :label="option.label"
            :key="option.label"
          ></el-option>
        </el-select>
      </div>
      <div class="col-md-12" v-show="actionTypeSelects.select == 5">
        <div>
          <label>Listing</label>
        </div>
        <model-select
          :options="listingByActionLogSelects"
          v-model="listingByActionLog"
          class="select"
          placeholder="select item"
        >
        </model-select>
      </div>
      <div class="col-md-12" v-show="actionTypeSelects.select == 6">
        <div>
          <label>Listing</label>
        </div>
        <model-select
          :options="listingByAppointmentSelects"
          v-model="listingByAppointment"
          class="select"
          placeholder="select item"
        >
        </model-select>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label v-if="actionTypeSelects.select != 7">Comment</label>
          <label v-else>Script</label>
          <textarea
            :readonly="view"
            rows="5"
            class="form-control border-input"
            placeholder=""
            v-model="comment"
          ></textarea>
        </div>
      </div>
      <div class="col-md-12" v-show="actionTypeSelects.select == 6">
        <div class="form-group">
          <label>Reason</label>
          <textarea
            :readonly="view"
            rows="5"
            class="form-control border-input"
            placeholder=""
            v-model="reason"
          ></textarea>
        </div>
      </div>
      <div class="col-md-12" v-show="actionTypeSelects.select == 7">
        <el-select
          :disabled="view"
          class="select-primary select-width-100"
          placeholder="select"
          v-model="negotiationSelects.select"
        >
          <el-option
            v-for="option in negotiationSelects.data"
            class="select-primary"
            :value="option.value"
            :label="option.label"
            :key="option.label"
          ></el-option>
        </el-select>
      </div>
      <div class="col-md-12" v-show="actionTypeSelects.select == 7">
        <fg-input
          :disabled="view"
          placeholder
          label="Result"
          v-model="reasonNegotiation"
        ></fg-input>
      </div>
      <div class="col-md-12" v-show="actionTypeSelects.select == 7">
        <fg-input
          :disabled="view"
          placeholder
          label="Why"
          v-model="whyNegotiation"
        >
        </fg-input>
      </div>
      <div class="col-md-12" v-show="actionTypeSelects.select == 7">
        <fg-input
          :disabled="view"
          placeholder
          label="Improve"
          v-model="improveNegotiation"
        ></fg-input>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label>Date</label>
          <fg-input>
            <el-date-picker
              :readonly="view"
              v-model="actionDateTime"
              type="datetime"
              placeholder="Pick a day"
              format="dd-MM-yyyy HH:mm:ss"
            ></el-date-picker>
          </fg-input>
        </div>
      </div>
      <div class="col-md-12">
        <fieldset>
          <div class="form-group">
            <label class="control-label">สถานะ</label>
            <div class="col-md-12" v-if="view">
              <span class="text-success"> {{ selectActionLog.done }} </span>
            </div>
            <div class="col-md-12" v-if="!view">
              <p-radio label="1" v-model="radios.done" value="1" :inline="true"
                >Pending</p-radio
              >
              <p-radio label="2" v-model="radios.done" value="2" :inline="true"
                >Completed</p-radio
              >
            </div>
          </div>
        </fieldset>
      </div>
      <template slot="footer">
        <p-button
          v-show="!view && modalBtn === 'Add'"
          @click="createActionLog"
          >{{ modalBtn }}</p-button
        >
        <p-button
          v-show="!view && modalBtn === 'Edit'"
          @click="editActionLog"
          >{{ modalBtn }}</p-button
        >
        <!-- <p-button type="danger" @click.native="modals.actionLog = false"
          >Close</p-button
        > -->
      </template>
    </modal>
    <!-- modals.actionLog end -->
    <!-- modals.showMatch start -->
    <modal
      :show.sync="modals.showMatch"
      headerClasses="justify-content-center"
      modalClasses="modal-lg"
    >
      <template slot="header">
        <h4 class="title title-up">Show Match</h4>
      </template>
      <div class="row">
        <div class="col-md-4">
          <div>
            <label>Listing</label>
          </div>
          <model-select
            :options="projectSelects"
            v-model="projectName"
            class="select"
            placeholder="select item"
          >
          </model-select>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="search"
            v-model="textShowMatch"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <p-button type="info" round outline @click="searchShowMatch($event)">
            <i class="fa fa-search"></i>Search
          </p-button>
        </div>
        <div class="col-md-12">
          <el-table :data="queriedDataListing">
            <!-- <el-table-column type="index"></el-table-column> -->
            <el-table-column min-width="126" label>
              <template slot-scope="props">
                <div class="img-container">
                  <img
                    v-if="props.row.files.length > 1"
                    style="height: 125px; width: 125px"
                    :src="props.row.files[0].path"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="200" label>
              <template slot-scope="props">
                <div class="row">
                  <div class="col-md-12">
                    <h5 class="title" style="margin-bottom: 0">
                      {{ props.row.projects[0].name }}
                    </h5>
                    <span>
                      <small>Condominium</small>
                      <badge
                        v-show="props.row.room.exclusive"
                        slot="header"
                        type="success"
                        >E
                      </badge>
                      <badge
                        v-if="props.row.status == 'BOOKING'"
                        slot="header"
                        type="warning"
                        >ติดจอง
                      </badge>
                    </span>
                  </div>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-12">
                        <span>เจ้าของ : {{ props.row.owner.name }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="col-md-3">
                          <i class="fa fa-area-chart"></i>
                        </div>
                        <div class="col-md-9" style="padding-left: 0">
                          <span>{{ props.row.room.area }} ตร.ม.</span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="col-md-3">
                          <i class="fa fa-arrows-v"></i>
                        </div>
                        <div class="col-md-9" style="padding-left: 0">
                          <span>{{ props.row.room.floor }} Fl.</span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="col-md-3">
                          <i class="fa fa-bed"></i>
                        </div>
                        <div class="col-md-9" style="padding-left: 0">
                          <span>{{ props.row.room.bed }} ห้อง</span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="col-md-3">
                          <i class="fa fa-bath"></i>
                        </div>
                        <div class="col-md-9" style="padding-left: 0">
                          <span>{{ props.row.room.toilet }} ห้อง</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <span>Condominium</span> -->
                <!-- <badge v-show="props.row.listing.exclusive" slot="header" type="success">M</badge> -->
              </template>
            </el-table-column>
            <el-table-column min-width="150" label>
              <template slot-scope="props">
                <div class="cell">
                  <h6>S {{ Number(props.row.room.price).toLocaleString() }}</h6>
                </div>
                <div class="cell" v-show="props.row.room.type == 2">
                  <h6>
                    R {{ Number(props.row.room.priceRent).toLocaleString() }}
                  </h6>
                </div>
                <div class="cell">
                  <span>
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    {{ props.row.createdBy }}
                  </span>
                </div>
                <div class="cell">
                  <span>
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    {{ props.row.createdDateTime }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              class-name="action-buttons td-actions"
              align="right"
            >
              <template slot-scope="props">
                <p-button
                  type="success"
                  round
                  icon
                  @click="handleMatchCompleted(props.row)"
                >
                  <i class="fa fa-check"></i>
                </p-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="col-md-6 pagination-info">
          <p class="category">
            Showing {{ fromListing + 1 }} to {{ toListing }} of
            {{ totalListing }} entries
          </p>
        </div>
        <div class="col-md-6">
          <p-pagination
            class="pull-right"
            v-model="paginationListing.currentPage"
            :per-page="paginationListing.perPage"
            :total="paginationListing.total"
          ></p-pagination>
        </div>
        <div class="col-md-6">
          <el-select
            class="select-default"
            v-model="paginationListing.perPage"
            placeholder="Per page"
          >
            <el-option
              class="select-default"
              v-for="item in paginationListing.perPageOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
      </div>
    </modal>
    <!-- modals.showMatch end -->
    <!-- modals.negotiation start -->
    <modal
      :show.sync="modals.negotiation"
      headerClasses="justify-content-center"
      modalClasses="modal-lg"
    >
      <template slot="header">
        <h4 class="title title-up">Negotiation</h4>
      </template>
      <div class="row">
        <div class="col-md-8">
          <label>Tips & Tricks</label>
          <el-input
            type="textarea"
            placeholder="Please input"
            maxlength="200"
            disabled
            rows="7"
            v-model="textTips"
          >
          </el-input>
        </div>
        <div class="col-md-4 text-center">
          <h4>Negotiating</h4>
          <div>
            1. Straight Line System <br />
            <span>Tips & Tricks</span><br />
            <span>Tips & Tricks</span>
          </div>
        </div>
        <div class="col-md-8">
          <label>Script</label>
          <el-input
            type="textarea"
            placeholder="Please input"
            rows="7"
            v-model="textNegotiation"
          >
          </el-input>
        </div>
        <div class="col-md-4">
          <el-select
            class="select-primary select-width-100"
            placeholder="select"
            v-model="negotiationSelects.select"
          >
            <el-option
              v-for="option in negotiationSelects.data"
              class="select-primary"
              :value="option.value"
              :label="option.label"
              :key="option.label"
            ></el-option>
          </el-select>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="Result"
            v-model="reasonNegotiation"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input placeholder label="Why" v-model="whyNegotiation"></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="Improve"
            v-model="improveNegotiation"
          ></fg-input>
        </div>
      </div>
      <template slot="footer">
        <hr />
        <div class="stats">
          <p-button type="info" round @click="handleNegotiationCompleted"
            >Add
          </p-button>
        </div>
      </template>
    </modal>
    <!-- modals.negotiation end -->
    <!-- modals.closing start -->
    <modal
      :show.sync="modals.closing"
      headerClasses="justify-content-center"
      modalClasses="modal-lg"
    >
      <template slot="header">
        <h4 class="title title-up">closing</h4>
      </template>
      <div class="row">
        <div class="col-md-12">
          <h6>เอกสาร</h6>
          <el-upload
            class="upload-demo"
            action="#"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="10"
            :file-list="fileListBook"
            :auto-upload="false"
            :on-change="toggleUpload"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">
              <!-- files with a size less than 500kb -->
            </div>
          </el-upload>
        </div>
      </div>
      <template slot="footer">
        <hr />
        <div class="stats">
          <p-button type="info" round @click="handleClosingCompleted"
            >Done
          </p-button>
        </div>
      </template>
    </modal>
    <!-- modals.closing end -->
    <!-- modals.genLeasePDF start -->
    <modal
      :show.sync="modals.genLeasePDF"
      headerClasses="justify-content-center"
      modalClasses="modal-lg"
    >
      <template slot="header">
        <h4 class="title title-up">หนังสือสัญญาเช่า (LEASE AGREEMENT)</h4>
      </template>
      <div class="row">
        <div class="row">
          <div class="col-md-6">
            <fg-input
              placeholder
              label="เขียนที่ 1"
              v-model="leasePDF.title1"
            ></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              placeholder
              label="เขียนที่ 2"
              v-model="leasePDF.title2"
            ></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              placeholder
              label="สัญญาฉบับนี้ทำขึ้นระหว่าง"
              v-model="leasePDF.contract"
            ></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              placeholder
              label="เลขบัตรประจำตัวประชาชน"
              v-model="leasePDF.idCardNumber"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="อายุ"
              v-model="leasePDF.age"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ที่อยู่เลขที่"
              v-model="leasePDF.address"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="หมู่บ้าน"
              v-model="leasePDF.village"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ถนน"
              v-model="leasePDF.road"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ตำบล/แขวง"
              v-model="leasePDF.amphoe"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="อำเภอ/เขต"
              v-model="leasePDF.district"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="จังหวัด"
              v-model="leasePDF.province"
            ></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input placeholder label="และ" v-model="leasePDF.and"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              placeholder
              label="เลขบัตรประจำตัวประชาชน"
              v-model="leasePDF.idCardNumber2"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="อายุ"
              v-model="leasePDF.age2"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ที่อยู่เลขที่"
              v-model="leasePDF.address2"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="หมู่บ้าน"
              v-model="leasePDF.village2"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ถนน"
              v-model="leasePDF.road2"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ตำบล/แขวง"
              v-model="leasePDF.amphoe2"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="อำเภอ/เขต"
              v-model="leasePDF.district2"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="จังหวัด"
              v-model="leasePDF.province2"
            ></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input
              placeholder
              label="โดยผู้ให้เช่าเป็นเจ้าของ "
              v-model="leasePDF.onwer"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="หมายเลขห้อง"
              v-model="leasePDF.room"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ตึก"
              v-model="leasePDF.building"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ชั้น"
              v-model="leasePDF.floor"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ขนาด"
              v-model="leasePDF.area"
            ></fg-input>
          </div>
          <div class="col-md-12">
            <fg-input
              placeholder
              label="ที่อยู่"
              v-model="leasePDF.addressFull"
            ></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <fg-input
              placeholder
              label="ระยะเวลาเช่่ากำหนดไว้เป็นเวลา"
              v-model="leasePDF.rangeMonth"
            ></fg-input>
          </div>
          <div class="col-md-5">
            <div>
              <label>วันที่เริ่มสัญญา</label>
            </div>
            <fg-input>
              <el-date-picker
                type="date"
                placeholder="Pick a day"
                v-model="leasePDF.rangeDateStart"
              ></el-date-picker>
            </fg-input>
          </div>
          <div class="col-md-5">
            <div>
              <label>วันที่สิ้นสุด</label>
            </div>
            <fg-input>
              <el-date-picker
                type="date"
                placeholder="Pick a day"
                v-model="leasePDF.rangeDateEnd"
              ></el-date-picker>
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              placeholder
              label="ค่าเช่าเดือนละ"
              v-model="leasePDF.monthlyRent"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="บัญชีธนาคาร"
              v-model="leasePDF.accountBank"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ชื่อบัญชี"
              v-model="leasePDF.accountName"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="เลขที่บัญชี"
              v-model="leasePDF.accountNumber"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ผู้เช่าจะต้องชำระค่าเช่าล่วงหน้าเป็นจำนวน"
              v-model="leasePDF.monthlyRentPayAdvance"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ผู้เช่าตกลงที่จ่ายเงินตามจํานวนนี้เป็น"
              v-model="leasePDF.monthlyRentPayAll"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="ผู้เช่าตกลงจะชําระเงินทั้งสิ้น"
              v-model="leasePDF.monthlyRentPayAll"
            ></fg-input>
          </div>
        </div>
      </div>
      <template slot="footer">
        <hr />
        <div class="stats">
          <p-button type="success" round @click="saveDocument('LEASE')"
            >save</p-button
          >
          <p-button type="info" round @click="genPDF('LEASE')">Gen </p-button>
        </div>
      </template>
    </modal>
    <!-- modals.genLeasePDF end -->
    <!-- modals.genSellPDF start -->
    <modal
      :show.sync="modals.genSellPDF"
      headerClasses="justify-content-center"
      modalClasses="modal-lg"
    >
      <template slot="header">
        <h4 class="title title-up">
          หนังสือสัญญาจะซื้อจะขาย (SELL AND PURCHASE AGREEMENT)
        </h4>
      </template>
      <div class="row">
        <div class="col-md-6">
          <fg-input
            placeholder
            label="เขียนที่ 1"
            v-model="sellPDF.title1"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="เขียนที่ 2"
            v-model="sellPDF.title2"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="สัญญาฉบับนี้ทำขึ้นระหว่าง"
            v-model="sellPDF.contract"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ที่อยู่ (ผู้จะขาย)"
            v-model="sellPDF.address1"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="เลขบัตรประจำตัวประชาชน (ผู้จะขาย)"
            v-model="sellPDF.idCardNumber1"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ที่อยู่ (ผู้จะซื้อ)"
            v-model="sellPDF.address2"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="เลขบัตรประจำตัวประชาชน (ผู้จะซื้อ)"
            v-model="sellPDF.idCardNumber2"
          ></fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ผู้จะขายเป็นเจ้าของห้องชุดที่"
            v-model="sellPDF.roomName"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="หมายเลขห้องชุด"
            type="number"
            v-model="sellPDF.roomNumber"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ชั้น"
            type="number"
            v-model="sellPDF.floor"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="เนื้อที่ (ตร.ม.)"
            type="number"
            v-model="sellPDF.area"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="กว้าง (ม.)"
            type="number"
            v-model="sellPDF.width"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ยาว (ม.)"
            type="number"
            v-model="sellPDF.long"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="สูง (ม.)"
            type="number"
            v-model="sellPDF.height"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ตั้งอยู่บนโฉนดเลขที่"
            v-model="sellPDF.address3"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="เลขที่ดิน"
            v-model="sellPDF.address4"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input placeholder label="ถนน" v-model="sellPDF.road"></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ตำบล/แขวง"
            v-model="sellPDF.amphoe"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="อำเภอ/เขต"
            v-model="sellPDF.district"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="จังหวัด"
            v-model="sellPDF.province"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="จังหวัด"
            v-model="sellPDF.zipcode"
          ></fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <fg-input
            placeholder
            label="โดยปลอดภาระผูกพันและภาระ ติดพันใดๆ ในราคารวมทั้งสิ้น"
            v-model="sellPDF.price"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ผู้จะซื้อได้ตกลงชำระเงินมัดจำในวันที่เซ็นสัญญาฉบับนี้ "
            v-model="sellPDF.contract2"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ส่วนที่เหลือจำนวน "
            v-model="sellPDF.price2"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ทะเบียนโอนกรรมสิทธิ์ ณ สำนักงานทะเบียนที่ดินจังหวัดกรุงเทพมหานคร สาขา "
            v-model="sellPDF.registry"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <div>
            <label>ภายในวันที่ </label>
          </div>
          <fg-input>
            <el-date-picker
              type="date"
              placeholder="Pick a day"
              v-model="sellPDF.dateRegistry"
            ></el-date-picker>
          </fg-input>
        </div>
        <div class="col-md-6">
          <div>
            <label>ค่าอากรสแตมป์ร้อยละ </label>
          </div>
        </div>
        <div class="col-md-12">
          <fg-input
            placeholder
            label="เพิ่มข้อ 13"
            v-model="sellPDF.addNewRule"
          ></fg-input>
        </div>
      </div>
      <template slot="footer">
        <hr />
        <div class="stats">
          <p-button type="success" round @click="saveDocument('SELL')"
            >save</p-button
          >
          <p-button type="info" round @click="genPDF('SELL')">Gen </p-button>
        </div>
      </template>
    </modal>
    <!-- modals.genSellPDF end -->
    <!-- modals.genAgentAgreementPDF start -->
    <modal
      :show.sync="modals.genAgentAgreementPDF"
      headerClasses="justify-content-center"
      modalClasses="modal-lg"
    >
      <template slot="header">
        <h4 class="title title-up">
          หนังสือสัญญาแต่งตั้งนายหน้า (REAL ESTATE AGENT AGREEMENT)
        </h4>
      </template>
      <div class="row">
        <div class="col-md-6">
          <fg-input
            placeholder
            label="สัญญาฉบับนี้เขียนขึ้นที่"
            v-model="agentAgreementPDF.contract"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="เมื่อวันที่"
            v-model="agentAgreementPDF.dateTime"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ชื่อ-นามสกุล"
            v-model="agentAgreementPDF.name"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="เลขบัตรประจำตัวประชาชน"
            v-model="agentAgreementPDF.idCardNumber"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ที่อยู่เลขที่"
            v-model="agentAgreementPDF.address"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="หมู่บ้าน"
            v-model="agentAgreementPDF.village"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ถนน"
            v-model="agentAgreementPDF.road"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ตำบล/แขวง"
            v-model="agentAgreementPDF.amphoe"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="อำเภอ/เขต"
            v-model="agentAgreementPDF.district"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="จังหวัด"
            v-model="agentAgreementPDF.province"
          ></fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ผู้จะขาย (ชื่อ-นามสกุล)"
            v-model="agentAgreementPDF.nameSale"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="เลขบัตรประจำตัวประชาชน"
            v-model="agentAgreementPDF.idCardNumberSale"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ที่อยู่เลขที่"
            v-model="agentAgreementPDF.addressSale"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="หมู่บ้าน"
            v-model="agentAgreementPDF.villageSale"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ถนน"
            v-model="agentAgreementPDF.roadSale"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ตำบล/แขวง"
            v-model="agentAgreementPDF.amphoeSale"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="อำเภอ/เขต"
            v-model="agentAgreementPDF.districtSale"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="จังหวัด"
            v-model="agentAgreementPDF.provinceSale"
          ></fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <fg-input
            placeholder
            label="นายหน้า ตกลงจะทำหน้าที่เป็นหน้าให้กับผู้ให้สัญญา"
            v-model="agentAgreementPDF.broker"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="หมายเลขห้อง"
            v-model="agentAgreementPDF.address2"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ตึก"
            v-model="agentAgreementPDF.building"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ชั้น"
            v-model="agentAgreementPDF.floor"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ขนาด"
            v-model="agentAgreementPDF.area"
          ></fg-input>
        </div>
        <div class="col-md-12">
          <fg-input
            placeholder
            label="ที่อยู่"
            v-model="agentAgreementPDF.addressFull"
          ></fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <fg-input
            placeholder
            label="ผู้จะขายตกลงที่จะชําระคาบําเหน็จให้แก่นายหน้าเป็นจํานวนร้อยละ 3 จากราคาที่ตกลงซื้อขาย"
            v-model="agentAgreementPDF.saleName"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <div>
            <label>วันที่</label>
          </div>
          <fg-input>
            <el-date-picker
              type="date"
              placeholder="Pick a day"
              v-model="agentAgreementPDF.rangeDateStart"
            ></el-date-picker>
          </fg-input>
        </div>
        <div class="col-md-6">
          <div>
            <label>จนถึงวันที่</label>
          </div>
          <fg-input>
            <el-date-picker
              type="date"
              placeholder="Pick a day"
              v-model="agentAgreementPDF.rangeDateEnd"
            ></el-date-picker>
          </fg-input>
        </div>
      </div>
      <template slot="footer">
        <hr />
        <div class="stats">
          <p-button
            type="success"
            round
            @click="saveDocument('AGENT_AGREEMENT')"
            >save</p-button
          >
          <p-button type="info" round @click="genPDF('AGENT_AGREEMENT')"
            >Gen
          </p-button>
        </div>
      </template>
    </modal>
    <!-- modals.genAgentAgreementPDF end -->
    <!-- modals.genExclusivePDF start -->
    <modal
      :show.sync="modals.genExclusivePDF"
      headerClasses="justify-content-center"
      modalClasses="modal-lg"
    >
      <template slot="header">
        <h4 class="title title-up">
          สัญญาแต่งตั้งนายหน้า (EXCLUSIVE AGENT AGREEMENT)
        </h4>
      </template>
      <div class="row">
        <div class="col-md-6">
          <fg-input
            placeholder
            label="สัญญาฉบับนี้เขียนขึ้นที่"
            v-model="exclusivePDF.title1"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="เมื่อวันที่"
            v-model="exclusivePDF.title2"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ชื่อ-นามสกุล"
            v-model="exclusivePDF.name"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="เลขบัตรประจำตัวประชาชน"
            v-model="exclusivePDF.idCardNumber"
          ></fg-input>
        </div>
        <div class="col-md-12">
          <fg-input
            placeholder
            label="ที่อยู่"
            v-model="exclusivePDF.address"
          ></fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ทำหน้าที่เป็นนายหน้าให้กับเจ้าของ"
            v-model="exclusivePDF.ownerName"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ห้องชุดเลขที่"
            v-model="exclusivePDF.roomNumber"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ชั้น"
            type="number"
            v-model="exclusivePDF.floor"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ตึก"
            v-model="exclusivePDF.building"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="ขนาด"
            type="number"
            v-model="exclusivePDF.area"
          ></fg-input>
        </div>
        <div class="col-md-12">
          <fg-input
            placeholder
            label="ที่อยู่"
            v-model="exclusivePDF.address2"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ผู้จะขายตกลงที่จะชำระค่าบำเหน็จให้แก่นายหน้าเป็นจำนวนร้อยละ"
            type="number"
            v-model="exclusivePDF.reward"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="ผู้จะขายจะชำระค่าบำเหน็จงวดที่สองให้แก่นายหน้าเป็นจำนวนที่เหลือจนครบร้อยละ"
            type="number"
            v-model="exclusivePDF.reward"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <div>
            <label>สัญญาฉบับนี้ให้มีผลบังคับใช้ตั้งแต่วันที่</label>
          </div>
          <fg-input>
            <el-date-picker
              type="date"
              placeholder="Pick a day"
              v-model="exclusivePDF.dateStart"
            ></el-date-picker>
          </fg-input>
        </div>
        <div class="col-md-6">
          <div>
            <label>จนถึงวันที่ </label>
          </div>
          <fg-input>
            <el-date-picker
              type="date"
              placeholder="Pick a day"
              v-model="exclusivePDF.dateEnd"
            ></el-date-picker>
          </fg-input>
        </div>
        <div class="col-md-12">
          <fg-input
            placeholder
            label="นายหน้ายินดีให้ผู้จะขายได้สิทธิ์ในการถือครองเฟอร์นิเจอร์ที่นายหน้าได้ตกแต่งเพิ่มเข้าไป และปรับปรุงตกแต่งทั้งหมดในห้องทันที ผู้จะขาย"
            type="number"
            v-model="exclusivePDF.contract"
          ></fg-input>
        </div>
      </div>
      <template slot="footer">
        <hr />
        <div class="stats">
          <p-button type="success" round @click="saveDocument('EXCLUSIVE')"
            >save</p-button
          >
          <p-button type="info" round @click="genPDF('EXCLUSIVE')"
            >Gen
          </p-button>
        </div>
      </template>
    </modal>
    <!-- modals.genExclusivePDF end -->
    <!-- modals.genCOBrokePDF start -->
    <modal
      :show.sync="modals.genCOBrokePDF"
      headerClasses="justify-content-center"
      modalClasses="modal-lg"
    >
      <template slot="header">
        <h4 class="title title-up">CO-BROKE: CLIENT REGISTRATION FORM</h4>
      </template>
      <div class="row">
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Co-Broke Ref"
            v-model="coBrokePDF.coBrokeRef"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Enq. Ref"
            v-model="coBrokePDF.enqRef"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <div>
            <label>Registration Date </label>
          </div>
          <fg-input>
            <el-date-picker
              type="date"
              placeholder="Pick a day"
              v-model="sellPDF.dateRegistration"
            ></el-date-picker>
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Company Name"
            v-model="coBrokePDF.companyName"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="Representative Name"
            v-model="coBrokePDF.representativeName"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="Company Address"
            v-model="coBrokePDF.companyAddress"
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            placeholder
            label="Contact Tel. No./ Email"
            v-model="coBrokePDF.contact"
          ></fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Title"
            v-model="coBrokePDF.title"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Name"
            v-model="coBrokePDF.name"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Surname"
            v-model="coBrokePDF.surname"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Nationality"
            v-model="coBrokePDF.nationality"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Telephone Number (Optional)"
            v-model="coBrokePDF.tel"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Email"
            v-model="coBrokePDF.email"
          ></fg-input>
        </div>
        <div class="col-md-12">
          <fieldset>
            <div class="form-group">
              <label class="control-label">Client’s requirement</label>
              <div class="col-md-12">
                <p-checkbox v-model="checkboxTypeBuyClient" :inline="true"
                  >Want to Buy</p-checkbox
                >
                <p-checkbox v-model="checkboxTypeRentClient" :inline="true"
                  >Want to Rent</p-checkbox
                >
              </div>
            </div>
          </fieldset>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Budget (Baht)"
            v-model="coBrokePDF.budget"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Bedroom"
            v-model="coBrokePDF.bedroom"
          ></fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            placeholder
            label="Project Name"
            v-model="coBrokePDF.projectName"
          ></fg-input>
        </div>
      </div>
      <template slot="footer">
        <hr />
        <div class="stats">
          <p-button type="success" round @click="saveDocument('CO_BROKE')"
            >save</p-button
          >
          <p-button type="info" round @click="genPDF('CO_BROKE')"
            >Gen
          </p-button>
        </div>
      </template>
    </modal>
    <!-- modals.genCOBrokePDF end -->
    <template slot="footer">
      <hr />
      <div class="stats">
        <p-button type="info" round @click="goToEdit"
          >{{ btnAction }}
        </p-button>
      </div>
    </template>
  </card>
  <!-- end card -->
</template>
<script>
import Vue from "vue";
import {
  TimeLine,
  TimeLineItem,
  Card,
  Badge,
  Modal,
} from "src/components/UIComponents";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import axios from "axios";
import { mapGetters } from "vuex";
import { extend } from "vee-validate";
import { email, required, confirmed } from "vee-validate/dist/rules";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";
import ActionLog from "../Action/ActionLog";
import PPagination from "src/components/UIComponents/Pagination.vue";
import { ModelSelect } from "vue-search-select";

extend("required", required);
extend("confirmed", confirmed);
extend("email", email);

export default {
  components: {
    Card,
    TimeLine,
    TimeLineItem,
    Badge,
    Modal,
    ActionLog,
    PPagination,
    ModelSelect,
    // TransportBox,
  },

  created: function () {
    this.getProject();
    // this.getLead();
    setTimeout(() => {
      this.getLead();
    }, 500);
    this.getListing();
    this.getActionLog();
  },

  data() {
    return {
      fullscreenLoading: false,
      btnAction: "edit",
      checkboxTypeRent: false,
      checkboxTypeBuy: false,
      imageUrl: "/static/img/photo.png",
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      paginationListing: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      district: "",
      amphoe: "",
      province: "",
      zipcode: "",
      modals: {
        actionLog: false,
        showMatch: false,
        negotiation: false,
        closing: false,
        genLeasePDF: false,
        genSellPDF: false,
        genAgentAgreementPDF: false,
        genExclusivePDF: false,
        genCOBrokePDF: false,
      },
      painPoints: {
        dynamicPainPoints: [],
        inputVisible: true,
        inputValue: "",
      },
      radios: {
        done: "1",
      },
      view: true,
      actionLogId: "",
      modalBtn: "Add",
      actionDateTime: new Date(),
      comment: "",
      reason: "",
      projectSelects: [],
      projectName: "",
      textShowMatch: "",
      actionTypeSelects: {
        select: "",
        data: [
          { value: "1", label: "Call ได้" },
          { value: "2", label: "Call ไม่ได้" },
          { value: "3", label: "Chat ได้" },
          { value: "4", label: "Chat ไม่ได้" },
          { value: "5", label: "Apporintment" },
          { value: "6", label: "Showing" },
          { value: "7", label: "Negotiation" },
          { value: "8", label: "Closing" },
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
      negotiationSelects: {
        select: "",
        data: [
          { value: "owner", label: "owner" },
          { value: "lead", label: "lead" },
        ],
      },
      dataPropertyType: [
        { value: "1", label: "คอนโด" },
        { value: "2", label: "บ้าน" },
        { value: "3", label: "ทาวน์เฮาส์" },
      ],
      dataDirection: [
        { value: "1", label: "ตะวันออก" },
        { value: "2", label: "ตะวันออกเฉียงเหนือ" },
        { value: "3", label: "ตะวันออกเฉียงใต้" },
        { value: "4", label: "เหนือ" },
        { value: "5", label: "ใต้" },
        { value: "6", label: "ตะวันตกเฉียงเหนือ" },
        { value: "7", label: "ตะวันตกเฉียงใต้" },
        { value: "8", label: "ตะวันตก" },
      ],
      listings: [],
      listingByActionLogSelects: [],
      listingByActionLog: "",
      listingByAppointmentSelects: [],
      listingByAppointment: "",
      listingByLead: {
        name: "",
        building: "",
        propertyType: "",
        area: "",
        floor: "",
        bed: "",
        toilet: "",
        direction: "",
      },
      listingByAdmin: {
        name: "",
        building: "",
        propertyType: "",
        area: "",
        floor: "",
        bed: "",
        toilet: "",
        direction: "",
      },
      listingBySale: {
        name: "",
        building: "",
        propertyType: "",
        area: "",
        floor: "",
        bed: "",
        toilet: "",
        direction: "",
      },
      listingLifeStyleBySale: {
        name: "",
        building: "",
        propertyType: "",
        area: "",
        floor: "",
        bed: "",
        toilet: "",
        direction: "",
      },
      lead: {},
      projects: [],
      tableColumns: [
        {
          prop: "comment",
          label: "Comment",
          minWidth: 150,
        },
        {
          prop: "actionDateTime",
          label: "วันที่",
          minWidth: 100,
        },
        {
          prop: "status",
          label: "Status",
          minWidth: 100,
        },
      ],
      bookTableColumns: [
        {
          prop: "name",
          label: "ชื่อไฟล์",
          minWidth: 150,
        },
      ],
      selectActionLog: {},
      tasks: [],
      timeline: {
        lead: true,
        action: false,
        following: false,
        appointment: false,
        showing: false,
        negotiation: false,
        closing: false,
        done: false,
      },
      textTips: "testttttttttttttttttttttttttttttttt",
      textNegotiation: "",
      reasonNegotiation: "",
      whyNegotiation: "",
      improveNegotiation: "",
      fileListBook: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
      ],
      fileListTranfer: [],
      bookList: [],
      checkboxTypeBuyClient: false,
      checkboxTypeRentClient: false,
      exclusivePDF: {
        title1: "",
        title2: "",
        name: "",
        idCardNumber: "",
        address: "",
        ownerName: "",
        roomNumber: "",
        floor: "",
        building: "",
        area: "",
        address2: "",
        reward: "",
        dateStart: "",
        dateEnd: "",
        contract: "",
      },
      coBrokePDF: {
        coBrokeRef: "",
        enqRef: "",
        companyName: "",
        representativeName: "",
        companyAddress: "",
        contact: "",
        title: "",
        name: "",
        surname: "",
        nationality: "",
        tel: "",
        email: "",
        budget: "",
        bedroom: "",
        projectName: "",
      },
      leasePDF: {
        contract: "",
        idCardNumber: "",
        age: "",
        address: "",
        village: "",
        road: "",
        amphoe: "",
        district: "",
        province: "",
        and: "",
        idCardNumber2: "",
        age2: "",
        address2: "",
        village2: "",
        road2: "",
        amphoe2: "",
        district2: "",
        province2: "",
        onwer: "",
        room: "",
        building: "",
        floor: "",
        area: "",
        addressFull: "",
        rangeMonth: "",
        rangeDateStart: "",
        rangeDateEnd: "",
        monthlyRent: "",
        accountBank: "",
        accountName: "",
        accountNumber: "",
        monthlyRentPayAdvance: "",
        monthlyRentPayAll: "",
      },
      sellPDF: {
        title1: "",
        title2: "",
        contract: "",
        address1: "",
        idCardNumber1: "",
        address2: "",
        idCardNumber2: "",
        roomName: "",
        roomNumber: "",
        floor: "",
        area: "",
        width: "",
        long: "",
        height: "",
        address3: "",
        address4: "",
        road: "",
        amphoe: "",
        district: "",
        province: "",
        zipcode: "",
        price: "",
        contract2: "",
        price2: "",
        registry: "",
        dateRegistry: "",
        addNewRule: "",
      },
      agentAgreementPDF: {
        contract: "",
        dateTime: "",
        name: "",
        idCardNumber: "",
        address: "",
        village: "",
        road: "",
        amphoe: "",
        district: "",
        province: "",
        nameSale: "",
        idCardNumberSale: "",
        addressSale: "",
        villageSale: "",
        roadSale: "",
        amphoeSale: "",
        districtSale: "",
        provinceSale: "",
        broker: "",
        address2: "",
        building: "",
        floor: "",
        area: "",
        addressFull: "",
        saleName: "",
        rangeDateStart: "",
        rangeDateEnd: "",
      },
    };
  },

  methods: {
    goToEdit: function () {
      this.$router.push("/admin/lead/create?id=" + this.lead.id);
    },
    searchShowMatch: function () {
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      console.log(JSON.stringify(this.projectSelects));
      let postBody = {
        roomSearchRequest: {
          projectId: this.projectSelects.select,
          type: this.propertySelects.select,
          bed: this.bedSelects.select,
          toilet: this.toiletSelects.select,
          price: this.price.toString(),
          area: this.area.toString(),
        },
        saleUser: this.userSelects.select,
        search: this.search,
        transportType: this.transport.type,
        transportName: this.transport.name,
      };
      console.log("searchShowMatch : " + JSON.stringify(postBody));
      AXIOS.post(`api/listing/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          this.listings = resp.data;
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    getActionLog: function () {
      let paramsValue = {
        leadId: this.$route.query.id,
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get(`api/actionLog/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: paramsValue,
      }).then((resp) => {
        // console.log("getActionLog : " + JSON.stringify(resp.data));
        let actionTypeSelects = this.actionTypeSelects;
        this.tasks = resp.data.map((item) => {
          let status = actionTypeSelects.data.filter(function (actionType) {
            if (actionType.value === item.status) return true;
          });
          return {
            id: item.id,
            comment: item.comment,
            actionDateTime: item.actionDateTime,
            status: status[0].label,
            done: item.done,
          };
        });
        this.getTimeline();
      });
    },
    getListing: function () {
      let postBody = {
        role: "",
        id: "",
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/listing/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          for (let value of resp.data) {
            this.listingByActionLogSelects.push({
              value: value.id,
              text: value.projects[0].name + " - " + value.owner.listingCode,
            });
            this.projectSelects.push({
              value: value.id,
              text: value.projects[0].name + " - " + value.owner.listingCode,
            });
          }
          this.listingByActionLogSelects.push({
            value: "0",
            text: "อื่น ๆ",
          });
        })
        .catch((err) => {
          console.log("getListing err : " + JSON.stringify(err));
          reject(err);
        });
    },
    getListingByAppointment: function (event) {
      if (event == 6) {
        let paramValue = {
          leadId: this.$route.query.id,
        };
        const AXIOS = axios.create({
          baseURL: process.env.VUE_APP_BACKEND_URL,
        });
        AXIOS.get(`api/listing/listByAppointment`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: paramValue,
        })
          .then((resp) => {
            this.listingByAppointmentSelects = [];
            for (let value of resp.data) {
              this.listingByAppointmentSelects.push({
                value: value.id,
                text: value.projects[0].name + " - " + value.owner.listingCode,
              });
            }
            this.listingByAppointmentSelects.push({
              value: "0",
              text: "อื่น ๆ",
            });
          })
          .catch((err) => {
            console.log("getListing err : " + JSON.stringify(err));
            reject(err);
          });
      }
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
        this.projects = resp.data.map((item) => {
          return { name: item.name, id: item.id, zone: item.zone };
        });
        // console.log("projects : " + JSON.stringify(this.projects));
      });
    },
    getLead: function () {
      let paramsValue = {
        id: this.$route.query.id,
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get(`api/lead/get`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: paramsValue,
      })
        .then((resp) => {
          // console.log("getLead resp : " + JSON.stringify(resp.data));
          this.lead = resp.data;
          // listingByLead
          if (resp.data.listingByLead != null) {
            this.listingByLead.name = this.projects.filter(function (project) {
              if (project.id === resp.data.listingByLead.room.projectId)
                return true;
            })[0].name;
            this.listingByLead.building = resp.data.listingByLead.room.building;
            this.listingByLead.propertyType = this.dataPropertyType[
              Number(resp.data.listingByLead.room.propertyType) - 1
            ].label;
            this.listingByLead.area = resp.data.listingByLead.room.area;
            this.listingByLead.floor = resp.data.listingByLead.room.floor;
            this.listingByLead.bed = resp.data.listingByLead.room.bed;
            this.listingByLead.toilet = resp.data.listingByLead.room.toilet;
            this.listingByLead.zone = this.projects.filter((data) => {
              if (data.id == resp.data.listingByLead.room.projectId)
                return true;
            })[0].zone;
            this.listingByLead.direction = this.dataDirection[
              Number(resp.data.listingByLead.room.direction) - 1
            ].label;
          } else {
            this.listingByLead.propertyType =
              resp.data.propertyTypeListingByLead;
            this.listingByLead.area = resp.data.areaListingByLead;
            this.listingByLead.floor = resp.data.floorListingByLead;
            this.listingByLead.bed = resp.data.bedListingByLead;
            this.listingByLead.toilet = resp.data.toiletListingByLead;
            this.listingByLead.direction = resp.data.directionListingByLead;
            this.listingByLead.zone = resp.data.zoneListingByLead;
          }
          // listingBySale
          if (resp.data.listingBySale != null) {
            this.listingBySale.name = this.projects.filter(function (project) {
              if (project.id === resp.data.listingBySale.room.projectId)
                return true;
            })[0].name;
            this.listingBySale.building = resp.data.listingBySale.room.building;
            this.listingBySale.propertyType = this.dataPropertyType[
              Number(resp.data.listingBySale.room.propertyType) - 1
            ].label;
            this.listingBySale.area = resp.data.listingBySale.room.area;
            this.listingBySale.floor = resp.data.listingBySale.room.floor;
            this.listingBySale.bed = resp.data.listingBySale.room.bed;
            this.listingBySale.toilet = resp.data.listingBySale.room.toilet;
            this.listingBySale.zone = this.projects.filter((data) => {
              if (data.id == resp.data.listingBySale.room.projectId)
                return true;
            })[0].zone;
            this.listingBySale.direction = this.dataDirection[
              Number(resp.data.listingBySale.room.direction) - 1
            ].label;
          } else {
            this.listingBySale.propertyType =
              resp.data.propertyTypeListingBySale;
            this.listingBySale.area = resp.data.areaListingBySale;
            this.listingBySale.floor = resp.data.floorListingBySale;
            this.listingBySale.bed = resp.data.bedListingBySale;
            this.listingBySale.toilet = resp.data.toiletListingBySale;
            this.listingBySale.direction = resp.data.directionListingBySale;
            this.listingBySale.zone = resp.data.zoneListingBySale;
          }
          // listingByAdmin
          if (resp.data.listingByAdmin != null) {
            this.listingByAdmin.name = this.projects.filter(function (project) {
              if (project.id === resp.data.listingByAdmin.room.projectId)
                return true;
            })[0].name;
            this.listingByAdmin.building =
              resp.data.listingByAdmin.room.building;
            this.listingByAdmin.propertyType = this.dataPropertyType[
              Number(resp.data.listingByAdmin.room.propertyType) - 1
            ].label;
            this.listingByAdmin.area = resp.data.listingByAdmin.room.area;
            this.listingByAdmin.floor = resp.data.listingByAdmin.room.floor;
            this.listingByAdmin.bed = resp.data.listingByAdmin.room.bed;
            this.listingByAdmin.toilet = resp.data.listingByAdmin.room.toilet;
            this.listingByAdmin.zone = this.projects.filter((data) => {
              if (data.id == resp.data.listingByAdmin.room.projectId)
                return true;
            })[0].zone;
            this.listingByAdmin.direction = this.dataDirection[
              Number(resp.data.listingByAdmin.room.direction) - 1
            ].label;
          } else {
            this.listingByAdmin.propertyType =
              resp.data.propertyTypeListingByAdmin;
            this.listingByAdmin.area = resp.data.areaListingByAdmin;
            this.listingByAdmin.floor = resp.data.floorListingByAdmin;
            this.listingByAdmin.bed = resp.data.bedListingByAdmin;
            this.listingByAdmin.toilet = resp.data.toiletListingByAdmin;
            this.listingByAdmin.direction = resp.data.directionListingByAdmin;
            this.listingByAdmin.zone = resp.data.zoneListingByAdmin;
          }
          // listingLifeStyleBySale
          if (resp.data.listingLifeStyleBySale != null) {
            this.listingLifeStyleBySale.name = this.projects.filter(function (
              project
            ) {
              if (
                project.id === resp.data.listingLifeStyleBySale.room.projectId
              )
                return true;
            })[0].name;
            this.listingLifeStyleBySale.building =
              resp.data.listingLifeStyleBySale.room.building;
            this.listingLifeStyleBySale.propertyType = this.dataPropertyType[
              Number(resp.data.listingLifeStyleBySale.room.propertyType) - 1
            ].label;
            this.listingLifeStyleBySale.area =
              resp.data.listingLifeStyleBySale.room.area;
            this.listingLifeStyleBySale.floor =
              resp.data.listingLifeStyleBySale.room.floor;
            this.listingLifeStyleBySale.bed =
              resp.data.listingLifeStyleBySale.room.bed;
            this.listingLifeStyleBySale.toilet =
              resp.data.listingLifeStyleBySale.room.toilet;
            this.listingLifeStyleBySale.zone = this.projects.filter((data) => {
              if (data.id == resp.data.listingLifeStyleBySale.room.projectId)
                return true;
            })[0].zone;
            this.listingLifeStyleBySale.direction = this.dataDirection[
              Number(resp.data.listingLifeStyleBySale.room.direction) - 1
            ].label;
          } else {
            this.listingLifeStyleBySale.propertyType =
              resp.data.propertyTypeListingLifeStyleBySale;
            this.listingLifeStyleBySale.area =
              resp.data.areaListingLifeStyleBySale;
            this.listingLifeStyleBySale.floor =
              resp.data.floorListingLifeStyleBySale;
            this.listingLifeStyleBySale.bed =
              resp.data.bedListingLifeStyleBySale;
            this.listingLifeStyleBySale.toilet =
              resp.data.toiletListingLifeStyleBySale;
            this.listingLifeStyleBySale.direction =
              resp.data.directionListingLifeStyleBySale;
            this.listingLifeStyleBySale.zone =
              resp.data.zoneListingLifeStyleBySale;
          }

          if (resp.data.file !== null) this.imageUrl = resp.data.file.path;
          this.bookList = resp.data.books;
          if (resp.data.leasePDF !== null) this.leasePDF = resp.data.leasePDF;
          if (resp.data.sellPDF !== null) this.sellPDF = resp.data.sellPDF;
          if (resp.data.exclusivePDF !== null)
            this.exclusivePDF = resp.data.exclusivePDF;
          if (resp.data.agentAgreementPDF !== null)
            this.agentAgreementPDF = resp.data.agentAgreementPDF;
          if (resp.data.coBrokePDF !== null)
            this.coBrokePDF = resp.data.coBrokePDF;
          // this.agentAgreementPDF = resp.data.agentAgreementPDF;
          // this.rendPDF = resp.data.rendPDF;

          // String propertyTypeListingByLead;
          // String toiletListingByLead;
          // String bedListingByLead;
          // Double areaListingByLead;
          // String floorListingByLead;
          // String directionListingByLead;
          // String listingByLeadNotes;
          // this.listingByLead = resp.data[0].listingByLead;
          // this.listingByAdmin = resp.data[0].listingByAdmin;
          // this.listingBySale = resp.data[0].listingBySale;
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    handleActionCompleted: function (row) {
      this.fullscreenLoading = true;
      console.log("handleActionCompleted row : " + JSON.stringify(row));
      let postBody = {
        id: row.id,
      };
      // console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post("api/actionLog/updateStatus", postBody, {
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
          this.getActionLog();
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
    createActionLog: function () {
      this.fullscreenLoading = true;
      let listingId = null;
      let reason = "";
      if (this.actionTypeSelects.select == 5) {
        listingId = this.listingByActionLog;
      }
      if (this.actionTypeSelects.select == 6) {
        listingId = this.listingByAppointment;
        reason = this.reason;
      }
      let postBody = {
        status: this.actionTypeSelects.select,
        comment: this.comment,
        listingId: listingId,
        actionDateTime: this.actionDateTime,
        leadId: this.$route.query.id,
        reason: reason,
        done: this.radios.done,
      };
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post("api/actionLog/create", postBody, {
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
          this.modals.actionLog = false;

          let status = this.actionTypeSelects.data.filter(function (
            actionType
          ) {
            if (actionType.value === resp.data.status) return true;
          });
          this.getActionLog();
          // this.tasks.unshift({
          //   id: resp.data.id,
          //   comment: resp.data.comment,
          //   actionDateTime: resp.data.actionDateTime,
          //   status: status[0].label,
          //   done: resp.data.done,
          // });
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
    editActionLog: function () {
      this.fullscreenLoading = true;
      let listingId = null;
      let reason = "";
      if (this.actionTypeSelects.select == 5) {
        listingId = this.listingByActionLog;
      }
      if (this.actionTypeSelects.select == 6) {
        listingId = this.listingByAppointment;
        reason = this.reason;
      }
      let postBody = {
        id: this.actionLogId,
        status: this.actionTypeSelects.select,
        comment: this.comment,
        listingId: listingId,
        actionDateTime: this.actionDateTime,
        leadId: this.$route.query.id,
        reason: reason,
        done: this.radios.done,
      };
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post("api/actionLog/edit", postBody, {
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
          this.modals.actionLog = false;

          let status = this.actionTypeSelects.data.filter(function (
            actionType
          ) {
            if (actionType.value === resp.data.status) return true;
          });
          this.getActionLog();
          // this.tasks.unshift({
          //   id: resp.data.id,
          //   comment: resp.data.comment,
          //   actionDateTime: resp.data.actionDateTime,
          //   status: status[0].label,
          //   done: resp.data.done,
          // });
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
    getActionLogDetail: function (row, type) {
      console.log("getActionLogDetail row : " + JSON.stringify(row));
      let done = row.done === "COMPLETED" ? "2" : "1";

      let status = this.actionTypeSelects.data.filter(function (actionType) {
        if (actionType.label === row.status) return true;
      });

      this.modals.actionLog = true;
      this.actionLogId = row.id;
      this.actionTypeSelects.select = status[0].value;
      this.comment = row.comment;
      this.actionDateTime = new Date(row.actionDateTime);
      this.leadId = row.leadId;
      this.radios.done = done;
      this.selectActionLog = row;
      if (type === "EDIT") {
        this.modalBtn = "Edit";
        this.view = false;
      } else {
        this.view = true;
      }
    },
    handleDeleteClick(index, row) {
      this.$confirm(
        "This will permanently delete ActionLog. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteActionLog(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    deleteActionLog(row) {
      let postBody = {
        id: row.id,
      };
      // console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/actionLog/delete`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: postBody,
      }).then((resp) => {
        this.$message({
          type: "success",
          message: "Delete completed",
        });
        this.getActionLog();
      });
    },
    getTimeline: function () {
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get("api/actionLog/getLast/" + this.$route.query.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          // console.log("resp.data : " + JSON.stringify(resp.data));
          if (resp.data.length > 0) {
            let status = this.actionTypeSelects.data.filter(function (
              actionType
            ) {
              if (actionType.value === resp.data[0].status) return true;
            });
            console.log("resp.data : " + JSON.stringify(status));
            if (status[0].value == 1 || status[0].value == 3) {
              this.timeline.action = true;
              this.timeline.following = true;
              this.timeline.appointment = false;
              this.timeline.showing = false;
              this.timeline.negotiation = false;
              this.timeline.closing = false;
            } else if (status[0].value == 2 || status[0].value == 4) {
              this.timeline.action = true;
              this.timeline.following = false;
              this.timeline.appointment = false;
              this.timeline.showing = false;
              this.timeline.negotiation = false;
              this.timeline.closing = false;
            } else if (status[0].value == 5) {
              this.timeline.action = true;
              this.timeline.following = true;
              this.timeline.appointment = true;
              this.timeline.showing = false;
              this.timeline.negotiation = false;
              this.timeline.closing = false;
            } else if (status[0].value == 6) {
              this.timeline.action = true;
              this.timeline.following = true;
              this.timeline.appointment = true;
              this.timeline.showing = true;
              this.timeline.negotiation = false;
              this.timeline.closing = false;
            } else if (status[0].value == 7) {
              this.timeline.action = true;
              this.timeline.following = true;
              this.timeline.appointment = true;
              this.timeline.showing = true;
              this.timeline.negotiation = true;
              this.timeline.closing = false;
            } else if (status[0].value == 8) {
              this.timeline.action = true;
              this.timeline.following = true;
              this.timeline.appointment = true;
              this.timeline.showing = true;
              this.timeline.negotiation = true;
              this.timeline.closing = true;
            }
          }
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    showMatch: function (type) {
      if (type === "ALL") {
        const AXIOS = axios.create({
          baseURL: process.env.VUE_APP_BACKEND_URL,
        });
        let postBody = {};
        // AXIOS.get("api/listing/list/" + this.$route.query.id, {
        AXIOS.post("api/listing/list/", postBody, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((resp) => {
            // console.log("resp.data : " + JSON.stringify(resp.data));
            this.listings = resp.data;
          })
          .catch((err) => {
            console.log("err : " + JSON.stringify(err));
            reject(err);
          });
      } else if (type === "MATCH") {
        const AXIOS = axios.create({
          baseURL: process.env.VUE_APP_BACKEND_URL,
        });
        let tempD = this.listingBySale.direction;
        let direction;
        let selectDirection = this.dataDirection.filter(function (data) {
          if (data.label === tempD) return true;
        });
        if (selectDirection.length > 0) {
          direction = selectDirection[0].value;
        } else {
          direction = "";
        }

        let tempP = this.listingBySale.propertyType;
        let propertyType;
        let selectPropertyType = this.dataPropertyType.filter(function (data) {
          if (data.label === tempP) return true;
        });
        if (selectPropertyType.length > 0) {
          propertyType = selectPropertyType[0].value;
        } else {
          propertyType = "";
        }

        let postBody = {
          building: this.listingBySale.building,
          propertyType: propertyType,
          area: this.listingBySale.area,
          floor: this.listingBySale.floor,
          toilet: this.listingBySale.toilet,
          bed: this.listingBySale.bed,
          zone: this.listingBySale.zone,
          direction: direction,
          priceMin: this.lead.priceMin,
          priceMax: this.lead.priceMax,
          // scenery: ['3', '2'],
        };
        console.log("postBody MATCH : " + JSON.stringify(postBody));
        AXIOS.post("api/listing/match/", postBody, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((resp) => {
            console.log("resp.data : " + JSON.stringify(resp.data));
            this.listings = resp.data;
          })
          .catch((err) => {
            console.log("err : " + JSON.stringify(err));
            reject(err);
          });
      }
      this.modals.showMatch = true;
    },
    handleMatchCompleted: function (row) {
      this.fullscreenLoading = true;
      let postBody = {
        status: "5",
        comment: "Appointment " + row.owner.listingCode,
        actionDateTime: new Date(),
        leadId: this.$route.query.id,
        done: "2",
        listingId: row.id,
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post("api/actionLog/create", postBody, {
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
          this.modals.showMatch = false;

          this.getActionLog();
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
    showNegotiation: function () {
      this.modals.negotiation = true;
    },
    handleNegotiationCompleted: function () {
      this.fullscreenLoading = true;
      let postBody = {
        status: "7",
        comment: this.textNegotiation,
        actionDateTime: new Date(),
        leadId: this.$route.query.id,
        who: this.negotiationSelects.select,
        reason: this.reasonNegotiation,
        why: this.whyNegotiation,
        improve: this.improveNegotiation,
        done: "2",
      };
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post("api/actionLog/create", postBody, {
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
          this.modals.negotiation = false;

          this.getActionLog();
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
    showClosing: function () {
      this.modals.closing = true;
    },
    handleClosingCompleted: function () {
      this.fullscreenLoading = true;
      let postBody = {
        status: "8",
        comment: "Completed",
        actionDateTime: new Date(),
        leadId: this.$route.query.id,
        done: "2",
      };
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post("api/actionLog/create", postBody, {
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
          this.modals.closing = false;

          this.getActionLog();
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
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    },
    genPDF: function (type) {
      this.fullscreenLoading = true;
      let postBody;
      let path = "";
      let fileName = "";
      if (type === "LEASE") {
        path = "api/report/leaseAgreement";
        postBody = this.leasePDF;
        fileName = "leaseAgreement";
      } else if (type === "SELL") {
        path = "api/report/sellAndPurchaseAgreement";
        postBody = this.genSellPDF;
        fileName = "genSell";
      } else if (type === "AGENT_AGREEMENT") {
        path = "api/report/realEstateAgentAgreement";
        postBody = this.agentAgreementPDF;
        fileName = "realEstateAgentAgreement";
      } else if (type === "EXCLUSIVE") {
        path = "api/report/exclusiveAgreement";
        postBody = this.exclusivePDF;
        fileName = "exclusive";
      } else if (type === "CO_BROKE") {
        path = "api/report/coBrokerForm";
        postBody = this.coBrokePDF;
        fileName = "coBroke";
      }

      console.log("postBody : " + JSON.stringify(postBody));
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
          console.log("resp.data : " + JSON.stringify(resp.data));
          var byteFile = this.base64ToArrayBuffer(resp.data);
          this.saveByteArray(fileName, byteFile);
          // this.$notify({
          //   message: "Success",
          //   icon: "fa fa-gift",
          //   horizontalAlign: "center",
          //   verticalAlign: "top",
          //   type: "success",
          // });
          // this.modals.closing = false;

          // this.getActionLog();
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
    saveDocument: function (type) {
      this.fullscreenLoading = true;
      let postBody;
      let path = "api/lead/saveDocument";
      if (type === "LEASE") {
        postBody = {
          leadId: this.$route.query.id,
          type: type,
          data: this.leasePDF,
        };
      } else if (type === "SELL") {
        postBody = {
          leadId: this.$route.query.id,
          type: type,
          data: this.sellPDF,
        };
      } else if (type === "AGENT_AGREEMENT") {
        postBody = {
          leadId: this.$route.query.id,
          type: type,
          data: this.agentAgreementPDF,
        };
      } else if (type === "EXCLUSIVE") {
        postBody = {
          leadId: this.$route.query.id,
          type: type,
          data: this.exclusivePDF,
        };
      } else if (type === "CO_BROKE") {
        postBody = {
          leadId: this.$route.query.id,
          type: type,
          data: this.coBrokePDF,
        };
      }

      console.log("postBody : " + JSON.stringify(postBody));
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
          console.log("resp.data : " + JSON.stringify(resp.data));
          // this.$notify({
          //   message: "Success",
          //   icon: "fa fa-gift",
          //   horizontalAlign: "center",
          //   verticalAlign: "top",
          //   type: "success",
          // });
          this.modals.genLeasePDF = false;
          this.modals.genSellPDF = false;
          this.modals.genAgentAgreementPDF = false;
          this.modals.genExclusivePDF = false;
          this.modals.genCOBrokePDF = false;
          // this.getActionLog();
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
    base64ToArrayBuffer: function (base64) {
      var binaryString = window.atob(base64);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes;
    },
    saveByteArray: function (reportName, byte) {
      var blob = new Blob([byte], { type: "application/pdf" });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      var fileName = reportName;
      link.download = fileName;
      link.click();
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    toggleUpload(file) {
      this.fullscreenLoading = true;
      console.log("toggleUpload file" + JSON.stringify(file));
      var imageBase64 = this.getBase64(file.raw).then((res) => {
        // console.log(res);
        let postBody = {
          name: file.name,
          path: res,
        };
        // console.log("toggleUpload postBody" + JSON.stringify(postBody));
        const AXIOS = axios.create({
          baseURL: process.env.VUE_APP_BACKEND_URL,
        });
        AXIOS.post("api/v2/file/upload", postBody, {
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
            this.fileListBook.push({
              id: resp.data.id,
              name: resp.data.name,
              url: resp.data.path,
            });
            this.saveBook(resp.data);
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
      });
    },
    saveBook: function (data) {
      let postBody = {
        id: this.$route.query.id,
        book: data,
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post("api/lead/saveBook", postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {});
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
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
        console.log("deleted resp : " + JSON.stringify(resp.data));
        this.fileListBook = fileList;
        this.deleteBook(file);
        // this.fileList = this.fileList.filter(function (item) {
        //   if (item.id == file.id) {
        //     return false;
        //   }
        //   return true;
        // });
      });
    },
    deleteBook: function (data) {
      let postBody = {
        id: this.$route.query.id,
        book: {
          id: data.id,
          name: data.name,
          path: data.url,
        },
      };

      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post("api/lead/deleteBook", postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {});
    },
    downloadFile: function (row) {
      console.log("downloadFile row : " + JSON.stringify(row));
      axios({
        method: "GET",
        url: row.path,
        responseType: "blob",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          const blob = new Blob([response.data]);
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = row.name;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
    },
    removeBook: function (row) {
      this.fullscreenLoading = true;
      const formData = new FormData();
      formData.append("id", row.id);
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/file/delete`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        let postBody = {
          id: this.$route.query.id,
          book: {
            id: row.id,
            name: row.name,
            path: row.path,
          },
        };
        const AXIOS = axios.create({
          baseURL: process.env.VUE_APP_BACKEND_URL,
        });
        AXIOS.post("api/lead/deleteBook", postBody, {
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
          this.getLead();
        });
      });
    },
  },

  computed: {
    ...mapGetters({ getUser: "getUser" }),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    pagedData() {
      return this.tasks.slice(this.from, this.to);
    },
    queriedData() {
      if (!this.searchQuery) {
        this.pagination.total = this.tasks.length;
        return this.pagedData;
      }
      let result = this.tasks.filter((row) => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });
      this.pagination.total = result.length;
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      this.pagination.total = this.tasks.length;
      return this.tasks.length;
    },
    pagedDataListing() {
      return this.listings.slice(this.from, this.to);
    },
    queriedDataListing() {
      if (!this.searchQuery) {
        this.paginationListing.total = this.listings.length;
        return this.pagedDataListing;
      }
      let result = this.listings.filter((row) => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });
      this.paginationListing.total = result.length;
      return result.slice(this.from, this.to);
    },
    toListing() {
      let highBound = this.from + this.paginationListing.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    fromListing() {
      return (
        this.paginationListing.perPage *
        (this.paginationListing.currentPage - 1)
      );
    },
    totalListing() {
      this.paginationListing.total = this.listings.length;
      return this.listings.length;
    },
  },
};
</script>
<style src="src/assets/css/timeline.css" scoped/>
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

.progress {
  margin-top: 20px;
}

.active-line {
  stroke: #fbc658;
  stroke-width: 5;
}

.active-no-line {
  stroke: #004165;
  stroke-width: 5;
}
</style>
