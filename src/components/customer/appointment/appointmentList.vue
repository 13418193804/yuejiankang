<template>
  <div class="content-wrapper">
    <vue-loading :size="{width: '60px', height: '60px'}" v-show="!isShowContent"></vue-loading>
    <div v-show="isShowContent&&showNoResult" class="top-title">
      <div class="top-title-content">
         <img src="../../../common/image/icon_no_result.png" width="80px" height="80px"></img>
         <p style="font-size: 1.2rem">您尚未参加本次活动请在报名预约后进⾏查看</p>
       </div>
    </div>
    <div class="list-wrapper" v-show="isShowContent&&!showNoResult">
    <div v-for="(order,index) in orderInfos"
         :key="index">
      <div class="weui-panel item-wrapper" style="margin: 8px 5px;">
            <div @click="onItemClick(order)" class="weui-cell" style="background-color:#71a0d1">
              <div class="weui-cell__bd" style="font-size:0.7rem;color:#ffffff">
                 订单编号：{{order.order_id}}
              </div>
              <div class="weui-cell__ft" style="font-size:0.7rem;color:#ffffff">
                {{order.create_time}}
              </div>
            </div>
            <div @click="onItemClick(order)" class="item-middle">
               <div class="item-middle-left">
                  <img :src="order.imgurl" width="30px" height="30px"></img>
                  <p style="font-size:0.7rem;color:#71a0d1">{{order.service_name}}</p>
               </div>
               <div>
                  <p style="font-size:1.1rem">【爱肺计划】螺旋CT检测一次</p>
               </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd"/>
              <div class="weui-cell__ft">
                 <span style="font-size:0.5rem" v-show="order.isShowText">请先填写自测问卷</span>
                 <span class="custom-primary-mini-button" @click="onAsk(order)" v-show="order.isShowAsk">测问卷</span>
                 <span class="custom-primary-mini-button" @click="onButtonClick(order)" v-show="(order.service_status==0||order.service_status==4)&&order.isClickable">{{order.service_status==0?'在线预约':'重新预约'}}</span>
              </div>
            </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import vueLoading from "@/components/widget/loading/loading";
import webconfig from "@/common/webconfig";
import { XButton, dateFormat } from "vux";
export default {
  name: "screenList",
  components: {
    XButton,
    vueLoading
  },
  data() {
    return {
      isShowContent: false,
      orderInfos: [],
      showNoResult: false
    };
  },
  computed: {},
  created() {
    let that = this;
    let url = webconfig.webserverurl + "/api/order/index";
    let params = {
      open_id: this.$cookie.get("openid")
      // open_id:'opoj20kMSZogWTFg7gSE0VQIyx8E'
    };
    this.$wrapperHttp.get(this, params, url, function(data) {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          var order = data[i];
          if (!order.user_type_id || order.user_type_id == 1) {
            order.isShowText = false;
            order.isClickable = true;
            if (!order.ask && order.user_id!=0) {
              order.isShowAsk = true;
            } else {
              order.isShowAsk = false;
            }
            if (order.service_status == 0) {
              order.service_name = "可预约";
              order.imgurl = require("../../../common/image/icon_keyuyue.png");
            } else if (order.service_status == 1) {
              order.service_name = "已预约";
              order.imgurl = require("../../../common/image/icon_yiyuyue.png");
            } else if (order.service_status == 2) {
              order.service_name = "等待结果";
              order.imgurl = require("../../../common/image/icon_dengdaijieguo.png");
            } else if (order.service_status == 3) {
              order.service_name = "已完成";
              order.imgurl = require("../../../common/image/icon_yiwancheng.png");
            } else if (order.service_status == 4) {
              order.service_name = "已取消";
              order.imgurl = require("../../../common/image/icon_chaoshiquxiao.png");
            }
          } else if (order.user_type_id == 2 || order.user_type_id == 3) {
            order.isClickable = true;
            if (order.service_status == 0) {
              if (!order.ask) {
                order.isShowText = true;
                order.isShowAsk = true;
                order.isClickable = false;
              } else {
                order.isShowText = false;
                order.isShowAsk = false;
                order.isClickable = true;
              }
              order.service_name = "可预约";
              order.imgurl = require("../../../common/image/icon_keyuyue.png");
            } else if (order.service_status == 1) {
              order.service_name = "已预约";
              order.imgurl = require("../../../common/image/icon_yiyuyue.png");
            } else if (order.service_status == 2) {
              order.service_name = "等待结果";
              order.imgurl = require("../../../common/image/icon_dengdaijieguo.png");
            } else if (order.service_status == 3) {
              order.service_name = "已完成";
              order.imgurl = require("../../../common/image/icon_yiwancheng.png");
            } else if (order.service_status == 4) {
              order.service_name = "已取消";
              order.imgurl = require("../../../common/image/icon_chaoshiquxiao.png");
            }
          } else if (order.user_type_id == 4) {
            order.isShowText = false;
            order.isClickable = true;
            if (order.service_status == 0) {
              order.service_name = "可预约";
              order.imgurl = require("../../../common/image/icon_keyuyue.png");
            } else if (order.service_status == 1) {
              order.service_name = "已预约";
              order.imgurl = require("../../../common/image/icon_yiyuyue.png");
            } else if (order.service_status == 2) {
              order.service_name = "等待结果";
              order.imgurl = require("../../../common/image/icon_dengdaijieguo.png");
            } else if (order.service_status == 3) {
              order.service_name = "已完成";
              order.imgurl = require("../../../common/image/icon_yiwancheng.png");
            } else if (order.service_status == 4) {
              order.service_name = "已取消";
              order.isClickable = false;
              order.imgurl = require("../../../common/image/icon_chaoshiquxiao.png");
            }
          }
        }
        that.orderInfos = data;
        if (that.orderInfos.length <= 0) {
          that.showNoResult = true;
        }
      } else {
        that.orderInfos = [];
        that.showNoResult = true;
      }
      that.isShowContent = true;
    });
  },
  methods: {
    onItemClick(order) {
        if (order.service_status == 1 || order.service_status == 4) {
        let params = {};
        params.order_id = order.order_id;
        params.user_id = order.user_id;
        this.$router.push({
          name: "appointmentCheck",
          query: params
        });
        }
    },
    onButtonClick(order) {
      if (order.service_status == 0 || order.service_status == 4) {
        let params = {};
        if (order.user_id && order.user_id != 0) {
          params.order_id = order.order_id;
          params.user_id = order.user_id;
          this.$router.push({
            name: "appointmentChooseHospital",
            query: params
          });
        } else {
          params.order_id = order.order_id;
          this.$router.push({
            name: "startSignupWriteUserInfo",
            query: params
          });
        }
      }
    },
    onAsk(order) {
      // window.location.href='http://localhost:8085/'+ '/wenquan/ask.html?order_id=' + order.order_id;

      window.location.href=webconfig.domain + '/wenquan/ask.html?order_id=' + order.order_id;
    }
  }
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/weui/widget/weui_cell/weui_cell_global.less";
@import "~vux/src/styles/weui/widget/weui_panel/weui_panel.less";
.content-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
}

.list-wrapper {
  overflow: scroll;
  flex: 1;
}

.item-wrapper {
  border-radius: 25px 25px;
  border: 1px solid #cccccc;
}

.item-middle {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 10px 0;
}

.item-middle-left {
  text-align: center;
  margin-right: 15px;
}

.weui-cell::before {
  left: 0;
}

.top-title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.top-title-content {
  text-align: center;
}
</style>
