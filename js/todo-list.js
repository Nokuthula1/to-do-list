showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

//  let dateInput;
//  let timeInput;
let dateInput= document.getElementById("dateInput");
let timeInput= document.getElementById("timeInput");

//when the button is clicked it will save the entered data into my local storage as an array and json file
addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value;
    
    let dateValue = dateInput.value
   
    let timeValue = timeInput.value
  

    if(addtaskinputval.trim()!=0){
        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(webtask);
        }
        taskObj.push({'task_name':addtaskinputval, 'completeStatus':false,'date':dateValue, 'time':timeValue});
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addtaskinput.value = '';
      
    }
   
    
    showtask();
    // testDay();
})

// showtask will display my list on the web page and add 3 buttons dynamiically
function showtask(){
    let webtask = localStorage.getItem("localtask");

    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed"  >${item.task_name}</td>`;
        }else{
            taskCompleteValue = `<td >${item.task_name}</td>`;
        }
        html += `<tr>
                    <th scope="row">${index+1}</th>
                    ${taskCompleteValue}
                  
                    <td><button type="button"  id ="edit" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i></button></td>
                    <td><button type="button" class="text-success" id=${index} ><i class="fas fa-check-circle"></i></button></td>
                    <td><button type="button" id ="delete" onclick="deleteitem(${index})" class="text-danger"><i class="fas fa-trash-alt"></i></i></button></td>
                </tr>`;
    });
    addedtasklist.innerHTML = html;
}

// edittask will allow the user to edit/change data on the current data(basically update)
function edittask(index){
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    let dateInput = document.getElementById("dateInput");
    let timeInput = document.getElementById("timeInput");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    
    addtaskinput.value = taskObj[index]['task_name'];
    dateInput.value = taskObj[index]['date'];
    timeInput.value = taskObj[index]['time'];
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
}

// savetask will allow the user to save the editted data into local storage NB!! the old data will be updated
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    let saveindex = document.getElementById("saveindex").value;
    
    for (keys in taskObj[saveindex]) {
        if(keys == 'task_name'){
            taskObj[saveindex].task_name = addtaskinput.value;
        }
      }
   
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value='';
    showtask();
})

// deleteitem will allow the user to remove an item rom the to-do list
function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}

// complete task will display a red strike through the text to show that the task is complete
let addedtasklist = document.getElementById("addedtasklist");
addedtasklist.addEventListener("click", function(e){
      
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        
        let mytarget = e.target;
        if(mytarget.classList[0] === "text-success"){
        //console.log(mytarget);
        let mytargetid = mytarget.getAttribute("id");
            
        mytargetpresibling = mytarget.parentElement;
       

            for (keys in taskObj[mytargetid]) {
                if(keys == 'completeStatus' && taskObj[mytargetid][keys]==true){
                    taskObj[mytargetid].completeStatus = false;
                 
                }else if(keys == 'completeStatus' && taskObj[mytargetid][keys]==false){
                    taskObj[mytargetid].completeStatus = true;
                  //taskObj[mytargetid] = '<span style="text-decoration:line-through">' + JSON.stringify(taskObj[mytargetid]) + '</span>'
                   
                }
              }       
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();
    }
})

// deleteall will refresh (remove) all the data in the to-do list
let deleteallbtn = document.getElementById("deleteallbtn");
let datesCreated = document.getElementById("dates");

deleteallbtn.addEventListener("click", function(){
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    if(webtask == null){
        taskObj = [];
       
    }
    else{
        taskObj = JSON.parse(webtask);
        taskObj = [];
        datesCreated.remove();
    }
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();

})

// serachlist will allow the user to find an object/ task by reading all the elements in the list and returning a list of elements that contain the search word
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function(){
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, 'gi');
        if(searchedtext.match(re)){
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})

/* let index = taskObj.findIndex(item => item.completeStatus === true);
 //let index = taskObj.value(item => item.completeStatus === true)
if(completeStatus===true){
    var count = 0;
     count++;
}*/
// taskObj.forEach((task)=>{
//     if(task.completeStatus==true){
//         console.log(task.task_name)
//     }
// });
// taskObj.forEach((task)=>{
//     if(task.completeStatus==false){
//         console.log(task.task_name)
//     }
// });

