import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from collections import Counter
from heapq import nlargest

def summarize_text(text, num_sentences=2):
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
text = """Global warming refers to the long-term increase in Earth's average surface temperature, primarily caused by human activities like burning fossil fuels, which release greenhouse gases that trap heat in the atmosphere. 
Here's a more detailed explanation:
What it is:
Global warming is the term for the gradual rise in Earth's average surface temperature, observed since the pre-industrial period (roughly between 1850 and 1900). 
The Greenhouse Effect:
The Earth's atmosphere naturally contains greenhouse gases like carbon dioxide, methane, and nitrous oxide. These gases trap some of the sun's outgoing heat, keeping the planet warm enough to support life. 
Human Impact:
Human activities, particularly the burning of fossil fuels (coal, oil, and natural gas), have significantly increased the concentration of greenhouse gases in the atmosphere. This enhanced greenhouse effect is causing the planet to warm at an accelerated rate."""

summary = summarize_text(text)
print(summary)
