<template>


  <div class="container">



    <div class="choosetime_area">
      <div class="top">
        <p style="fontSize:12px;padding:20px 15px;">点击选中，再次点击取消选中，可多选
          <span @click="allSelect" style="color:red;float:right;right:50px;fontSize:14px;">全选</span>
        </p>
      </div>
      <div class="time_area2">
        <div class="time" v-for="(item,index) in items" :key="index" :class="{'check':item.checked}"
             @click="changeIndex(item)">
          <p style="height:40px;padding:0 3px;margin:0px;fontSize:10px;">{{item.time_area}}</p>
        </div>
      </div>

      <div class="need_details">
        <div class="haoyuan" @click="onshow">可用号源 {{values}}</div>


      </div>
      <div class="button">
        <div class="cancel" @click="onCancel">取消</div>
        <div class="ok" @click="handleSetTime()">确定</div>
      </div>
    </div>


    <div :class="popupVisible ?'bg_shop1' :'bg_shop_none1'"
         style='z-index: 1;background-color: rgba(0, 0, 0, 0.498039);height: 100%;width: 100%;' @click='onshow'>
      <div style="position: relative;width:100%;height:100%;">

        <div style=' background-color:#fff;width:100%;    height: 200px;overflow: hidden;text-align: -webkit-center;' :class="popupVisible ?'modiaBoxUp2' :'modiaBoxDown2'" @click.stop='bindBody'>

  <div style="padding:0 20px;display:flex;justify-content: flex-end;">

        <div style="font-size: 14px;">确定</div>
  </div>

<div>

  <mt-picker :slots="slots" @change="onValuesChange"
             style="">
  </mt-picker>

</div>






        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import webconfig from "@/common/webconfig";
  import {Picker} from 'mint-ui'
  import {Popup} from 'mint-ui'

  export default {
    component: {
      Picker,
      Popup
    },
    data() {
      return {
        values: '2',//选中了哪个值
        popupVisible: false,
        items: [],
        activeIndex: 0,
        week: {},
        checkAll: false,
        slots: [{
          flex: 1,
          values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          textAlign: 'center',
          showToolbar: true,
        }]
      };

    },
    created() {
    },
    mounted() {
      this.init()
    },
    methods: {
      //update picker
      bindBody() {
        return;
      },
      onValuesChange(picker, values) {
        this.values = values[0]
      },
      onshow() {
        this.popupVisible = !this.popupVisible
      },

      init() {
        this.week = JSON.parse(this.$route.query.week)
        let that = this;
        let url = webconfig.webserverurl + "/api/Timearea/index";
        this.$wrapperHttp.get(this, {}, url, function (data) {
          if (data) {
            console.log('week', that.week.time_area_ids)

            data.forEach((item, index) => {
              let opt = {checked: false}
              that.week.time_area_ids.forEach((weekItem, weekIndex) => {
                console.log('weekItem', weekItem)
                if (item.area_id === weekItem.toString()) {
                  console.log(item.area_id)
                  opt.checked = true
                }
                Object.assign(item, opt)
              })
            })
            that.items = data;
          }
        });
      },
      handleSetTime() {

        let selectList = []
        this.items.forEach((item, index) => {
          if (item.checked) {
            selectList.push(item.area_id)
          }
        })

        //setupID
        // this.$AppCacheKey.getsettingStreetId(); //!= ''&& 是存在  就是 越秀免费用户

        let that = this;
        let params = {
          open_id: this.$cookie.get("openid"),
          setup_type: this.$AppCacheKey.getSetupPeoppleId(),
          week: this.week.week_id,
          time_area_ids: selectList.join(',')
        }
        if (this.$AppCacheKey.getsettingStreetId() !== '' && this.$AppCacheKey.getsettingStreetId() && this.$AppCacheKey.getSetupPeoppleId() == 3) {
          Object.assign(params, {
            street_id: this.$AppCacheKey.getsettingStreetId()
          })
        }

        let url = webconfig.webserverurl + "/api/nurse/setupNumbersStrainer";
        this.$wrapperHttp.get(this, params, url, function (data) {
          if (data) {
            that.$router.replace({name: 'bookTime'})
          } else {
          }
        });


      },
      onCancel() {
        this.$router.push({
          name: "bookTime"
        });
      },
      changeIndex(item) {
        if (typeof item.checked == 'undefined') {
          this.$set(item, "checked", true);

        } else {
          item.checked = !item.checked;
        }
      },
      allSelect() {
        this.checkAll = !this.checkAll;
        var _this = this;
        this.items.forEach(function (item, index) {
          if (typeof item.checked == 'undefined') {
            _this.$set(item, "checked", _this.checkAll);

          } else {
            item.checked = _this.checkAll;
          }
        });

      }
    }
  }
