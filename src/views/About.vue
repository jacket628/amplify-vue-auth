<template>
  <div class="about">
    <h1>This is Server Information</h1>
    <h2>{{info.data}}</h2>
  </div>
</template>
<script>

import axios from 'axios';
export default {
  data(){
    return {
      info: ''
    }
  },
  mounted() {
    if(this.$store.state.user) {
      const jwt = this.$store.state.user
      .getSignInUserSession()
      .getIdToken()
      .getJwtToken();
      console.log("jwt:",jwt)
      const config = {
        headers: {
          authorization: jwt
        }
      }


      //testcase 0: https://e7hlpl33d4.execute-api.us-west-1.amazonaws.com/v1/hello
      //testcase 1: https://e7hlpl33d4.execute-api.us-west-1.amazonaws.com/v1/jobs_status

      axios.get('https://e7hlpl33d4.execute-api.us-west-1.amazonaws.com/v1/jobs_status', config)
      .then(val => this.info = val)
      .catch(err => console.log(err))

    }
  }
}
</script>