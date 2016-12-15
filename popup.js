var recall_data = new Array(),callFun;
chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
	function(tabs){
		var urlLink = tabs[0].url.replace("http://", '').replace("https://", '').split('/')[0];
		
		chrome.storage.sync.get("data", function(items) {
			if(items.data == undefined){
				document.getElementById('status').textContent = "未配置独立密钥！";
				return;
			}
			if (!chrome.runtime.error) {
				pass = items.data;
				recall(["Password",pass]);
			}
		});
		recall(["Url",urlLink]);
		recall(["RUN",run])

	}
);

function recall(value){
	if(value[0] == "RUN"){
		callFun = value[1];
		return 0;
	}
	if(recall_data.length >= 2){//清空
		recall_data.length = 0;
		recall_data.push(value);
		return 0;
	}
	if(recall_data.length <= 2){//继续添加
		recall_data.push(value);
	}
	
	if(typeof(callFun)=="function" && recall_data.length == 2){
		callFun(recall_data);
	}
}
function run(buf){
	if(buf.length == 2){
		var pass,urlad;
		if(buf[0][0] == "Url"){
			urlad = buf[0][1];
			pass = buf[1][1];
		}else{
			pass = buf[0][1];
			urlad = buf[1][1];
		}
		document.getElementById('status').textContent = (urlad.MD5()+pass.MD5()).MD5();
	}
}

