<template>
  <div class="content-wrapper">
    <div class="top-title">
      <div class="top-title-content">
         <img src="../../../common/image/icon_check.png" width="60px" height="60px"></img>
         <p style="font-size:2rem;color:#ffffff">预约成功</p>
       </div>
    </div>
    <div class="content-first">
      <p style="font-size: 20px;padding:0 15px 0 15px">请确认预约信息</p>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
           <label class="weui-form-preview__label" style="color:#000000">预约号</label>
           <span class="weui-form-preview__value">{{orderInfo.order_no}}</span>
        </div>
         <div class="weui-form-preview__item">
           <label class="weui-form-preview__label" style="color:#000000">预约人</label>
           <span class="weui-form-preview__value">{{orderInfo.name}}</span>
        </div>
         <div class="weui-form-preview__item">
           <label class="weui-form-preview__label" style="color:#000000">预约时间</label>
           <span class="weui-form-preview__value">{{orderInfo.prepare_day + '  ' + orderInfo.start_time + '-' + orderInfo.end_time}}</span>
        </div>
        <div class="weui-form-preview__item">
           <label class="weui-form-preview__label" style="color:#000000">预约地点</label>
           <span class="weui-form-preview__value">{{orderInfo.hospital_name + '  ' + orderInfo.address}}</span>
        </div>
      </div>
    </div>
    <div class="content-second">
        <p>温馨提示：</p>
        <p>1.到达医院后请出示<span style="color:#71a0d1">身份证</span>给值班护士进行签到;</p>
        <p>2.您可在公众号“肺癌早筛-我的预约”中查看、取消预约;</p>
        <p><span style="color:#71a0d1">3.请填写⾃检问卷，辅助医⽣得出准确诊断结果。未填写问卷将⽆法查看诊断结果;</span></p>   
        <p>4.请安排好时间以保证检查的顺利进⾏，如需改期，请取消该预约后重新进⾏预约;</p>
        <p>5.检查前需摘除⾝上的⾦属物品;</p>  
    </div>
    <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-wrapper">
      <x-button :text='textstatus' class="custom-primary-button" 
       @click.native="(orderInfo.user_type_id==1 ||orderInfo.user_type_id ==2 )?writeWenQuan():closeWindow()">
      </x-button>

      <!-- <x-button text='填写自测问卷' class="custom-primary-button" 
        @click.native="writeWenQuan()">
      </x-button> -->
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import { XButton } from "vux";
export default {
  components: {
    XButton
  },
  data() {
    return {
      orderInfo:this.$route.query,
     // userType:this.$AppCacheKey.getPeopleType()
    };
  },
  computed: {
    textstatus() {
      if (this.orderInfo.user_type_id == 1 || this.orderInfo.user_type_id == 2) 
         return "填写自测问卷";
      else  
         return "关闭";
    }
  },
  created() {
     this.getJsApiList();
     this.$wechatHelper.getSendAppointmentSucceedNew(this);
  },
  methods: {
    writeWenQuan(){
      var dataparam = '?order_id='+ orderInfo.order_id +'&user_id=' + orderInfo.user_id;
      window.location.href='http://jiankang.aisimob.com/wenquan/ask.html' + dataparam;
    },
    closeWindow(){
       this.$wechat.closeWindow();
    },
    getJsApiList() {
      let that = this;
      this.$wechatHelper.getJsApiList(this, function(data) {
         
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/weui/widget/weui_cell/weui_cell_global.less";
@import '~vux/src/styles/weui/widget/weui_cell/weui_form/weui-form-preview.less';
@import '~vux/src/styles/weui/widget/weui_cell/weui_form.less';
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
.banner-wrapper {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.top-title {
  background-color: rgb(71,160,209);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.top-title-content {
  text-align: center;
}

.content-first {
  padding: 10px;
  background: #ffffff;
}
.content-second {
  padding: 20px;
  flex: 1;
  color:#999999;
}

.content-second p {
  font-size: 13px;
}

.input-wrapper {
  background: #ffffff;
}
</style>
