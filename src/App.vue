<template>
    <div id="app">
       <keep-alive include="newAppoinment">
         <router-view></router-view>
       </keep-alive>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import "~vux/src/styles/weui/widget/weui_cell/weui_cell_global.less";
@import "~vux/src/styles/weui/widget/weui_cell/weui_form/weui_form_common.less";
body {
    background-color: #ffffff;
    color: #333;
}
.custom-primary-button {
 // border-radius: 60px !important;
  color: #ffffff !important;
  border-color: rgb(71,160,209) !important;
  background-color: rgb(71,160,209) !important;
  &:active {
    border-color: #bbbbbb !important;
    background-color: #bbbbbb !important;
  }
}

.custom-primary-mini-button {
  border-radius: 15px !important;
  color: #666 !important;
  background-color: #ffffff !important;
  font-size: 0.7rem !important;
  border: 1px solid #000000 !important;
  padding:8px 20px 8px 20px;
  &:active {
    background-color: #bbbbbb !important;
  }
}

.bottom-btn-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 10vh;
  padding-left: 20px;
  padding-right: 20px;
  display: block;
}

.bottom-btn-white-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 10vh;
  background: #ffffff;
  padding-left: 20px;
  padding-right: 20px;
  display: block;
  
}

.bottom-btn-place-wrapper {
  padding-left: 20px;
  padding-right: 20px;
  height: 10vh;
}

.triangle-icon:before {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 1em;
}

.triangle-icon-down:before {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  transform: rotate(135deg);
  -webkit-transform:rotate(135deg);
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 1em;
}

.triangle-icon-black:before {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #aaaaaa;
  border-style: solid;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 1em;
}

.triangle-icon-down-black:before {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #aaaaaa;
  border-style: solid;
  transform: rotate(135deg);
  -webkit-transform:rotate(135deg);
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 1em;
}

</style>
