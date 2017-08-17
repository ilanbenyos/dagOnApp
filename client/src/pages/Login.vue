<template>
  <transition name="fade">

 <section>
  <div class="edit-header">
      <h2>Login</h2>
  </div>
 <el-form ref="form" class="form-login"  label-position="top">
      <el-form-item label="Username">
        <el-row>
          <el-input v-model="user.login" class="input"></el-input>
        </el-row>
      </el-form-item>
      <el-form-item label="Password">
        <el-row>
          <el-input type="password" class="input" v-model="user.password" auto-complete="off"></el-input>
        </el-row>
      </el-form-item>
      <h3 v-if="this.loginStatus" class="warning-message"> Wrong username or password</h3>
      <el-form-item prop="pass">
        <el-button type="accent" @click.stop="submitForm"> Log in</el-button>
      </el-form-item>
    </el-form>
    <section>
      <h3> or </h3>
      <router-link to="/edit" class="edit-btn">
      <el-button type="accent"> Join Mingler today! </el-button>
      </router-link>
    </section>

  </section>
  </transition>

</template>

<script>
import { LOG_IN } from '../store/store'
//import { GET_BROWSED } from '../store/store'

export default {
  data() {
    return {
      user: {
        login: '',
        password: ''
      }
      }
  },
  watch:{
      currUser: function(userExist){
      console.log('LOGIN: user logged in - move to BROWSE?');
      if(userExist){
    //        this.$store.dispatch({ type: GET_BROWSED })
    //   .then(x => console.log('login: watch users exist, get browsed',x));
    // console.log('login: created - after GET_BROWSED');
      console.log('LOGIN: user logged in - user exists - move to BROWSE!!!');
      this.$router.push('Browse');      } 
      }

  },
    computed: {
    loginStatus() {
      console.log('LOGIN: submit form clicked: ', this.user)
      return this.$store.getters.fetchLoginStatus === false;
    },

    currUser() {
      console.log('LOGIN: curreUser: ', this.$store.getters.fetchCurrUser)
      return this.$store.getters.fetchCurrUser;
    }
    },
  methods: {
    submitForm() {
      console.log('LOGIN: submit form clicked: ', this.user)
      this.$store.dispatch({ type: LOG_IN, user: this.user })
    }

  }
}
  
</script>

<style lang="scss" scoped>

.form-login {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  background-color: rgba(239, 237, 234, 0.5);
  box-shadow: 0 0 10px 3px rgba(220, 220, 220, 0.3);
  padding: {
    bottom: 0;
    top: 1em;
    left: 2em;
    right: 2em;
  }
}

.warning-message{
color: red;
}
.edit-header {
  display: flex;
  justify-content: flex-start;
  width: 90%;
  margin: auto;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .8s
}

.fade-enter,.fade-leave-to{
  opacity: 0
}


</style>
