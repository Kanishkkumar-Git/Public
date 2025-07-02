from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import CustomUserCreationForm
import uuid

def home(request):
    return render(request, 'home.html')


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = True  
            user.save()
            token = str(uuid.uuid4())
            request.session['token'] = token
            request.session['user_id'] = user.id
            messages.success(request, f"Registered! Please verify: /verify/{token}")
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})
def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = True  
            user.save()

            
            token = str(uuid.uuid4())
            Profile.objects.create(user=user, token=token)

            messages.success(request, f"Registered! Please verify: /verify/{token}")
            return redirect('login')
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

def verify(request, token):
    saved_token = request.session.get('token')
    user_id = request.session.get('user_id')
    
    if saved_token == token:
        user = User.objects.get(id=user_id)
        user.is_active = True
        user.save()
        messages.success(request, "✅ Account Verified Successfully")
        return redirect('login')
    else:
        return render(request, 'verify.html', {'status': 'Invalid token ❌'})

def login_view(request):
    if request.method == 'POST':
        uname = request.POST['username']
        pword = request.POST['password']
        user = authenticate(username=uname, password=pword)
        if user :
            if user.is_active:
                login(request, user)
                return redirect('dashboard')
            else:
                messages.error(request, "Please verify your account first.")
        else:
            messages.error(request, "Invalid credentials.")
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('home')

@login_required(login_url='login')
def dashboard(request):
    return render(request, 'dashboard.html')



