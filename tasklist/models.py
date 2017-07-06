# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your models here.
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your views here.
class Task(models.Model):
    owner = models.ForeignKey('auth.User')
    id = models.AutoField(primary_key=True)
    task_text = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)
    # TODO: due date, priority?
    # TODO: full_clean() on object before saving to validate, then catch ValidationError.

    def add_task(self):
        self.save()

    def __str__(self):
        return self.task_text

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    level = 1
    xp_gained = 0

    def __str__(self):
        return self.user.username

    def __unicode__(self):
        return self.user.username
