from django import forms
from .models import Task


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = '__all__'

        widgets = {
            'task': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Add tasks', 'aria-label': 'Add tasks'}),
            'completed': forms.CheckboxInput(attrs={'class': 'form-control'})
        }
