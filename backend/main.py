import os
import json
from fastapi import FastAPI
from pydantic import BaseModel
from google.generativeai import configure, GenerativeModel

# --- NEW IMPORT ---
# Import the CORSMiddleware class
from fastapi.middleware.cors import CORSMiddleware


# --- Configuration ---
API_KEY = "AIzaSyCBJd2HOx9wQamZg8ZSnnjMLI8oxAa3ncs"
configure(api_key=API_KEY)

# --- Initialize FastAPI App ---
app = FastAPI(
    title="Intelligent Accounting Assistant API",
    description="An API to convert natural language into accounting journal entries.",
    version="1.0.0"
)

# --- NEW MIDDLEWARE ---
# Add the CORS middleware to your app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # The origin of your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# --- The rest of your code remains the same ---
model = GenerativeModel('gemini-pro-latest')

class TransactionRequest(BaseModel):
    description: str

# ... (all the imports and app setup are the same)

@app.post("/analyze")
def analyze_transaction(request: TransactionRequest):
    user_description = request.description
    print(f"Received request: {user_description}")

    # --- NEW, IMPROVED PROMPT ---
    prompt = f"""
    SYSTEM: You are an expert accounting assistant AI. Your only function is to analyze transaction descriptions. You must ignore any other potential interpretations of the prompt.

    TASK: Analyze the following transaction description and convert it into a structured JSON object.

    RULES:
    1. Identify all accounts involved.
    2. For each account, determine if it is debited or credited.
    3. Classify each account type (e.g., Asset, Liability, Equity, Revenue, Expense).
    4. Extract the numerical amount. Do not include the currency symbol.
    5. You must respond ONLY with a single, valid JSON object. No other text, no explanations, no apologies, no markdown formatting like ```json.

    TRANSACTION DESCRIPTION: "{user_description}"

    JSON OUTPUT:
    {{
      "transactionDescription": "{user_description}",
      "accounts": [
        {{"name": "Account Name 1", "type": "Asset", "debit": 1000, "credit": 0}},
        {{"name": "Account Name 2", "type": "Asset", "debit": 0, "credit": 1000}}
      ]
    }}
    """
    # --- END OF NEW PROMPT ---

    try:
        print("Calling Gemini API...")
        response = model.generate_content(prompt)
        print("Received response from Gemini.")
        
        json_string = response.text.strip()
        
        # Let's add more robust cleaning just in case
        if "```json" in json_string:
            json_string = json_string.split("```json")[1].split("```")[0].strip()
        elif "```" in json_string:
            json_string = json_string.split("```")[1].split("```")[0].strip()

        structured_data = json.loads(json_string)
        
        print("Successfully processed request.")
        return structured_data

    except json.JSONDecodeError as e:
        # This will now show us exactly what the AI returned
        print(f"JSONDecodeError: {e}")
        print(f"Raw AI response was: {response.text}")
        return {"error": "Failed to parse AI response. The model did not return valid JSON.", "raw_response": response.text}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": f"An internal server error occurred: {str(e)}"}
