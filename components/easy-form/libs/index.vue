<template>
  <view class="pageContent pageOverFlow">
    <!-- 消息提示 -->
    <u-toast ref="uToast" />
    <view class="boundWorkOrder">
      <u--form
        labelPosition="top"
        :labelStyle="labelStyle"
        labelWidth="290"
        :model="addOrderWorkForm"
        ref="addOrderWorkForm"
        :rules="rules"
      >
        <block v-for="(item, index) in elCodingExcelNodeTextData" :key="index">
          <u-form-item
            v-if="item.type == 'input'"
            :class="item.tip != undefined ? 'tip' : ''"
            :label="`${item.name}:`"
            :prop="item.key"
            :ref="item.key"
            :required="item.isValiate"
          >
            <u--input
              clearable
              require
              v-model="addOrderWorkForm[item.key]"
              border="surround"
              :readonly="item.disabled"
              :type="item.numType == undefined ? 'text' : item.numType"
              :placeholder="`请输入${item.name}`"
              :prefixIconStyle="prefixIconStyle"
            >
            </u--input>
            <view class="tipText" v-if="item.tip != undefined">
              <u-icon
                name="question-circle"
                color="#2979ff"
                size="18"
                style="margin-right: 5px"
              ></u-icon>
              <u--text :lineHeight="item.textLineHeight" :lines="item.textLines" :text="item.tip"></u--text>
            </view>
          </u-form-item>
          <!-- 日期选择器 -->
          <u-form-item
            v-else-if="item.type == 'datePicker'"
            @click="
              showTime = true;
              datePickerKey = item.key;
            "
            :label="`${item.name}:`"
            :prop="item.key"
            :ref="item.key"
            :required="item.isValiate"
          >
            <u--input
              :readonly="true"
              clearable
              require
              v-model="addOrderWorkForm[item.key]"
              border="surround"
              :placeholder="`请输入${item.name}`"
              :prefixIconStyle="prefixIconStyle"
            >
            </u--input>
          </u-form-item>
          <!-- 时间选择器 -->
          <u-form-item
            v-else-if="item.type == 'dateTimePicker'"
            @click="
              showTimeDate = true;
              dateTimePickerKey = item.key;
            "
            :label="`${item.name}:`"
            :prop="item.key"
            :ref="item.key"
            :required="item.isValiate"
          >
            <u--input
              :readonly="true"
              clearable
              require
              v-model="addOrderWorkForm[item.key]"
              border="surround"
              :placeholder="`请输入${item.name}`"
              :prefixIconStyle="prefixIconStyle"
            >
            </u--input>
          </u-form-item>
          <!-- 下拉框 -->
          <u-form-item
            v-else-if="item.type == 'selectPicker'"
            @click="
              showActionBox(
                item.checkSelectValue,
                item.key,
                'addOrderWorkForm',
                `请选择${item.name}`,
                `${item.name}不能为空`
              )
            "
            :label="`${item.name}:`"
            :prop="item.key"
            :ref="item.key"
            :required="item.isValiate"
          >
            <u--input
              :readonly="true"
              clearable
              require
              v-model="addOrderWorkForm[item.key]"
              border="surround"
              :placeholder="`请输入${item.name}`"
              :prefixIconStyle="prefixIconStyle"
            >
            </u--input>
          </u-form-item>
          <!-- 按钮组 -->
            <u-button
            v-else-if="item.type == 'button' && item.isUsed"
            :disabled="item.disabled"
            :color="item.buttonColor"
            :text="item.name"
            @click="submitButtonEvent(item.event, item.key)"
            ></u-button>
        </block>
      </u--form>
    </view>

    <!-- 公共模态框 -->
    <u-action-sheet
      :show="isshowAction"
      :actions="boundAction"
      :title="actionSheetTitle"
      :description="actionSheetDescription"
      @close="isshowActionClose"
      @select="ActionSelect"
      :class="{ overActionSheet: isSetActionClass == true }"
    >
    </u-action-sheet>

    <!-- 日期弹窗 -->
    <u-datetime-picker
      :show="showTime"
      @confirm="confirmTime"
      @cancel="showTime = false"
      :value="minDate"
      mode="date"
    ></u-datetime-picker>
    <!-- 时间弹窗 -->
    <u-datetime-picker
      :show="showTimeDate"
      @confirm="confirmTime"
      @cancel="showTimeDate = false"
      :value="minDate"
      mode="datetime"
    ></u-datetime-picker>

    <!-- 转发申请人模态框 -->
    <u-popup :show="ApplyFormShow" :round="10" mode="bottom">
      <view class="popTitle">
        <u-cell
          icon="bookmark"
          :titleStyle="popTitleStyle"
          :iconStyle="popIconStyle"
          title="提交审核"
        >
          <u-icon
            color="#fff"
            slot="value"
            name="close"
            @click="closeApplyForm"
          ></u-icon>
        </u-cell>
      </view>
      <view class="applyForm">
        <u--form
          labelPosition="top"
          :labelStyle="labelStyle"
          labelWidth="100"
          :model="applyForm"
          ref="applyForm"
          :rules="rules"	
        >
          <u-form-item
            @click="
              showActionBox(
                'shrListAction',
                'shr',
                'applyForm',
                '请选择审核人',
                '审核人不能为空'
              )
            "
            label="审核人:"
            prop="shr"
            ref="shr"
          >
            <u--input
              :readonly="true"
              clearable
              require
              v-model="applyForm.shr"
              border="surround"
              placeholder="请选择审核人"
              :prefixIconStyle="prefixIconStyle"
            >
            </u--input>
          </u-form-item>
          <u-form-item
            @click="
              showActionBox(
                'fhrListAction',
                'fhr',
                'applyForm',
                '请选择复核人',
                '复核人不能为空'
              )
            "
            label="复核人:"
            prop="fhr"
            ref="fhr"
          >
            <u--input
              :readonly="true"
              clearable
              require
              v-model="applyForm.fhr"
              border="surround"
              placeholder="请选择复核人"
              :prefixIconStyle="prefixIconStyle"
            >
            </u--input>
          </u-form-item>
          <u-button
            color="#4393ff"
            text="提交申请"
            @click="submitApplyForm"
          ></u-button>
        </u--form>
        <view style="width: 100%; height: 30rpx"></view>
      </view>
    </u-popup>
  </view>
