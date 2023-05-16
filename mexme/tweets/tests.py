from django.contrib.auth import get_user_model
from django.test import TestCase

from .model import Tweet
# Create your tests here.
user = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self):
        
