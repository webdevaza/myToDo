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
        console.log(formData)
        $.ajax({
            url: "tasks",
            type: 'POST',
            data: formData,
            success: function(response) {
                $('#tasks-list').prepend('newTask <br>')
                $('#add-form')[0].reset();
            }
        });
    });

    // delete task
    $('.delete').on('click', function() {
              
        let id = $(this).data("id");
        let elem = this
        
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
      })
});