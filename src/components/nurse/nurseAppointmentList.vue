<template>
  <div class="content-wrapper">
    <vue-loading :size="{width: '60px', height: '60px'}" v-show="!isShowContent"></vue-loading>
    <hsy-dialog class="confirm" v-model="showDialog">
      <div slot="body">
        <div style="padding:10px;max-height:100px;line-height:20px">
           <p style="font-size:1.0rem">检测人:{{dialogContent.name}}</p>
           <p style="font-size:1.0rem">预约号:{{dialogContent.order_no}}</p>
          </div>
        <div class="confirm_filter">
            <span class="filter_button_style first" @click="handleNo()">取消</span>
            <span class="filter_button_style" @click="handleYes(dialogContent.order_id)">确定</span>
        </div>
      </div>
    </hsy-dialog>
    <div class="weui-search-bar weui-search-bar_focusing" style="background-color:rgb(71,160,209)">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="search" class="weui-search-bar__input" placeholder="搜索" v-model="searchParams.search">
                    <a href="javascript:" class="weui-icon-clear" @click="onClearSearch()" v-show="searchParams.search"></a>
                </div>
            </form>
            <a href="javascript:" class="weui-search-bar__cancel-btn" style="color:#ffffff"  @click="onSearch()">搜索</a>
    </div>
    <div class="item-wrapper weui-cells">
        <div class="item-right" @click="chooseDate()">
              <p>{{searchParams.day}}</p>
          <label class="item-right-icon"></label>
        </div>
        <div class="item-left">
          <input type="checkbox" class="weui-agree__checkbox" onclick="return false;" name="showHasBaoDao" v-model="isHidden">
          <span @click="onSearchForCheckBox()">隐藏已报到</span>
        </div>
     </div>
    <div class="list-wrapper" v-show="isShowContent">
      <div v-for="(order,index) in orderList" :key="index">
       <div class="weui-cell" @click="currentIndex = (currentIndex==index)?-1:index" style="background:#eeeeee;color:#444444">
           <div class="weui-cell__bd">
             <span>{{order.title}}</span><span> 已报到{{order.yibaodao}}/{{order.all}}人</span>
           </div>
           <span :class="itemClass(index)"></span>
       </div>
      <div class="weui-cell" v-show='currentIndex===index' v-for="(item,itemindex) in order.detail" :key="itemindex">
        <div class="weui-cell__bd">
          <p style="font-size:1.0rem">检查人:{{item.name}}<span class="user-tag">{{userTypeName(item.user_type_id)}}</span></p>
          <p style="font-size:0.8rem">预约号:{{item.order_no}}</p>
          <p style="font-size:0.8rem">证件号:{{item.code}}</p>
          <p style="font-size:0.8rem">手机号:{{item.mobile}}</p>
          <p style="font-size:0.8rem">年龄:{{item.age}}</p>
          <p style="font-size:0.8rem">性别:{{item.sex}}</p>
          <p style="font-size:0.8rem;color:#71a0d1">{{item.describe}}</p>
        </div>
        <div class="weui-cell__ft">
         <!-- <x-button :text="uploadstatus" @click.native="inUploading===1 && cancelSignUp()" type="primary" :showLoading="inUploading===2" class="custom-primary-mini-button">
         </x-button> -->
         <span v-if="item.is_checkin=='否'" class="custom-primary-mini-button" @click="onItemClick(item)">报 到</span>
         <span v-else style="color:#cccccc">已报到</span>
        </div>
      </div>
     </div>
    </div>
    <popup v-model="showChoooseDate" style="min-height:70%">
      <div class="select-month_wrapper">
          <span class="custom-primary-mini-button" @click="upMonth(true)">上一个月</span><span style="padding:10px">{{selectMonth}}</span><span class="custom-primary-mini-button" @click="upMonth(false)">下一个月</span>
      </div>
      <div>
        <vue-loading-top :size="{width: '25px', height: '25px'}" v-show="!isShowSelectDate"></vue-loading-top>
        <div v-show="isShowSelectDate" v-for="(selectDate,index) in dateList"  :key="index" class="city-item"  @click="onTeamDateClick(selectDate)">
          <div class="city-item-item">
            <span>{{selectDate.substring(8)}}</span>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
