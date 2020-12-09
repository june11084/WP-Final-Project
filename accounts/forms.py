from django import forms
from .models import Accounts


class AuthenticationForm(forms.ModelForm):
    class Meta:
        model = Accounts
        fields = '__all__'
        widgets = {
            'password': forms.PasswordInput(),
        }