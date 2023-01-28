// 定义组件的样式属性
let mixin = {
	//数据
	data() {
		return {
			prefixIconStyle: {
				fontSize: '25px',
				color: '#909399',
				width: '60rpx'
			},
			labelStyle: {
				fontSize: '16px',
				fontWeight: '600',
				lineHeight: '25px',
				paddingLeft: '18rpx'
			},
			popTitleStyle: {
				fontWeight: 600,
				fontSize: '16px',
				color: '#fff'
			},
			popIconStyle: {
				fontSize: '23px',
				color: '#fff'
			}
		}
	},
	methods: {
		findIndexId(arr, name){
			var obj = this[arr].filter(item => {
				console.log(item.name, name)
				return item.name == name
			})
			console.log(obj)
			return obj[0].value;
		},
		// 构建新对象进行发送请求
		changeObjectStyle(ObjA = null, ObjB = null){
			let Obj = {};
			let picIds = this.fileArray.join(',');
			if(ObjA != null){
				let { dycGasCalibrNo, gasAnalyzerNo, steelCylinderNo } = ObjA;
				let steelCylinderNo1 = this.findIndexId('boundCylinderAction', steelCylinderNo);
				let dycGasCalibrNo1 = this.findIndexId('boundGasCaliAction', dycGasCalibrNo);
				let gasAnalyzerNo1 = this.findIndexId('boundAnalyzerNoAction', gasAnalyzerNo);
				delete ObjA.steelCylinderNo;
				delete ObjA.dycGasCalibrNo;
				delete ObjA.gasAnalyzerNo;
				Object.assign(Obj, {
					...ObjA,
					steelCylinderNo: steelCylinderNo1,
					dycGasCalibrNo: dycGasCalibrNo1,
					gasAnalyzerNo: gasAnalyzerNo1
				});
			}
			if(ObjB != null){
				let { fhr, detail, shr } = ObjB;
				let approvalUserId = this.findIndexId('shrListAction', shr);
				let approvalUsers = `${this.findIndexId('shrListAction', shr)},${this.findIndexId('fhrListAction', fhr)}`;
				let endApprovalTime = detail;
				Object.assign(Obj, {
					approvalUserId,
					approvalUsers,
					endApprovalTime
				});
				Obj.status = 1;
			}
			return Obj;
		},
		// 提交受限表单
		submitForm(e){
			
		},
		// 提交审核表单
		submitApplyForm(){
			
		},
	}
}

export default mixin 