<template lang="html">
  <div class="userinfo-box">
    <mt-header fixed title="个人资料">
      <router-link to="/user-center" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click.native="peerPopup">同行认证</mt-button>
    </mt-header>
    <div class="base-info">
      <div class="input-groups">
        <input id="trueMobile" type="hidden" v-model="userInfo.trueMobile">
        <mt-field label="昵称" placeholder="请输入昵称" v-model="userInfo.nickName" :attr="{maxlength: 12}"></mt-field>
        <mt-field label="姓名" placeholder="请输入姓名" v-model="userInfo.trueName" :attr="{maxlength: 8}"></mt-field>
        <mt-cell title="性别" value="userInfos.sex" v-model="userInfo.sex" is-link @click.native="sexPopup=!sexPopup"></mt-cell>
        <mt-cell title="出生日期" value="userInfos.birth" v-model="userInfo.birth" is-link @click.native="changeDate"></mt-cell>
        <mt-cell title="联系电话" value="userInfos.mobile" v-model="userInfo.mobile" is-link @click.native="setNewTel=!setNewTel"></mt-cell>
        <!-- <mt-field label="手机号" v-model="userInfo.mobile" :attr="{maxlength: 15}"></mt-field> -->
      </div>
      <div class="page-btn-groups" style="margin-top: 20px;">
        <mt-button id="btnSave" type="primary" size="large" @click.native="saveUserInfo(1)">保存</mt-button>
      </div>
    </div>
    <!--同行认证-->
    <mt-popup v-model="popupPeerCnas" position="right">
      <div class="content">
        <mt-header fixed title="同行认证">
          <mt-button icon="back" slot="left" @click.native="popupPeerCnas=!popupPeerCnas"></mt-button>
          <mt-button slot="right" @click.native="saveUserInfo(2)">保存</mt-button>
        </mt-header>
        <div class="peerInfo">
          <mt-cell title="企业信息" id="peerStatus">
            <span style="color: #ff8800;" v-if="userInfo.isOk==0 && userInfo.memberType==2">(待审核)</span>
            <span style="color: green; " v-else-if="userInfo.isOk==1 && userInfo.memberType==2">(已审核)</span>
            <span style="color: orange;" v-else-if="userInfo.isOk==-1 && userInfo.memberType==2">(待提交)</span>
            <span style="color: red; " v-else-if="userInfo.isOk==-2 && userInfo.memberType==2">(禁止登录)</span>
            <span style="color: red;" v-else-if="userInfo.isOk==-3 && userInfo.memberType==2">(已拒绝)</span>
            <span style="color: orange;" v-else>(待提交)</span>
          </mt-cell>
          <mt-field label="公司名称" placeholder="请输入公司名称" v-model="userInfo.pubUserCpyName" :attr="{maxlength: 30}"
            v-if="userInfo.isOk==-1 || userInfo.isOk==-3 || (userInfo.isOk==1 && userInfo.memberType==1)">
          </mt-field>
          <mt-field label="公司名称" placeholder="请输入公司名称" v-model="userInfo.pubUserCpyName" :attr="{disabled: 'disabled'}" v-else></mt-field>
          <mt-cell title="所在省市" class="require-field input-right" v-model="userInfo.addr" is-link @click.native="openAddress(2)"></mt-cell>
          <mt-field title="详细地址" placeholder="请输入详细地址" v-model="userInfo.area" :attr="{maxlength: 50}"></mt-field>
        </div>
        <div style="padding: 10px;" v-if="userInfo.isOk === -1 || userInfo.isOk === -3 || (userInfo.isOk === 1 && userInfo.memberType === 1)">
          <my-uploader class="licence"
            :fileImg="cpyImg"
            title="上传营业执照"
            :tmpl="tmpl"
            :uploadCount="uploadCount"
            :uploadCounted="uploadCounted"
            :url="url"
            auto="auto"
            :queue="queue"
            :fileVal="fileVal"
            :type="type"
            :compress="compress"
            :compressWidth="compressWidth"
            :compressHeight="compressHeight"
            :compressQuality="compressQuality"
            :onBeforeQueued="onBeforeQueued"
            :onQueued="onQueued"
            :onBeforeSend="onBeforeSend"
            :onProgress="onProgress"
            :onSuccess="onSuccess"
            :onError="onError"
            :onDelete="onDelete"
            :inputCtr="isWeiXin"
            :onInputClick="onInputClick"
            ref="uploader">
          </my-uploader>
        </div>
        <div class="show-image" v-else @click="imagePopup=!imagePopup">
          <img :src="userInfo.credentialImage">
        </div>
        <div class="page-btn-groups" style="padding: 0 10px; margin-top: 20px;">
          <mt-button type="primary" size="large" @click.native="saveUserInfo(3)" v-if="userInfo.isOk==-1 && userInfo.memberType==1" :disabled="btnSubCheck">提交审核</mt-button>
          <mt-button type="primary" size="large" @click.native="saveUserInfo(3)" v-else-if="userInfo.isOk==-3 && userInfo.memberType==2" :disabled="btnSubCheck">提交审核</mt-button>
          <mt-button type="primary" size="large" @click.native="saveUserInfo(3)" v-else-if="userInfo.isOk==1 && userInfo.memberType==1" :disabled="btnSubCheck">提交审核</mt-button>
          <mt-button type="primary" size="large" @click.native="saveUserInfo(3)" v-else-if="userInfo.isOk==-1 && userInfo.memberType==2" :disabled="btnSubCheck">提交审核</mt-button>
        </div>
      </div>
    </mt-popup>
    <!--同行认证-->

    <!--校验原手机号码-->
    <mt-popup v-model="checkOriTel" position="right">
      <mt-header fixed title="验证手机号码">
        <mt-button icon="back" slot="left" @click="checkOriTel=!checkOriTel"></mt-button>
      </mt-header>
      <section class="checktel-box">
        <div>
          <mt-cell title="原手机号" value="" v-model="userInfo.mobile"></mt-cell>
          <mt-field placeholder="请输入完整的手机号码" :attr="{type: 'tel', maxlength: 15}" v-model="fullTel"></mt-field>
        </div>
        <div class="page-btn-groups" style="margin-top: 15px;">
          <mt-button type="primary" size="large" @click.native="nextSetNew">下一步，新号码</mt-button>
        </div>
      </section>
    </mt-popup>
    <!--校验原手机号码-->

    <!--设置联系电话-->
    <mt-popup v-model="setNewTel" position="right">
      <mt-header fixed title="新手机号码">
        <mt-button icon="back" slot="left" @click="setNewTel=!setNewTel"></mt-button>
      </mt-header>
      <section class="checktel-box">
        <mt-field label="手机号" placeholder="请输入手机号" :attr="{type: 'tel', maxLegth: 15}" v-model="tel"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" v-model="smsCode">
          <mt-button type="primary" size="small" :disabled="btnMagDis" @click.native="sendMsg">{{btnTxt}}</mt-button>
        </mt-field>
        <div class="page-btn-groups" style="margin-top: 15px;">
          <mt-button type="primary" size="large" @click.native="saveNewTel">确定</mt-button>
        </div>
      </section>
    </mt-popup>
    <!--设置联系电话-->

    <input type="hidden" v-model="userInfo.sexType">
    <mt-popup v-model="sexPopup" position="bottom">
      <mt-picker
        :slots="sexAction"
        :itemHeight=36
        :visibleItemCount=3
        @change="onSexChange">
      </mt-picker>
    </mt-popup>
    <mt-datetime-picker
      ref="birthPicker"
      type="date"
      v-model="datePopup"
      :startDate="startDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :value="defaultDate"
      @confirm="confirmDate">
    </mt-datetime-picker>

    <!--省市选择层-->
    <input type="hidden" v-model="userInfo.province">
    <input type="hidden" v-model="userInfo.city">
    <input type="hidden" v-model="userInfo.provinceId">
    <input type="hidden" v-model="userInfo.cityId">
    <mt-popup v-model="addressShow" position="bottom" class="mint-datetime">
      <div class="picker mint-datetime-picker">
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" style="width:100%;color: #55acee;">所在省市</span>
        </div>

        <div class="address-content" style="height:360px;" v-if="showWhich==2">
          <ul class="head-address-ul" id="headAddressUl">
            <li mytitle="0" @click="fnProvinceSelect" :class="pickerShow ? '' : 'head-address-li'">{{provinceSelect || '请选择'}}</li>
            <li mytitle="1" :class="pickerShow ? 'head-address-li' : ''">
              <span v-show="pickerShow">{{citySelect||'请选择'}}</span>
            </li>
            <li mytitle="2" class=""></li>
            <li mytitle="3"></li>
          </ul>

          <ul class="address-ul" v-show="!pickerShow">
            <li v-for="item in province" @click="selProvince(item)">{{item.cityName}}</li>
          </ul>
          <ul class="address-ul" v-show="pickerShow">
            <li v-for="item in city" @click="selCity(item)">{{item.cityName}}</li>
          </ul>
        </div>
      </div>
    </mt-popup>
    <!--省市选择层-->

    <!--图片弹层-->
    <div class="imgpop-wraper" :class="{'toggle-image': imagePopup}">
      <span class="close" @click="imagePopup=!imagePopup"></span>
      <img :src="userInfo.credentialImage">
    </div>
    <!--图片弹层-->
  </div>
