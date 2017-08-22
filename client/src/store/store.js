
export const SND_MSG = 'SND_MSG';
export const LOG_IN = 'LOG_IN';
export const SENDMSG = 'SENDMSG';

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
  batches:[]
};

const getters = {
  fetchUsersMatched(state) {
    console.log('store.getters.USERS_MATCHED', state.usersMatched)
    return state.usersMatched;
  },
  fetchGetMsg(state) {
    return state.storeMsg;
  },
  fetchGetFacilities(state) {
    return state.facilities;
  },
  fetchGetUser(state) {
    return state.user;
  },
  fetchGetUsers(state) {
    return state.users;
  },
  fetchGetPonds(state) {
    return state.ponds;
  },
  //==================
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
  }

}

const mutations = {

  [SENDMSG](state, payload) {
    var actType = payload.msg.act.actType;
    switch (actType) {
			case 'addUser'://    
				console.log('store.SENDMSG.addUser');
        var obj1 = payload.res;
        state.user = obj1;
			break;
			case 'getList'://    
				console.log('store.SENDMSG.agetList');
        var objs = payload.res;
        var list = payload.msg.act.list
        state[list] = objs;
			break;
			case 'updateUser'://    
				console.log('store.SENDMSG.updateUser');
        var user = payload.msg.act.data;
        state.user = user;
			break;
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

  [LOG_IN](context, payload) {
    console.log('store.LOG_IN:', payload)
    var prm = service.logIn(payload);
    prm.then(res => {
      payload.user = res;
      context.commit(payload);
    })
  },
  [SENDMSG](context, payload) {
    if(payload.msg.params.askFrom === 'server'){
        var prm = service.sendMsg(payload);
        return prm.then(res => {
          payload.res = res;
          context.commit(payload);
      });
    }else{//go directly to mutations
          context.commit(payload);
    }
    
  },


}

export const userStore = {
  state,
  mutations,
  getters,
  actions
}


