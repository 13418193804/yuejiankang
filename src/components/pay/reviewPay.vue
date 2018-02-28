<template>
 <div class="content-wrapper">
     <div class="mask">
     </div>
    <div class="bottom-btn-wrapper">
        <div class="chooseWay">
            <p style="textAlign:center;marginLeft: -20px;width:100%">选择支付方式
                <span style="color:red;fontSize:13px;marginTop:4px;float:right;right:55px; position: absolute;" @click="onCancel">取消</span></p>
        </div>
        <div class="choosewxWay">
            <p style="textAlign:center;height:60px;lineHeight:60px;marginLeft: -20px;width:100%;borderTop:1px solid #ccc;" @click="gotoNext">微信支付</p>
        </div>
    </div>
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
export default {
  components: {
  },
  data() {
    return {};
  },
  created() {
    this.getJsApiList();
  },
  computed: {},
  methods: {
     //取消按钮
     onCancel(){
      this.$router.push({
              name: "myReview",
           });
     },
    gotoNext() {
      let that = this;
      this.$wechatHelper.getJsPayData(this, function(data) {
        if (data) {
          that.$wechat.chooseWXPay({
            appId: data.appId,
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success(res) {
              if (res.errMsg === "chooseWXPay:ok") {
               // window.location.reload();
                that.$router.push({
                  name: "appointmentChooseHospital'"
                });

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
              // window.alert("支付失败");
              window.location.reload();
            }
          });
        }
     });
    },
    getJsApiList() {
      let that = this;
      this.$wechatHelper.getJsApiList(this, function(data) {});
    }
  }
};
</script>
<style lang="less" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: absolute;
  width: 100%;
  height:100%;
}

.mask{
    width: 100%;
    height: 85%;
    background-color: black;
    opacity: 0.5;


}
.bottom-btn-wrapper{
    height: 15%;
    width: 100%;
    bottom: 0px;
    position: fixed;
}

.chooseWay{
    margin-top: 10px;
    margin-left: -20px;

}
.choosewxWay{
    margin-top: 10px;
    margin-left: -20px;

}
</style>
