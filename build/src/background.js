(() => {
	chrome.tabs.query({currentWindow: true, active : false}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
	});
})();
