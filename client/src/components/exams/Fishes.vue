<template>
  <section>
        <button class="button" @click="getList('fishes',{},$event)">updateFishes</button>
    fishes.length: {{fishes.length}}
    <div class = "table flex col">
        <div class= "list-item" v-for="(fish,idx) in fishes">
            <div class="field flex row">
                <!--<div class="field flex row id"><div class="field">id:</div><div class="field">{{fish._id}}</div></div>-->
                <div class="field flex row name"><div class="field">name:</div>
                        <input disabled class="input" v-model="fish.name"></input></div>
                <div class="field flex row nameHeb"><div class="field">heb:</div>
                        <input disabled class="input" v-model="fish.nameHeb"></input></div>
                <div class="field flex row nameShort"><div class="field">short:</div>
                        <input disabled class="input" v-model="fish.nameShort"></input></div>
                <div v-if="fish.mode !='newRecord'" class="buttons-pnl">
                    <button  class="button update-btn" @click="updateInList('fishes',fish._id,$event)">update</button>
                    <button class="button save-btn" @click="deleteFromList('fishes',fish._id)">delete</button>
                    <button v-if="fish.mode==='edit'" class="button" @click="cancelAction('fishes',fish._id,$event)">cancel</button>
                    {{fish.mode}}
                </div>
                <div v-else class="buttons-pnl new-record">
                    <button class="button" @click="saveRecord('fishes',fishes[idx])">save</button>
                    <button class="button" @click="deleteFromList('fishes',fish._id)">delete</button>
                </div>
            </div>
        </div>
    </div>

    <div >{{currFish}}</div>
    <div v-if="currFish">
        <button class="button" @click="addNewLocalRecord('fishes')">add new</button>
        <button class="button" @click="submit">submit</button>
    </div>
  </section>
</template>
<script>
// require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
// import bootstrap from 'bootstrap'
// s// import 'vue-material/dist/vue-material.css'
import { TYPE_OXYGEN } from '../../constants/actTypes'
import { SENDMSG } from '../../store/store'
import moment from 'moment'
export default {
  name: 'Grading',
  data() {
    return {
      state:this.$store.getters.fetchGetState,
      ponds:this.$store.getters.fetchGetPonds,
      facilities:this.$store.getters.fetchGetFacilities,//fetchGetCurrFish
      fishes:this.$store.getters.fetchGetFishes,
      currFish:{},
      PageStatus:'init'
    }
  },
  created () {
        this.getList('fishes',{})
  },
    watch:{
      fishes1: function(newFishes){
        this.fishes = this.$store.getters.fetchGetFishes;
      },
    },
    computed: {
        fishes1() {return this.$store.getters.fetchGetFishes;},
    },
  methods: {//
      saveRecord(list,obj,e){
            delete obj.mode;
            const acts =[
                    { actType: 'addToList', data: obj, list,askFrom:'server' },
                    { actType: 'getList', list, criteria:{},askFrom:'server' }
                        ]
            this.sendMsg( {acts});
      },
      addNewLocalRecord(arr){
        var obj = {mode:'newRecord',mode :'edit'}
        this.fishes.push(obj);
        var that = this;
        setTimeout(function() {
                var elList= document.getElementsByClassName("list-item");//save-btn
                var parentEl = elList[elList.length-1]
                var buttonEl= parentEl.getElementsByClassName("update-btn")[0];//save-btn
                    buttonEl.innerText = 'save';
                var inputNodes = parentEl.getElementsByTagName('INPUT');//
                that.toggleDisable(inputNodes,false)
        }, 3);


      },
      getList(list,criteria){
            const acts =[{ actType: 'getList', list:list, criteria:{} }];
            this.sendMsg({acts});
      },
      setCurrFish(){
            this.currFish = {_id:null,name:'',nameHeb:'',nameShort:''}
      },
    getObjById(objId,arr) {
        var arr1 = this[arr];
        var obj = arr.find(function (obj1) {
            return (objId === obj1._id)
        })
        return obj
    },
      deleteFromList(list,id,e){
            const acts =[
                            { actType: 'deleteFromList', objId:id, list},
                            { actType: 'getList', list:list, criteria:{} }
                        ]
            this.sendMsg({acts});
      },
    updateInList(list,objId,e){
        var parentEl= e.path[2];//update-btn
        var buttonEl= e.path[0];
        var inputNodes = parentEl.getElementsByTagName('INPUT');//
        var obj = this.getObjById(objId,this.fishes);
        (parentEl.classList.contains('updateMode')) ? this.saveRecord(parentEl,inputNodes,buttonEl,list,obj,e): this.updateMode(parentEl,inputNodes,buttonEl,list,obj,e)

      },
      toggleDisable(inputNodes,bul){
            for (var i = 0; i < inputNodes.length; i++) {
                inputNodes[i].disabled = bul;
            }
      },
      cancelAction(list,objId,e){
        var parentEl= e.path[2];
            parentEl.classList.remove('updateMode');
        var buttonEl= parentEl.getElementsByClassName("update-btn")[0];//save-btn
            buttonEl.innerText = 'update';
        var inputNodes = parentEl.getElementsByTagName('INPUT');//
            this.toggleDisable(inputNodes,true);
            var obj = this.getObjById(objId,this.fishes);
            obj.mode = false
            delete obj.mode;

      },
      saveRecord(parentEl,inputNodes,buttonEl,list,obj,e){
        var newObj = this.getObjById(obj._id,this.fishes);
        delete newObj.mode;
       var id =  obj._id;
        const acts =[
                        { actType: 'updateInList', list,id,newObj },
                        { actType: 'getList', list, criteria:{}}
                    ]
        this.sendMsg({acts});
        this.cancelAction(list,obj._id,e)
//==============================

      },
      updateMode(parentEl,inputNodes,buttonEl,list,obj,e){
        for (var i = 0; i < inputNodes.length; i++) {
               inputNodes[i].disabled = false;
        }
        parentEl.classList.add('updateMode');
        buttonEl.innerText = 'save';
        obj.mode = 'edit';
      },
    submit(e){
        // var actType = (typeof(this.currFish._id== 'undefined'))?'addToList': 'updateInList' ;
        // const act = { actType: actType, data: this.currFish, collection: 'fishes' };
        // const params = { event:e,askFrom:'server',getListBack:true};
        //   this.sendMsg({ act,params});
        //  this.currFish = this.setCurrFish;
      },
    sendMsg(msg){
          this.$store.dispatch({ type: SENDMSG, msg })
    },
    sendLocalMsg(msg){//msgs to the store
          this.$store.dispatch({ type: SENDLOCALMSG, msg })
    },
  },
}
</script>
<style scoped>
.table{
    width:90%;
    margin:auto;
}
.flex{
  display: flex;
}
.row{
  flex-direction: row;
}
.col{
  flex-direction: column;
}
.field{
    margin:.3em;
    border:1px solid green;
}
.button{
    height:80%;
    vertical-align: middle;
}
.new-record{
    background-color: gray;
}
.buttons-pnl{
    /*min-height:50%;
    max-height:50%;*/
    border:1px solid green;
}
input{
    width:100%;
}
.name,.nameHeb{
    width: 10em;
}
.id{
    width: 10em;
}
.nameShort{
    width: 8em;
}
</style>
