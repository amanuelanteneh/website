from flask import Flask, redirect, url_for, render_template
import os

app = Flask(__name__)

@app.context_processor
#next 2 defs are to overcome browser caching which stops the css from updating properly
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                 endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

@app.route("/")
def home():
    return(render_template("index.html"))

@app.route("/books")
def readings():
    return(render_template("books.html"))

@app.route("/essays")
def essays():
    return(render_template("essays.html"))

@app.route("/TheModernUniversity")
def essay1():
    return(render_template("The-Modern-University.html"))

if __name__ == "__main__":
    app.run(debug=True)
