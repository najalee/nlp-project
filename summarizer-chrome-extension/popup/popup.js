chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.extensionID === "get-summary") {
    summary = message.value;
  }

  const summaryEle = document.getElementById("summary-output");
  if (summaryEle) {
    summaryEle.textContent = summary;
  }
});
