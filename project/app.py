from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Load JSON data
def load_json_data(filename):
    with open(os.path.join('json', filename), 'r', encoding='utf-8') as file:
        return json.load(file)

# Routes for serving HTML pages
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/teachers')
def teachers():
    teachers_data = load_json_data('teachers.json')
    return render_template('teachers.html', teachers=teachers_data['teachers'])

@app.route('/courses')
def courses():
    courses_data = load_json_data('courses.json')
    return render_template('courses.html', courses=courses_data['courses'])

@app.route('/pricing')
def pricing():
    pricing_data = load_json_data('pricing.json')
    return render_template('pricing.html', pricing=pricing_data['pricing'])

@app.route('/portal')
def portal():
    return render_template('portal.html')

# API endpoints for AJAX requests
@app.route('/api/translations/<lang>')
def get_translations(lang):
    translations = load_json_data('translations.json')
    return jsonify(translations.get(lang, {}))

@app.route('/api/teachers')
def api_teachers():
    teachers_data = load_json_data('teachers.json')
    return jsonify(teachers_data)

@app.route('/api/courses')
def api_courses():
    courses_data = load_json_data('courses.json')
    return jsonify(courses_data)

@app.route('/api/pricing')
def api_pricing():
    pricing_data = load_json_data('pricing.json')
    return jsonify(pricing_data)

# Contact form submission
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    data = request.json
    # In a real application, you