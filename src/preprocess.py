# outline for the preprocessing function used in sum-it.ipynb

from transformers import AutoTokenizer

model = "google-t5/t5-small"
tokenizer = AutoTokenizer.from_pretrained(model)

prefix = "summarize: "

def preprocess_function(examples):
    inputs = [prefix + doc for doc in examples["text"]]
    model_inputs = tokenizer(inputs, max_length=1024, truncation=True)
    labels = tokenizer(text_target=examples["summary"], max_length=128, truncation=True)

    model_inputs["labels"] = labels["input_ids"]
    return model_inputs

tokenized_billsum = ds.map(preprocess_function, batched=True)