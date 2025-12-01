import google.generativeai as genai

# 1. Paste your API key here
API_KEY = "AIzaSyDvmJ9jplbvhBuQWh1KrVzFdKwMEyasXrY"

# 2. Configure the library with your key
genai.configure(api_key=API_KEY)

# 3. Choose the model you want to use
# 'gemini-1.5-flash' is fast and great for this
model = genai.GenerativeModel('gemini-pro-latest')

# 4. The text we want to analyze
user_input = "Purchase of store furniture paid by cheque, 2486 DH"

# 5. The prompt is the most important part!
# We are telling the AI exactly what to do and how to respond.
prompt = f"""
You are an expert accounting assistant AI. Analyze the following transaction description and convert it into a structured JSON object.

Rules:
1. Identify all accounts involved.
2. For each account, determine if it is debited or credited.
3. Classify each account type (e.g., Asset, Liability, Equity, Revenue, Expense).
4. Extract the numerical amount. Do not include the currency symbol.
5. Respond ONLY with a valid JSON object. No other text, no explanations, no markdown formatting.

Transaction Description: "{user_input}"

Desired JSON Format:
{{
  "transactionDescription": "The original description here",
  "accounts": [
    {{ "name": "Account Name 1", "type": "Asset", "debit": 1000, "credit": 0 }},
    {{ "name": "Account Name 2", "type": "Asset", "debit": 0, "credit": 1000 }}
  ]
}}
"""

print("Sending request to Gemini AI...")

# 6. Send the prompt to the model and get the response
response = model.generate_content(prompt)

print("\n--- Raw Response from AI ---")
print(response.text)

# For now, let's just print the raw text. In the next step, we'll turn this into a proper API.