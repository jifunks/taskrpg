# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-01 23:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasklist', '0002_auto_20170601_2328'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
