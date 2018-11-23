<template>
    <div class="shop-editer-page" :class="{scroll: codeShow}">
        <mt-header fixed title="我的店铺">
            <router-link to="/user-center" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <router-link to="/store-member" slot="right">
                <mt-button>我的会员</mt-button>
            </router-link>
        </mt-header>
        <div class="scroll-box city-list">
            <!-- 选择项 -->
            <div class="choice-list section">
                <div class="item head">
                    <span class="title">基本信息</span>
                </div>
                <mt-field label="店铺名称" placeholder="请输入店铺名称(2~10个字符)" v-model="shop.storeName"></mt-field>
                <div class="shop-item">
                    <div class="title">店铺链接</div>
                    <div class="shop-link">
                        <a id="href" class="href" :href="shop.storeUrl">{{shop.storeUrl}}</a>
                        <input class="input" type="text" id="copyInput">
                        <a class="copy" @click.self="copyText()">复制</a>
                    </div>
                </div>
                <div class="pic">
                    <div class="info">
                        <div class="title">店铺头像</div>
                        <div class="notice">请点击图片进行上传或修改,建议尺寸:64px*64px</div>
                    </div>
                    <div class="upload preview">
                        <uploader
                            class="uploader"
                            :fileImg="cpyImg"
                            title=""
                            :tmpl="tmpl1"
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
                            :onBeforeSend="onBeforeSendAvatar"
                            :onProgress="onProgress"
                            :onSuccess="onSuccess"
                            :onError="onError"
                            :onDelete="onDelete"
                            :inputCtr="isWeiXin"
                            :onInputClick="onInputClick"
                            ref="uploader"></uploader>
                        <img id="storeImg" v-if="shop.storeImg && storeImgLoading" class="img-preview" :src="shop.storeImg">
                    </div>
                    
                </div>
                <div class="pic">
                    <div class="info">
                        <div class="title">店招图片</div>
                        <div class="notice">请点击图片进行上传或修改,建议尺寸:370px*130px</div>
                    </div>
                    <div class="upload preview">
                        <uploader
                            class="uploader"
                            :fileImg="cpyImg"
                            title=""
                            :tmpl="tmpl2"
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
                            :onBeforeSend="onBeforeSendBanner"
                            :onProgress="onProgress"
                            :onSuccess="onSuccess"
                            :onError="onError"
                            :onDelete="onDelete"
                            :inputCtr="isWeiXin"
                            :onInputClick="onInputClick"
                            ref="uploader"></uploader>
                        <img id="storeBackImg" v-if="shop.storeBackImg && storeBackImgLoading" class="img-preview" :src="shop.storeBackImg">
                    </div>
                </div>
                <div class="pic">
                    <div class="info">
                        <div class="title">店铺二维码</div>
                        <div class="notice">长按二维码保存或分享</div>
                    </div>
                    <div @click="codeShow=true" class="preview">
                        <img :src="`https://qrcode.op110.com.cn/qrcode?text=${shop.storeUrlEncode}&h=300`" class="dataCode-preview">
                    </div>
                </div>
            </div>

            <!-- 价格配置 -->
            <div v-if="true" class="choice-list section">
                <div class="item head">
                    <span class="title">价格配置</span>
                </div>
                <mt-field class="no-bottom-border" label="增减价格" :placeholder="shop.storeAddPrice || '+0'" v-model="shop.storeAddPrice"></mt-field>
            </div>

            <!-- 功能配置 -->
            <div v-if="true" class="choice-list section">
                <div class="item head">
                    <span class="title head">功能配置</span>
                </div>
                <div class="item">
                    <span class="title">是否开启在线下单与注册</span>
                    <span class="reload"><mt-switch class="custom-switch-height" v-model="shop.allowRegist"></mt-switch>
                    </span>
                </div>
            </div>

            <div class="button-wrapper">
                <mt-button type="primary" @click.native="saveShop">保存</mt-button>
            </div>

            <div class="point">
                <p class="title">提示:请将您的店铺链接或二维码分享给直客进行访问</p>
                <P class="info">直客在访问过程中仅会通过您的店铺查看产品,并且游客无法与供应商联系.</P>
            </div>
        </div>
        

        <!-- 二维码预览 -->
        <div v-if="codeShow" class="code-preview">
            <img :src="`https://qrcode.op110.com.cn/qrcode?text=${shop.storeUrlEncode}&h=300`" class="dataCode-preview">
            <div class="closed" @click="codeShow = false">
                <i class="iconfont icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {Toast, MessageBox} from "mint-ui"
