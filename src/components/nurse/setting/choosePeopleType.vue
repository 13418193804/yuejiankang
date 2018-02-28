<template>
  <div class="main">
      <div class="content">
        <div class="info-area">
          <div class="hd" @click="onItemClick(item.id,index)" v-for="(item,index) in peopleType" :key="index">
             {{item.name}}
              <i class="iconfont icon-more" style=" float: right;right: 22px;marginTop:20px;position: absolute;"></i>
          </div>
      </div>
      </div>
  </div>
</template>

<script>
import webconfig from "@/common/webconfig";
export default {
data(){
    return{
        peopleType:[]
    };
},
created(){
      let that = this;
      let url = webconfig.webserverurl + "/api/nurse/setup_types";
      this.$wrapperHttp.get(this, {}, url, function (data) {
        if (data) {
          that.peopleType = data;
        }
      });
    },
methods:{
    onItemClick(id, index) {
      this.$AppCacheKey.setSetupPeoppleId(id);
      let params = {};
      params.id = id;

        if(this.$AppCacheKey.getSetupPeoppleId() == 3){
        this.$router.push({
            name: "yuexiuBooktime",
            query: params
          });
        }
       else{
          this.$AppCacheKey.setsettingStreetId('');
        this.$router.push({
             name: "bookTime",
             query: params
         });
       }
}
//       switch(index){
//         case 0:
//          this.$router.push({
//             name: "bookTime"
//          });
//          break;
//         case 1:
//          this.$router.push({
//             name: "bookTime"
//          });
//          break;
//         case 2:
//          this.$router.push({
//             name: "yuexiuBooktime"
//          });
//          break;
//         case 3:
//          this.$router.push({
//            //updata
//            name:'bookTime'
          //   name: "startSignupWriteUserInfoDibao"
 //         });
 //         break;
 //      }

}
}
</script>

<style>
.main{
    height: 100%;
    width: 100%;
    position: fixed;


}
.info-area{
    height: 60px;
    width:100%;
}
.hd{
    line-height: 60px;
    height: 60px;
    margin: 0 20px;
    font-size: 16px;
    border-bottom: 1px solid #cccccc;
}
.content label{
    float: right;
    right: 22px;
    font-size: 20px;
    color: #000000;
    opacity: 0.4;
    position: absolute;
}
</style>
