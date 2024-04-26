// fuck csdn setting user-select: none
function setUserSelect() {
  const hash = {
    'https://blog.csdn.net': ['pre', 'code']
  }
  let origin = window.location.origin
  if (!hash[origin]) return
  hash[origin].forEach(select => {
    let doms = document.querySelectorAll(select)
    doms.forEach(item => {
      item.style.cssText = 'user-select: auto'
    });
  })
}
function crop() {
  const hash = {
    'https://www.gongkaoleida.com': /\n---------------------([^]+)/g,
    'http://localhost:3001': /\n---------------------([^]+)/g,
    'https://www.ahhhhfs.com': /\n本文来自：A姐分享([^]+)/g,
  }
  let origin = window.location.origin
  if (!hash[origin]) return
  document.addEventListener("copy", function(e) {
    const selection = document.getSelection();
    let text = selection.toString()
    text = text.replace(hash[origin], '')
    e.clipboardData.setData("text/plain", text);
    e.preventDefault(); // This is necessary, or else the text will not be set successfully.
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  if (changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId: tabId},
      func: crop
    });
    chrome.scripting.executeScript({
      target: { tabId: tabId},
      func: setUserSelect
    });
  }
}); 

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}