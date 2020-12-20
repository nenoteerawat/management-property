<template>
  <div>
  {{xml}}
  </div>
</template>
<script>
import axios from "axios";

export default {
  components: {
    // TransportBox,
  },

  created: function () {
    // if (this.getUser.roles[0] == "ROLE_ADMIN") {
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get(`api/xml/all`, {
        
      }).then((resp) => {
        // console.log("getUser all resp : " + JSON.stringify(resp));
        this.xml = resp.data;
      })
      .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    // }
  },

  data() {
    return {
      xml: "etstest",
    }
  },
};
</script>
