@extends('layouts.app')

@section('content')
    <div class="pt-5 mt-5" style="height: 340px;">
        <div class="d-flex align-items-center justify-content-center">    
            <div class="p-2 mb-4 bg-light rounded-3">
                <h1 class="display-5 fw-bold">Мой список дел</h1>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-center">
            @auth
                <a href="{{route('tasks.index')}}" class="btn btn-dark btn-lg">К списку</a>
            @else
                <a href="{{route('login')}}" class="btn btn-dark btn-lg">Войти</a>   
            @endauth

        </div>
    </div>
    <footer class="pt-3 mt-4 mx-3 px-4 text-muted border-top">
      &copy; Азамат Мамбетов
    </footer>
@endsection

