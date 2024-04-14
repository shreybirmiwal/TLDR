// Function to send a message to the content script to fetch data
function fetchData() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'fetchData' });
    });
}

// Handle button click event
document.getElementById('generateButton').addEventListener('click', function () {
    fetchData();
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'showText') {
        document.getElementById('output').innerHTML = "To-Do Actions: <br>" + message.text.replace(/\n/g, "<br>");
    }
});
