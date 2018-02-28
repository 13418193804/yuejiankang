<template>
  <div class="yuexiu">
      <div class="content_yuexiu">
        <div class="info-area">
          <div class="hd" @click="onClickItem(item)" v-for="(item,index) in menuNames" :key="index">
             {{item.street_name}}居民预约时间设置
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
        menuNames: [],
    }
},
created(){
      let that = this;
      let url = webconfig.webserverurl + "/api/street/index";
      this.$wrapperHttp.get(this, {}, url, function (data) {
        if (data) {
          that.menuNames = data;
        }
      });
    },
methods:{
    onClickItem(item){
      this.$AppCacheKey.setsettingStreetId(item.street_id);
        this.$router.push({
             name: "bookTime"
          });
    }
}
}
</script>

<style>
.content_yuexiu{
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
.content_yuexiu label{
    float: right;
    right: 22px;
    font-size: 20px;
    color: #000000;
    opacity: 0.4;
    position: absolute;
}
</style>
