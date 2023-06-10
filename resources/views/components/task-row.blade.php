<div class="border border-2 rounded-2 p-2 m-1">
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1685768381606-e7e9ca5d2032?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1428&q=80" width="30" height="30">
            </div>
            <div class="flex-grow-1 ms-3">
                <form action="" method="POST">
                    @csrf
                    {{method_field('PUT')}}
                    {{-- @if ($todo->done == 1) --}}
                    <input class="form-check-input m-2" type="checkbox" name="input_check" aria-label="..." checked onchange="this.closest('form').submit();return false;"/>
                    {{-- <s>{{$todo->to_do}}</s>     --}}
                    <s>To do this task lkmldkfvmdlfkv ldkvmdlkfv lkmdfvlkdvm ldkfvmldkfvm</s>    
                    {{-- @else --}}
                    {{-- <input class="form-check-input me-2" type="checkbox" name="input_check" aria-label="..." onchange="this.closest('form').submit();return false;"/> --}}
                    {{-- {{$todo->to_do}} --}}
                    {{-- @endif --}}
                </form>    
            </div>
        </div>   
        <div class="d-flex flex-row justify-content-end">
            <meta name="csrf-token" content="{{ csrf_token() }}">
            {{-- <button class="edit" data-id="{{ $todo->id }}" >edit</button> --}}
            <a class="edit m-2" data-id="" >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
            </a>
            {{-- <button class="delete" data-id="{{ $todo->id }}" >x</button> --}}
            <a class="delete m-2" data-id="" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </a> 
        </div> 
    </div>
    <br>
    <x-tags />
</div>