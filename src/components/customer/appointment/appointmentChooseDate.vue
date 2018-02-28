<template>
  <div class="content-wrapper" style="background:#ffffff">
    <notification :options.sync="options" :show.sync="showNotification" @close="closeNotification"></notification>
    <div class="top-title">
      <div class="top-title-content-text">
        <span class="content-title content-title-select">选择地点</span>
        <span class="content-title content-title-select">选择时间</span>
        <span class="content-title">预约成功</span>
      </div>
      <div class="top-title-content-line">
        <i class="icon-Processnode"></i><div class="follow-up-route"></div>
        <i class="icon-Processnode"></i><div class="follow-up-route"></div>
        <i class="icon-done"></i>
      </div>
    </div>
    <div class="item-wrapper" @click="chooseDate()">
      <div class="item-left">
        <p>选择时间</p>
      </div>
      <div class="item-right">
        <p>{{selectappointmentDate===''?'请选择日期':selectappointmentDate}}</p>
        <label class="item-right-icon"></label>
      </div>
    </div>
    <div class="content-first">
      <vue-loading-top :size="{width: '25px', height: '25px'}" v-show="!isShowContent"></vue-loading-top>
      <div v-show="isShowContent" class="first-item-wrapper weui-form-preview__bd" v-for="(appointmentDate,index) in appointmentDates"
           @click="appointmentDate.user_num > 0 && onItemClick(appointmentDate,index)" :key="index" :class="{'first-item-select':currentIndex === index}">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label" style="color:#000000"> {{appointmentDate.time_area}}</label>
          <span class="weui-form-preview__value">{{appointmentDate.user_num>0?'可预约(剩余' + appointmentDate.user_num +'号位)':'已满员'}}</span>
        </div>
      </div>
    </div>
    <div class="bottom-btn-place-wrapper">
    </div>
    <div class="bottom-btn-white-wrapper">
      <x-button class="custom-primary-button" :text="uploadstatus" @click.native="inUploading===1 && uploadAppointmentInfo()" type="primary" :showLoading="inUploading===2">
      </x-button>
    </div>

    <popup v-model="showChoooseDate">
      <div style="min-height:150px">
        <vue-loading-top :size="{width: '25px', height: '25px'}" v-show="!isShowTeamSelectDate"></vue-loading-top>
        <div v-show="isShowTeamSelectDate" v-for="(selectDate,index) in dateList"  :key="index" class="city-item"  @click="onTeamDateClick(selectDate)">
          <div class="city-item-item">
            <span>{{selectDate}}</span>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
  import webconfig from "@/common/webconfig";
  import vueLoadingTop from "@/components/widget/loading/loadingTop";
  import Notification from "@/components/widget/notification";
  import { XButton, Selector, Popup, DatetimeView, dateFormat } from "vux";
  export default {
    components: {
      XButton,
      Selector,
      Popup,
      vueLoadingTop,
      DatetimeView,
      dateFormat,
      Notification
    },
    data() {
      return {
        showNotification: false,
        options: {},
        inUploading: 1, //正在上传标识1:未传，2正在上传，3上传成功
        currentIndex: -1,
        isShowContent: false,//是否显示内容
        appointmentDates: [],
        showChoooseDate: false,//显示下面选择时间外框
        isShowTeamSelectDate:false,//是否显示团队选择日期
        dateList: [],
        selectappointmentDate: ''
      };
    },
    computed: {
      uploadstatus() {
        if (this.inUploading === 1) return "下一步";
        else if (this.inUploading === 2) return "上传数据";
      }
    },
    created() {
      // this.onDateClick();
    },

    methods: {
      onTeamDateClick(selectDate){
        this.currentIndex = -1;
        this.selectappointmentDate = selectDate;
        this.selectappointmentTime = null;
        this.onDateClick();
      },
      chooseDate() {
        if (this.showChoooseDate) {
          this.showChoooseDate = false;
        } else {
          this.showChoooseDate = true;
          let that = this;
          let url = webconfig.webserverurl + "/api/number/dates";
          let params = {
            hospital_id: this.$route.query.hospital_id,
            user_id:this.$route.query.user_id
            //
          };
          console.log(url)
// console.log(this.$route.query)


          this.$wrapperHttp.get(this, params, url, function(data) {


            if (data) {
              console.log(data)
              that.dateList = [];
              for(let i=0;i<data.length;i++){
                if(data[i].day)
                  that.dateList.push(data[i].day);
              }
            }
            that.isShowTeamSelectDate = true;
          });
        }
      },
      closeNotification() {
        this.showNotification = false;
      },
      onDateClick() {
        this.showChoooseDate = false;
        this.isShowContent = false;
        let that = this;
        let url = webconfig.webserverurl + "/api/number/times";
        let params = {
          hospital_id: this.$route.query.hospital_id,
          user_id:this.$route.query.user_id,
          day: this.selectappointmentDate
        };

        //update
        //如果新增越秀区街道的北京街和其他街道的相应ChooseDate的api
        //判断street_id
        //street_id为 1 2 3
        //let street_id = this.query.street_id;
        //if(this.$AppCacheKey.getStreetId() == 1 || this.$AppCacheKey.getStreetId() == 2 || this.$AppCacheKey.getStreetId() == 3){

        //     this.$wrapperHttp.get(this, params, url, function(data) {
        //             if (data) {

        //               for (let i = 0; i < data.length; i++) {
        //                 let item = data[i];
        //                 item.user_num = item.can_use - item.occ_use - item.team_use;
        //               }
        //               that.appointmentDates = data;
        //             }
        //             that.isShowContent = true;
        //           });

        // }
        //  else if(this.$AppCacheKey.getStreetId() == 4)
        //          {

        //         this.$wrapperHttp.get(this, params, url, function(data) {
        //             if (data) {

        //               for (let i = 0; i < data.length; i++) {
        //                 let item = data[i];
        //                 item.user_num = item.can_use - item.occ_use - item.team_use;
        //               }
        //               that.appointmentDates = data;
        //             }
        //             that.isShowContent = true;
        //           });
        // }
        //     else{}

        this.$wrapperHttp.get(this, params, url, function(data) {
          if (data) {

            for (let i = 0; i < data.length; i++) {
              let item = data[i];
              item.user_num = item.can_use - item.occ_use - item.team_use;
            }
            that.appointmentDates = data;
          }
          that.isShowContent = true;
        });
      },
      onItemClick(appointmentDate, index) {
        this.currentIndex = index;
        this.selectappointmentTime = appointmentDate;
      },
      uploadAppointmentInfo() {
        let userId = this.$route.query.user_id;
        let orderId = this.$route.query.order_id;
        let hospitalId = this.$route.query.hospital_id;

        if (
          !hospitalId ||
          hospitalId.replace(/(\s*$)/g, "").length <= 0 ||
          (!userId || userId.replace(/(\s*$)/g, "").length <= 0) ||
          (!orderId || orderId.replace(/(\s*$)/g, "").length <= 0)
        ) {
          this.showNotification = true;
          this.options = {
            autoClose: true,
            backgroundColor: "#fc5050",
            content: "参数有问题",
            showTime: 1000
          };
          return;
        }
        if (!this.selectappointmentTime) {
          this.showNotification = true;
          this.options = {
            autoClose: true,
            backgroundColor: "#fc5050",
            content: "请先选择预约时间",
            showTime: 1000
          };
          return;
        }
        this.inUploading = 2;
        let url = webconfig.webserverurl + "/api/order/addOrder";
        let that = this;
        let userdata =
          "hospital_id=" +
          hospitalId +
          "&user_id=" +
          userId +
          "&open_id=" +
          this.$cookie.get("openid") +
          "&prepare_day=" +
          this.selectappointmentTime.day +
          "&prepare_time=" +
          this.selectappointmentTime.time_area +
          "&order_id=" +
          orderId;

        let params = {
          open_id:  this.$cookie.get("openid"),
          user_id : userId,
          hospital_id:hospitalId,
          prepare_day:this.selectappointmentTime.day,
          prepare_time:this.selectappointmentTime.time_area
        }
        console.log("userdata");
        console.log(userdata);
        this.$wrapperHttp.post(this, params, url, function(data) {

          if (data) {
            that.$router.push({
              name: "appointmentSucceed",
              query: data
            });
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
  @import "~vux/src/styles/weui/widget/weui_cell/weui_form/weui-form-preview.less";
  @import "~vux/src/styles/weui/widget/weui_cell/weui_form.less";
  .content-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }

  .banner-wrapper {
    width: auto;
    height: 100px;
  }

  .top-title {
    background-color: rgb(71, 160, 209);
    padding: 30px;
  }

  .item-wrapper {
    display: flex;
    margin: 10px;
    border: 1.5px solid #cccccc;
  }

  .item-left {
    border-right: 1.5px solid #cccccc;
    padding: 10px;
  }

  .item-right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 10px;
  }

  .item-right p {
    flex: 1;
    text-align: center;
  }

  .item-right-icon {
    content: "";
    display: inline-block;
    vertical-align: 4px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #000000;
    margin-left: 6px;
  }

  .content-first {
    background: #ffffff;
    flex: 1;
  }

  .first-item-wrapper {
    margin: 10px;
    border: 1.5px solid #cccccc;
  }

  .first-item-select {
    border-color: rgb(71, 160, 209);
  }

  .city-item {
    width: 33.333%;
    float: left;
    border-bottom: 1px solid #ccc;
  }

  .city-item-item {
    padding-bottom: 10px;
    padding-top: 10px;
    text-align: center;
    border-right: 1px solid #ccc;
  }

  .btn-area {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    background: #ffffff;
  }

  .btn-area-place {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
  }

  .top-title-content-line {
    display: flex;
    align-items: center;
    color: #5fc423;
    margin-bottom: 10px;
    margin-left: 55px;
    margin-right: 55px;
  }

  .top-title-content-text {
    display: flex;
    align-items: center;
    color: #5fc423;
    text-align: center;
  }

  .content-title {
    color: #ffffff;
    font-size: 13px;
    flex: 1;
  }

  .follow-up-route {
    height: 1px;
    background: #ffffff;
    flex: 1;
  }

  .confirm_filter {
    display: flex;
    background-color: #f1f1f1;
    width: 100%;
    padding: 0.8rem 0rem;
  }

  .confirm_filter .filter_button_style {
    width: 50%;
    height: 1.8rem;
    font-size: 0.8rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    text-align: center;
  }

  .confirm_filter .clear_all {
    background-color: #fff;
    margin-right: 1rem;
    border: 0.025rem solid #fff;
    margin-left: 1rem;
  }

  .confirm_filter .confirm_select {
    background-color: rgb(71, 160, 209);
    color: #fff;
    border: 0.025rem solid rgb(71, 160, 209);
    margin-right: 1rem;
  }

  .top-title-content-line {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 55px;
    margin-right: 55px;
  }

  .top-title-content-text {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .content-title {
    color: rgb(34, 127, 178);
    font-size: 16px;
    flex: 1;
  }

  .content-title-select {
    color: #ffffff;
  }

  .follow-up-route {
    height: 1px;
    background: #ffffff;
    flex: 1;
  }

  .icon-Processnode {
    content: "";
    width: 14px;
    height: 14px;
    background-color: #ffffff;
    border-radius: 7px;
  }
  .icon-done {
    content: "";
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 5px;
  }

  .city-item {
    width: 33.333%;
    float: left;
    border-bottom: 1px solid #ccc;
  }

  .city-item-item{
    padding-bottom: 10px;
    padding-top: 10px;
    text-align: center;
    border-right:  1px solid #ccc;
  }

</style>
