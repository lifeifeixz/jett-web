var app = new Vue({
	el: '#app',
	data: {
		source: {
			goods: goods
		},
		goods: [],
		goodSearch: {
			searchResult: [],
			searchKey: null
		},
		param: {
			name: null,
			itemId1: null,
			itemNum1: null
		},
		loading: false
	},
	methods: {
		details: function() {
			return this.site;
		},
		searchGood: function(keyWord) {
			//检索物品列表
			var arr = [];
			for(var i = 0; i < this.goods.length; i++) {
				if(this.goods[i].name.indexOf(keyWord) > -1) {
					arr.push(this.goods[i]);
				}
			}
			this.goods = arr;
		},
		/**
		 * 提交充值信息
		 * @auther flys·Li
		 */
		rechargeGoods: function() {
			if(this.param.name == null) {
				alert("角色名不可为空");
				return;
			}
			if(this.param.itemId1 == null) {
				alert("请选择一个物品");
				return;
			}
			if(this.param.itemNum1 == null) {
				alert("请输入物品数量");
				return;
			} else {
				if(this.param.itemNum1 > 99) {
					alert("物品数量最多99,请重新输入");
					return;
				}
			}
			$("#loading").show();
			$.ajax({
				type: "post",
				url: "http://180.76.115.114:8888/api/v1/recharge",
				async: true,
				contentType: "application/json",
				datatype: "json",
				data: JSON.stringify(this.param),
				success: function(data) {
					$("#loading").hide();
					let status = data.status;
					if(status === "SUCCESS") {
						alert("发送成功");
					} else {
						alert(data.content);
					}
				},
				error: function() {
					$("#loading").hide();
					alert("程序异常");
				}
			});
		}
	}
});