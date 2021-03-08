window.addEventListener('load', () => {

    let m = JSON.parse(localStorage.getItem("localtask"));
        m.forEach(function(index){
        // UI VARIABLES
            const li = document.createElement("li");
            const listDiv = document.createElement("div");
            const listText = document.createElement("div");
            const timeDiv = document.createElement("div");
            const timeText = document.createElement("div");
            listDiv.className = "listDiv";
            listText.className = "listText  timeText";
          
            timeText.className = "timeText";
   
            
            
            listText.innerHTML = index.task_name;
            listDiv.appendChild(listText);
            li.appendChild(listDiv);

            timeText.innerHTML = index.date;
            li.appendChild(timeText);
         
            document.querySelector("ul").appendChild(li);
        });
})