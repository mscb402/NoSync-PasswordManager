document.body.onload = function() {
  chrome.storage.sync.get("data", function(items) {
    if (items.data == undefined){
      return;
    }
    if (!chrome.runtime.error) {
      console.log(items);
      document.getElementById("text").value = items.data;
    }
  });
}

document.getElementById("set").onclick = function() {
  var d = document.getElementById("text").value;
  chrome.storage.sync.set({ "data" : d }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
  window.close();
}
