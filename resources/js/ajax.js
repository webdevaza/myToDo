$(document).ready(function(){

    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    
    // add task
    $('#add-form').submit(function(event) {
        event.preventDefault();
        let formData = $(this).serialize();
        
        $.ajax({
            url: "tasks",
            type: 'POST',
            data: formData,
            success: function(response) {
                
                let tags = ''

                for (let i = 0; i < 5; i++) {
                    tags += `
                    <a class="badge bg-secondary text-wrap" href="#">
                            Tag ${i}
                    </a>`
                }

                let taskComponent = `
                <div class="task-row border border-2 rounded-2 p-2 m-1">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <a href="https://images.unsplash.com/photo-1686297053585-f62dc5e887df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80" target="_blank">
                                    <img src="https://images.unsplash.com/photo-1686297053585-f62dc5e887df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80" width="150" height="150">
                                </a>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <form action="" method="POST">
                                    <input class="m-2" type="checkbox" name="input_check" aria-label="..." />
                                    <span>${response.task}</span>    
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
            },
            complete: function () {
                $('.delete').on('click', function() {
                    removeTask(this)
                })
            }
        });
    });

    // delete task
    $('.delete').on('click', function() {
        removeTask(this)
    })

    function removeTask (elem) {
        console.log('working')
        
        let id = $(elem).data("id");
        
        $.ajax(
        {
            url: "tasks/"+id,
            type: 'DELETE',
            data: {
                "id": id
            },
            success: function (result){
                $(elem).closest($('.task-row')).remove();
            }
        });
    }
});