</template>
<script>
import mixinStyle from "./utils/easyFormStyleJson.js";
export default {
  name: "easyForm",
  components: {},
  mixins: [mixinStyle],
  props: {
    elCodingExcelNodeText: {
        type: Object,
        value: {}
    },
    elPropArray: {
        type: Object,
        value: {}
    },
  },
  data() {
    return {
      isButtonDisable: false,
      leftIconStyle: {
        fontSize: "22px",
        color: "#4393ff",
      },
      isSetActionClass: false, //长度是否溢出，溢出添加隐藏类
      showTime: false, //日期选择是否开启
      datePickerKey: "", //日期当前key
      showTimeDate: false, //时间选择是否开启
      dateTimePickerKey: "", //时间当前key
      ApplyFormShow: false, //遮罩层开关
      applyForm: {}, //底部辅助表单
      addOrderWorkForm: {}, // 自定义提交表单
      rules: {}, // 表单的验证规则
      isshowAction: false, //是否显示下拉pop
      nowAttrAction: "", //当前下拉菜单应用的key
      actionSheetTitle: "", //下拉菜单pop的标题
      actionSheetDescription: "", //下拉菜单pop的描述
      boundAction: [], //当前action选择框的可选值
    };
  },
  created(){
    // 初始化组件
    this.initComponent()
    // 设置页面标题
    uni.setNavigationBarTitle({
      title: this.elCodingExcelNodeText.title
    })
  },
  computed: {
    minDate() {
      return Date.parse(new Date());
    },
    elCodingExcelNodeTextData() {
        return this.elCodingExcelNodeText.data.filter((item) => {
            return item.isUsed == true;
        });
    },
  },
  onLoad(e) {},
  onReady() {},
  onShow() {},
  methods: {
    initComponent(){
      let rules = {};
      let form = {};
      this.elCodingExcelNodeText.data.forEach((item, index) => {
        if (item.isValiate) {
          // 初始化表单校验
          this.$set(rules, item.key, [
            {
              required: true,
              message: `请选择${item.name}`,
              trigger: item.valiateRule,
            },
          ]);
          // 初始化表单
          this.$set(form, item.key, item.value);
          this.$set(this.addOrderWorkForm, item.key, item.value);
        }
      });
      // Object.assign(this.addOrderWorkForm, { ...form });
      Object.assign(this.rules, { ...rules });
    },
    /**
	 * 设置action选择框的显隐状态
	 * parmas: {
		 *  actionList: 当前选择框的可选值
		 *  nowAttr: 当前选择框对应的属性 
		 *  title: u-action-sheet的title字段
		 *  description: u-action-sheet的description字段
	 }
	 */
    showActionBox(actionList, nowAttr, nowForm, title, description) {
      //设置选择框的属性、值内容
      this.boundAction = this.elPropArray[actionList];
      this.nowAttrAction = nowAttr;
      this.nowFormAction = nowForm;
      this.actionSheetTitle = title;
      this.actionSheetDescription = description;

      //设置选择框的显隐
      this.isshowAction = true;

      if (this.boundAction != undefined && this.boundAction.length > 9) {
        this.isSetActionClass = true;
      }

      // 避免pop跟actionSheet发送重叠
      if (nowForm == "applyForm") this.ApplyFormShow = false;
    },
    // 受限原因选择
    ActionSelect(e) {
      // 获取表属性
      let attr = this.nowAttrAction;
      let form = this.nowFormAction;
      this[form][attr] = e.name;
      // this.$refs[form].validateField(attr)

      // 恢复弹窗的自适应高度
      this.isSetActionClass = false;

      // 避免pop跟actionSheet发送重叠
      if (form == "applyForm") this.ApplyFormShow = true;
    },
    // 关闭公共选择模态框
    isshowActionClose() {
      this.isshowAction = false;

      // 恢复弹窗的自适应高度
      this.isSetActionClass = false;

      // 避免pop跟actionSheet发送重叠
      if (this.nowFormAction == "applyForm") this.ApplyFormShow = true;
    },
    // 关闭form弹窗
    closeApplyForm() {
      let applyForm = this.applyForm;
      Object.keys(applyForm).forEach((key) => {
        if (key != "goodName") applyForm[key] = "";
      });

      // 恢复弹窗的自适应高度
      this.isSetActionClass = false;

      this.ApplyFormShow = false;
    },
    // 时间选择器
    confirmTime(e, a) {
      const timeFormat = uni.$u.timeFormat;
      if(e.mode == 'date'){
        this.addOrderWorkForm[this.datePickerKey] = timeFormat(
            e.value,
            "yyyy-mm-dd"
        );
        this.showTime = false;
      }else if(e.mode == 'datetime'){
        this.addOrderWorkForm[this.dateTimePickerKey] = timeFormat(
            e.value,
            "yyyy-mm-dd hh:MM:ss"
        );
        this.showTimeDate = false;
      }
    },
    // 关闭form弹窗
    clearForm(array) {
      array.forEach((item) => {
        let Form = this[item];
        Object.keys(Form).forEach((item1) => {
          Form[item1] = "";
        });
        this[item] = Form;
        this.$refs[item].clearValidate();
      });
      this.fileArray = [];
    },
    /** 
     * 自定义
    */
    submitButtonEvent(e, type){
        let eventObj = {};
        Object.assign(eventObj, {
          eventType: e,
          data: this.addOrderWorkForm
        })
        if(type == 'sumbit'){
          this.$refs['addOrderWorkForm'].validate().then(valid => {
            this.$emit('elEvent', eventObj)
          }).catch(err => {
            console.log(err)
            this.$refs.uToast.show({
              message: err[0].message,
              type: 'error'
            })
          })
        }else if(type == 'cancle'){
          this.$refs['addOrderWorkForm'].resetFields();
          this.$refs['addOrderWorkForm'].clearValidate()
          this.$emit('elEvent', eventObj)
        }
        
    },
    reloadon() {
      // 页面重载
      const pages = getCurrentPages();
      // 声明一个pages使用getCurrentPages方法
      const curPage = pages[pages.length - 1];
      console.log(curPage);
      // 声明一个当前页面
      curPage.onLoad(curPage.options); // 传入参数
      curPage.onShow();
      curPage.onReady();
      // 执行刷新
    },
    onNavigationBarButtonTap(val) {
      uni.navigateTo({
        url: `/components/workOrderManage/index`,
      });
    },
    // 解析字符串
    changepoints(item) {
      let str = '';
      let val = item.regExp;
      let obj = this.addOrderWorkForm;
      Object.keys(obj).forEach((key) => {
        str = (str == '' ? val : str).replaceAll(key, obj[key]);
      });
      // 判断是否进行保留小数
      if(item.toFixNum > 0){
        str = parseFloat(eval(str)).toFixed(item.toFixNum);
      }else if(item.toFixNum == 0 || item.toFixNum == undefined){
        str = eval(str) > 1 ? parseInt(eval(str)) : eval(str);
      }
      // 判断是否为百分数
      if(item.isPercent == true){
        str = `${str * 100}%`
      }
      return str;
    },
  },
  watch: {
    addOrderWorkForm: {
      deep: true, //true为进行深度监听,false为不进行深度监听
      handler(newVal) {
        console.log(newVal);
        let elCodingExcelNodeText = this.elCodingExcelNodeText.data;
        let items = elCodingExcelNodeText.filter((item) => {
          return item.watch == true && item.isUsed;
        });
        items.forEach((item, index) => {
          let isWatch = [];
          isWatch = item.watchEch.filter(item => {
            return this.addOrderWorkForm[item] == '' || this.addOrderWorkForm[item] == null || this.addOrderWorkForm[item] == undefined;
          })
          if (isWatch.length == 0) {
            let regExp = this.changepoints(item);
            this.addOrderWorkForm[item["key"]] = regExp;
          }
        });
      },
    }
  },
};
</script>

<style lang="scss" scope>
  // 引入组件样式文件
  @import "./assets/style.scss";
</style>
