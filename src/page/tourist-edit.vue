<template>
    <div class="tourist-edit-page page-wrapper">
        <mt-header fixed title="编辑名单">
            <mt-button icon="back" @click.native="back()" slot="left"></mt-button>
        </mt-header>
        <div class="scroll-box tourist-edit-content">
            <div class="edit-tab">
                <transition name="slide-fade">
                    <div @click="idType = '01'" class="edit-item" :class="{active: idType === '01'}">
                        身份证
                    </div>
                </transition>
                <transition name="slide-fade">
                    <div @click="idType = '03'" class="edit-item" :class="{active: idType === '03'}">
                        护照
                    </div>
                </transition>
                <transition name="slide-fade">
                    <div @click="idType = '09'" class="edit-item" :class="{active: idType === '09'}">
                        台湾通行证
                    </div>
                </transition>
                <transition name="slide-fade">
                    <div @click="idType = '99'" class="edit-item" :class="{active: idType === '99'}">
                        其他
                    </div>
                </transition>
            </div>

            <!-- 身份证 -->
            <div v-if="idType === '01'">
                <div class="id-form">
                    <mt-field id="cnName" label="中文名" placeholder="请输入您的中文名" v-model="idInfo.cnName"></mt-field>
                    <mt-field label="英文名" placeholder="请输入您的英文名" v-model="idInfo.enName2"></mt-field>
                    <mt-field label="英文姓" placeholder="请输入您的英文姓" v-model="idInfo.enName1"></mt-field>
                    <mt-field label="身份证号" placeholder="请输入您的身份证号" @keyup.native="auto(idInfo.idcard, 'idInfo')" v-model="idInfo.idcard"></mt-field>
                    <mt-cell @click.native="idSexVisible = true" title="性别" is-link :value="idInfo.sex"></mt-cell>
                    <mt-cell @click.native="open('idpickerBirth')" title="出生日期" is-link :value="idInfo.birth | YYYY-MM-DD"></mt-cell>
                    <mt-field label="手机号码" placeholder="请输入您的手机号码" v-model="idInfo.ctInfo"></mt-field>
                    <!-- <mt-field label="住址" placeholder="请输入您的住址" type="textarea" rows="5" v-model="idInfo.address"></mt-field> -->
                </div>
                <div v-if="touristLock === 0 " class="button-wrapper">
                    <mt-button type="primary" @click="submitId()">保存</mt-button>
                </div>
            </div>
            
            
            
            <!-- 护照 -->
            <div v-if="idType === '03'">
                <div class="passPort-form">
                    <mt-field label="护照号码" placeholder="请输入您的护照号码" v-model="passInfo.passport"></mt-field>
                    <mt-field label="中文名" placeholder="请输入您的中文名" v-model="passInfo.cnName"></mt-field>
                    <mt-field label="英文名" placeholder="请输入您的英文名" v-model="passInfo.enName2"></mt-field>
                    <mt-field label="英文姓" placeholder="请输入您的英文姓" v-model="passInfo.enName1"></mt-field>
                    <mt-field label="身份证号" placeholder="请输入您的身份证号" @keyup.native="auto(passInfo.idcard, 'passInfo')" v-model="passInfo.idcard"></mt-field>
                    <mt-cell title="出生日期" is-link @click.native="open('pickerBirth')" :value="passInfo.birth | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="性别" is-link @click.native="passSexVisible = true" v-model="passInfo.sex"></mt-cell>
                    <mt-field label="手机" placeholder="请输入您的手机号码" type="tel" v-model="passInfo.ctInfo"></mt-field>
                    <!-- <mt-field label="住址" placeholder="请输入您的住址" type="textarea" rows="4" v-model="passInfo.address"></mt-field> -->
                    <mt-cell title="签发日期" is-link @click.native="open('pickerIssued')" :value="passInfo.doi | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="有效期" is-link @click.native="open('pickerValidity')" :value="passInfo.doe | YYYY-MM-DD"></mt-cell>
                </div>
                <div v-if="touristLock === 0" class="button-wrapper"><mt-button type="primary" @click.native="submitPassport('passInfo')">保存</mt-button></div>
            </div>
            

            <!-- 台湾通行证 -->
            <div v-if="idType === '09'">
                <div class="passPort-form">
                    <mt-field label="证件号" placeholder="请输入您的证件号" v-model="taiwanInfo.passport"></mt-field>
                    <mt-field label="中文名" placeholder="请输入您的中文名" v-model="taiwanInfo.cnName"></mt-field>
                    <mt-field label="英文名" placeholder="请输入您的英文名" v-model="taiwanInfo.enName2"></mt-field>
                    <mt-field label="英文姓" placeholder="请输入您的英文姓" v-model="taiwanInfo.enName1"></mt-field>
                    <mt-field label="身份证号" placeholder="请输入您的身份证号" @keyup.native="auto(taiwanInfo.idcard, 'taiwanInfo')" v-model="taiwanInfo.idcard"></mt-field>
                    <mt-cell title="出生日期" is-link @click.native="open('taiwanpickerBirth')" :value="taiwanInfo.birth | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="性别" is-link @click.native="passSexVisible = true" v-model="taiwanInfo.sex"></mt-cell>
                    <mt-field label="手机" placeholder="请输入您的手机号码" type="tel" v-model="taiwanInfo.ctInfo"></mt-field>
                    <mt-cell title="签发日期" is-link @click.native="open('taiwanpickerIssued')" :value="taiwanInfo.doi | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="有效期" is-link @click.native="open('taiwanpickerValidity')" :value="taiwanInfo.doe | YYYY-MM-DD"></mt-cell>
                </div>
                <div v-if="touristLock === 0" class="button-wrapper"><mt-button type="primary" @click.native="submitPassport('taiwanInfo')">保存</mt-button></div>
            </div>

            <!-- 其他证 -->
            <div v-if="idType === '99'">
                <div class="passPort-form">
                    <mt-field label="证件号" placeholder="请输入您的证件号" v-model="otherInfo.passport"></mt-field>
                    <mt-field label="中文名" placeholder="请输入您的中文名" v-model="otherInfo.cnName"></mt-field>
                    <mt-field label="英文名" placeholder="请输入您的英文名" v-model="otherInfo.enName2"></mt-field>
                    <mt-field label="英文姓" placeholder="请输入您的英文姓" v-model="otherInfo.enName1"></mt-field>
                    <mt-field label="身份证号" placeholder="请输入您的身份证号" @keyup.native="auto(otherInfo.idcard, 'otherInfo')" v-model="otherInfo.idcard"></mt-field>
                    <mt-cell title="出生日期" is-link @click.native="open('otherpickerBirth')" :value="otherInfo.birth | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="性别" is-link @click.native="passSexVisible = true" v-model="otherInfo.sex"></mt-cell>
                    <mt-field label="手机" placeholder="请输入您的手机号码" type="tel" v-model="otherInfo.ctInfo"></mt-field>
                    <mt-cell title="签发日期" is-link @click.native="open('otherpickerIssued')" :value="otherInfo.doi | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="有效期" is-link @click.native="open('otherpickerValidity')" :value="otherInfo.doe | YYYY-MM-DD"></mt-cell>
                </div>
                <div v-if="touristLock === 0" class="button-wrapper"><mt-button type="primary" @click.native="submitPassport('otherInfo')">保存</mt-button></div>
            </div>
   
            <!-- 身份证-底部弹层-出生日期 -->
            <mt-datetime-picker
                ref="idpickerBirth"
                type="date"
                :startDate="startDate"
                :endDate="endDate"
                v-model="idInfo.birth"
                @confirm="handleChange">
            </mt-datetime-picker>

            <!-- 身份证-底部弹层-性别 -->
            <mt-popup v-model="idSexVisible" position="bottom" class="mint-popup-4 sex-popup">
                <mt-radio
                    class="page-part custom-cell-title-full"
                    v-model="idInfo.sex"
                    :options="sexOptions" />
            </mt-popup>

            <!-- 护照-底部弹层-性别 -->
            <mt-popup v-model="passSexVisible" position="bottom" class="mint-popup-4 sex-popup">
                <mt-radio
                    class="page-part custom-cell-title-full"
                    v-model="passInfo.sex"
                    :options="sexOptions" />
            </mt-popup>

            <!-- 护照-底部弹层-出生日期 -->
            <mt-datetime-picker
                ref="pickerBirth"
                type="date"
                v-model="passInfo.birth"
                :startDate="startDate"
                :endDate="endDate"
                @confirm="handleChange">
            </mt-datetime-picker>

            <!-- 护照-底部弹层-签发日期 -->
            <mt-datetime-picker
                ref="pickerIssued"
                type="date"
                :startDate="startDate"
                :endDate="passEndDate"
                v-model="passInfo.doi"
                @confirm="handleChange">
            </mt-datetime-picker>

            <!-- 护照-底部弹层-有效期 -->
            <mt-datetime-picker
                ref="pickerValidity"
                type="date"
                :startDate="startDate"
                :endDate="passEndDate"
                v-model="passInfo.doe"
                @confirm="handleChange">
            </mt-datetime-picker>

            <!-- 台湾通行证-底部弹层-性别 -->
            <mt-popup v-model="passSexVisible" position="bottom" class="mint-popup-4 sex-popup">
                <mt-radio
                    class="page-part custom-cell-title-full"
                    v-model="taiwanInfo.sex"
                    :options="sexOptions" />
            </mt-popup>

            <!-- 台湾通行证-底部弹层-出生日期 -->
            <mt-datetime-picker
                ref="taiwanpickerBirth"
                type="date"
                v-model="taiwanInfo.birth"
                :startDate="startDate"
                :endDate="endDate">
            </mt-datetime-picker>

            <!-- 台湾通行证-底部弹层-签发日期 -->
            <mt-datetime-picker
                ref="taiwanpickerIssued"
                type="date"
                :startDate="startDate"
                :endDate="passEndDate"
                v-model="taiwanInfo.doi">
            </mt-datetime-picker>

            <!-- 台湾通行证-底部弹层-有效期 -->
            <mt-datetime-picker
                ref="taiwanpickerValidity"
                type="date"
                :startDate="startDate"
                :endDate="passEndDate"
                v-model="taiwanInfo.doe">
            </mt-datetime-picker>

            <!-- 其他-底部弹层-性别 -->
            <mt-popup v-model="passSexVisible" position="bottom" class="mint-popup-4 sex-popup">
                <mt-radio
                    class="page-part custom-cell-title-full"
                    v-model="otherInfo.sex"
                    :options="sexOptions" />
            </mt-popup>

            <!-- 其他-底部弹层-出生日期 -->
            <mt-datetime-picker
                ref="otherpickerBirth"
                type="date"
                v-model="otherInfo.birth"
                :startDate="startDate"
                :endDate="endDate">
            </mt-datetime-picker>

            <!-- 其他-底部弹层-签发日期 -->
            <mt-datetime-picker
                ref="otherpickerIssued"
                type="date"
                :startDate="startDate"
                :endDate="passEndDate"
                v-model="otherInfo.doi">
            </mt-datetime-picker>

            <!-- 其他-底部弹层-有效期 -->
            <mt-datetime-picker
                ref="otherpickerValidity"
                type="date"
                :startDate="startDate"
                :endDate="passEndDate"
                v-model="otherInfo.doe">
            </mt-datetime-picker>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// let pinyin = require('pinyin')
