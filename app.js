const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskFilter = document.querySelector('#filter');
const taskLists = document.querySelector('ul.collection');
const clearBtn = document.querySelector('.clear-tasks');



// LOAD ALL EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", setTasks);
    taskForm.addEventListener('submit', addTasks);
    taskLists.addEventListener('click', delItems);
    clearBtn.addEventListener('click', clearTasks);
    taskFilter.addEventListener('keyup', filterLists);
};

// ADDING TASK TO THE USER INTERFACE FROM LOCAL STORAGE
function setTasks() {
    let storeDatas;
    if (localStorage.getItem('storeDatas') === null) {
        storeDatas = [];
    } else {
        storeDatas = JSON.parse(localStorage.getItem('storeDatas'));
    }

    storeDatas.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        taskLists.appendChild(li);
    })
}






// ADD TASKS
function addTasks(e) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskLists.appendChild(li);


    // STORE DATA TO LOCAL STORAGE
    storeDataInLocalStorage(taskInput.value);

    // CLEAR TASK AFTER INPUT
    taskInput.value = '';

    e.preventDefault();
}


// STORE DATA IN LOCAL STORAGE
function storeDataInLocalStorage(storeData) {
    let storeDatas;
    if (localStorage.getItem('storeDatas') === null) {
        storeDatas = [];
    } else {
        storeDatas = JSON.parse(localStorage.getItem('storeDatas'));
    }
    storeDatas.push(storeData);

    localStorage.setItem('storeDatas', JSON.stringify(storeDatas));
}





// DELETE TASK
function delItems(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('ARE YOU SURE YOU WANT TO DELETE IT?')) {
            e.target.parentElement.parentElement.remove();

            // DELETE ITEM FROM LOCAL STORAGE
            deleteItemFromLocalStorage(e.target.parentElement.parentElement);
        };

    };

};


// DELETE ITEM FROM LOCAL STORAGE
function deleteItemFromLocalStorage(delItemFromLS) {
     let storeDatas;
     if (localStorage.getItem('storeDatas') === null) {
         storeDatas = [];
     } else {
         storeDatas = JSON.parse(localStorage.getItem('storeDatas'));
     };

     storeDatas.forEach(function (storeData, index) {
        if (delItemFromLS.textContent === storeData) {
            storeDatas.splice(index, 1);
        };
     });

     localStorage.setItem('storeDatas', JSON.stringify(storeDatas));
};




// CLEAR TASK
function clearTasks(e) {
    taskLists.textContent = '';

    // CLEAR TASKS FROM LOCAL STORAGE
    clearTasksFromLocalStorage();

    e.preventDefault();
};

// CLEAR TASKS FROM LOCAL STORAGE
function clearTasksFromLocalStorage() {
    if (confirm('ARE YOU SURE YOU WANT TO CLEAR TASKS FROM LOCAL STORAGE?')){
         localStorage.clear();
    };
   
};



// FILTER TASKS
function filterLists(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('li.collection-item').forEach(function (task) {
        if (task.textContent.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        };
    });
};