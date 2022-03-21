function crop() {
  const hash = {
    'https://www.gongkaoleida.com': /\n---------------------([^]+)/g,
    'http://localhost:3001': /\n---------------------([^]+)/g,
  }
  let origin = window.location.origin
  if (!hash[origin]) return
  document.addEventListener("copy", function(e) {
    const selection = document.getSelection();
    let text = selection.toString()
    text = text.replace(hash[origin], '')
    console.log("From Chrome Extension Crop Selection: ", text);
    e.clipboardData.setData("text/plain", text);
    e.preventDefault(); // This is necessary, or else the text will not be set successfully.
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  console.log(changeInfo);
  if (changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId: tabId},
      func: crop
    });
  }
}); 

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}