</script>

<style>
  .container {
    position: fixed;
    bottom: 0;
    background-color: #000000;
    opacity: 0.7;
    height: 100%;
    width: 100%;
  }

  .choosetime_area {
    height: 350px;
    width: 85%;
    background-color: #ffffff;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;

  }

  .time_area2 {
    height: 250px;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    overflow: auto;
    flex: 1;
    align-items: flex-start;
  }

  .time {
    height: 40px;
    background-color: #fff;
    line-height: 40px;
    border: 1px solid #cccccc;
    color: #000;
    margin-top: 3px;
  }

  .button {
    display: flex;
    flex-direction: row;
    height: 40px;
    margin-top: 5px;
    border-top: 1px solid #ccc;
    justify-content: space-around;
    background-color: #ffffff;
  }

  .cancel, .ok {
    width: 50%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: blue;
  }

  .cancel {
    float: left;
    border-right: 1px solid #ccc;
  }

  .ok {
    float: right;
  }

  .check {
    height: 40px;
    background-color: rgb(66, 133, 222);
    line-height: 40px;
    border: 1px solid #cccccc;
    color: #000;
    margin-top: 3px;
  }

  .haoyuan {
    height: 40px;

  }

  .bg_shop1 {
    display: flex;
    position: fixed;
    bottom: 0;
    z-index: 999;

    background-color: rgba(0, 0, 0, 0.498039);
    height: 100%;
    width: 100%;
  }

  .bg_shop_none1 {
    position: fixed;
    bottom: -100%;
    animation: myfirst0002 0.5s;
  }

  @keyframes myfirst0002 {
    from {
      display: flex;
    }

    to {
      display: none;
    }
  }

  .modiaBoxUp2 {
    position: absolute;
    bottom: 0;
    animation: myfirst000 0.5s;
    -moz-animation: myfimyfirst000rst 0.5s;
    /* Firefox */
    -webkit-animation: myfirst000 0.5s;
    /* Safari and Chrome */
    -o-animation: myfirst000 0.5s;
    /* Opera */
  }

  @keyframes myfirst000 {
    from {
      bottom: -100%;
    }

    to {
      bottom: 0;
    }
  }

  .modiaBoxDown2 {
    -webkit-overflow-scrolling: touch;
    position: absolute;
    bottom: -100%;
    animation: myfirst0001 0.5s;
  }

  @keyframes myfirst0001 {
    from {
      bottom: 0;
    }

    to {
      bottom: -100%;
      display: none;
    }
  }
  /*.picker-item {*/
    /*height:36px;*/
    /*line-height:36px;*/
    /*padding: 0 10px;*/
    /*white-space:nowrap;*/
    /*position: relative;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*color: #707274;*/
    /*left: 0;*/
    /*top: 0;*/
    /*width: 100%;*/
    /*box-sizing: border-box;*/
    /*-webkit-transition-duration: .3s;*/
    /*transition-duration: .3s;*/
    /*-webkit-backface-visibility: hidden;*/
    /*backface-visibility: hidden;*/
  /*}*/
  /*.picker-item.picker-selected {*/
    /*color: #000;*/
    /*-webkit-transform: translate3d(0, 0, 0) rotateX(0);*/
    /*transform: translate3d(0, 0, 0) rotateX(0);*/
    /*border-top: solid 1px #e5e5e5;*/
    /*border-bottom: solid 1px #e5e5e5;*/
  /*}*/
  /*.picker-slot-wrapper{*/
    /*-webkit-overflow-scrolling: touch;*/
  /*}*/
</style>
