# tests/test_main.py
import pytest
import json
# The application is in src/main.py, so we need to import it relative to the root.
# We are currently running pytest from the root, so the import path is correct.
from src.main import app

# 1. Fixture to set up a test client for Flask
@pytest.fixture
def client():
    # Activates testing mode for the app
    app.config['TESTING'] = True
    # Use the test client context manager
    with app.test_client() as client:
        yield client

# 2. Test function to check the RAG service endpoint
def test_rag_service_success(client):
    """
    Tests the main POST endpoint ('/') of the RAG service.
    
    Checks if the endpoint returns a 200 OK status code 
    and verifies the structure of the mock response.
    """
    # Define a mock query payload
    test_query = "What is the next step in this project?"
    
    # Send a POST request using the test client
    response = client.post('/',
                           data=json.dumps({'query': test_query}),
                           content_type='application/json')

    # Check the HTTP status code
    assert response.status_code == 200
    
    # Check the response content
    try:
        data = json.loads(response.data.decode('utf-8'))
        # Assert that the mock response is returned
        expected_prefix = "Hello from RAG Service! Processed query:"
        assert data['response'].startswith(expected_prefix)
    except json.JSONDecodeError:
        # Fail if the response is not valid JSON
        pytest.fail("Response was not valid JSON.")
