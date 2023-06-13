// toggle addBar and searchBar
// document.getElementById('newTask').addEventListener('click', () => {
//     document.getElementById('searchBar').hidden = true
//     document.getElementById('addBar').hidden = false
//     document.getElementById('newTask').hidden = true
// })
// document.getElementById('addTask').addEventListener('submit', () => {
//     document.getElementById('searchBar').hidden = false
//     document.getElementById('addBar').hidden = true
//     document.getElementById('newTask').hidden = false
// })

document.querySelector('#cancelSearch').addEventListener('click', () => {
    document.querySelector('#collapseSearch').classList.remove('show')
})
document.querySelector('#cancelAdd').addEventListener('click', () => {
    document.querySelector('#collapseNew').classList.remove('show')
})


// image validation
document.getElementById('image').addEventListener("change", () => {
    let fileName = document.getElementById("image").value;
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    
    if ((extFile=="jpg" || extFile=="jpeg" || extFile=="png") && fileName){
        // change file attach icon
        document.getElementById('paperClip').hidden = true
        document.getElementById('tick').hidden = false
    }else{
        document.getElementById('paperClip').hidden = false
        document.getElementById('tick').hidden = true
        alert("Only jpg/jpeg and png files are allowed!");
    }
});

document.getElementById('addButton').addEventListener("click", () => {
    document.getElementById('paperClip').hidden = false
    document.getElementById('tick').hidden = true
})

