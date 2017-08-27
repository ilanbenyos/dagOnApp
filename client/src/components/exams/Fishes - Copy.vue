<template>
  <section class= "section">
    <div class = "container flex col center-hor">
        <div  class= "list-item outline1" v-for="(fish,idx) in fishes">
            <div v-if="idx === 0" class= "header self-al-start outline1 field flex row field-line" >
                <div class="field header name hide1">Name:</div>
                <div class="field nameHeb hide1">Heb</div>
                <div class="field nameShort hide1">Short</div>
            </div>
            <div class="field flex row col1 ">
                <div class="field-line flex col1 eeeee ">
                    <div class="field flex col ">
                            <div class="field header show1">Name:</div>
                            <b-form-input disabled class="input name" v-model="fish.name"></b-form-input></div>
                    <div class="field flex col ">
                            <div class="field header show1">שם עברי:</div>
                            <b-form-input disabled class="input nameHeb" v-model="fish.nameHeb"></b-form-input></div>
                    <div class="field flex col ">
                            <div class="field header show1">short:</div>
                            <b-form-input disabled class="input nameShort" v-model="fish.nameShort"></b-form-input></div>
                </div>
                <div v-show="PageEdit" class="buttons-pnl">
                        <b-button variant='primary'  
                            @click="updateSaveRecord('fishes',fishes[idx],$event)">
                            <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="backup">
                                    <i v-if="fish.mode === 'edit'" class="material-icons">backup</i>
                                    <i v-else                      class="material-icons">mode_edit</i>
                            </b-tooltip>
                        </b-button>
                        
                        <b-button variant='danger'  
                                    @click="deleteFromList('fishes',fish._id,$event)">
                                <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="delete">
                                    <i class="material-icons">delete_forever</i>
                                </b-tooltip>
                        </b-button>
                        
                        <b-button variant='warning'  v-bind:class="{ opacity8: fish.mode !='edit' }" :disabled = "fish.mode !='edit'"
                            @click="cancelEditing($event,fish)">
                            <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="undo">
                                <i class="material-icons">undo</i>
                            </b-tooltip>
                        </b-button>
                </div>
            </div>
        </div>
    </div>
    <div  class="buttons-pnl margin-top-1 flex row center-hor">
                <b-button variant='primary' @click="addNewLocalRecord('fishes')" 
                    v-bind:class="{ opacity8: pageEdit=== false }" :disabled = "pageEdit ===false">
                    <b-tooltip :delay="tooltipDelay" content="add new record">
                        <i class="material-icons">add_box</i>
                    </b-tooltip>
                </b-button>
            <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="save all">
                <b-button  size="lg" variant='primary' @click="saveAll(fishes,'fishes')">save all</b-button>
            </b-tooltip>
            
            <b-button variant='primary' @click="getList('fishes',{},$event)">
                <b-tooltip :delay="tooltipDelay" content="refresh list">
                        <i class="material-icons">refresh</i>
                </b-tooltip>
            </b-button>
            <b-button variant='primary' class="margin-sides1" @click="PageEdit= !PageEdit">
                <b-tooltip :delay="tooltipDelay" content="edit page">
                        <i class="material-icons">mode_edit</i>
                </b-tooltip>
            </b-button>
        <!--</b-button-group>-->
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
      pageMode:'readOnly',
      PageEdit:false,
      tooltipDelay:700
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
        toggleField(e,bul){
            var parent = e.path[5];
            var inputNodes = parent.getElementsByTagName('input');
            this.toggleDisable(inputNodes,bul)
        },
      saveAll(list,listName){
        for (var i = 0; i < list.length; i++) {
            list[i].mode = 'saved';
            const acts =[
                    { actType: 'updateInList', newObj: list[i], list:listName,askFrom:'server' },
                        ]
            this.sendMsg( {acts});
        }                   
      },
      updateSaveRecord(list,obj,e){
          var bul = true;
          if (obj.mode!='edit'){  
            obj.mode = 'edit';
            bul = false;

          }else{
            this.saveRecord(list,obj,e)
          }
          this.toggleField(e,bul);
      },
      saveRecord(list,newObj,e){
            newObj.mode = 'saved';
            const acts =[]
            if(newObj._id){
                acts.push({ actType: 'updateInList', newObj, list,askFrom:'server' })
            }else{
                    acts.push({ actType: 'addToList', newObj, list,askFrom:'server' })
            }
                acts.push({ actType: 'getList', list, criteria:{},askFrom:'server' })
                this.sendMsg( {acts});
      },
      addNewLocalRecord(arr){
        var obj = {mode :'edit'}
        var arr = this.fishes;
        arr.splice(arr.length,0,obj);//list-item
        var that = this
        setTimeout(function() {
            var items = document.getElementsByClassName('list-item');
            var parent = items[items.length-1];
            var inputNodes = parent.getElementsByTagName('INPUT');;
            that.toggleDisable(inputNodes,false)
            that.closeModal()
        }, 20);

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
      cancelEditing(e,obj){
        obj.mode = 'saved';
        this.toggleField(e,true)
      },
      updateMode(parentEl,inputNodes,buttonEl,list,obj,e){
        for (var i = 0; i < inputNodes.length; i++) {
               inputNodes[i].disabled = false;
        }
        parentEl.classList.add('updateMode');
        buttonEl.innerText = 'save';
        obj.mode = 'edit';
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
.section{
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.container{
    width: calc(100% + 25px);
    height: calc(100% - 170px);
    overflow-y: scroll;
    padding-right: 27px;
    /*height: calc(100vh - 10em);*/
   /*background-color: yellow;*/
    border:1px solid green;
}
.scroller{
}
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
    font-size:1em;
}
.field-line{
    /*flex-wrap: wrap;*/
    max-width:100%;
}
.list-item{
    width:100%;
    margin-bottom:1em;
}
.button{
    height:80%;
    vertical-align: middle;
}
.buttons-pnl{
    /*min-height:50%;
    max-height:50%;*/
    /*border:1px solid green;*/
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
.outline1{
    border:1px solid gray;
}
.center-hor{
    align-items: center;
    justify-content:center;
}
.margin-top-1{
    margin-top:10px;
}
.margin-sides1{
    margin-right:10px;
    margin-left:10px;
}
.self-al-start{
    align-self: flex-start;
}
.wrap{
    flex-wrap: wrap;
}
.header{
    color:black;
    font-weight: bold;
    
}
.input {
    font-size:1em;
}
.show1{
        display:none;
}
.hide1{
        display:block;
}
.opacity8{
    opacity:.5;
}
.btn{
    transition: 0.5s all;
}
@media screen and (max-width: 650px) {
    .field{
        /*background-color: lightgoldenrodyellow;*/
        width:98%;
    }
    .input{
        width:98%;
    }
    .show1{
            display:block;
        }
    .hide1{
            display:none;
    }
        .col1{
            flex-direction: column;
        }
    
}
*{
    /*border:1px solid green;*/
}
</style>
