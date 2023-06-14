<div class="task-row border border-2 rounded-2 p-2 m-1">
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
                <a href="{{$image == 'no-image.jpg' ? asset('no-image.jpg') : asset('storage/images/'.$image)}}" target="_blank">
                    <img src="{{$image == 'no-image.jpg' ? asset('no-image.jpg') : asset('storage/images/'.$image)}}" width="150" height="150">
                </a>
            </div>
            <div class="flex-grow-1 ms-3">
                <form>
                    @csrf
                    @if ($status === "yes")
                    <div>
                        <input class="m-2 fulfil" type="checkbox" name="input_check" data-id={{$id}} checked />
                        <s>{{$task}}</s>
                    </div>    
                    @else
                    <div>
                        <input class="m-2 fulfil" type="checkbox" name="input_check" data-id={{$id}} />
                        <span>{{$task}}</span>
                    </div>
                    @endif
                </form>    
            </div>
        </div>   
        <div class="d-flex flex-row justify-content-end">
            {{-- <button class="edit" data-id="{{ $todo->id }}" >edit</button> --}}
            <a class="edit m-2" data-id="" >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
            </a>
            {{-- <button class="delete" data-id="{{ $todo->id }}" >x</button> --}}
            <a class="delete m-2" data-id={{$id}} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </a> 
        </div> 
    </div>
    <br>
    <x-tags :tags="$tags"/>
</div>