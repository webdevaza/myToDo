$(document).ready(function(){

    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    
    allFunctions()

    function addTask (elem) {
        let formData = new FormData(elem);
        
        if(!formData.get('image').name) formData.set('image', formData.get('image'), null)

        $.ajax({
            url: "tasks",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                let tags = ''

                for (const tag of response.tags) {
                    tags += `
                    <a class="badge bg-secondary text-wrap" href="#" name="tag" >
                            ${tag}
                    </a>`
                }
                
                let img = response.image == 'no-image.jpg' ? `../../../${response.image}` : `storage/images/${response.image}`

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
                                        <input class="m-2 fulfil" type="checkbox" data-id=${response.id} name="input_check" />
                                        <span>${response.task}</span>    
                                    </div>
                                </form>    
                            </div>
                        </div>   
                        <div class="d-flex flex-row justify-content-end">
                            <a class="edit m-2" data-id="" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
                            </a>
                            <a class="delete m-2" data-id=${response.id} type="button">
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
    
        // fulfil and unfulfil task
        $(document).on('click', '.fulfil', function() {
            if (this.checked) {
                fulfilTask(this);
            } else {
                unfulfilTask(this);
            }
        });

        // delete task
        $(document).on('click', '.delete', function() {
            removeTask(this);
        });
    }
});
