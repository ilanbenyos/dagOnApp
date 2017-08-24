
export const SND_MSG = 'SND_MSG';
export const LOG_IN = 'LOG_IN';
export const SENDMSG = 'SENDMSG';//
export const SENDLOCALMSG = 'SENDLOCALMSG';//

import service from '../services/service'


const state = {
  loginStatus: true,
  // user: {id:111,password:111,txt:'111'},
  user: {},
  users:[],
  storeMsg:'first msg from store',
  dog:{},
  acts:[],
  ponds:[],
  facilities:[],
  fishes:[],
  batches:[],
  fish:''
};

const getters = {
  fetchUsersMatched(state) {
    console.log('store.getters.USERS_MATCHED', state.usersMatched)
    return state.usersMatched;
  },
  fetchGetMsg(state) {
    return state.storeMsg;
  },
  fetchGetUser(state) {
    return state.user;
  },
  fetchGetUsers(state) {
    return state.users;
  },
  fetchGetActs(state) {
    return state.acts;
  },
  fetchGetPonds(state) {
    return state.ponds;
  },
  fetchGetFacilities(state) {
    return state.facilities;
  },
  fetchGetBatchs(state) {
    return state.batchs;
  },
  fetchGetFishes(state) {
    return state.fishes;
  },
  fetchGetCurrFish(state) {
    return state.currFish;
  },
  fetchGetState(state) {
    return state;
  }

}
const mutations = {

  [SENDMSG](state, payload) {
    var acts = payload.res
    for (var i = 0; i < acts.length; i++) {
      var act = acts[i];
      var actType = act.actType;
      switch (actType) {
        case 'setUser'://    
          state.user = act.res;
        break;
        case 'addToList'://    
          var list = act.list
          state[list] = act.res;
        break;
        case 'getList'://    
          var list = act.list
          state[list] = act.res;
        break;
        case 'updateInList'://    
          var list = act.list
          state[list] = act.res;
        break;
      }
    }

  },
  [LOG_IN](state, { user }) {
    // console.log('storec.mutation.LOG_IN: status',state.loginStatus)
    // console.log('store.mutation.LOG_IN: ', user)
    // console.log('TBD - store.mutation.LOG_IN')
    if (user) {
      state.currUser = user;
      var myJSON = JSON.stringify(user);
      localStorage.currUser = myJSON;

      state.loginStatus = true;
      //  console.log('store.mutation.LOG_IN: login approved',state.loginStatus)
    }
    else {
      state.loginStatus = false;
      // console.log('store.mutation.LOG_IN: login incorrect',state.loginStatus )
    }
    // TBD write cookie of loged in
    //console.log('store.currUser: ', state.currUser)
  },
}

const actions = {//
  [SENDMSG](context, payload) {
        var prm = service.sendMsg(payload);
        return prm.then(res => {
          payload.res = res;
          context.commit(payload);
      });
  },
  [SENDLOCALMSG](context, payload) {
    //go directly to mutations
          context.commit(payload);
  },


}

export const userStore = {
  state,
  mutations,
  getters,
  actions
}


