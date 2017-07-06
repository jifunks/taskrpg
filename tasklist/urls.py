from django.conf.urls import url
from django.views.generic.base import RedirectView

from . import views

favicon_view = RedirectView.as_view(url='/static/favicon.ico', permanent=True)

urlpatterns = [
    url(r'^$', views.task_list, name='task_list'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^delete-task/(?P<task_id>\w+)/$', views.delete_task),
    url(r'^get-task/(?P<task_id>\w+)/$', views.get_task),
    url(r'^toggle-task/(?P<task_id>\w+)/$', views.toggle_task),
    url(r'^add-task/$', views.add_task),
    url(r'^favicon\.ico$', favicon_view),

]

