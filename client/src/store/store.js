
export const SND_MSG = 'SND_MSG';//
export const LOG_IN = 'LOG_IN';
export const SENDMSG = 'SENDMSG';

import service from '../services/service'


const state = {
  loginStatus: true,
  storeMsg:'first msg from store'

};

const getters = {
  fetchUsersMatched(state) {
    console.log('store.getters.USERS_MATCHED', state.usersMatched)
    return state.usersMatched;
  },
  fetchGetMsg(state) {
    console.log('store.getters.fetchGetMsg', state.storeMsg)
    return state.storeMsg;
  },

}

const mutations = {

  [SENDMSG](state, payload) {
    console.log('store.mutation.SENDMSG:' , payload)
    console.log('+++++++++++++++++++++++' )
    state.storeMsg = payload.res.txt;
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
    // console.log('store.LIKE:', payload.data)
    var prm = service.sendMsg(payload);
    return prm.then(res => {
      console.log('store.ILAN: result', res)
      payload.res = res;
      context.commit(payload);
      // context.dispatch({ type: GET_MATCHED, });
      // context.dispatch({ type: GET_BROWSED, });
    });
  },


}

export const userStore = {
  state,
  mutations,
  getters,
  actions
}


