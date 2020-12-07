from django.db import models

# Create your models here.


class Task(models.Model):
    task = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return "Task: " + self.task + ", Created: " + str(self.created_at)
