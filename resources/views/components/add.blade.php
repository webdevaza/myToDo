<nav id="addBar" class="navbar navbar-light bg-light">
    <div class="container-fluid justify-content-center">
        <form id="add-form" method="POST" enctype="multipart/form-data">
            <div id="addTask" class="d-flex aligns-items-center justify-content-center flex-wrap m-2">
                
                    <input class="form-control m-2" name="task" placeholder="Задание" required autocomplete="off">
                    <select required class="form-select w-auto" 
                            name="tags" 
                            id="selectedTags" 
                            multiple data-allow-new="true"
                            data-regex="^\w[a-zA-Z@#0-9.]*$">
                        <option selected disabled hidden value="">Выберите или добавьте новый тег</option>
                        @foreach ($allTags as $tag)
                            <option value="{{$tag}}">{{$tag}}</option>
                        @endforeach
                    </select>
                    
                <div class="invalid-feedback">Please select a valid tag.</div>

                <div class="m-3">
                    <label for="image" id="tick" hidden>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                          </svg>
                    </label>
                    <label for="image" id="paperClip">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                        </svg>
                    </label>
                    <input class="form-control form-control-sm" id="image" name="image" type="file" style="display:none" value="no-image">
                    @error('image')
                        <p>Error</p>
                    @enderror
                </div>
                <button class="btn btn-outline-dark m-2" type="submit" id="addButton">Добавить</button>
                <a class="btn btn-outline-dark m-2" id="cancelAdd">Отмена</a>
            </div>
        </form>
    </div>
</nav>