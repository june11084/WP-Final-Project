from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
# Make sure to install this using pip install requests on terminal
import requests


# Version-1: This version makes an AJAX request in JavaScript
def index(request):
    return render(request, 'yelp/index.html')
