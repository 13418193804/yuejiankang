<template>
  <div class="content-wrapper">
    <div class="top-title">
      <div class="top-title-content">
        <img src="../../common/image/warn.png" width="100px" height="100px"></img>
        <p style="font-size:1.8rem;color:#F43530">特别注意</p>
        <p style="font-size:1.3rem;color:#F43530">孕期与计划怀孕者不得参加低剂量螺旋CT检查{{order_id?'(复查)':''}}</p>
        <!--<p style="font-size:1.3rem;color:#F43530">本平台缴费，CT检查医院不出具发票</p>-->
      </div>
    </div>
    <div class="bottom-btn-place-wrapper">
    </div>

    <div class="bottom-btn-wrapper">
      <x-button text="报名缴费" class="custom-primary-button" @click.native="gotoNext()">
      </x-button>
    </div>
  </div>
</template>
<script>
  import webconfig from "@/common/webconfig";
  import {XButton} from "vux";

  export default {
    components: {
      XButton
    },
    data() {
      return {
        open_id: this.$cookie.get("openid"),
        order_id: '',
        user_id: ''
      };
    },
    created() {
      let querystring = require('querystring');
      this.order_id = querystring.decode(window.location.search)['?order_id']
      this.user_id = querystring.decode(window.location.search)['user_id']
      this.getJsApiList();


    },
    computed: {},
    methods: {

      gotoNext() {
        let order_id = ''
        if (this.order_id) {
          order_id = this.order_id
        }
        let that = this;
        this.$wechatHelper.getJsPayData(this, {order_id: order_id}, function (ress) {

          // if (that.open_id === 'opoj20kMSZogWTFg7gSE0VQIyx8E' ||req.cookies.openid ==  "opoj20gd5aSykeaGXJbp1DPjZjA4") {
            // console.log(ress)
            // let send = ress.data ? JSON.parse(ress.data) : ''
            // if (send) {
            //   let data = send.data
            //   console.log('data', data)
            //   console.log('data.timeStamp', data.timeStamp)
            //
            //
            //
            //   WeixinJSBridge.invoke("getBrandWCPayRequest",{
            //       appId: data.appId,
            //       timeStamp: data.timeStamp,
            //       nonceStr: data.nonceStr,
            //       package: data.package,
            //       signType: data.signType,
            //       paySign: data.paySign,
            //     },
            //     function(e){
            //       alert(e.err_msg)
            //     })
            // } else {
            //   alert(ress.msg)
            // }



          // } else {
            let data = ress.data
            if (data) {



              that.$wechat.chooseWXPay({
                appId: data.appId,
                timestamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign,
                success(res) {
                  alert(res)
                  if (res.errMsg === "chooseWXPay:ok") {
                    // window.location.reload();
                    if (order_id != '') {
                      that.$router.push({
                        name: "appointmentChooseHospital",
                        query: {
                          order_id: ress.sec_order_id,
                          user_id: that.user_id
                        }
                      });
                    } else {
                      that.$router.push({
                        name: "signUpSucceed"
                      });
                    }

                  } else {
                    // window.alert(" 支付失败");
                    window.location.reload();
                  }
                },
                cancel() {
                  //window.alert("支付取消");
                  window.location.reload();
                },
                error(res) {
                  alert(res)
                  // window.alert("支付失败");
                  window.location.reload();
                }
              });


            } else {
              alert(ress.msg)
            }
          // }

        });
      },
      getJsApiList() {
        let that = this;
        this.$wechatHelper.getJsApiList(this, function (data) {
        });
      }
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
    flex: 1;
    padding-bottom: 100px;
  }

  .top-title-content {
    text-align: center;
    width: 100%;
  }

  .content-second {
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

</style>
