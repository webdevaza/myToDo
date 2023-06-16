$(document).ready(function(){

    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    
    allFunctions()

    // multiple tags selecting
    let selectedTags = document.getElementById("selectedTags")

    let tagsArr = Array.from(selectedTags.options)
    let tagsStr = ''
    selectedTags.addEventListener('change',() => {
        tagsArr = Array.from(selectedTags.options)
        tagsArr = tagsArr.filter(x => x.selected).map(x => x.text)
        tagsStr = tagsArr.join(' ')
    })

    function addTask (elem) {
        let formData = new FormData(elem);

        if(!formData.get('image').name) formData.set('image', formData.get('image'), null)

        if(tagsStr.length > 0) formData.set('tags', tagsStr)
        
        
        $.ajax({
            url: "tasks",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {

                console.log(response[1])
                
                let lastNewTag = Object.values(response[1]).at(-1)
                let addNewTag = `<option value="${lastNewTag}">${lastNewTag}</option>`
                
                console.log($('#selectedTags'))

                $('#selectedTags').prepend(addNewTag)

                let tags = ''

                for (const tag of response[0].tags) {
                    tags += `
                    <a class="badge bg-secondary text-wrap" href="#" name="tag" >
                            ${tag}
                    </a>`
                }
                
                let img = response[0].image == 'no-image.jpg' ? `../../../${response[0].image}` : `storage/images/${response[0].image}`

                let taskComponent = `
                <div class="task-row border border-2 rounded-2 p-2 m-1">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <a href="${img}" target="_blank">
                                    <img src="${img}" width="150" height="150">
                                </a>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <form action="" method="POST">
                                    <div>
                                        <input class="m-2 fulfil" type="checkbox" data-id=${response[0].id} name="input_check" />
                                        <span>${response[0].task}</span>    
                                    </div>
                                </form>    
                            </div>
                        </div>   
                        <div class="d-flex flex-row justify-content-end">
                            <a class="edit m-2" data-id="" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
                            </a>
                            <a class="delete m-2" data-id=${response[0].id} type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </a> 
                        </div> 
                    </div>
                    <br>
                    <div class="container-fluid">
                        ${tags}
                    </div>
                </div>
                `
                $('#tasks-list').prepend(taskComponent)
                $('#add-form')[0].reset();
            }
        });
    }

    function updateTask (elem) {
        let formData = new FormData(elem);

        if(!formData.get('image').name) formData.set('image', formData.get('image'), null)

        if(tagsStr.length > 0) formData.set('tags', tagsStr)
        
        console.log(formData.get('id'))
        $.ajax({
            url: "tasks/"+formData.get('id'),
            type: 'PUT',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {

                console.log(response[1])
                
                let lastNewTag = Object.values(response[1]).at(-1)
                let addNewTag = `<option value="${lastNewTag}">${lastNewTag}</option>`
                
                console.log($('#selectedTags'))

                $('#selectedTags').prepend(addNewTag)

                let tags = ''

                for (const tag of response[0].tags) {
                    tags += `
                    <a class="badge bg-secondary text-wrap" href="#" name="tag" >
                            ${tag}
                    </a>`
                }
                
                let img = response[0].image == 'no-image.jpg' ? `../../../${response[0].image}` : `storage/images/${response[0].image}`

                let taskComponent = `
                <div class="task-row border border-2 rounded-2 p-2 m-1">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <a href="${img}" target="_blank">
                                    <img src="${img}" width="150" height="150">
                                </a>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <form action="" method="POST">
                                    <div>
                                        <input class="m-2 fulfil" type="checkbox" data-id=${response[0].id} name="input_check" />
                                        <span>${response[0].task}</span>    
                                    </div>
                                </form>    
                            </div>
                        </div>   
                        <div class="d-flex flex-row justify-content-end">
                            <a class="edit m-2" data-id="" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
                            </a>
                            <a class="delete m-2" data-id=${response[0].id} type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </a> 
                        </div> 
                    </div>
                    <br>
                    <div class="container-fluid">
                        ${tags}
                    </div>
                </div>
                `
                $('#tasks-list').prepend(taskComponent)
                $('.task-edit')[0].reset();
                $('.task-edit').hide();
            }
        });
    }

    function fulfilTask (elem) {
        
        let id = $(elem).data("id");

        $.ajax(
        {
            url: "tasks/do/"+id,
            type: 'PUT',
            success: function (response){
                
                $(elem).closest('div').replaceWith(`
                <div>
                    <input class="m-2 fulfil" type="checkbox" name="input_check" data-id=${response.id} checked/>
                    <s>${response.task}</s>
                </div> 
                `);
            }
        });
    }

    function unfulfilTask (elem) {
        
        let id = $(elem).data("id");

        $.ajax(
        {
            url: "tasks/undo/"+id,
            type: 'PUT',
            success: function (response){
                
                $(elem).closest('div').replaceWith(`
                <div>
                    <input class="m-2 fulfil" type="checkbox" name="input_check" data-id=${response.id} />
                    <span>${response.task}</span>
                </div> 
                `);
            }
        });
    }

    function editTask (elem) {
        
        let id = $(elem).data("id");
        
        $.ajax(
        {
            url: "tasks/"+id,
            type: 'POST',
            data: {
                "id": id
            },
            success: function (response){

                let tags = response.tags.split(' ').join(', ')
                
                $(elem).closest('.task-row').append(`
                <div class="task-edit border border-2 rounded-2 p-2 m-1">
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="d-flex justify-content-center align-items-center">
                            <form id="edit-form">
                                <p>Edit Task</p>
                                <div class="d-flex align-items-center">
                                    <label for="image" id="paperClip">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                                        </svg>
                                    </label>
                                    <input class="" id="image" name="image" type="file" style="display:none" value="${response.image}">    
                                </div>
                                <div class="flex-grow-1 ms-3">    
                                    <div class="container-fluid">
                                        <input class="form-control m-2" name="task" value="${response.task}" required autocomplete="off">
                                        <input class="form-control m-2" name="tags" value="${tags}" required autocomplete="off">
                                    </div>
                                </div>
                                <button class="btn btn-outline-dark m-2" type="submit" id="editButton" data-id="${response.id}">Изменить</button>
                                <a class="btn btn-outline-dark m-2" id="cancelEdit">Отмена</a>
                            </form>    
                        </div>
                    </div>
                    <br>
                </div>
                `);

                // cancel editing
                $(document).on('click', '#cancelEdit', function() {
                    $(this).closest('.task-edit').hide()
                })
            }
        });
    }

    function removeTask (elem) {
        
        let id = $(elem).data("id");
        
        $.ajax(
        {
            url: "tasks/"+id,
            type: 'DELETE',
            data: {
                "id": id
            },
            success: function (response){
                $(elem).closest('.task-row').remove();
            }
        });
    }

    function allFunctions () {

        // add task
        $('#add-form').on('submit', function(event) {
            event.preventDefault();
            addTask(this)
        });

        // update task
        // $(document).on('submit', '#edit-form', function(event) {
        //     event.preventDefault();
        //     updateTask(this)
        // });
    
        // fulfil and unfulfil task
        $(document).on('click', '.fulfil', function() {
            if (this.checked) {
                fulfilTask(this);
            } else {
                unfulfilTask(this);
            }
        });

        // edit task
        $(document).on('click', '.edit', function() {
            editTask(this);
        });

        // delete task
        $(document).on('click', '.delete', function() {
            removeTask(this);
        });

        
    }
});
