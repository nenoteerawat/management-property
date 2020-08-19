<template>
  <div class="user">
    <div class="photo">
      <img src="static/img/faces/face-2.jpg" alt="user avatar"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click="toggleMenu" href="#">
         <span>
           {{getUser.firstName}} {{getUser.lastName}}
           <b class="caret"></b>
        </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <collapse-transition>
          <ul class="nav nav-menu" v-show="!isClosed">
            <li>
              <a href="#">
                <span class="sidebar-mini-icon">Mp</span>
                <span class="sidebar-normal">My Profile</span>
              </a>
            </li>
            <li>
              <a href="#" @click="logout">
                <span class="sidebar-mini-icon">L</span>
                <span class="sidebar-normal">Logout</span>
              </a>
            </li>
          </ul>
        </collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions'
  import {mapGetters} from 'vuex'

  export default {
    computed : {
      ...mapGetters({getUser: 'getUser'}),
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
      
    },
    components: {
      CollapseTransition
    },
    data() {
      return {
        isClosed: true,
        username: ''
      }
    },
    methods: {
      toggleMenu() {
        this.isClosed = !this.isClosed
      },
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    }
  }
</script>
<style scoped>
  .nav.nav-menu {
    margin-top: 0;
  }
</style>
