from django import forms
from .models import Task, UserProfile
from django.contrib.auth.models import User


class TaskForm(forms.ModelForm):
    # TODO: is this still needed after switching to AJAX?
    class Meta:
        model = Task
        fields = ('task_text',)

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

# class UserProfileForm(forms.ModelForm):
#     class Meta:
#         model = UserProfile
#         fields = ()
