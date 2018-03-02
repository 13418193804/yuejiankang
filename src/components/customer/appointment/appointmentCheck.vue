<template>
  <div class="content-wrapper">
    <vue-loading :size="{width: '60px', height: '60px'}" v-show="!isShowContent"></vue-loading>
    <hsy-dialog class="confirm" v-model="showDialog">
      <div slot="body">
        <div style="padding:10px;max-height:100px;line-height:20px">确定要取消预约吗？</div>
        <div class="confirm_filter">
            <span class="filter_button_style first" @click="handleNo()">再想想</span>
            <span class="filter_button_style" @click="handleYes()">确定</span>
        </div>
      </div>
    </hsy-dialog>
    <notification :options.sync="options" :show.sync="showNotification" @close="closeNotification"></notification>
    <div v-show="isShowContent" class="weui-panel item-wrapper" style="margin-bottom: 5px;">
        <div class="weui-cell" style="background-color:#71a0d1">
              <div class="weui-cell__bd" style="font-size:0.7rem;color:#ffffff">
                 订单编号：{{appointmentDetail.order_id}}
              </div>
              <div class="weui-cell__ft" style="font-size:0.7rem;color:#ffffff">
                {{appointmentDetail.create_time}}
              </div>
        </div>
        <div class="item-middle">
               <div class="item-middle-left">
                  <img :src="appointmentDetail.imgurl" width="30px" height="30px"></img>
                  <p style="font-size:0.7rem;color:#71a0d1">{{appointmentDetail.service_name}}</p>
               </div>
               <div>
                  <p style="font-size:1.0rem">【爱肺计划】螺旋CT检测一次</p>
               </div>
      </div>
       <div class="weui-cell">
              <div class="weui-cell__bd">
                 预约号
              </div>
              <div class="weui-cell__ft">
               {{appointmentDetail.order_no}}
              </div>
        </div>
        <div class="weui-cell">
              <div class="weui-cell__bd">
                 预约人
              </div>
              <div class="weui-cell__ft">
               {{appointmentDetail.name}}
              </div>
        </div>
        <div class="weui-cell">
              <div class="weui-cell__bd">
                 身份证号
              </div>
              <div class="weui-cell__ft">
                {{appointmentDetail.code}}
              </div>
        </div>
        <div class="weui-cell">
              <div class="weui-cell__bd">
                手机号码
              </div>
              <div class="weui-cell__ft">
                 {{appointmentDetail.mobile}}
              </div>
        </div>



        <div v-if="appointmentDetail.service_name !='已取消'">
          <div class="weui-cell">
              <div class="weui-cell__bd">
                 就诊地点
              </div>
              <div class="weui-cell__ft" style="color:#71a0d1" @click="showMap()">
                科室地图
              </div>
          </div>
          <p style="padding:0 0 15px 15px">{{appointmentDetail.hospital_name + '  ' + appointmentDetail.address}}</p>
        </div>


      </div>
     <div v-show="isShowContent" class="button-wrapper">
       <div style="width:100%;padding:20px;margin-bottom: 20px;">
         <x-button :text="uploadstatus" v-show="inUploading!=-1" @click.native="inUploading===1 && cancelSignUp()" type="primary" :showLoading="inUploading===2" class="custom-primary-button">
         </x-button>
         <x-button v-show="appointmentDetail.user_type_id==1" text="取消报名" class="custom-primary-button" @click.native="cancel()">
         </x-button>
       </div>
     </div>
    <popup v-model="showImg" :show-mask="true" position="bottom">
      <div>
        <img :src="appointmentDetail.hospital_map" class="banner-wrapper"></img>
      </div>
    </popup>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import vueLoading from "@/components/widget/loading/loading";
