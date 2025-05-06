![logo](summarizer-chrome-extension/images/graphicdesignismypassion.png "logo!")


A Chrome extension that summarizes any highlighted text using a fine-tuned T5 model, as a project for my NLP class. The project report is included in this repo as [![ProjectReport.pdf](ProjectReport.pdf)]


---

## 📹 Demo Video
[![Watch the Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

---

# How This Repo Is Organized

- Root Folder:
    - These were made with my template to easily create organized folder heirarchy
    - Includes ProjectReport.pdf
- data:
    - Was meant to hold data, but instead decided to get the dataset via HuggingFace
- src:
    - [![sum-it.ipynb](src/sum-it.ipynb)] is the notebook showing how the T5 model was trained
    - [![sum-it-space](src/sum-it-space)] includes the files used to set up the [![HuggingFaceSpace](https://huggingface.co/spaces/najalee/sum-it)]
    - [![preprocesses.py](src/preprocesses.py)] shows how the data was preprocessed, this is also included in the notebook
- summarizer-chrome-extension:
    - This folder is all the code used to build the extension.

--

## 🚀 Features
- Summarizes any highlighted text on a web page
- Built using google-t5/t5-small model, fine-tuned on CNN/DailyMail
- Clean, user-friendly popup UI

---

## 🧠 How It Works
1. User highlights text on any website.
2. Right click on the text, select "🏔️ Sum-It!"
3. Open the popup, and wait for the summary to appear!

---

## 📦 Tech Stack
- T5 (via Hugging Face Transformers)
- JavaScript/HTML/CSS for Chrome Extension
- Hugging Face Datasets (CNN/DailyMail)

---

## 💡 Lessons Learned
- Chrome Extensions are user-friendly
- T5 models are powerful but need input/output size control
- Tradeoffs using HuggingFace Space vs FastAPI to be more accessible to non-technical users

---

## ✨ Future Improvements
- Improving on all the bugs brought up by users.
- Allow users to select di↵erent summary styles i.e. bulleted lists
- Further train the model to allow for better summaries.
- Add features to show the user when the input is being processed or not.

---

## 👤 Contributions
- 👨‍💻 Developed entirely by myself, this was a solo project.

---
 