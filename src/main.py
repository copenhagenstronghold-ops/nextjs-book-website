from flask import Flask

# 'app' is the WSGI callable object that gunicorn looks for
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, Gunicorn!'

# You typically don't include the 'app.run()' block in a file
# that Gunicorn is running, as Gunicorn handles the server part.
# The minimum required is the creation of the 'app' variable.