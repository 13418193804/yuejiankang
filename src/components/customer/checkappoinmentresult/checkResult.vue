<template>
  <div class="content-wrapper">
    <vue-loading :size="{width: '60px', height: '60px'}" v-show="!isShowContent"></vue-loading>
    <div class="top-title" v-show="isShowContent">
       <div class="top-title-content">
         <p style="font-size:1.2rem;color:rbg(128,128,128)">检测报告</p>
       </div>
    </div>
    <div class="content-first" v-show="isShowContent">
      <p style="font-size:1.0rem;color:rbg(128,128,128)">
        {{checkResultData.all_result}}
      </p>
      <img :src="checkResultData.imgurl" class="banner-wrapper" @click="imageModel=true"></img>
    </div>
    <div class="content-second" v-show="isShowContent">
        <p>注:</p>
        <p>如需CT原⽚和诊断结果，请前往检测医院⾃取。详细⽅法请咨询值班护⼠</p>
    </div>
     <div v-if="imageModel" class="topView" @click="imageModel=false">
          <img :src="checkResultData.imgurl" style="width:100%;" ></img>
     </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import vueLoading from "@/components/widget/loading/loading";
import { XButton } from "vux";
export default {
  components: {
    XButton,
    vueLoading
  },
  data() {
    return {
      isShowContent:false,
      checkResultData:{},
      imageModel:false

    };
  },
  computed: {},
  created() {
    let that = this;
    let url = webconfig.webserverurl + "/api/order/resultDetail";
    let params = {
      order_id: this.$route.query.order_id
    };
    this.$wrapperHttp.get(this, params, url, function(data) {
      if (data) {
        that.checkResultData = data;
        that.checkResultData.imgurl = webconfig.webserverurl + '/ctimg/' + that.checkResultData.ct_image;
      }
      that.isShowContent = true;
    });
  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.top-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 25px;
}

.top-title-content {
  text-align: center;
  width: 100%;
}

.content-first {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
  flex: 1;
}

.content-second {
  padding-left: 20px;
  padding-right: 20px;
  font-size:0.9rem;
  color:#515151;
  margin-bottom: 20px;
}

.banner-wrapper {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.topView{
position: fixed;
bottom: 0;
background-color: #000;
width: 100%;
height: 100vh;
z-index:999;
display: flex;
align-items: center;
}
</style>
