// listens for click in context menu
chrome.contextMenus.onClicked.addListener(genericOnClick);
summarizedText = "";
text = "";

async function summarizeText(text) {
  // fetch hugging face space, input text
  const response = await fetch(
    "https://najalee-sum-it.hf.space/gradio_api/call/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [text] }),
    }
  );

  const submission = await response.json();

  if (!submission || !submission.event_id) {
    throw new Error("No event_id");
  }

  const eventId = submission.event_id;
  console.log("Got event_id: " + eventId);

  // poll url to complete
  const pollUrl = `https://najalee-sum-it.hf.space/gradio_api/call/predict/${eventId}`;

  while (true) {
    const pollResponse = await fetch(pollUrl);
    const reader = pollResponse.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let result = "";
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;

        // If we hit the final "event: complete", extract data
        if (chunk.includes("event: complete")) {
          // extract summary
          const match = chunk.match(/data:\s*(\[[^\n]+])/);

          if (match && match[1]) {
            const data = JSON.parse(match[1]);
            return data[0]; // The summary
          }
        }
      }

      done = readerDone;
    }
  }
}

// call summarizer function on click
function genericOnClick(info) {
  text = info.selectionText;
  textSum = "";
  textLength = text.split(" ").length;
  // summarizedText = null;

  // if text is too short, show on popup that its too short
  const minLength = 100;
  console.log(textLength);
  if (textLength < minLength) {
    // console.log("text is too short");
    summarizedText = "text is too short !!!";

    // chrome.runtime.sendMessage({
    //   type: "storeVal",
    //   value: "text too short!!!",
    // });
  } else {
    summarizeText(text).then((summary) => {
      summarizedText = summary;
      console.log(summarizedText);

      chrome.runtime.sendMessage({type: "summaryUpdated", value: summarizedText});
    });
  }

  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   if(message.type == "getVal") {
  //         sendResponse({ value: summarizedText });
  //         summarizedText = "";
  //   }
  // })

  // chrome.runtime.sendMessage({type: "summary", value: summarizedText}, (response) => {
  //   // nothing
  // })
  // } else if (summarizedText = "") {
  //   // console.log("let's sum it up");

  //   summarizeText(text).then((summary) => {
  //     summarizedText = summary;
  //     // console.log(summarizedText);
  //   });
  // }
  // else {
  //   summarizedText = "";
  // }

  // listen to store a value or send a value
}

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == "getVal") {
      sendResponse({value: summarizedText});
      summarizedText = "";
    }
  });

// chrome.runtime.onConnect.addListener(function (port) {
//   if (port.name === "popup") {
//     port.onDisconnect.addListener(function () {
//       summarizedText = "";
//     });
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // console.log(message.type);
//   if (message.type == "getVal") {
//     // summarizeText(text).then((summary) => {
//     //   summarizedText = summary;
//     //   // console.log(summarizedText);
//     //   sendResponse({value: summarizedText});
//     // });
//     sendResponse({ value: summarizedText });
//     summarizedText = "";
//   }
// });

// listens for a highlighted text
chrome.runtime.onInstalled.addListener(function () {
  text = "";

  chrome.contextMenus.create({
    title: "Sum-it!",
    contexts: ["selection"],
    id: "selection",
  });
});
