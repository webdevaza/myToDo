@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
                <div id="searchIcon" class="col d-flex aligns-items-center justify-content-center m-3" data-bs-toggle="collapse" data-bs-target="#collapseSearch" role="button" aria-expanded="false" aria-controls="collapseSearch">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
                <div id="addIcon" class="col d-flex aligns-items-center justify-content-center m-3" data-bs-toggle="collapse" data-bs-target="#collapseNew" role="button" aria-expanded="false" aria-controls="collapseNew">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </div>
                <div class="collapse" id="collapseSearch">
                    <x-search />
                </div>
                <div class="collapse" id="collapseNew">
                    <x-add />
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <div class="list-group mb-0" id="tasks-list">
                        @foreach ($tasks as $task)
                            <x-task-row :id="$task->id" :task="$task->task" :status="$task->status"/>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
