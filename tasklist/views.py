# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

def task_list(request):
    return render(request, 'tasklist/task_list.html', {})
