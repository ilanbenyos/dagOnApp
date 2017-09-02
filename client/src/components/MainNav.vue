<template>
  <div>
    =={{msg}}==
    <button class="button" @click="goToCard">goToCard</button>
    <router-link to="/oxygen"><button>Go to oxygen exam</button></router-link>
    <router-link to="/Grading"><button>Grading</button></router-link>
    <router-link to="/Graders"><button>Graders</button></router-link>
    <router-link to="/Fishes"><button>fishes</button></router-link>
    <router-link to="/Facilities"><button>Facilities</button></router-link>
    <router-link to="/Ponds"><button>ponds</button></router-link>
    <router-link to="/Gmap"><button>gmap</button></router-link>
    <router-link to="/Ex"><button>ex</button></router-link>
  </div>
</template>

<script>

export default {
  name: 'mainnav',
  data() {
    return {
      msg: 'NAV',
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
      goToCard(){
          this.$router.push('login');
      },

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
.navbar{
  // position:fixed;
}

</style>
-