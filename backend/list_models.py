import google.generativeai as genai

# 1. Paste your API key here (same one as before)
API_KEY = "AIzaSyDvmJ9jplbvhBuQWh1KrVzFdKwMEyasXrY"

# 2. Configure the library
genai.configure(api_key=API_KEY)

# 3. List all the models available for your API key
print("Fetching list of available models...")

for model in genai.list_models():
    # We are only interested in models that can generate content
    if 'generateContent' in model.supported_generation_methods:
        print(model.name)

print("\nFinished listing models.")