import vueLoading from "@/components/widget/loading/loading";
import webconfig from "@/common/webconfig";
import HsyDialog from "@/components/widget/dialog/Dialog";
import vueLoadingTop from "@/components/widget/loading/loadingTop";
import { XButton, dateFormat, Popup, DatetimeView } from "vux";
export default {
  name: "screenList",
  components: {
    XButton,
    vueLoading,
    HsyDialog,
    Popup,
    DatetimeView,
    vueLoadingTop
  },
  props: {
   	selectHospitalId: {
   	 	type: String
   	}
  },
  data() {
    return {
      dialogContent: {},
      showDialog: false,
      isShowContent: true,
      orderList: [],
      currentIndex: 0,
      inUploading: 1,
      showChoooseDate: false,//显示下面选择时间外框
      showHasBaoDao:0,
      searchParams :{
         hospital_id: this.selectHospitalId, //医院ID
         is_hidden: 0,
         search:null, //隐藏已报到
         day: dateFormat(new Date(), "YYYY-MM-DD") //显示哪一天的预约列表
      },
      isHidden:false,
      isShowSelectDate:false,
      appointmentDates: [],
      dateList:[],//日期列表
      selectMonth:dateFormat(new Date(), "YYYY-MM")
    };
  },
  computed: {},
  created() {
    this.getData(this.searchParams);
  },
  methods: {
    onSearchForCheckBox() {
      if(this.isHidden){
        this.isHidden = false;
      }else{
        this.isHidden = true;
      }
      this.getData(this.searchParams);
    },
    onSearch() {
      this.getData(this.searchParams);
    },
    onClearSearch() {
      this.searchParams.search = null;
    },
    getData(params) {

      if(this.isHidden)
         params.is_hidden = 1;
      else
         params.is_hidden = 0;

      //console.log(this.isHidden);
      console.log('========1111======');
      console.log(params);

      this.isShowContent = false;
      let that = this;
      let url = webconfig.webserverurl + "/api/nurse";

      this.$wrapperHttp.get(this, params, url, function(data) {
        if (data) {

          for(let t=0;t<data.length;t++){
             let temp = data[t];
             if(temp.user_type_id == 2){
               temp.describe = '团队名称:' + temp.team_name;
             }else if(temp.user_type_id == 3){
               temp.describe = '所属街道:' + temp.street_name;
             }else if(temp.user_type_id == 4){
               temp.describe = '低保证号:' + temp.dibao_code + '  ' + '有效期至:' + temp.dibao_date
             }
          }

          var tempData = [];
          var index = 0;
          while (index < data.length) {
            if (index != 0 && that.biJiao(data, index)) {
              index++;
            } else {
              var oneStartTime = {};
              oneStartTime.detail = [];
              oneStartTime.title = data[index].start_time + '-' + data[index].end_time;
              let yibaodao = 0;
              let all = 0;
              oneStartTime.detail.push(data[index]);
              if(data[index].is_checkin == '是')
                yibaodao++;
              all++;
              for (let i = index; i < data.length - 1; i++) {
                if (data[index].start_time == data[i + 1].start_time) {
                  oneStartTime.detail.push(data[i + 1]);
                  if(data[i+1].is_checkin == '是')
                     yibaodao++;
                  all++;
                }
              }
              oneStartTime.yibaodao = yibaodao;
              oneStartTime.all = all;
              console.log(oneStartTime.yibaodao);
              console.log(oneStartTime.all);
              tempData.push(oneStartTime);
              index++;
            }
          }
          that.orderList = tempData;
        }
        that.isShowContent = true;
      });
    },
    handleNo() {
      this.showDialog = false;
    },
    handleYes(orderId) {
      this.showDialog = false;
      this.inUploading = 2;
      let url = webconfig.webserverurl + "/api/nurse/activeOrder";
      let that = this;
      let userdata = "order_id=" + orderId;
      console.log(userdata);
      this.$wrapperHttp.post(this, userdata, url, function(data) {
        if (data) {
          that.$vux.toast.show({
            text: "报到成功",
            onHide() {
              that.getData(that.searchParams);
            }
          });
        } else {
          that.$vux.toast.show({
            text: "报到失败",
            onHide() {
              that.getData(that.searchParams);
            }
          });
        }
      });
    },
    onItemClick(item) {
      this.dialogContent = item;
      this.showDialog = true;
    },
    itemClass(index) {
      if (index === this.currentIndex) return "triangle-icon-down-black";
      else return "triangle-icon-black";
    },
    biJiao(data, index) {
      for (let i = 0; i < index; i++) {
        if (data[index].start_time == data[i].start_time) return true;
      }
      return false;
    },
    userTypeName(userTypeId) {
      if (userTypeId == 1) {
        return "个人";
      } else if (userTypeId == 2) {
        return "团体";
      } else if (userTypeId == 3) {
        return "免费街道";
      } else if (userTypeId == 4) {
        return "低保";
      }
    },
    onDateClick() {
      this.showChoooseDate = false;
      this.isShowContent = false;
      this.getData(this.searchParams);
    },
    onTeamDateClick(selectDate){
       this.searchParams.day = selectDate;
       this.onDateClick();
    },
    chooseDate() {
      this.showChoooseDate = !this.showChoooseDate;
      this.getMonthData();
    },
    upMonth(tag){
        let index = !tag?1:-1;
        this.selectMonth = dateFormat(
            new Date(this.selectMonth).setMonth(new Date(this.selectMonth).getMonth()+index),
            "YYYY-MM");
      this.getMonthData();
    },
    getMonthData(){
      this.isShowSelectDate = false;
      let that = this;
      let url = webconfig.webserverurl + "/api/order/teamTimesForNurse";
      let params = {
        hospital_id: this.selectHospitalId,
        select_month:this.selectMonth
      };
      this.$wrapperHttp.get(this, params, url, function(data) {
        if (data) {
          that.dateList = [];
          for(let i=0;i<data.length;i++){
            if(data[i].day)
               that.dateList.push(data[i].day);
          }
        }
        that.isShowSelectDate = true;
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/weui/widget/weui_cell/weui_cell_global.less";
@import "~vux/src/styles/weui/widget/weui_panel/weui_panel.less";
@import "~vux/src/styles/weui/widget/weui_searchbar/weui_searchbar.less";
@import "~vux/src/styles/weui/widget/weui-agree/weui-agree.less";

.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.list-wrapper {
  overflow: scroll;
  flex: 1;
}

.user-tag {
  border-radius: 5px;
  color: #666;
  background-color: #ffffff;
  font-size: 0.6rem;
  border: 1px solid #000000;
  padding: 2px 4px 2px 4px;
  margin-left: 8px;
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

.item-wrapper {
  display: flex;
  margin: 5px;
}

.item-left {
  padding: 5px;
  flex: 1;
  text-align: center;
}

.item-right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
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
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000000;
  margin-left: 3px;
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

.select-month_wrapper{
  text-align: center;
  padding: 20px;
  border-bottom:  1px solid #ccc;
}
</style>