import HsyDialog from "@/components/widget/dialog/Dialog";
import Notification from "@/components/widget/notification";
import { XButton ,Popup} from "vux";
export default {
  components: {
    XButton,
    vueLoading,
    HsyDialog,
    Notification,
    Popup
  },
  data() {
    return {
      showImg:false,
      showDialog: false,
      appointmentDetail:{},
      isShowContent:false,
      inUploading: 1,
      showNotification: false,
      options:{}
    };
  },
  computed: {
    uploadstatus() {
      if (this.inUploading === 1) return "取消预约";
      else if (this.inUploading === 2) return "取消中";
      else if (this.inUploading === 3) return "取消预约成功";
      else if (this.inUploading === 4) return "已取消预约";
    }
  },
  created() {
    let that = this;
    let url = webconfig.webserverurl + "/api/order/detail";
    let params = {
      order_id: this.$route.query.order_id
    };
    this.$wrapperHttp.get(this, params, url, function(data) {
      if (data) {
        that.appointmentDetail = data;
        that.appointmentDetail.hospital_map = 'http://' + that.appointmentDetail.hospital_map;
         if (that.appointmentDetail.service_status == 0) {
              that.appointmentDetail.service_name = "可预约";
              that.inUploading = -1;
              that.appointmentDetail.imgurl = require("../../../common/image/icon_keyuyue.png");
            } else if (that.appointmentDetail.service_status == 1) {
              that.appointmentDetail.service_name = "已预约";
              that.appointmentDetail.imgurl = require("../../../common/image/icon_yiyuyue.png");
              that.inUploading = 1;
           } else if (that.appointmentDetail.service_status == 2) {
              that.appointmentDetail.service_name = "等待结果";
              that.appointmentDetail.imgurl = require("../../../common/image/icon_dengdaijieguo.png");
              that.inUploading = -1;
            } else if (that.appointmentDetail.service_status == 3) {
              that.appointmentDetail.service_name = "已完成";
              that.appointmentDetail.imgurl = require("../../../common/image/icon_yiwancheng.png");
              that.inUploading = -1;
            } else if (that.appointmentDetail.service_status == 4) {
              that.appointmentDetail.service_name = "已取消";
              that.appointmentDetail.imgurl = require("../../../common/image/icon_chaoshiquxiao.png");
              that.inUploading = -1;
            }
      }
      that.isShowContent = true;
    });
  },
  methods: {
    showMap(){
      this.showImg = !this.showImg;
    },
    closeNotification() {
      this.showNotification = false;
    },
    cancelSignUp() {
       this.showDialog = true;
    },
    cancel() {
      this.showNotification = true;
      this.options = {
          autoClose: true,
          content: "请致电客服取消检测",
          backgroundColor: "rgb(71,160,209)",
          showTime: 3000
      };
    },
    handleNo(){
       this.showDialog = false;
    },
    handleYes(){
      this.showDialog = false;
      this.inUploading = 2;
      let url = webconfig.webserverurl + "/api/order/cancel";
      let that = this;
      let userdata =
        "order_id=" +
       this.$route.query.order_id;
       console.log(userdata);
        this.$wrapperHttp.post(this, userdata, url, function(data) {
        if (data) {
          if(that.$route.query.user_id)
            that.$router.go(-1);
          else{
            that.inUploading = 3;
          }
        } else {
          that.inUploading = 1;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/weui/widget/weui_cell/weui_cell_global.less";
@import "~vux/src/styles/weui/widget/weui_panel/weui_panel.less";

.content-wrapper{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.content-second {
  flex: 1;
  margin-top: 5px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.item-wrapper{
  border-radius:25px;
  margin-left: 8px;
  margin-right: 8px;
}

.item-middle{
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 10px 0;
}

.item-middle-left{
  text-align: center;
  margin-right: 15px;
}

.weui-cell::before{
  left: 0;
}

.confirm_filter {
  display: flex;
  width: 100%;
  border-top: 1px solid #ccc;
}

.confirm_filter .filter_button_style {
  width: 50%;
  text-align: center;
  padding: 0.8rem;
  color: rgb(71, 160, 209);
}

.confirm_filter .filter_button_style.first {
  border-right: 1px solid #ccc;
  color: #999999;
}


.banner-wrapper {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

</style>
