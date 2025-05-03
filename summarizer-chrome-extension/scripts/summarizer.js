
// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);



async function summarizeText(text) {
  // Step 1: Submit job to /call/predict
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
    throw new Error("No event_id returned from prediction request");
  }

  const eventId = submission.event_id;
  console.log("Got event_id:", eventId);

  // Step 2: Poll for completion
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




// async function summarizeText(text){
//       const response = await fetch(
//         "https://najalee-sum-it.hf.space/gradio_api/call/predict",
//         {
//           method: "POST",
//         //   headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ data: [text] }),
//         }
//       );

//       const json = await response.json();
//       return json.data[0]; // the summary

//     //   .then(response => response.json())
//     //   .then(data => {console.log(data);})
//     //   .then(console.log("done!!"));
    
// }

// Send the text to the summarizer on click
function genericOnClick(info) {
  // console.log("selection click!");

  // console.log(info.selectionText);

  text = info.selectionText;
  textSum = "";
  textLength = text.split(" ").length;
  // if text is too short, show on popup that its too short
  const minLength = 100;
  console.log(textLength);
  if (textLength < minLength) {
    console.log("text is too short");
  } else {
    console.log("let's sum it up");
    summarizeText(text).then((summary) => {
        chrome.runtime.sendMessage({extensionID: "get-summary", value: summary});
      // Do something with the summary here
    });

    // console.log(summarizeText(text));
  }
}

// Listen for highlighted text
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Sum-it!",
    contexts: ["selection"],
    id: "selection",
  });
});
