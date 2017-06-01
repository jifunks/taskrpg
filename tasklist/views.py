# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.utils import timezone
from .models import Task
from .forms import TaskForm
def task_list(request):
    # filter so that we only see tasks created prior to now, order by date created
    if request.method == "POST":
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)
            task.owner = request.user
            task.published_date = timezone.now()
            task.save()
            tasks = Task.objects.filter(created_date__lte=timezone.now()).order_by('created_date')
            return render(request, 'tasklist/task_list.html', {'tasks': tasks, 'form':TaskForm})
        else:
            tasks = Task.objects.filter(created_date__lte=timezone.now()).order_by('created_date')
            # TODO: handle form text here maybe?
            return render(request, 'tasklist/task_list.html', {'tasks': tasks, 'form':TaskForm})
