/**
 * 元素对照表
 * key: 元素名称
 * value: 编码值
 */
export const elCoding = [{
    key: 'SO2',
    value: 1
},{
    key: 'O3',
    value: 2
},{
    key: 'NO',
    value: 3
},{
    key: 'NOX',
    value: 4
},{
    key: 'CO',
    value: 5
}];

/**
 * 类型对照表
 * key: 类型名称
 * value: 类型编码值
 */
export const elTypeList = [{
    key: '零点校准',
    value: 1
},{
    key: '零点检查',
    value: 2
},{
    key: '跨度检查',
    value: 3
},{
    key: '跨度校准',
    value: 4
},{
    key: '精度检查',
    value: 5
},{
    key: '多点检查',
    value: 6
}];

/**
 * 元素excel属性列 配置表
 * title：进度条标题
 * column: 表结构对象
 *      {
 *         name： 字段标题
 *         key： 表单属性值
 *         value： 备注
 *         disabled： 表单是否只读
 *      }
 */
export const elCodingFormAudit = [{
    title: '基本信息',
    column: [{
        name: '站点名称',
        key: 'stationName',
        disabled: true,
        value: ''
    },{
        name: '站点编号',
        key: 'stationId',
        disabled: true,
        value: ''
    },{
        name: '质控任务上报时间',
        key: 'createTime',
        disabled: true,
        value: ''
    }]
},{
    title: '设备信息',
    column: [{
        name: '钢瓶标准气',
        key: 'steelCylinderNo',
        disabled: true,
        type: 'collapse',
        value: '',
        children: [{
            name: '编号',
            key: 'steelCylinderNo',
        },{
            name: '名称',
            key: 'steelCylinderName',
        },{
            name: '认证时间',
            key: 'authenticationTimeGp',
        },{
            name: '下次认证时间',
            key: 'nextAuthenticationTimeGp',
        },{
            name: '浓度值',
            key: 'concentrationValue',
        }]
    },{
        name: '动态气体校准仪',
        key: 'dycGasCalibrNo',
        disabled: true,
        type: 'collapse',
        value: '',
        children: [{
            name: '编号',
            key: 'dycGasCalibrNo',
        },{
            name: '名称',
            key: 'dycGasCalibrName',
        },{
            name: '质量流量控制器校准日期-上次时间',
            key: 'authenticationTimeJzy',
        },{
            name: '质量流量控制器校准日期-下次时间',
            key: 'nextAuthenticationTimeJzy',
        },{
            name: '标准气',
            key: 'bzqValue',
        },{
            name: '零气',
            key: 'TqValue',
        },{
            name: '标准气/(标准气+零气)，保留三位小数',
            key: 'dfValue',
        }]
    },{
        name: '气体分析仪',
        key: 'gasAnalyzerNo',
        disabled: true,
        type: 'collapse',
        value: '',
        children: [{
            name: '编号',
            key: 'gasAnalyzerNo',
        },{
            name: '名称',
            key: 'gasAnalyzerName',
        },{
            name: '认证时间',
            key: 'authenticationTime',
        },{
            name: '下次认证时间',
            key: 'nextAuthenticationTimeGp',
        },{
            name: '出厂编号',
            key: 'factoryNo',
        },{
            name: '满量程',
            key: 'fullScale',
        }]
    }]
},{
    title: '审核数据',
    column: []
},{
    title: '人员信息',
    column: [{
        name: '审核人',
        key: 'processUserName',
        disabled: true,
        value: ''
    },{
        name: '复核人',
        key: 'toReviewUserName',
        disabled: true,
        value: ''
    }]
}]

/**
 * 元素excel属性列 配置表  
 * code: 对应元素
 * type: 对应类型
 * title：表名称
 * data: 表结构对象
 *      {
 *         name： 字段标题
 *         key： 表单属性值
 *         value： 备注
 *         isUsed: 是否启用该字段 （不填写为不启用）
 *         type: 组件类型 （默认input） / text：输入框  selectPicker：选择框  datePicker：时间选择框     /
 *         numType: 值类型
 *         toFixNum: 保留几位小数
 *         isPercent: 判断是否是百分数
 *         disabled： 表单是否只读
 *         watch： 是否自动计算，并进行监听项
 *         watchEch： 相关键值属性
 *         regExp： '计算公式'
 *         tip： '标注',
 *         textLines: 标注最大几行展示
 *         textLineHeight: 标注行高
 *         checkSelectValue: 下拉框的选择项,
 *         buttonColor: '按钮颜色',
 *         event: 事件名
 *      }
 */
export const elCodingExcelNodeText = [{
    code: 1,
    type: 1,
    title: '自定义表格演示',
    data: [{
        name: '姓名',
        key: 'name',
        value: '',
        isUsed: true,
        type: 'input'
    },{
        name: '性别',
        key: 'sex',
        value: '',
        isUsed: true,
        type: 'selectPicker',
        checkSelectValue: 'sexListAction',
    },{
        name: '时间选择器',
        key: 'authenticationTime',
        value: '',
        isUsed: true,
        type: 'dateTimePicker'
    },{
        name: '日期选择器',
        key: 'nextAuthenticationTime',
        value: '',
        isUsed: true,
        type: 'datePicker'
    },{
        name: '计算因子A',
        key: 'numA',
        value: '',
        isUsed: true,
        type: 'input',
        numType: 'number',
    },{
        name: '计算因子B',
        key: 'numB',
        value: '',
        isUsed: true,
        type: 'input',
        numType: 'number',
    },{
        name: '结果(C)',
        key: 'numC',
        value: '',
        isUsed: true,
        type: 'input',
        disabled: true,
        watch: true,
        toFixNum: 3,
        watchEch: ['numA', 'numB'],
        regExp: 'numA/(numA+numB)',
        textLines: 1,
        textLineHeight: 30,
        tip: '计算公式为：numA/(numA+numB)保留三位小数'
    },{
        name: '计算因子D',
        key: 'numD',
        isUsed: true,
        type: 'input',
        value: ''
    },{
        name: '计算因子E',
        key: 'numE',
        isUsed: true,
        type: 'input',
        value: ''
    },{
        name: '结果(F)',
        key: 'numF',
        value: '',
        isUsed: true,
        type: 'input',
        disabled: true,
        watch: true,
        isPercent: true,
        watchEch: ['numD', 'numE'],
        regExp: '(numE-numD)/numD',
        textLines: 1,
        textLineHeight: 30,
        tip: '计算公式为：(numE-numD)/numD*100%'
    },{
        name: '提交',
        key: 'sumbit',
        isUsed: true,
        type: 'button',
        disabled: false,
        value: '',
        buttonColor: '#4393ff',
        event: 'sumbitApply'
    },{
        name: '重置',
        key: 'cancle',
        isUsed: true,
        disabled: false,
        type: 'button',
        value: '',
        buttonColor: '#e45656',
        event: 'cancelFunc'
    }]
}];

