<template>
  <div class="content-wrapper" style="background:#ffffff">
    <div class="item-wrapper" @click="chooseCity()">
        <div class="item-left">
             <p>切换城市</p>
        </div>
        <div class="item-right">
          <p>{{selectCity.name}}</p>
          <label class="item-right-icon"></label>
        </div>
    </div>
    <div class="content-first">
      <vue-loading-top :size="{width: '25px', height: '25px'}" v-show="!isShowContent"></vue-loading-top>
      <div v-show="isShowContent" class="first-item-wrapper" v-for="(hospital,index) in hospitals"
          @click="onItemClick(hospital,index)" :key="index" :class="{'first-item-select':detailCurrentIndex === index}">
        <div class="weui-cell" @click="detailCurrentIndex = (detailCurrentIndex==index)?-1:index" :class="{'first-item-select-first-child':detailCurrentIndex === index}">
           <div class="weui-cell__bd">
             {{hospital.hospital_name}}
           </div>
           <span :class="itemClass(index)"></span>
        </div>
        <div class="weui-form-preview__bd" v-show='detailCurrentIndex===index'>
          <div class="weui-form-preview__item">
           <label class="weui-form-preview__label" style="color:#000000">团队报名负责人</label>
           <span class="weui-form-preview__value">{{hospital.team_leader.name}}</span>
          </div>
          <div class="weui-form-preview__item">
           <label class="weui-form-preview__label" style="color:#000000">联系电话</label>
           <span class="weui-form-preview__value">{{hospital.team_leader.mobile}}</span>
          </div>
        </div>
      </div>
    </div>
    <popup v-model="showChoooseCity" :show-mask="true" position="bottom">
          <div v-for="(city,index) in cityList"  :key="index" class="city-item"  @click="onCityClick(city)">
            <div class="city-item-item">
            <span>{{city.name}}</span>
            </div>
          </div>
    </popup>
    <!--<remote src="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js"></remote>-->
  </div>
</template>
<script>
import webconfig from "@/common/webconfig";
import vueLoadingTop from '@/components/widget/loading/loadingTop';
import { Selector, Popup } from "vux";
export default {
  components: {
    Selector,
    Popup,
    vueLoadingTop
  },
  data() {
    return {
      detailCurrentIndex: -1,
      isShowContent:false,
      showChoooseCity:false,
      hospitals:[],
      cityList: [
        {value:1,name:'佛山'},
        {value:2,name:'东莞'},
        {value:3,name:'中山'},
        {value:4,name:'珠海'},
        {value:5,name:'江门'},
        {value:6,name:'肇庆'},
        {value:7,name:'惠州'},
        {value:8,name:'汕头'},
        {value:9,name:'潮州'},
        {value:10,name:'揭阳'},
        {value:11,name:'汕尾'},
        {value:12,name:'湛江'},
        {value:13,name:'茂名'},
        {value:14,name:'阳江'},
        {value:15,name:'韶关'},
        {value:16,name:'清远'},
        {value:17,name:'云浮'},
        {value:18,name:'梅州'},
        {value:19,name:'河源'},
        {value:20,name:'广州'},
        {value:21,name:'深圳'},
      ],
      selectCity:{}
    };
  },

  computed: {
  },
  created() {



    if(typeof remote_ip_info!='undefined'){

      if(typeof remote_ip_info.province !='undefined' && remote_ip_info.province!="广东"){
        alert('您所在的位置不在广东省内');
        this.onCityClick({value:20,name:'广州'});
        return
      }else{
        this.cityList.forEach((item,index)=>{
          if(item.name===remote_ip_info.city){
            this.onCityClick(item);
            return false;
          }
        })
      }
    }else{
      alert('当前位置获取失败');
      this.onCityClick({value:20,name:'广州'});
    }


  },

  methods: {
    itemClass(index) {
      if (index === this.detailCurrentIndex) return "triangle-icon-down";
      else return "triangle-icon";
    },
    chooseCity(){
       this.showChoooseCity = true;
    },
    onCityClick(city){
     this.showChoooseCity = false;
     this.isShowContent = false;
     let that = this;
     let url = webconfig.webserverurl + "/api/order/hospitals";
     let params = {
      city_id: city.value,
     };
     this.$wrapperHttp.get(this, params, url, function(data) {
      if (data) {
         for(let i=0;i<data.length;i++){
           data[i].team_leader = JSON.parse(data[i].team_leader);
           if(!data[i].team_leader){
             data[i].team_leader = {};
           }
         }
         that.hospitals = data;
         that.selectCity = city;
         that.detailCurrentIndex = -1;
      }
      that.isShowContent = true;
     });
    },
    onItemClick(hospital,index) {
    }
  },
  Components: {
    'remote': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
      },
      props: {
        src: { type: String, required: true },
      },
    },
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
  height: 100px;
}

.item-wrapper {
  display: flex;
  margin: 10px;
  border: 1.5px solid #cccccc;
}

.item-left{
  border-right: 1.5px solid #cccccc;
  padding: 10px;
}

.item-right{
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 10px;
}

.item-right p{
  flex: 1;
  text-align: center;
}

.item-right-icon{
  content: '';
	display: inline-block;
	vertical-align: 4px;
	width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-top: 10px solid #999999;
	margin-left: 6px;
}

.content-first {
  background: #ffffff;
  flex: 1;
}

.first-item-wrapper{
  margin: 10px;
  border: 1px solid #cccccc;
}

.first-item-select{
  border-color: rgb(71,160,209);
}

.first-item-select-first-child{
  background-color: rgb(71,160,209);
  color: #ffffff;
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

.triangle-icon-down:before {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #ffffff;
  border-style: solid;
  transform: rotate(135deg);
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 1em;
}
</style>
