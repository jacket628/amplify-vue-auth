<template>
  <div>
    <div v-if="!email">
      <h1>Forgot Password</h1>
      <input v-model="login" type="text" placeholder="Login"><br>
      <button @click="sendUserPasswordResetEmail">Submit</button>
    </div>
    <div v-if="email">
      <h2>Confirm Reset Password</h2>
      <input v-model="email" type="text" readonly="readonly"><br>
      <input v-model="login" type="text" readonly="readonly"><br>
      <input v-model="code" type="text" placeholder="Code"><br>
      <input v-model="password" type="password"  placeholder="Password"><br>
      <button @click="confirm">Submit</button>
    </div>
  </div>
</template>
<script>
import {Auth} from 'aws-amplify';

export default {
  data() {
    return {
      login: '',
      email: '',
      password: '',
      code: ''
    }
  },
  methods: {
    confirm() {
      // Collect confirmation code and new password, then submit
      Auth.forgotPasswordSubmit(this.login, this.code, this.password)
          .then(data => {
              console.log(data)
              this.$router.push("/")
            }
          )
          .catch(err => console.log(err));
    },
    sendUserPasswordResetEmail() {
      //todo: Any validation checks, rate limits you want to check here, etc.

      Auth.forgotPassword(this.login)
          .then(data => {
                console.log(data),
                    this.email = data.CodeDeliveryDetails.Destination,
                    console.log(this.email)
              }
          )
          .catch(err => console.log(err));
    }

  }

}
</script>
<style>
input {
  margin: 10px;
  padding: 16px;
}
</style>


