<template>
    <div class="tourist-edit-page page-wrapper">
        <mt-header fixed title="编辑名单">
            <mt-button icon="back" @click.native="back()" slot="left"></mt-button>
        </mt-header>
        <div class="scroll-box tourist-edit-content">
            <div class="edit-tab">
                <transition name="slide-fade">
                    <div @click="setIdtype('01')" class="edit-item" :class="{active: selectedIdType === '01'}">
                        身份证
                    </div>
                </transition>
                <transition name="slide-fade">
                    <div @click="setIdtype('03')" class="edit-item" :class="{active: selectedIdType === '03'}">
                        护照
                    </div>
                </transition>
                <transition name="slide-fade">
                    <div @click="setIdtype('09')" class="edit-item" :class="{active: selectedIdType === '09'}">
                        台湾通行证
                    </div>
                </transition>
                <transition name="slide-fade">
                    <div @click="setIdtype('99')" class="edit-item" :class="{active: selectedIdType === '99'}">
                        其他
                    </div>
                </transition>
                
            </div>

            <!-- 身份证 -->
            <div v-if="selectedIdType === '01'">
                <div class="id-form">
                    <mt-field id="cnName" label="中文名" placeholder="请输入您的中文名" v-model="idInfo.cnName"></mt-field>
                    <mt-field label="英文名" placeholder="请输入您的英文名" @keyup.native="passInfo.enName2 = idInfo.enName2" v-model="idInfo.enName2"></mt-field>
                    <mt-field label="英文姓" placeholder="请输入您的英文姓" @keyup.native="passInfo.enName1 = idInfo.enName1" v-model="idInfo.enName1"></mt-field>
                    <mt-field label="身份证号" placeholder="请输入您的身份证号" @keyup.native="auto(idInfo.idcard, 'idInfo')" v-model="idInfo.idcard"></mt-field>
                    <mt-cell @click.native="idSexVisible = true" title="性别" is-link :value="idInfo.sex"></mt-cell>
                    <mt-cell @click.native="open('idpickerBirth')" title="出生日期" is-link :value="idInfo.birth | YYYY-MM-DD"></mt-cell>
                    <mt-field label="手机号码" placeholder="请输入您的手机号码" @keyup.native="passInfo.ctInfo = idInfo.ctInfo" v-model="idInfo.ctInfo"></mt-field>
                    <!-- <mt-field label="住址" placeholder="请输入您的住址" @keyup.native="passInfo.address = idInfo.address" type="textarea" rows="5" v-model="idInfo.address"></mt-field> -->
                </div>
                <div class="button-wrapper"><mt-button type="primary" @click="submitId()">保存</mt-button></div>
            </div>
            
            
            <!-- 护照 -->
            <div v-if="selectedIdType === '03'">
                <div class="passPort-form">
                    <mt-field label="护照号码" placeholder="请输入您的护照号码" v-model="passInfo.passport"></mt-field>
                    <mt-field label="中文名" placeholder="请输入您的中文名" @change.native="repeatName(passInfo.cnName, 'passInfo')" v-model="passInfo.cnName"></mt-field>
                    <mt-field label="英文名" placeholder="请输入您的英文名" @keyup.native="idInfo.enName2 = passInfo.enName2" v-model="passInfo.enName2"></mt-field>
                    <mt-field label="英文姓" placeholder="请输入您的英文姓" @keyup.native="idInfo.enName1 = passInfo.enName1" v-model="passInfo.enName1"></mt-field>
                    <mt-field label="身份证号" placeholder="请输入您的身份证号" @keyup.native="auto(passInfo.idcard, 'passInfo')" v-model="passInfo.idcard"></mt-field>
                    <mt-cell title="出生日期" is-link @click.native="open('pickerBirth')" :value="passInfo.birth | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="性别" is-link @click.native="passSexVisible = true" v-model="passInfo.sex"></mt-cell>
                    <mt-field label="手机" placeholder="请输入您的手机号码" @keyup.native="idInfo.ctInfo = passInfo.ctInfo" type="tel" v-model="passInfo.ctInfo"></mt-field>
                    <!-- <mt-field label="住址" placeholder="请输入您的住址" @keyup.native="idInfo.address = passInfo.address" type="textarea" rows="4" v-model="passInfo.address"></mt-field> -->
                    <mt-cell title="签发日期" is-link @click.native="open('pickerIssued')" :value="passInfo.doi | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="有效期" is-link @click.native="open('pickerValidity')" :value="passInfo.doe | YYYY-MM-DD"></mt-cell>
                </div>
                <div class="button-wrapper"><mt-button type="primary" @click.native="submitPassport('passInfo')">保存</mt-button></div>
            </div>

            <!-- 台湾通行证 -->
            <div v-if="selectedIdType === '09'">
                <div class="passPort-form">
                    <mt-field label="证件号" placeholder="请输入您的证件号" v-model="taiwanInfo.passport"></mt-field>
                    <mt-field label="中文名" placeholder="请输入您的中文名" @change.native="repeatName(taiwanInfo.cnName, 'taiwanInfo')"  v-model="taiwanInfo.cnName"></mt-field>
                    <mt-field label="英文名" placeholder="请输入您的英文名" @keyup.native="idInfo.enName2 = taiwanInfo.enName2" v-model="taiwanInfo.enName2"></mt-field>
                    <mt-field label="英文姓" placeholder="请输入您的英文姓" @keyup.native="idInfo.enName1 = taiwanInfo.enName1" v-model="taiwanInfo.enName1"></mt-field>
                    <mt-field label="身份证号" placeholder="请输入您的身份证号" @keyup.native="auto(taiwanInfo.idcard, 'taiwanInfo')" v-model="taiwanInfo.idcard"></mt-field>
                    <mt-cell title="出生日期" is-link @click.native="open('taiwanpickerBirth')" :value="taiwanInfo.birth | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="性别" is-link @click.native="passSexVisible = true" v-model="taiwanInfo.sex"></mt-cell>
                    <mt-field label="手机" placeholder="请输入您的手机号码" @keyup.native="idInfo.ctInfo = taiwanInfo.ctInfo" type="tel" v-model="taiwanInfo.ctInfo"></mt-field>
                    <!-- <mt-field label="住址" placeholder="请输入您的住址" @keyup.native="idInfo.address = taiwanInfo.address" type="textarea" rows="4" v-model="taiwanInfo.address"></mt-field> -->
                    <mt-cell title="签发日期" is-link @click.native="open('taiwanpickerIssued')" :value="taiwanInfo.doi | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="有效期" is-link @click.native="open('taiwanpickerValidity')" :value="taiwanInfo.doe | YYYY-MM-DD"></mt-cell>
                </div>
                <div class="button-wrapper"><mt-button type="primary" @click.native="submitPassport('taiwanInfo')">保存</mt-button></div>
            </div>

            <!-- 其他 -->
            <div v-if="selectedIdType === '99'">
                <div class="passPort-form">
                    <mt-field label="证件号" placeholder="请输入您的证件号" v-model="otherInfo.passport"></mt-field>
                    <mt-field label="中文名" placeholder="请输入您的中文名" @change.native="repeatName(otherInfo.cnName, 'otherInfo')"  v-model="otherInfo.cnName"></mt-field>
                    <mt-field label="英文名" placeholder="请输入您的英文名" @keyup.native="idInfo.enName2 = otherInfo.enName2" v-model="otherInfo.enName2"></mt-field>
                    <mt-field label="英文姓" placeholder="请输入您的英文姓" @keyup.native="idInfo.enName1 = otherInfo.enName1" v-model="otherInfo.enName1"></mt-field>
                    <mt-field label="身份证号" placeholder="请输入您的身份证号" @keyup.native="auto(otherInfo.idcard, 'otherInfo')" v-model="otherInfo.idcard"></mt-field>
                    <mt-cell title="出生日期" is-link @click.native="open('otherpickerBirth')" :value="otherInfo.birth | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="性别" is-link @click.native="passSexVisible = true" v-model="otherInfo.sex"></mt-cell>
                    <mt-field label="手机" placeholder="请输入您的手机号码" @keyup.native="idInfo.ctInfo = otherInfo.ctInfo" type="tel" v-model="otherInfo.ctInfo"></mt-field>
                    <!-- <mt-field label="住址" placeholder="请输入您的住址" @keyup.native="idInfo.address = otherInfo.address" type="textarea" rows="4" v-model="otherInfo.address"></mt-field> -->
                    <mt-cell title="签发日期" is-link @click.native="open('otherpickerIssued')" :value="otherInfo.doi | YYYY-MM-DD"></mt-cell>
                    <mt-cell title="有效期" is-link @click.native="open('otherpickerValidity')" :value="otherInfo.doe | YYYY-MM-DD"></mt-cell>
                </div>
                <div class="button-wrapper"><mt-button type="primary" @click.native="submitPassport('otherInfo')">保存</mt-button></div>
            </div>
   
            <!-- 身份证-底部弹层-出生日期 -->
            <mt-datetime-picker
                ref="idpickerBirth"
                type="date"
                :startDate="startDate"
                :endDate="endDate"
                v-model="idInfo.birth">
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
                :endDate="endDate">
            </mt-datetime-picker>

            <!-- 护照-底部弹层-签发日期 -->
            <mt-datetime-picker
                ref="pickerIssued"
                type="date"
                :startDate="startDate"
                :endDate="passEndDate"
                v-model="passInfo.doi">
            </mt-datetime-picker>

            <!-- 护照-底部弹层-有效期 -->
            <mt-datetime-picker
                ref="pickerValidity"
                type="date"
                :startDate="startDate"
                :endDate="passEndDate"
                v-model="passInfo.doe">
            </mt-datetime-picker>

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
const pinyin = require('pinyin')
// import pinyin from 'pinyin'
import {Toast} from "mint-ui"
import {MessageBox} from 'mint-ui'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
    name: 'touristEdit',
    data() {
        return {
            idInfo: { },
            passInfo: { },
            taiwanInfo: {},
            otherInfo: {},
            startDate: new Date(1940, 0, 1),
            endDate: new Date(),
            passEndDate: new Date(2058, 12, 1),
            idSexVisible: false,
            passSexVisible: false,
            idType: '01',
            currentId: '',
            selectedIdType: '',
            saveEdits: []
        }
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
        setIdtype(val) {
            this.idType = val
            this.selectedIdType = val
            this.$store.commit('setIdtype', {id: this.currentId, idType: val})
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
        timestampToTime (timestamp) {
            let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-'
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            let D = date.getDate() + ' '
            let h = date.getHours() + ':'
            let m = date.getMinutes() + ':'
            let s = date.getSeconds()
            return Y + M + D + h + m + s
        },
        /* 返回上级页面 */
        back() {
            MessageBox.confirm('是否要离开此页面?').then(action => {
                if (action === 'confirm') {
                    this.$router.go(-1)
                    this.$store.commit('saveIdtype', this.idType)
                }
                Toast({message: '已保存你填写的信息',position: 'bottom',duration: 5000})
            }).catch(error => {
            })
        },
        /* 打开mint控件 */
        open (picker) {
            this.$refs[picker].open()
        },
        handleChange (value) {
            Toast({
                message: '已选择 ' + moment(value.toString()).format('YYYY-MM-DD'),
                position: 'bottom'
            })
        },
        // 验证中文名是否重复
        repeatName(val, str) {
            let index = this.editArr.findIndex(item => item.id === this.currentId)
            if (index > 0) {
                this.editArr.slice(0, index).forEach(item => {
                    if(item[str].cnName === val) {
                        Toast({message: '中文名重复了，请核对',position: 'bottom',duration: 3000})
                    }
                })
            }
        },
        // 根据手机系统判断是否启用中文转拼音
        checkSys(type) {
            let phone = this.phoneInfo.system
            let boolean = phone && phone.slice(0,3) === 'iOS' && parseInt(phone.slice(3) ,10) >= 11
            if(boolean) {
                this.zhToEn(this[type].cnName, type)
                Toast({message: `我的${phone.slice(0,3)}${parseInt(phone.slice(3) ,10)}`,position: 'bottom',duration: 3000})
            }
        },
        // 身份证验证
        idValidate() {
            if (!this.idInfo.cnName) {
                Toast({message: '中文名称是必填项',position: 'bottom',duration: 5000})
                return false
            } else if(this.idInfo.cnName && !(this.idInfo.cnName.length < 21 && this.idInfo.cnName.length > 1)) {
                Toast({message: '中文名字符个数为2至20',position: 'bottom',duration: 5000})
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
            } else if (this.idInfo.idcard && !(/(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(this.idInfo.idcard)) {
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
        // 护照, 台湾通行证
        passportValidate(type) {
            let valideObj = this[type]
            let checkType = ''
            if(type === 'passInfo') {
                checkType = '护照'
            } else if (type === 'taiwanInfo') {
                checkType = '台湾通行证'
            } else if (type === 'otherInfo') {
                checkType = '其他'
            }
            if (!valideObj.passport) {
                Toast({message: `${checkType}证件号码是必填项`,position: 'bottom',duration: 5000})
                return false
            } else if (!((/^[a-zA-Z0-9]{3,21}$/).test(valideObj.passport) || (/^([A-Z]\d{7,9})$/).test(valideObj.passport))) {
                Toast({message: `请输入正确的${checkType}证件号码`,position: 'bottom',duration: 5000})
                return false
            } else if (!valideObj.cnName) {
                Toast({message: '中文名称是必填项',position: 'bottom',duration: 5000})
                return false
            } else if(valideObj.cnName && !(valideObj.cnName.length < 21 && valideObj.cnName.length > 1)) {
                Toast({message: '中文名字符个数为2至20',position: 'bottom',duration: 5000})
                return false
            } else if (valideObj.enName2 && !(/^[a-zA-Z\s]{1,35}$/).test(valideObj.enName2)) {
                Toast({message: '英文名仅为字母，个数为1至35',position: 'bottom',duration: 5000})
                return false
            } else if (valideObj.enName1 && !(/^[a-zA-Z\s]{1,15}$/).test(valideObj.enName1)) {
                Toast({message: '英文姓仅为字母，个数为1至15',position: 'bottom',duration: 5000})
                return false
            } else if (valideObj.idcard && !(/(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(valideObj.idcard)) {
                Toast({message: '请输入合法的身份证号',position: 'bottom',duration: 5000})
                return false
            } else if (!valideObj.sex) {
                Toast({message: '性别是必填项',position: 'bottom',duration: 5000})
                return false
            } else if (!valideObj.birth) {
                Toast({message: '出生日期是必填项',position: 'bottom',duration: 5000})
                return false
            } else if (!valideObj.ctInfo) {
                Toast({message: '手机号码是必填项',position: 'bottom',duration: 5000})
                return false
            } else if (valideObj.ctInfo && valideObj.ctInfo.length > 20) {
                Toast({message: '手机号码不能超过20个字符',position: 'bottom',duration: 5000})
                return false
            } else if (valideObj.address && valideObj.address.length > 260) {
                Toast({message: '地址不能超过260个字符', position: 'bottom',duration: 5000})
                return false
            } else {
                return true
            }
        },
        // 保存身份证
        submitId() {
            if (this.idValidate()) {
                this.idInfo.idType = '01'
                this.idInfo.save = true
                this.idInfo.birth = moment(this.idInfo.birth).format('YYYY-MM-DD')
                // 保存身份证信息
                this.$store.commit('saveEditId', {id: this.currentId, info: this.idInfo, type: 'idInfo'})
                Toast({message: '身份证信息已保存', position: 'bottom',duration: 5000})
                this.$router.go(-1)
            }
        },
        // 保存护照 台湾通行证 其他
        submitPassport(type) {
            let obj = this[type]
            if (this.passportValidate(type)) {
                obj.save = true
                obj.birth = moment(obj.birth).format('YYYY-MM-DD')
                if (obj.doi) {
                    obj.doi = moment(obj.doi).format('YYYY-MM-DD')
                }
                if (obj.doe) {
                    obj.doe = moment(obj.doe).format('YYYY-MM-DD')
                }
                // 保存护照信息
                this.$store.commit('saveEditId', {id: this.currentId, info: obj, type: type})
                Toast({message: '证件信息已保存', position: 'bottom',duration: 5000})
                this.$router.go(-1)
            }
            
        }
    },
    watch: {
        'idInfo.cnName': function (old) {
            this.checkSys('idInfo')
            
        },
        'passInfo.cnName': function (old) {
            this.checkSys('passInfo')
        },
        'taiwanInfo.cnName': function (old) {
            this.checkSys('taiwanInfo')
        },
        'otherInfo.cnName': function (old) {
            this.checkSys('otherInfo')
        }
    },
    computed: {
        ...mapGetters([
            'editArr',
            'phoneInfo'
        ])
    },
    created () {
        this.sexOptions = ['男', '女']
        let id = this.$route.params.id
        let currentEdit = this.editArr.filter(item => item.id === parseInt(id, 10))[0]
        this.selectedIdType = currentEdit.selectedIdType
        this.currentId = currentEdit.id
        this.idInfo = currentEdit.idInfo
        this.passInfo = currentEdit.passInfo
        this.taiwanInfo = currentEdit.taiwanInfo
        this.otherInfo = currentEdit.otherInfo
    },
}
</script>

<style scoped lang="scss">
@import './tourist-edit.scss';
</style>
