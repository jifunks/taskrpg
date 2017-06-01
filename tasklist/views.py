# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.utils import timezone
from .models import Task

def task_list(request):
    # filter so that we only see tasks created prior to now, order by date created
    tasks = Task.objects.filter(created_date__lte=timezone.now()).order_by('created_date')
    return render(request, 'tasklist/task_list.html', {'tasks': tasks})
