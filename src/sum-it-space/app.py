import gradio as gr
from transformers import pipeline
import torch

# import pipeline

# load model from the Hub
summarizer = pipeline("summarization", model="najalee/sum-it_model")

def summarize(text):
    summary = summarizer(text, max_length=128, min_length=30, do_sample=False)
    return summary[0]["summary_text"]

interface = gr.Interface(fn=summarize, inputs="text", outputs="text", title="Sum-It", description="hello !!!")
interface.launch(ssr_mode=False, share=True)

# gr.Interface(fn=summarize, inputs="textbox", outputs="textbox", title="Sum-It", description="hello !!!").launch(ssr_mode=False, share=True)
