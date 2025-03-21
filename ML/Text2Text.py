import spacy

class SpacyModel:
    _instance = None
    
    @staticmethod
    def get_instance():
        if SpacyModel._instance is None:
            SpacyModel._instance = spacy.load("en_core_web_lg")
        return SpacyModel._instance

def compare_texts(text, answer_text):
    text.upper()
    answer_text.upper()
    print('ORIGINAL TEXT : ',text.upper())
    print('AUDIO TEXT : ',answer_text.upper())
    # Get the single instance of the spaCy model
    nlp = SpacyModel.get_instance()

    # Process the texts
    doc1 = nlp(text)
    doc2 = nlp(answer_text)
    
    # Compute similarity
    similarity = doc1.similarity(doc2)
    return similarity


