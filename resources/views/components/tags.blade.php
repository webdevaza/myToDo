@if ($tags)
    <div class="container-fluid">
        @foreach (explode(' ',$tags) as $tag)
        <a class="badge bg-secondary text-wrap" href="#" name="tag" >
                {{$tag}}
        </a>
        @endforeach 
    </div>
@endif
