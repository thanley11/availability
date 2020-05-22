from flask import Flask, jsonify
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)
