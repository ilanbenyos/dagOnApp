<template>
  <transition name="fade">
    <div>
     =={{msg}}==
      <button class="button" @click="initMsg">initMsg</button>
      <button class="button" @click="getMsgFromStore">getMsgFromStore</button>
      <button class="button" @click="getMsgFromServer($event)">getMsgFromServer</button>
        <div class="list" >list
        </div>
    </div>
  </transition>

</template>

<script>
import { LOG_IN } from '../store/store'
import { SENDMSG } from '../store/store'

export default {
  data() {
    return {
      msg:'login',
      user: {
        login: '',
        password: ''
      }
      }
  },
  mounted(){
      this.msg = this.$store.getters.fetchGetMsg;
  },
  watch:{
      msg1: function(newMsg){
        this.msg = this.$store.getters.fetchGetMsg;
      }

  },
    computed: {
    loginStatus() {

    },

    msg1() {
      return this.$store.getters.fetchGetMsg;
    }
    },
  methods: {//
      initMsg(){
          this.msg = "initMsg";
          // this.$router.push('Browse');
      },
      getMsgFromStore(){
          this.msg = this.$store.getters.fetchGetMsg;
          console.log('getMsgFromStore')
      },
      getMsgFromServer(e){
          const act = { type1: 'getMsgFromServer', txt:this.msg};
          this.cLog(act,e)
          const params = { event:e}
          this.sendMsg({ act,params})
      },
      sendMsg(msg){
          this.$store.dispatch({ type: SENDMSG, msg })
      },
      cLog(msg){
          //this.$store.dispatch({ type: SENDMSG, msg })
      },


  }
}
  
</script>

<style lang="scss" scoped>



</style>
