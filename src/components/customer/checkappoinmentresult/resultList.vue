<template>
  <div class="content-wrapper">
    <notification :options.sync="options" :show.sync="showNotification" @close="closeNotification"></notification>
    <vue-loading :size="{width: '60px', height: '60px'}" v-show="!isShowContent"></vue-loading>
    <div v-show="isShowContent&&showNoResult" class="top-title">
      <div class="top-title-content">
         <img src="../../../common/image/icon_no_result.png" width="80px" height="80px"></img>
         <p style="font-size: 1.2rem">您还未有筛查记录</p>
       </div>
    </div>
    <div class="list-wrapper" v-show="isShowContent && !showNoResult">
    <div v-for="(order,index) in orderInfos"
          @click="onItemClick(order)" :key="index">
      <div class="weui-panel item-wrapper" style="margin: 8px 5px;">
            <div class="weui-cell">
              <div class="weui-cell__bd" style="color:#515151">
                 检测时间：{{order.showTime}}
                <span style="float: right;" :style="textColor(order.order_status)"> {{order.order_status==3?'结果已出':'等待结果'}}</span>
              </div>
            </div>
            <div class="weui-cell" style=" padding: 5px 15px;">
              <div class="weui-cell__bd" style="color:#515151">
                 {{order.name}}
              </div>
              <div class="weui-cell__ft" style="padding: 5px" @click.stop="doReview(order)">
                    <button v-if="(order.advice_time!== '无' || !order.advice_time ) && ($cookie.get('openid') == 'opoj20kMSZogWTFg7gSE0VQIyx8E'|| $cookie.get('openid') == 'opoj20mqSRqwo-uF1bDmyAvn6HAw')" style="background-color: #71a0d1;color: #fff;
                    border:1px solid #e5e5e5;padding: 5px 10px;border-radius: 3px"  >复查</button>

              </div>
            </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import vueLoading from "@/components/widget/loading/loading";
import Notification from "@/components/widget/notification";
import webconfig from "@/common/webconfig";
import { XButton, dateFormat } from "vux";
export default {
  name: "screenList",
  components: {
    XButton,
    vueLoading,
    Notification
  },
  data() {
    return {
      showNotification: false,
      options: {},
      isShowContent: true,
      orderInfos: [],
      showNoResult: false
    };
  },
  computed: {},
  created() {
    let that = this;
    let url = webconfig.webserverurl + "/api/order/resultList";
    let params = {
      open_id: this.$cookie.get("openid")
      // open_id:'opoj20uWCO6q9jwU-bLi7KjN-YGo'
    };
    // alert(params.open_id === 'opoj20kMSZogWTFg7gSE0VQIyx8E')
    // if(params.open_id == 'opoj20kMSZogWTFg7gSE0VQIyx8E'|| params.open_id == 'opoj20mqSRqwo-uF1bDmyAvn6HAw'){
    //   params.open_id = 'opoj20hBJwjcnaplIqkWpIJ7P4PY'
    // }
    this.$wrapperHttp.get(this, params, url, function(data) {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          console.log(Date(parseInt(data[i].check_time)));
          data[i].showTime = dateFormat(
            new Date(parseInt(data[i].check_time) * 1000),
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        that.orderInfos = data;
        if (that.orderInfos.length <= 0) {
          that.showNoResult = true;
        }
      } else {
        that.orderInfos = [];
      }
      that.isShowContent = true;
    });
  },
  methods: {
    doReview(order){
        this.$router.push({name:'myReview',query:{
            order: JSON.stringify(order)
          }})
    },
    closeNotification() {
      this.showNotification = false;
    },
    textColor(order_status) {
      const style = {};
      if (order_status == 3) {
        style.color = "#71a0d1";
      } else {
        style.color = "#cccccc";
      }
      return style;
    },
    onItemClick(order) {
      console.log(order);
      if (order.order_status == 3) {
        if (!order.order_id) {
          this.showNotification = true;
          this.options = {
            autoClose: true,
            backgroundColor: "#fc5050",
            content: "参数有问题",
            showTime: 1000
          };
          return;
        }
        let params = {};
        params.order_id = order.order_id;
        this.$router.push({
          name: "checkResult",
          query: params
        });
      } else {
        this.$router.push({
          name: "noResult"
        });
      }
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
  border-radius: 20px 20px;
  border: 1px solid #cccccc;
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