import {Vuex, mapGetters} from 'vuex'
import uploader from "../components/uploader";
export default {
    data() {
        return {
            tmpl1: 1,
            tmpl2: 1,
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
            cpyImg: [],
            storeImgLoading: true,
            storeBackImgLoading: true,
            storeImgHeight: '',
            storeBackImgHeight: '',
            codeShow: false
        }
    },
    methods: {
        /* 按钮复制 */
        copyText() {
            let href = document.getElementById('href').href
            let copyInput = document.getElementById('copyInput')
            copyInput.value = href         
            copyInput.select()
            document.execCommand('Copy')
            Toast({ message: '已复制', position: 'top', duration: 1500 })
        },
        /* 检查填写的店铺信息 */
        checkShop() {
            if(!this.shop.storeName) {
                Toast({ message: '店铺名称不能为空', position: 'top', duration: 1500 })
                return false
            } else if(this.shop.storeName && (this.shop.storeName.length < 2 || this.shop.storeName.length >10)) {
                Toast({ message: '你输入的店铺名称不符合字符长度限制', position: 'top', duration: 1500 })
                return false
            } else if(!this.shop.storeImg) {
                Toast({ message: '请上传店铺头像', position: 'top', duration: 1500 })
                return false
            } else if(!this.shop.storeBackImg) {
                Toast({ message: '请上传店招图片', position: 'top', duration: 1500 })
                return false
            } else {
                return true
            }
        },
        /* 保存店铺信息 */
        saveShop() {
            if(this.checkShop()) {
                if(this.shop.allowRegist === false) {
                    this.shop.allowRegist = 0
                } else if(this.shop.allowRegist === true) {
                    this.shop.allowRegist = 1
                }
                this.$http.post('/ms/store/baseInfo/edit',
                    this.shop
                ).then(res => {
                    if(res.data.status === 200) {
                        this.storeImgLoading = false
                        this.storeBackImgLoading = false
                        let result = res.data.data
                        Toast({ message: '店铺信息保存成功', position: 'top', duration: 1500 })
                        this.shopInfo()
                        this.$router.push({path: '/user-center'})
                    }
                })
            }
        },
        /* 获取店铺信息 */
        shopInfo () {
            this.$http.get('/ms/store/baseInfo/info'
            ).then(res => {
                if (res.data.status === 200) {
                    let result = res.data.data
                    if (result) {
                        this.$store.commit('setShop', result)
                    }
                } else if(res.data.status === 100000) {
                    Toast({ message: res.data.msg, position: 'top', duration: 1500 })
                    this.$router.push({path: '/form-login'})
                }
            })
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
        onBeforeSendAvatar (file, data, headers) {
        // if (!isWeiXin()) {
            data.token = this.uptoken.token;
            let me = this.$store.getters["getUser"];
            let baseInfo = this.$store.getters["getSiteInfo"];
            let fileType = file.name.split('.')[1];
            data.key = 'files/ms/station/' + baseInfo.erpID + '/images/' + new Date().getTime() + '.' + fileType;
            let sourceLink = this.uptoken.dn+'/' + data.key;
            this.storeImgLoading = false
            // document.querySelector('.weui-uploader_tmpl1__bd').style.display='none'
            this.$store.commit('updateShop', {key: 'storeImg', val: sourceLink})
            headers['Authorization'] = "UpToken  " + this.uptoken.token;
        // } else {
        //   console.log();
        // }
        },
        onBeforeSendBanner (file, data, headers) {
        // if (!isWeiXin()) {
            data.token = this.uptoken.token;
            let me = this.$store.getters["getUser"];
            let baseInfo = this.$store.getters["getSiteInfo"];
            let fileType = file.name.split('.')[1];
            data.key = 'files/ms/station/' + baseInfo.erpID + '/images/' + new Date().getTime() + '.' + fileType;
            let sourceLink = this.uptoken.dn+'/' + data.key;
            this.storeBackImgLoading = false
            this.$store.commit('updateShop', {key: 'storeBackImg', val: sourceLink})
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
                throw "不在微信浏览器,不应调用此方法"
            }
        },
    },
    computed: {
        ...mapGetters([
            'shop'
        ]),
        isWeiXin() {
            return !isWeiXin();
        },
        uptoken() {
            return this.$store.getters['tokenCard'];
        }
    },
    components: {
        uploader
    },
    created() {
        this.$store.dispatch('tokenCardUpload').then(uptoken => {
            if (isWeiXin()) {
                wx.config({
                // debug: true,
                appId: uptoken.wx_appid,
                timestamp: uptoken.wx_timestamp,
                nonceStr: uptoken.wx_noncestr,
                signature: uptoken.wx_signature,
                jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2,
                })
            }
        })
    },
    mounted() {
        /* 获取店铺信息 */
        this.shopInfo()
        setTimeout(() => {
            this.storeImgHeight = document.getElementById('storeImg').height
            this.storeBackImgHeight = document.getElementById('storeBackImg').height
        }, 1000)
        
        
    }
}
</script>

<style scoped lang="scss">
@import './shop-editer.scss';
</style>