</template>

<script>
import Vue from 'vue';
import {Toast, MessageBox} from "mint-ui"
import Uploader from "../../components/uploader";
export default {
  data () {
    return {
      popupPeerCnas: false,
      sexPopup: false,
      datePopup: false,
      checkOriTel: false,
      setNewTel: false,
      addressShow: false,
      imagePopup: false,
      showWhich: 0,
      addressSlots:[],
      province: [],
      provinceCity: '',
      city: [],
      pickerShow: false,
      provinceSelect: '',
      citySelect: '',
      provinceId: '',
      cityId: '',
      sexVal: '',
      birthday: '',
      fullTel: '',
      tel: '',
      smsCode: '',
      btnTxt: '发送验证码',
      btnMagDis: false,
      btnSubCheck: false,
      count: '',
      timer: null,
      sexAction: [{ values: ['男', '女'], className: 'sex-picker', defaultIndex: 0, value: '男' }],
      startDate: new Date('1960-01-01'),
      endDate: new Date('2050-01-01'),
      defaultDate: new Date(),
      imgSrc: '',
      title: "图片上传",
      tmpl: 1,
      uploadCount: 1,
      url: 'http://upload.qiniu.com',
      auto: true,
      queue: true,
      type: 'file',
      fileVal: 'file',
      compress: true,
      compressWidth: 1600,
      compressHeight: 1600,
      compressQuality: 0.8,
      uploadCounted: 0,
      cpyImg: []
    }
  },
  created () {
    this.$store.dispatch('saveUser');
    this.$store.dispatch('addressRequest').then(end => {
      this.province = end;
    });
    this.$store.dispatch('tokenCardUpload').then(uptoken => {
      if (isWeiXin()) {
        wx.config({
          // debug: true,
          appId: uptoken.wx_appid,
          timestamp: uptoken.wx_timestamp,
          nonceStr: uptoken.wx_noncestr,
          signature: uptoken.wx_signature,
          jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2,
        });
      }
    });
  },
  computed: {
    userInfo () {
      let userInfos = this.$store.getters['getUser'];
      let regTelFour = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
      let fullMobile = userInfos.mobile;
      if(userInfos.credentialImage) {
        this.imgSrc = userInfos.credentialImage;
        let fileImg = {};
        fileImg.img = userInfos.credentialImage;
        if(this.cpyImg.length < 1) {
          this.cpyImg.push(fileImg);
        }
      }
      this.sexAction[0].defaultIndex = Number(userInfos.sexType);
      this.sexAction[0].value = userInfos.sex;
      if(!userInfos.province || userInfos.province == '') {
        userInfos.addr = '请选择';
      } else {
        userInfos.addr = (userInfos.province ? userInfos.province : '') + ' ' + (userInfos.city ? userInfos.city : '');
      }
      return userInfos;
    },
    isWeiXin() {
      return !isWeiXin();
    },
    uptoken() {
      return this.$store.getters['tokenCard'];
    }
  },
  filters: {
    hideFourTel (str) {
      let regTelFour = /(\\d{3})(\\d{4})(\\d{4})/;
      let hideTel = str.replace(regTelFour, '$1****$3');
      return hideTel;
    }
  },
  methods: {
    openAddress (arg) {
      this.addressShow = !this.addressShow;
      if (arg == 1 || arg == 2 || arg == 3) {
        this.showWhich = arg;
      }
    },
    selProvince(item) {
      this.provinceSelect = item.cityName;
      if (item.ID == 1 || item.ID == 3 || item.ID == 4) {
        this.selCity(item);
        return;
      }
      this.pickerShow = true;
      this.provinceId = item.id;
      this.$http.post('/ms/user/searchfromcity', {
        parentId: item.id
      },
      { emulateJSON: true }).then(res => {
        if (!res.data) return;
        let data = res.data.data;
        this.city = data;
      })
    },
    fnProvinceSelect (item) {
      this.citySelect = '';
      this.provinceSelect = '';
      if (this.provinceSelect == '北京' || this.provinceSelect == '天津' || 　this.provinceSelect == '上海' || item.cityName == '重庆') {
        this.userInfo.addr = item.cityName;
        this.userInfo.provinceId = item.id;
        this.addressShow = false;
        return;
      }
      this.pickerShow = !this.pickerShow;
    },
    selCity(item) {
      this.addressShow = false;
      if (item.cityName == '北京' || item.cityName == '天津' || item.cityName == '上海' || item.cityName == '重庆') {
        this.userInfo.addr = item.cityName + ' ';
        this.userInfo.provinceId = item.id;
        this.userInfo.cityId = '';
        this.userInfo.city = '';
        return;
      }
      this.citySelect = item.cityName;
      this.userInfo.addr = this.provinceSelect + ' ' + this.citySelect;
      this.cityId = item.id;
    },
    isPhone (str) {
      let regPhone = /(1[3-9]\d{9}$)/;
      return regPhone.test(str)
    },
    changeDate () {
      this.$refs.birthPicker.open();
    },
    onSexChange (picker, value) {
      this.userInfo.sex = 'nan';
      let checkText = picker.getValues(value)[0];
      this.userInfo.sex = checkText;
      if(checkText == '男') {
        this.userInfo.sexType = 0;
      } else {
        this.userInfo.sexType = 1;
      }
    },
    confirmDate (value) {
      let nowDate = new Date(value);
      let selectYear = nowDate.getFullYear();
      let selectMonth = (nowDate.getMonth() + 1) < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1);
      let selectDate = (nowDate.getDate() < 10) ? '0' + nowDate.getDate() : nowDate.getDate();
      let date = selectYear + '-' + selectMonth + '-' + selectDate;
      this.userInfo.birth = date;
    },
    saveUserInfo (type) {
      this.btnSubCheck = true;
      if(this.userInfo.nickName === '') {
        this.btnSubCheck = false;
        Toast({ message: '昵称不能为空', position: 'top', duration: 1500 }); return;
      }
      if(this.userInfo.trueName === '' || this.userInfo.trueName == null) {
        this.btnSubCheck = false;
        Toast({ message: '姓名不能为空', position: 'top', duration: 1500 }); return;
      }
      let userEditedInfo = {
        userName: this.userInfo.nickName,
        trueName: this.userInfo.trueName,
        mobile: this.userInfo.mobile,
        sex: this.userInfo.sexType,
        birthDay: this.userInfo.birth,
        pubUserCpyName: this.userInfo.pubUserCpyName,
        cpyLicence: this.imgSrc,
        area: this.userInfo.area,
        province: this.provinceSelect ? this.provinceSelect : this.userInfo.province,
        city: this.citySelect ? this.citySelect : this.userInfo.city,
        provinceId: this.provinceId ? this.provinceId : this.userInfo.provinceId,
        cityId: this.cityId ? this.cityId : this.userInfo.cityId
      }
      if(type == 1) {
        this.btnSubCheck = false;
        this.$http.post(
          '/ms/user/edit_info', userEditedInfo,
        ).then(res => {
          if(res.data.status !== 200) {
            if(res.data.status === 100000) {
              this.$router.push({path: '/form-login'});
              Toast({ message: res.data.msg, position: 'top', duration: 1500 }); return;
            } else {
              Toast({ message: res.data.msg, position: 'top', duration: 1500 }); return;
            }
          } else {
            Toast({ message: '保存成功', position: 'top', duration: 1500 }); return;
          }
        });
      } else if(type == 2) {
        this.btnSubCheck = false;
        if(this.userInfo.pubUserCpyName === '') {
          this.btnSubCheck = false;
          Toast({ message: '公司名称不能为空', position: 'top', duration: 1500 }); return;
        }
        if(this.imgSrc === '') {
          this.btnSubCheck = false;
          Toast({ message: '请上传营业执照图片', position: 'top', duration: 1500 }); return;
        }
        this.$http.post(
          '/ms/user/edit_info', userEditedInfo,
        ).then(res => {
          if(res.data.status !== 200) {
            if(res.data.status === 100000) {
              this.$router.push({path: '/form-login'});
              Toast({ message: res.data.msg, position: 'top', duration: 1500 }); return;
            } else {
              Toast({ message: res.data.msg, position: 'top', duration: 1500 }); return;
            }
          } else {
            Toast({ message: '保存成功', position: 'top', duration: 1500 }); return;
          }
        });
      } else {
        if(this.userInfo.pubUserCpyName === '') {
          this.btnSubCheck = false;
          Toast({ message: '公司名称不能为空', position: 'top', duration: 1500 }); return;
        }
        if(this.imgSrc === '') {
          this.btnSubCheck = false;
          Toast({ message: '请上传营业执照图片', position: 'top', duration: 1500 }); return;
        }
        userEditedInfo.isCheck = 1;
        this.$http.post(
          '/ms/user/edit_info', userEditedInfo,
        ).then(res => {
          if(res.data.status !== 200) {
            this.btnSubCheck = false;
            if(res.data.status === 100000) {
              this.$router.push({path: '/form-login'});
              Toast({ message: res.data.msg, position: 'top', duration: 1500 }); return;
            } else {
              Toast({ message: res.data.msg, position: 'top', duration: 1500 }); return;
            }
          } else {
            this.userInfo.isOk = 0;
            this.userInfo.memberType = 2;
            this.userInfo.credentialImage = this.imgSrc;
            Toast({ message: '提交成功', position: 'top', duration: 1500 }); return;
          }
        });
      }
    },
    nextSetNew () {
      if(this.fullTel !== this.userInfo.trueMobile) {
        Toast({ message: '手机号码不匹配，请重输', position: 'top', duration: 1500 }); return;
      } else {
        this.setNewTel = true;
      }
    },
    sendMsg () {
      this.btnMagDis = true;
      if(this.tel === '') {
        this.btnMagDis = false;
        Toast({ message: '请填写手机号码', position: 'top', duration: 1500 }); return;
      }
      if(this.tel !== '' && !this.$options.methods.isPhone(this.tel)) {
        this.btnMagDis = false;
        Toast({ message: '手机号格式不正确', position: 'top', duration: 1500 }); return;
      }
      if(this.tel == this.userInfo.trueMobile) {
        this.btnMagDis = false;
        Toast({ message: '新手机号码不能为原手机号', position: 'top', duration: 1500 }); return;
      }
      this.$http.post(
        '/ms/regist/code', {openId: this.tel}
      ).then(res => {
        const timeCount = 60;
        if (!this.timer) {
          this.count = timeCount;
          this.btnMagDis = true;
          this.btnTxt = this.count + 's后重新发送';
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= timeCount) {
              this.count--;
              this.btnTxt = this.count + 's后重新发送';
            } else {
              clearInterval(this.timer);
              this.timer = null;
              this.btnTxt = '发送验证码';
              this.btnMagDis = false;
            }
          }, 1000);
        }
      });
    },
    saveNewTel () {
      if(this.tel === '') {
        Toast({ message: '请填写手机号码', position: 'top', duration: 1500 }); return;
      }
      if(this.tel !== '' && !this.$options.methods.isPhone(this.tel)) {
        Toast({ message: '手机号格式不正确', position: 'top', duration: 1500 }); return;
      }
      if(this.tel == this.userInfo.trueMobile) {
        Toast({ message: '新手机号码不能为原手机号', position: 'top', duration: 1500 }); return;
      }
      if(this.smsCode === '') {
        Toast({ message: '请输入验证码', position: 'top', duration: 1500 }); return;
      }
      let objNewTel = {
        mobile: this.tel,
        code: this.smsCode
      }
      this.$http.post(
        '/ms/user/editmobile', objNewTel,
      ).then(res => {
        if(res.data.status !== 200) {
          if(res.data.status === 100000) {
            this.$router.push({path: '/form-login'});
            Toast({ message: res.data.msg, position: 'top', duration: 1500 }); return;
          } else {
            Toast({ message: res.data.msg, position: 'top', duration: 1500 }); return;
          }
        } else {
          window.location.reload();
          Toast({ message: '操作成功', position: 'top', duration: 1500 }); return;
        }
      });
    },
    peerPopup () {
      if(this.userInfo.trueName === '' || this.userInfo.trueName == null) {
        Toast({ message: '请填写真实姓名', position: 'top', duration: 1500 }); return;
      }
      //this.$store.dispatch('saveUser');
      this.popupPeerCnas = true;
    },

    /*上传相关方法开始*/
    onBeforeQueued (file, files) {
      if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(file.type) < 0) {
        Toast({message: '格式不正确，请重新选择', position: 'top', duration: 1500}); return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        Toast({message: '请上传不超过10M的图片', position: 'top', duration: 1500}); return false;
      }
      if (files.length > 1) { // 防止一下子选择过多文件
        Toast({message: '只能上传1张图片，请重新选择', position: 'top', duration: 1500}); return false;
      }
      if (this.uploadCounted + 1 > this.uploadCount) {
        Toast({message: '最多只能上传1张图片', position: 'top', duration: 1500}); return false;
      }
    },
    onQueued (file) {},
    onBeforeSend (file, data, headers) {
      // if (!isWeiXin()) {
        data.token = this.uptoken.token;
        let me = this.$store.getters["getUser"];
        let baseInfo = this.$store.getters["getSiteInfo"];
        let fileType = file.name.split('.')[1];
        data.key = 'files/ms/station/' + baseInfo.erpID + '/images/' + new Date().getTime() + '.' + fileType;
        this.imgSrc = this.uptoken.dn+'/' + data.key;
        headers['Authorization'] = "UpToken  " + this.uptoken.token;
      // } else {
      //   console.log();
      // }
    },
    onProgress (file, procent) {
    },
    onSuccess (file, ret) {},
    onError(file, err) {
      // return true; // 阻止默认行为，不使用默认的失败态
    },
    onDelete(file, cb) {
      MessageBox.confirm('确定移除此文件?').then(action => {
        this.uploadCounted--;
        this.imgSrc = '';
        cb(true); //移除文件
      }).catch(() => {
        cb(false); //不移除文件，此处可以不调用
      })
    },
    onInputClick (vm) {
      let _this = this;
      if (isWeiXin() && wx) {
        wx.chooseImage({
          count: 1, // 最多选择一张图片
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) { // 选择图片成功
            let localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            vm.uploading = true; // 正在上传图片
            // 设置图片显示
            wx.uploadImage({
              localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                let serverId = res.serverId; // 返回图片的服务器端ID
                // _this.onSuccess();
                let uptoken = _this.uptoken;
                let src = 'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=' + uptoken.wx_accessToken + '&media_id=' + serverId;
                vm.fileCtns.push({
                  img: src,
                  show: false,
                  status: 0,
                  file: {
                    id: vm.fileCtns.length,
                  }
                });
                vm.onSuccess(serverId); // 上传成功回调成功接口
                vm.uploading = false; // 上传图片完成
              },
              fail() {
                vm.onError(); // 上传失败回调接口
              }
            });
          }
        });
      } else {
        throw "不在微信浏览器,不应调用此方法";
      }
    },
  },
  components: {
    "my-uploader": Uploader,
  }
}
</script>

