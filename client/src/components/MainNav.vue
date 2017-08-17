<template>
  <div>
    <el-row>
      <div v-if="currUser">
          <el-col class="grid-content " :lg="{span: 2, offset: 1}" :md="{span: 2, offset: 1}" :sm="{span: 2, offset: 1}" :xs="{span: 2, offset: 1}">
            <router-link to="/edit" class="edit-btn">
              <img src="../assets/settings.png"> </router-link>
            <div v-if="this.currUser" class="registered-user">{{this.currUser.name}}</div>
          </el-col>
      </div>
      <div v-else>
          <el-col class="grid-content edit-btn  opacity08" :lg="{span: 2, offset: 1}" :md="{span: 2, offset: 1}" :sm="{span: 2, offset: 1}" :xs="{span: 2, offset: 1}">
            <!--<router-link to="/edit" class="edit-btn">-->
              <img src="../assets/settings.png"> 
              <!--</router-link>-->
            <!--<div v-if="this.currUser" class="registered-user">{{this.currUser.name}}</div>-->
          </el-col>
      </div>
      
      
      
      
      
      <el-col class="grid-content " :lg="{span: 6, offset: 6}" :md="{span: 6, offset: 6}" :sm="{span: 6, offset: 6}" :xs="{span: 8, offset: 5}">
        <!--<router-link to="/browse">-->
          <h2 class="logo">
            Mingler
          </h2>
        <!--</router-link>-->
      </el-col>
  
      <el-col class="grid-content match-btn" :lg="{span: 2, offset: 6}" :md="{span: 2, offset: 6}" :sm="{span: 2, offset: 6}" :xs="{span: 2, offset: 5}">
      <div v-if="currUser">
            <div v-if="!isBrowseScreen" @click="navigate">
              <router-link to="/browse">
                <div class="icon-container">
                  <div class="image-container">
                    <img src="../assets/browse.png">
                    <div class="image-badge-container">
                      <el-badge :value="unreadCount" class="item image-badge"> </el-badge>
                    </div>
                    </img>
                  </div>
                </div>
              </router-link>
            </div>
            <div v-else @click="navigate" class="nav-back">
      
              <router-link to="/matches">
                <div class="icon-container">
                  <div class="image-container">
                    <img src="../assets/matched.png">
                    <div class="image-badge-container">
                      <el-badge :value="unreadCount" class="item image-badge"> </el-badge>
                    </div>
                    </img>
                  </div>
                </div>
              </router-link>
            </div>
        </div>
      <div v-else>
                <div class="icon-container opacity08">
                  <div class="image-container">
                    <img src="../assets/browse.png">
                    </img>
                  </div>
                </div>
      </div>


      </el-col>
  
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'mainnav',
  data() {
    return {
      msg: 'Browse screen',
      unreadMessages: 10,
      //  currUser:  this.$store.state.user.currUser
    }
  },
  // watch: {
  //   '$route': function(window) {
  //     console.log('MainNav-watch: in ' , window, 'screen')
  //   }
  // },
  computed: {
    isBrowseScreen() {
      return (this.$route.name === "Browse")
    },
    unreadCount() {
      return this.$store.getters.fetchUnreadMessgesCount;
    },
    currUser() { return this.$store.state.user.currUser }

  },
  methods: {
    navigate() {
      this.isBrowseScreen = !this.isBrowseScreen;
    },
  }
}
</script>

<style scoped lang="scss">
.image-badge-container {
  position: absolute; //background-color: blue;
  // display: flex;
  // justify-content: flex-end;
  // align-items: flex-start; //z-index: 5;
}

.image-badge {}

.image-container {
  // height: 2em;
  display: flex;
  justify-content: flex-start;
  align-items: center; // position: absolute;
  //  z-index: 1;
}

.edit-btn img {
  width: 3em;
  margin: {
    top: 1.5em;
  }
}

.match-btn img {
  width: 3em;
  margin: {
    top: 1.5em;
  }
}

// .registered-user {
//   max-height: 1.3em;
//   overflow: hidden;
// }
.logo {
  color: rgba(124, 1, 87, 1);
  text-transform: uppercase;
  font-size: 2em;
  text-shadow: -1px -1px 2px rgba(89, 89, 89, 0.66);
  font-family: 'Kurale', Helvetica, Arial, sans-serif;
  line-height: 1em;

  img {
    max-width: 1.5em; // position: absolute;
    // z-index: 1;
    // display: flex;
  }
}
.opacity08{
  opacity: 0.5;
  transition: 0.8 all;
}
</style>
-