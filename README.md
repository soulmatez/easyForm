<!--
 * @Author: Soulmate
 * @Date: 2023-01-28 08:49:31
 * @LastEditTime: 2023-01-30 13:37:23
 * @LastEditors: Soulmate
 * @Description: 
 * @FilePath: \easyForm\easy-form-v2\README.md
 * 版权声明
-->
# easyForm

## 介绍
<p>以uView为UI框架，在某种场景使用JSON数据搭建表单页面，实现零代码插入自己想要的业务场景，帮助开发者减少浪费在界面搭建上的时间，专注于数据逻辑层和业务层的开发。</p>
<p>支持多端：H5、APP、小程序</p>

## 组件架构说明
```bash
easyform
├── libs
│    ├── assets                            # 样式目录
│    │     └── style.scss                  # 组件样式
│    ├── utils                             # 杂项
│    │     ├── easyData.js                 # 组件模拟数据demo
│    │     └── easyFormStyleJson.js        # 组件公共Mixin数据
│    └── index.vue                         # 组件
├── index.js                               # 入口文件
├── package.json                           # 全局配置
├── .gitignore                             # git忽略文件
└── .README.md                             # 描述文件
```

## 安装教程

```bash
# 1、安装uView
npm install uview-ui

# 2、全局引入uView，
import uView from "uview-ui";
Vue.use(uView);

# 3、在uni.scss引入全局样式
@import "uview-ui/theme.scss";
@import "uview-ui/index.scss";

# 4、在package.json中，easycom模式引入uView组件
{
    "easycom": {
        "^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"
    }
}

# 5、安装easyForm
npm install easyform

# 6、引入easyForm
import easyform from 'esayform'
Vue.use(easyform)
```

## 使用说明

- <p>在页面引入easyForm，并使用：</p>
```js
import easyform from 'esayform'
```
- <p>Componsition API：</p>
```js
data: {
    elCodingExcelNodeText: {},
    elPropArray:{         
        sexListAction: [{
            name: "男",
            value: 1
        }, {
            name: "女",
            value: 0
        }],
    }
}
...
method: {
    elEvent: function(){
        return 'easyForm is easy!'
    }
}

...
```

```html
<template>
	<view class="content">
		<easyForm ref="easyForm"
			  :elCodingExcelNodeText="elCodingExcelNodeText"
			  :elPropArray="elPropArray"
			  @elEvent="elEvent"></easyForm>
	</view>
</template>
```
- 属性说明
```
elCodingExcelNodeText：页面排版json
elPropArray：下拉框自定义数据组(里面的属性需要跟json数据保持一致)
elEvent：组件方法
```

- Json数据配置
```js
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


```

## 参与贡献

1.  Fork 本仓库
2.  新建 easyform_xxx 分支
3.  提交代码
4.  新建 Pull Request


## 关于贡献

- [Soulmate - 个人博客](http://blog.soulsuper.top/)
#### 本项目目前作为学习，希望更多的人能够参与项目的维护与拓展。本排名无任何次序。

## 许可

待接入。

## 注意

本项目主要用来研究与学习，如果商用请联系
`953005025@qq.com`