<style lang="css">
#btnSave{ margin-top: 1px;}
.userinfo-box{ height: 100%; padding-top: 40px; box-sizing: border-box;}
.userinfo-box .mint-cell-title{ text-align: left;}
.userinfo-box .mint-cell-wrapper{ background-origin: border-box;}
.userinfo-box .mint-cell-wrapper input{ text-align: left;}
.userinfo-box .mint-cell-wrapper .is-link span{ color: #000;}
.userinfo-box .mint-popup-right{ position: absolute; width: 100%; height: 100%;}
.userinfo-box .content{ padding-top: 40px;}
.userinfo-box .mint-popup-bottom{ width: 100%;}
.userinfo-box .base-info{
    padding: 0 .625rem;
}
.userinfo-box .page-btn-groups {
    padding: 0;
}
.userinfo-box .peerInfo {
    padding: 0 .625rem;
}
.userinfo-box .checktel-box{ padding: 40px 20px 20px;}
.sex-picker{ width: 100%;}

.licence{ position: relative; height: 200px;}
.licence .weui-uploader__info{ display: none;}

.show-image{ height: 180px; padding: 10px; margin: 10px; border: 1px solid #d9d9d9;}
.show-image img{ height: 180px;}
.imgpop-wraper{ display: none; position: absolute; top: 0; left: 0; z-index: 10000; width: 100%; height: 100%; padding: 10px; background: #000; box-sizing: border-box;}
.imgpop-wraper.toggle-image{ display: block;}
.imgpop-wraper img{ position: absolute; top: 50%; left: 0; width: 100%; transform: translateY(-50%);}
.imgpop-wraper .close{ position: absolute; bottom: 15px; right: 10px; left: 50%; width: 22px; height: 22px; margin-left: -11px; background: url('../../assets/images/close.png'); background-size: contain;}
</style>
