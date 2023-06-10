@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <x-search />
            <div class="card">
                {{-- <div class="card-header">{{ __('My Tasks') }}</div> --}}
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <div class="list-group mb-0">
                        <x-task-row />
                        <x-task-row />
                        <x-task-row />
                        <x-task-row />
                        <x-task-row />
                        <x-task-row />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
