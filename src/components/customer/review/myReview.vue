<template>
  <div class="content-wrapper">
    <div class="content-first">
      <div class="reviewInfo-area">
        <div><p>检测时间：{{getLocalTime(order.check_time)}}</p></div>
        <div><p>建议复查时间：{{order.advice_time}}</p></div>
        <div><p>检测结果：</p></div>
        <div>{{order.all_result }}</div>
      </div>
    </div>
    <div class="review" style="border:0px;textAlign: center;">
      <button class="review-area" @click="onClickItem">复查缴费
      </button>
    </div>
  </div>
</template>
<script>
  import webconfig from "@/common/webconfig";
  import {XButton} from "vux";
  import Notification from "@/components/widget/notification";
  import HsyDialog from "@/components/widget/dialog/Dialog";
  import vueLoading from "@/components/widget/loading/loading";

  export default {
    components: {
      XButton,
      HsyDialog
    },
    data() {
      return {
        order: {}
      }
    },
    computed: {},
    created() {


      this.order = JSON.parse(this.$route.query.order);
    },
    methods: {
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      },
      onClickItem() {
        //let order_id = this.query.order_id;
        //if(order_id){
        this.$AppCacheKey.setUserId(this.order.user_id)
        let url = "http://jiankang.aisimob.com/?order_id="+this.order.order_id+"&user_id="+this.order.user_id+"#/pay/wepayPage"
        window.location.replace(url);
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "~vux/src/styles/weui/widget/weui_cell/weui_cell_global.less";

  .content-wrapper {
    display: flex;
    background-color: whitesmoke;
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
    background-color: rgb(0, 0, 0);
    opacity: 0.8;
    text-align: center;
    padding: 35px 0 35px 0;
    color: rgb(238, 238, 238);
    font-size: 1.2rem;
  }

  .content-first {
    margin: 0px;
    width: 100%;
    height: auto;
    background-color: #ffffff;
  }

  .content-second {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .input-wrapper {
    background: #ffffff;
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
  }

  .confirm_filter .first {
    border-right: 1px solid #ccc;
  }

  .reviewInfo-area {
    margin: 50px 35px;
    line-height: 40px;
  }

  .review-area {
    border-radius: 25px;
    border: 0px;
    background-color: white;
    box-shadow: 5px 5px 3px #ccc;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    width: 250px;
    margin-top: 280px;
  }
</style>
