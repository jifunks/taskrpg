# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your models here.
from django.db import models
from django.utils import timezone

# Create your views here.
class Task(models.Model):
    owner = models.ForeignKey('auth.User')
    task_text = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)
    # TODO: due date, priority?

    def add_task(self):
        self.save()

    def __str__(self):
        return self.task_text