// var tr = document.querySelectorAll("tr");
// Array.from(tr).forEach(function(item){
//     let td = item.getElementsByTagName("td")[0];
//     console.log(td);

//     if(td.classList.contains('completed')){
//         console.log(td);
//     }
    
// })

//filter will allow the user to select an option to display a list of completed tasks or uncompleted tasks and all the tasks in the list
let filterTodos = document.getElementById("filter");

filterTodos.addEventListener("click", function(){
   
   var tr = document.querySelectorAll("tr");
   Array.from(tr).forEach(function(item){ 
    let td = item.getElementsByTagName("td")[0];
    switch (filterTodos.value) {
        case "all":
            item.style.display = "block";
            break;
        case "completed":
                if(td.classList.contains('completed')){
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
        
            break;
        case "uncompleted":
                    if(!td.classList.contains('completed')){
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
            
            break;
    
    }
   }); 
});


function displayDateTime(){
   let  dateValue;
  dateValue.value ='';
  
   let timeValue;
   timeValue.value ="";

    var tr = document.querySelectorAll("tr");
    Array.from(tr).forEach(function(item){ 
        let td = item.getElementsByTagName("td")[0];
        
            if(td.classList.contains('date' && td.classList.contains('time' ))){
                document.getElementById("dateInput").innerHTML = dateInput  ; 
                document.getElementById("timeInput").innerHTML = timeInput  ; 
            } else {
                item.style.display = "none";
            }
    });
             
              
}


//this will return a list of how the user's day will look like




 var d = new Date().toUTCString();
document.getElementById("navbar_date").innerHTML = d;
//dayList.innerHTML =  "read";

//this will return a list of how the user's week will look like

//this will allow the user to create a new list in a different day

  // <td><button type="attribute"  id ="important" onclick="important(${index})" class="complete_imprt" ><i  class="far fa-star"></i></button></td>

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//time picker
// const time_picker_element = document.querySelector('.time-picker');

// const hr_element = document.querySelector('.hr');
// const min_element = document.querySelector(' .min');

// const hr_up = document.querySelector('.hr-up');
// const hr_down = document.querySelector('.hr-down');

// const min_up = document.querySelector('.min-up');
// const min_down = document.querySelector('.min-down');

// let dte = new Date();

// let hour = dte.getHours();
// let minute = dte.getMinutes();
// setTime();

// // EVENT LISTENERS
// hr_up.addEventListener('click', hour_up);
// hr_down.addEventListener('click', hour_down);

// min_up.addEventListener('click', minute_up);
// min_down.addEventListener('click', minute_down);

// hr_element.addEventListener('change', hour_change);
// min_element.addEventListener('change', minute_change);

// function hour_change (e) {
// 	if (e.target.value > 23) {
// 		e.target.value = 23;
// 	} else if (e.target.value < 0) {
// 		e.target.value = '00';
// 	}

// 	if (e.target.value == "") {
// 		e.target.value = formatTime(hour);
// 	}

// 	hour = e.target.value;
// }

// function minute_change (e) {
// 	if (e.target.value > 59) {
// 		e.target.value = 59;
// 	} else if (e.target.value < 0) {
// 		e.target.value = '00';
// 	}

// 	if (e.target.value == "") {
// 		e.target.value = formatTime(minute);
// 	}

// 	minute = e.target.value;
// }

// function hour_up () {
// 	hour++;
// 	if (hour > 23) {
// 		hour = 0;
// 	}
// 	setTime();
// }
// function hour_down () {
// 	hour--;
// 	if (hour < 0) {
// 		hour = 23;
// 	}
// 	setTime();
// }

// function minute_up () {
// 	minute++;
// 	if (minute > 59) {
// 		minute = 0;
// 		hour++;
// 	}
// 	setTime();
// }
// function minute_down () {
// 	minute--;
// 	if (minute < 0) {
// 		minute = 59;
// 		hour--;
// 	}
// 	setTime();
// }

// function setTime () {
// 	hr_element.value = formatTime(hour);
// 	min_element.value = formatTime(minute);
// 	time_picker_element.dataset.time = formatTime(hour) + ':' + formatTime(minute);
// }

// function formatTime (time) {
// 	if (time < 10) {
// 		time = '0' + time;
// 	}
// 	return time;
// }

