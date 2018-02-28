<template>
  <div class="containe">
      <div class="content">
        <div class="info-area">
          <div class="hd" v-for="(item,index) in menuNames" @click="onClickItem(item)" :key="index">
             {{item.week_name}}
             <span class="weekend">{{item.time_area== '' ?'不可预约':item.time_area}}</span>
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
        menuNames:[],
        setup_type:1,
    };

},
created(){
      this.setup_type =  this.$AppCacheKey.getSetupPeoppleId()
      let that = this;
      let url = webconfig.webserverurl + "/api/nurse/setup_weeks";
	  let open_id = this.$cookie.get("openid");
	  let street_id = this.$AppCacheKey.getsettingStreetId();
      this.$wrapperHttp.get(this, {setup_type:this.setup_type,open_id:open_id,street_id:street_id}, url, function (data) {
        if (data) {
          that.menuNames = data;
        }
      });
    },
methods:{
    onClickItem(item){
        this.$router.replace({
             name: "chooseTime",
          query:{
          week: JSON.stringify(item)
          }
        });
    }
}
}
</script>

<style>
.content{
    height: 100%;
    width: 100%;
}
.info-area{
    height: 60px;
}
.hd{
    line-height: 60px;
    height: 60px;
    margin: 0 20px;
    font-size: 16px;
    border-bottom: 1px solid #cccccc;
}
.next{
    float: right;
    right: 22px;
    font-size: 20px;
    color: #000000;
    opacity: 0.4;
    position: absolute;
}
.am,.pm{
    font-size: 10px;
    color:#000000;
    margin-bottom: 10px;
    float: right;
    right: 55px;
    position: absolute;
}
.am{
    margin-top: -8px;
}
.pm{
    margin-top: 16px;
}
.weekend{
    font-size: 15px;
    color:#000000;
    margin-bottom: 10px;
    float: right;
    right: 55px;
    position: absolute;
}
.modal{
    height:100%;
    width:100%;
    background-color:#000;
    position: fixed;
    bottom: 0;
    background-color: #000000;
    opacity: 0.7;
}

</style>
