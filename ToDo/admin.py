from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Task  # bring in our model

# Register your models here.
admin.site.register(Task)
