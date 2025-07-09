from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('dashboard/', views.user_dashboard),
    path('upload/', views.upload_video),
    path('videos/', views.list_videos),
    path('videos/<int:id>/', views.get_video),
    path('my-videos/', views.user_videos),
path('my-videos/', views.user_videos),

]
