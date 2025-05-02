import os
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='[%(asctime)s]: %(message)s:')

projectName = "summit"

filesList = [
    # ".github/worksflows/gitkeep",
    # "src/__init__.py",     
    # "src/preprocess.py",        # tokenization + prepping data
    # "src/train.py",             # training model
    # "src/summarize.py",         # running the summarizer on new text
    # "src/utils.py",             # helpers
    # "data/sample_input.txt",    # sample datasets maybe ?
    # "models/",                  # models (models) (the models go here)
    # "extension/",               # for the chrome extension
    # "requirements.txt",         # python dependencies
    # "main.py",                  # main!
    "summarizer-chrome-extension/manifest.json",
    "summarizer-chrome-extension/background.js",
    "summarizer-chrome-extension/content.js",
    "summarizer-chrome-extension/popup.html",
    "summarizer-chrome-extension/popup.js",
    "summarizer-chrome-extension/styles.css",
]

for filePath in filesList:
    filePath = Path(filePath)
    fileDir, fileName = os.path.split(filePath)

    if fileDir != "":
        os.makedirs(fileDir, exist_ok=True)
        logging.info(f"Creating: {fileDir} for {fileName}")

    if (not os.path.exists(filePath)) or (os.path.getsize(filePath) == 0):
        with open(filePath, 'w') as f:
            pass
            logging.info(f"Creating file: {filePath}")

    else:
        logging.info(f"{fileName} already exists")