import spacy
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import sys

def determine_developer_type(task_description, nlp, vectorizer, clf):
    # Tokenize and preprocess the task description
    task_doc = nlp(task_description)
    # Convert the text into a Bag of Words representation
    task_vector = vectorizer.transform([task_description])
    # Predict the developer type
    developer_type = clf.predict(task_vector)[0]
    return developer_type

def parse(task_description):
    # Load the English language model
    nlp = spacy.load("en_core_web_sm")

    # Sample data for training the classifier
    data = []
    FILE = "data.txt" # Put file path here

    # Importing data from file
    with open(FILE, "r") as f:
        for line in f:
            if line[0] not in ["#", '\n']:
                current = line.split(",")
                current[1] = current[1][:-1]

                data.append(tuple(current))

    # Tokenize and preprocess the text data
    texts, labels = zip(*data)
    tokenized_texts = [nlp(text) for text in texts]

    # Feature extraction using Bag of Words
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(texts)

    # Train a simple text classifier (Multinomial Naive Bayes)
    clf = MultinomialNB()
    clf.fit(X, labels)

    developer_type = determine_developer_type(task_description, nlp, vectorizer, clf)

    return developer_type

if __name__ == "__main__":
    task_description = sys.argv[1]
    print(parse(task_description))
