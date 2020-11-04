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
          style="width: 150px; height: 150px"
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
              <circle cx="10" cy="11" r="5" fill="#fbc658" />
            </svg>
            <div class="time">Appointment</div>
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
            <div class="time" @click="showMatch">Appointment</div>
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
              <circle cx="10" cy="11" r="5" fill="#fbc658" />
            </svg>
            <div class="time">Negotiation</div>
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
              <circle cx="10" cy="11" r="5" fill="#fbc658" />
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
          <div class="event1">
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
                  (view = false)
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
        <div class="table-full-width table-tasks">
          <el-table :data="tasks">
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
          <!-- <table class="table">
            <tbody>
              <ActionLog
                v-for="(task, index) in tasks"
                :key="task.title"
                :task="task"
                :index="index"
              ></ActionLog>
            </tbody>
          </table> -->
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
                  <span>ลุกค้าคุยง่ายแค่ไหน</span>
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
                  <span>ลุกค้าเชื่อใจคุณแค่ไหน</span>
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
                  <span>ลุกค้าคุยง่ายแค่ไหน</span>
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
      <div class="col-md-12">
        <div class="form-group">
          <label>Comment</label>
          <textarea
            :readonly="view"
            rows="5"
            class="form-control border-input"
            placeholder=""
            v-model="comment"
          ></textarea>
        </div>
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
        <p-button v-show="!view" @click="createActionLog">{{
          modalBtn
        }}</p-button>
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
        <!-- Action log start -->
        <div class="col-md-12">
          <div class="table-full-width table-tasks">
            <el-table :data="listings">
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
                    <h6>
                      S {{ Number(props.row.room.price).toLocaleString() }}
                    </h6>
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
            <!-- <table class="table">
            <tbody>
              <ActionLog
                v-for="(task, index) in tasks"
                :key="task.title"
                :task="task"
                :index="index"
              ></ActionLog>
            </tbody>
          </table> -->
          </div>
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
          <label>Note</label>
          <el-input
            type="textarea"
            placeholder="Please input"
            rows="7"
            v-model="textNegotiation"
          >
          </el-input>
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
          <h6>Book</h6>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileListBook"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">
              files with a size less than 500kb
            </div>
          </el-upload>
        </div>
        <div class="col-md-12">
          <h6>Tranfer</h6>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileListTranfer"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">
              files with a size less than 500kb
            </div>
          </el-upload>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label >Deposit</label>
            <p-button type="info" round @click="handleClosingCompleted"
            >Gen PDF
          </p-button>
          </div>
        </div>
      </div>
    </modal>
    <!-- modals.closing end -->
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
    // TransportBox,
  },

  created: function () {
    this.getLead();
    this.getProject();
    this.getActionLog();
  },

  data() {
    return {
      fullscreenLoading: false,
      btnAction: "edit",
      checkboxTypeRent: false,
      checkboxTypeBuy: false,
      imageUrl: "/static/img/default-avatar.png",

      district: "",
      amphoe: "",
      province: "",
      zipcode: "",
      modals: {
        actionLog: false,
        showMatch: false,
        negotiation: false,
        closing: false,
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
      modalBtn: "Add",
      actionDateTime: new Date(),
      comment: "",
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
      listingSelects: [],
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

      fileListBook: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      fileListTranfer: [
        
      ],
    };
  },

  methods: {
    goToEdit: function () {
      this.$router.push("/admin/lead/create?id=" + this.lead.id);
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
          return { name: item.name, id: item.id };
        });
        console.log("projects : " + JSON.stringify(this.projects));
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
          }

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

      let postBody = {
        status: this.actionTypeSelects.select,
        comment: this.comment,
        actionDateTime: this.actionDateTime,
        leadId: this.$route.query.id,
        done: this.radios.done,
        // listingId: this.listingId,
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
    getActionLogDetail: function (row, type) {
      // console.log("getActionLogDetail row : " + JSON.stringify(row));
      let done = row.done === "COMPLETED" ? "2" : "1";

      let status = this.actionTypeSelects.data.filter(function (actionType) {
        if (actionType.label === row.status) return true;
      });

      this.modals.actionLog = true;
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
            } else if (status[0].value == 2 || status[0].value == 4) {
              this.timeline.action = true;
            } else if (status[0].value == 5) {
              this.timeline.action = true;
              this.timeline.following = true;
              this.timeline.appointment = true;
            } else if (status[0].value == 6) {
              this.timeline.action = true;
              this.timeline.following = true;
              this.timeline.appointment = true;
              this.timeline.showing = true;
            } else if (status[0].value == 7) {
              this.timeline.action = true;
              this.timeline.following = true;
              this.timeline.appointment = true;
              this.timeline.showing = true;
              this.timeline.negotiation = true;
            } else if (status[0].value == 6) {
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
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      let postBody = this.lead.listingLifeStyleBySale;
      AXIOS.post("api/listing/match/",postBody, {
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
        status: "7",
        comment: this.textNegotiation,
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
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
