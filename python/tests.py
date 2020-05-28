import unittest
from flask import json
from schematics.exceptions import ModelValidationError
from app import app
from unittest.mock import patch
from collections import defaultdict


class BasicTestCase(unittest.TestCase):
    mock_db = defaultdict(list)
    mock_db[123456] = [{
                "instructor": 123456,
                "name": "Alice",
                "time": "2019-08-27T14:00:00-04:00"}]

    @classmethod
    def setUpClass(cls):
        cls.tester = app.test_client()

    def test_booking_create(self):
        """Ensure that user can create a booking """
        json_text = '''
        {
            "time":"2019-08-26T14:00:00-04:00",
            "name":"Bob",
            "instructor":123123
        }
        '''
        response = self.tester.post('/api/booking/',
                                    data=json.dumps(json.loads(json_text)),
                                    content_type='application/json',
                                    follow_redirects=True)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["123123"], [{'instructor': 123123, 'name': 'Bob', 'time': '2019-08-26T14:00:00-04:00'}])

    def test_booking_bad_create(self):
        """Ensure that user will get a 400 response on an invalid post  """
        tester = app.test_client(self)
        response = tester.post('/api/booking/', data={}, follow_redirects=True)
        self.assertEqual(response.status_code, 400)
        self.assertRaises(ModelValidationError)

    @patch('app.user_bookings', mock_db)
    def test_booking_get(self):
        """Ensure that user can get bookings """
        response = self.tester.get('/api/booking/',
                                   content_type='html/text')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["123456"], \
                         [{'instructor': 123456,
                           'name': 'Alice',
                           'time': '2019-08-27T14:00:00-04:00'}])

if __name__ == '__main__':
    unittest.main()
