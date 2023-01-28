<!--
 * @Author: Soulmate
 * @Date: 2023-01-18 13:42:08
 * @LastEditTime: 2023-01-19 15:06:10
 * @LastEditors: Soulmate
 * @Description: 
 * @FilePath: \easyForm\easy-form-v2\pages\index\index.vue
 * 版权声明
-->
<template>
	<view class="content">
		<easyForm :elCodingExcelNodeText="elCodingExcelNodeText"
			 	  :elPropArray="elPropArray"
				  @elEvent="elEvent"></easyForm>
	</view>
</template>

<script>
	import easyForm from '../../components/easy-form/index.vue'
	import {
	elCoding,
	elTypeList,
	elCodingExcelNodeText,
	} from "../../components/easy-form/utils/easyData.js";
	export default {
		data() {
			return {
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
		},
		components: {
			easyForm,
		},
		onLoad() {},
		onShow() {
			let template = 0;
			Object.assign(this.elCodingExcelNodeText, {
				...elCodingExcelNodeText[template],
			});
		},
		methods: {
			elEvent(eventObj){
				console.log(`你触发了${eventObj.eventType}事件`)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
