sample = 'this is a sample, and it most def can, probably, comprises just one sentence'

def get_ngrams(text):
    unique_3_grams = {}
    for i in range(len(text)):
        if (i + 3 <= len(text)):
            if sample[i:i+3] not in unique_3_grams:
                unique_3_grams[sample[i:i+3]] = 1

    return unique_3_grams

print(get_ngrams(sample))
