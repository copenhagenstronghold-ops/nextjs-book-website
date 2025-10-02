# src/main.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def rag_service():
    """Placeholder endpoint for the RAG service."""
    data = request.json
    query = data.get('query', 'No query provided')

    response_text = f"Hello from RAG Service! Processed query: '{query}'"
    
    return jsonify({"response": response_text})