import {Toast} from "mint-ui"
import {MessageBox} from 'mint-ui'
import moment from 'moment'
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default {
    name: 'touristEdit',
    data() {
        return {
            idInfo: {
                ordId: '',
                idType: '01',
                cnName: '',
                enName2: '',
                enName1: '',
                idcard: '',
                sex: '',
                birth: '',
                ctInfo: '',
                address: '',
            },
            passInfo: {
                ordId: '',
                passport: '',
                idType: '03',
                cnName: '',
                enName2: '',
                enName1: '',
                sex: '',
                idcard: '',
                birth: '',
                ctInfo: '',
                address: '',
                doi: '',
                doe: '',
            },
            taiwanInfo: {
                ordId: '',
                passport: '',
                idType: '09',
                cnName: '',
                enName2: '',
                enName1: '',
                sex: '',
                idcard: '',
                birth: '',
                ctInfo: '',
                address: '',
                doi: '',
                doe: '',
            },
            otherInfo: {
                ordId: '',
                passport: '',
                idType: '99',
                cnName: '',
                enName2: '',
                enName1: '',
                sex: '',
                idcard: '',
                birth: '',
                ctInfo: '',
                address: '',
                doi: '',
                doe: '',
            },
            startDate: new Date(1940, 0, 1),
            endDate: new Date(),
            passEndDate: new Date(2058, 12, 1),
            tourist: '',
            value1: '',
            idSexVisible: false,
            passSexVisible: false,
            dateVisible: false,
            idType: ''
        }
    },
    created () {
        this.sexOptions = ['男', '女']
        this.getOrderDetail(this.$route.query.orderId)
    },
    methods: {
        /* 中文转拼音 */
        zhToEn(value, str) {
            let strArr = pinyin(value, {
                style: pinyin.STYLE_NORMAL
            })
            let obj = this[str]
            if (/^[\u4E00-\u9FA5]{2,3}$/.test(value)) {
                obj.enName1 = strArr.slice(0,1).join('')
                obj.enName2 = `${strArr.slice(1,2).join('')} ${strArr.slice(2,3).join('')}`
            } else if (/^[\u4e00-\u9fa5]{4,}$/.test(value)) {
                obj.enName1 = `${strArr.slice(0,1).join('')} ${strArr.slice(1,2).join('')}`
                obj.enName2 = `${strArr.slice(2,3).join('')} ${strArr.slice(3,5).join('')}`
            }
        },
        // 验证中文名是否重复
        repeatName(val, str) {
            /* 输入中文名，带出拼音 */
            // this.zhToEn(val, str)
            if(str === 'idInfo') {
                this.passInfo.cnName = this.idInfo.cnName
            } else if (str === 'passInfo') {
                this.idInfo.cnName = this.passInfo.cnName
            } else if (str === 'taiwanInfo') {
                this.taiwanInfo.cnName = this.taiwanInfo.cnName
            } else if (str === 'otherInfo') {
                this.otherInfo.cnName = this.otherInfo.cnName
            }
        },
        // 根据身份证计算生日和性别
        auto(val, str) {
            if(val && (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(val)) {
                if (parseInt(val.substring(17, 1), 10) % 2 === 1) { 
                    this[str].sex = '男'
                } else { 
                    this[str].sex = '女'
                }
                this[str].birth = new Date(val.substring(6, 10) + "-" + val.substring(10, 12) + "-" + val.substring(12, 14))
            }
        },
        back() {
            MessageBox.confirm('是否要离开此页面?').then(action => {
                if (action === 'confirm') {
                    this.$router.go(-1)
                    this.$store.commit('saveIdtype', this.idType)
                }
            }).catch(error => {
            })
        },
        open (picker) {
            this.$refs[picker].open()
        },
        handleChange (value) {
            Toast({
                message: '已选择 ' + moment(value.toString()).format('YYYY-MM-DD'),
                position: 'bottom'
            })
        },
        /* 获取出游人信息 */
        async getOrderDetail(id) {
            await this.$http.get(
                `/ms/order/${id}`
            ).then(res => {
                if (res.status === 200) {
                    let result = res.data.data.ordUser.filter(item => item.id === parseInt(this.$route.params.id))[0]
                    result.birth = new Date(result.birth)
                    result.doi = new Date(result.doi)
                    result.doe = new Date(result.doe)
                    this.idType = result.idType
                    if(result.idType === '03') {
                        this.passInfo = result
                    } else if(result.idType === '09') {
                        this.taiwanInfo = result
                    } else if (result.idType === '01') {
                        this.idInfo = result
                    } else if (result.idType === '99') {
                        this.otherInfo = result
                    }
                }  else if(res.data.status !== 100) {
                    Toast({ message: res.data.msg, position: 'bottom', duration: 2000 });
                }
            })
        },
        /* 身份证验证 */
        idValidate() {
            if (!this.idInfo.cnName) {
                Toast({message: '中文名称是必填项',position: 'bottom',duration: 5000})
                return false
            } else if(this.idInfo.cnName && this.idInfo.cnName > 21) {
                Toast({message: '中文名字符个数为1至20',position: 'bottom',duration: 5000})
                return false
            } else if (this.idInfo.enName2 && !(/^[a-zA-Z\s]{1,35}$/).test(this.idInfo.enName2)) {
                Toast({message: '英文名仅为字母，个数为1至35',position: 'bottom',duration: 5000})
                return false
            } else if (this.idInfo.enName1 && !(/^[a-zA-Z\s]{1,15}$/).test(this.idInfo.enName1)) {
                Toast({message: '英文姓仅为字母，个数为1至15',position: 'bottom',duration: 5000})
                return false
            } else if (!this.idInfo.idcard) {
                Toast({message: '身份证号是必填项',position: 'bottom',duration: 5000})
                return false
            } else if (this.idInfo.idcard && !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(this.idInfo.idcard)) {
                Toast({message: '请输入合法的身份证号',position: 'bottom',duration: 5000})
                return false
            } else if (!this.idInfo.sex) {
                Toast({message: '性别是必填项',position: 'bottom',duration: 5000})
                return false
            } else if (!this.idInfo.birth) {
                Toast({message: '出生日期是必填项',position: 'bottom',duration: 5000})
                return false
            } else if (!this.idInfo.ctInfo) {
                Toast({message: '手机号码是必填项',position: 'bottom',duration: 5000})
                return false
            } else if (this.idInfo.ctInfo && this.idInfo.ctInfo.length > 20) {
                Toast({message: '手机号码不能超过20个字符',position: 'bottom',duration: 5000})
                return false
            } else if (this.idInfo.address && this.idInfo.address.length > 260) {
                Toast({message: '地址不能超过260个字符', position: 'bottom',duration: 5000})
                return false
            }  else {
                return true
            }
        },
        /* 护照验证 */
        passportValidate(type) {
            let val = this[type]
            let checkType = ''
            if(type === 'passInfo') {
                checkType = '护照'
            } else if (type === 'taiwanInfo') {
                checkType = '台湾通行证'
            } else if (type === 'otherInfo') {
                checkType = '其他'
            }
            if (!val.passport) {
                Toast({message: `${checkType}证件号码是必填项`,position: 'bottom',duration: 5000})
                return false
            } else if (!(/^[a-zA-Z0-9]{3,21}$/).test(val.passport) || !(/^([A-Z]\d{7,9})$/).test(val.passport)) {
                Toast({message: `请输入正确的${checkType}证件号码`,position: 'bottom',duration: 5000})
                return false
            } else if (!val.cnName) {
                Toast({message: '中文名称是必填项',position: 'bottom',duration: 5000})
                return false
            } else if(val.cnName && val.cnName > 21) {
                Toast({message: '中文名字符个数为1至20',position: 'bottom',duration: 5000})
                return false
            } else if (val.enName2 && !(/^[a-zA-Z\s]{1,35}$/).test(val.enName2)) {
                Toast({message: '英文名仅为字母，个数为1至35',position: 'bottom',duration: 5000})
                return false
            } else if (val.enName1 && !(/^[a-zA-Z\s]{1,15}$/).test(val.enName1)) {
                Toast({message: '英文姓仅为字母，个数为1至15',position: 'bottom',duration: 5000})
                return false
            } else if (val.idcard && !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(val.idcard)) {
                Toast({message: '请输入合法的身份证号',position: 'bottom',duration: 5000})
                return false
            } else if (!val.sex) {
                Toast({message: '性别是必填项',position: 'bottom',duration: 5000})
                return false
            } else if (!val.birth) {
                Toast({message: '出生日期是必填项',position: 'bottom',duration: 5000})
                return false
            } else if (!val.ctInfo) {
                Toast({message: '手机号码是必填项',position: 'bottom',duration: 5000})
                return false
            } else if (val.ctInfo && val.ctInfo.length > 20) {
                Toast({message: '手机号码不能超过20个字符',position: 'bottom',duration: 5000})
                return false
            } else if (val.address && val.address.length > 260) {
                Toast({message: '地址不能超过260个字符', position: 'bottom',duration: 5000})
                return false
            } else {
                return true
            }
        },
        /* 身份证信息提交 */
        submitId() {
           if (this.idValidate()) {
                this.idInfo.idType = '01'
                this.idInfo.ordId = this.$route.query.orderId
                this.idInfo.birth = moment(this.idInfo.birth).format('YYYY-MM-DD')
                this.$http.put(`/ms/order/user/${this.$route.params.id}`, 
                    this.idInfo).then(res => {
                    if (res.data.status === 200) {
                        Toast({message: '操作成功',position: 'bottom',duration: 5000});
                        this.$store.commit('saveIdtype', this.idInfo.idType)
                        this.$router.go(-1)
                    } else if(res.data.status !== 100) {
                        Toast({message: res.data.msg,position: 'bottom',duration: 5000});
                    }
                }).catch(error => {
                    Toast({message: error,position: 'bottom',duration: 5000});
                })
            }
            
        },
        /* 护照和台湾通行证提交 */
        submitPassport(type) {
            let obj = this[type]
            if (this.passportValidate(type)) {
                obj.birth = moment(obj.birth).format('YYYY-MM-DD')
                if (!obj.doi) {
                    obj.doi = moment(new Date()).format('YYYY-MM-DD')
                } else {
                    obj.doi = moment(obj.doi).format('YYYY-MM-DD')
                }

                if(!obj.doe) {
                    obj.doe = moment(new Date()).format('YYYY-MM-DD')
                } else {
                    obj.doe = moment(obj.doe).format('YYYY-MM-DD')
                }
                obj.ordId = this.$route.query.orderId
                this.$http.put(`/ms/order/user/${this.$route.params.id}`, 
                    obj).then(res => {
                        if (res.data.status === 200) {
                            Toast({message: '操作成功',position: 'bottom',duration: 5000});
                            this.$store.commit('saveIdtype', this.idInfo.idType)
                            this.$router.go(-1)
                        } else if(res.data.status !== 100) {
                            Toast({message: res.data.msg,position: 'bottom',duration: 5000});
                        }
                }).catch(error => {
                    Toast({message: error,position: 'bottom',duration: 5000});
                })
            }
            
        }
    },
    computed: {
        ...mapGetters([
            'touristLock'
        ])
    }
}
</script>

<style scoped lang="scss">
@import './tourist-edit.scss';
</style>
