# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.utils import timezone
from django.http import HttpResponseRedirect, HttpResponse
from .models import Task
from .forms import TaskForm, UserForm

def task_list(request):
    if request.method == "POST":
        if "add_task" in request.POST:
            form = TaskForm(request.POST)
            if form.is_valid():
                task = form.save(commit=False)
                task.owner = request.user
                task.published_date = timezone.now()
                task.save()
                return HttpResponseRedirect(reverse("task_list"))
    else:
        if request.user.is_authenticated():
            tasks = Task.objects.filter(owner=request.user).order_by('created_date')
            return render(request, 'tasklist/task_list.html', {'tasks': tasks, 'form':TaskForm})
        else:
            return HttpResponseRedirect(reverse("login"))


def register(request):
    registered = False

    if request.method == "POST":
        user_form = UserForm(data=request.POST)
        # TODO: do i need userprofileform?
        if user_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            registered = True
        else:
            print(user_form.errors)
    else:
        user_form = UserForm()

    return render(request, 'tasklist/register.html', {'user_form': user_form, 'registered': registered})

def user_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect(reverse("task_list"))
            else:
                return HttpResponse("Your account has been disabled")
        else:
            print("Invalid login details: {0}, {1}".format(username, password))
            return HttpResponse("invalid login.")

    else:
        return render(request, 'tasklist/login.html', {})

#        return HttpResponseRedirect(reverse("task_list"))

@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse("task_list"))

@login_required
def delete_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.delete()
    return HttpResponse("true")


@login_required
def add_task(request):
    form = TaskForm(request.POST)
    if form.is_valid():
        task = form.save(commit=False)
        task.owner = request.user
        task.published_date = timezone.now()
        task.save()
        return HttpResponseRedirect(reverse("task_list"))

        task_title = request.GET.get('title')
    task_date = datetime.strptime(request.GET.get('date'),"%m/%d/%Y")
    task_tags = request.GET.get('tags')
    new_task = Task(title=task_title,due_date=task_date,user=request.user)
    new_task.save()
    for tag in task_tags.split(","): # add each tag
        new_task.tags.add(tag)
    new_task.save()
    return HttpResponse(new_task.id)
