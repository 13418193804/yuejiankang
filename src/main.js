// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import { AjaxPlugin, ToastPlugin, AlertPlugin, WechatPlugin, LoadingPlugin } from 'vux'
import './common/less/icon.less'
import VersionHelper from './utils/VersionHelper'
import HttpUtils from './utils/HttpUtils'
import AppCacheKey from './utils/AppCacheKey'
import WechatHelper from './utils/WechatHelper'
import VueCookie from 'vue-cookie'
import InfiniteScroll from 'vue-infinite-scroll'
import MintUI from 'mint-ui'
import Vuex from 'vuex'




Vue.use(VueCookie)
Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(VersionHelper)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(HttpUtils)
Vue.use(AppCacheKey)
Vue.use(WechatHelper)
Vue.use(InfiniteScroll)
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
Vue.use(Vuex)

FastClick.attach(document.body)

Vue.config.productionTip = false
/**/
router.beforeEach((to, from, next) => {
  let openid = Vue.cookie.get('openid');
    let spreadPageToken = Vue.cookie.get('spreadPageToken');
  if ((!openid && to.name !== 'notFoundComponent'
      && to.name !== 'spreadPage'
      && to.name !== 'beforeSignUp'
      && to.name !== 'beforeSignUpSucceed')||(!spreadPageToken && to.name == 'spreadPage'))
  {
      let url = '/wechatapi/getauthorizeurl?redirect=' + to.fullPath;
      Vue.http.get(url).then((response) => {
        if (response.status === 200) {
          window.location.href = response.data;
        } else {
          //跳转到异常页面
          document.title = to.meta.title;
          next('/');
        }
      }).catch(function(error) {
        //跳转到异常页面
        document.title = to.meta.title;
        next('/');
      });
  }else {
    document.title = to.meta.title;
    next();
  }
})
/**/
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
