from django.shortcuts import render, redirect
# Create your views here.
from .forms import TaskForm
from .models import Task


def view_tasks(request):
    # Retrieve all the tasks and render index.html with the data
    tasks = Task.objects.all()
    form = TaskForm()
    context = {'tasks': tasks, 'form': form}
    return render(request, 'tasks/index.html', context)


def create_task(request):
    print("create task reached")
    # Create a form instance and populate it with data from the request
    tasks = Task.objects.all()
    form = TaskForm(request.POST or None)
    # check whether it's valid:
    if form.is_valid():
        # save the record into the db
        form.save()
        # after saving redirect to index page
        return redirect('view_tasks')
    else:
        form = TaskForm()
        context = {'tasks': tasks, 'form': form, 'error': 'task is not valid!'}
        return render(request, 'tasks/index.html', context)


def update_task(request, id):
    print("update task reached")
    # Get the product based on its id
    task = Task.objects.get(id=id)
    # populate a form instance with data from the data on the database
    # instance=product allows to update the record rather than creating a new record when save method is called
    form = TaskForm(request.POST or None, instance=task)
    # check whether it's valid:
    if form.is_valid():
        # update the record in the db
        form.save()
        # after updating redirect to view_product page
        return redirect('view_tasks')
    # if the request does not have post data, render the page with the form containing the task's info
    return render(request, 'tasks/update.html', {'form': form})


def delete_task(request, id):
    # Get the product based on its id
    task = Task.objects.get(id=id)
    # if this is a POST request, we need to delete the form data
    if request.method == 'POST':
        task.delete()
        # after deleting redirect to view_task page
        return redirect('view_tasks')
    # if the request is not post, render the page with the task's info
    return render(request, 'tasks/delete.html', {'task': task})


def complete_task(request, id):
    print("complete task reached")
    task = Task.objects.get(id=id)
    tasks = Task.objects.all()
    form = TaskForm()
    context = {'tasks': tasks, 'form': form, 'message': f'{task.task} has been completed.'}
    if request.method == 'POST':
        task.completed = True
        task.save()
        # after deleting redirect to view_product page
        return render(request, 'tasks/index.html', context)
