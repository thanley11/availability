import json
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import requests

from schematics.models import Model
from schematics.types import IntType, StringType
from schematics.types.compound import ModelType, ListType

from schematics.exceptions import ModelValidationError
from werkzeug.exceptions import HTTPException
from collections import defaultdict

app = Flask(__name__)
CORS(app)

user_bookings = defaultdict(list)


class BookingDto(Model):
    name = StringType(required=True)
    time = StringType(required=True)
    instructor = IntType(required=True)


@app.route('/api/booking/', methods=['GET'])
def get_bookings():
    return jsonify(user_bookings), 200


@app.route('/api/booking/', methods=['POST'])
def book_time():
    try:
        payload = request.get_json()
        booking = BookingDto(payload)
        booking.validate()
        instructor_id = booking.get("instructor")
        data = booking.to_primitive()
        user_bookings[instructor_id].append(data)
        return jsonify(user_bookings), 200
    except ModelValidationError:
        abort(400, 'Validation Error')
