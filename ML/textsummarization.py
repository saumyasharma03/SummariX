import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from collections import Counter
from heapq import nlargest

def summarize_text(text, num_sentences=3):
    """
    Summarizes the given text using spaCy-based keyword extraction and sentence scoring.
    
    Parameters:
    text (str): The input text to be summarized.
    num_sentences (int): The number of sentences to include in the summary.
    
    Returns:
    str: The summarized text.
    """
    # Load the English NLP model
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(text)
    
    # Extract keywords
    stopwords = list(STOP_WORDS)
    pos_tag = ['PROPN', 'ADJ', 'NOUN', 'VERB']
    keyword = [token.text for token in doc if token.text not in stopwords and token.text not in punctuation and token.pos_ in pos_tag]
    
    # Calculate word frequencies
    freq_word = Counter(keyword)
    max_freq = freq_word.most_common(1)[0][1]
    for word in freq_word.keys():  
        freq_word[word] = (freq_word[word] / max_freq)
    
    # Score sentences
    sent_strength = {}
    for sent in doc.sents:
        for word in sent:
            if word.text in freq_word.keys():
                sent_strength[sent] = sent_strength.get(sent, 0) + freq_word[word.text]
    
    # Select top sentences
    summarized_sentences = nlargest(num_sentences, sent_strength, key=sent_strength.get)
    final_sentences = [sent.text for sent in summarized_sentences]
    summary = ' '.join(final_sentences)
    
    return summary

# Example usage
text = """Machine learning (ML) is the scientific study of algorithms and statistical models that computer systems use to progressively improve their performance on a specific task. Machine learning algorithms build a mathematical model of sample data, known as \"training data\", in order to make predictions or decisions without being explicitly programmed to perform the task. Machine learning algorithms are used in the applications of email filtering, detection of network intruders, and computer vision, where it is infeasible to develop an algorithm of specific instructions for performing the task. Machine learning is closely related to computational statistics, which focuses on making predictions using computers. The study of mathematical optimization delivers methods, theory and application domains to the field of machine learning. Data mining is a field of study within machine learning, and focuses on exploratory data analysis through unsupervised learning. In its application across business problems, machine learning is also referred to as predictive analytics."""

summary = summarize_text(text)
print(summary)
