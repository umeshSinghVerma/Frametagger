chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        // console.log("tabid",tabId)
        // console.log("tab",tab)
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);

        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParameters.get("v"),
        }, (response) => {
            if (chrome.runtime.lastError) {
                // console.log("Error sending message to content script:", chrome.runtime.lastError.message);
            } else {
                // console.log("Message sent to content script, response:", response);
            }
        });

    }
});
// async function fu(maxTime) {
//     try {
//         const currentTime = new Date();
//         const data = await chrome.storage.local.get(["userData"]);
//         if (data.userData) {
//             const updatedData = data.userData;
//             for (let video in updatedData) {
//                 const updatedTime = new Date(JSON.parse(updatedData[video].updatedAt));
//                 if (currentTime - updatedTime > maxTime) {
//                     delete updatedData[video];
//                 }
//             }
//             await chrome.storage.local.set({ userData: updatedData });
//         }
//     } catch (e) {
//         console.log("Error in updating userData", e);
//     }
// }

// const maxTime = 30 * 24 * 60 * 60 * 1000; // 30 days
// // const maxTime = 60 * 1000; // 1 minute for testing

// setInterval(() => {
//     fu(maxTime);
// }, maxTime);