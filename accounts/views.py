from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
# Create your views here.

def index(request):
    return render(request, 'accounts/index.html')


def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = UserCreationForm()

    context = {'form': form}
    return render(request, 'accounts/register.html', context)


