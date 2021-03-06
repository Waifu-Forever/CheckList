let edit_popup = document.getElementsByClassName('edit-popup')[0];
let create_popup = document.getElementsByClassName('form-popup')[0];

var row_edit = '';

function createRow(){
    
    var value = document.getElementsByClassName('task-title')[0]
    .getElementsByTagName('input')[0].value;
   
    const div = document.createElement('div');
    var div_id = Math.random().toString()

    div.className = 'row';

    
    div.id = div_id.toString();
    //var data = {text: value, id: div_id};

    var data = [value.toString(), div_id]

    data = JSON.stringify(data)
  
        
    div.innerHTML = `
        
        <img class="check" src="./assets/circle-icon.png" alt="" onclick="check(${div_id.toString()})">
        <img class="checked" src="./assets/right-icon.png" alt="" onclick="check(${div_id.toString()})">

        <div class="task">${value}</div>
        
        <div class="button edit">
            <img src="./assets/edit-icon.png" alt="" onclick="DisplayPopup('edit-popup', ${div_id.toString()})">
        </div>
        <div class="button trash">
            <img src="./assets/trash-icon.png" alt="" onclick="DeleteRow(${div_id.toString()})">
        </div>
            

        
    `;
  
    document.getElementsByClassName('rows')[0].appendChild(div);
}


function UpdateRow(id, text){
    document.getElementById(id).getElementsByClassName('task')[0].textContent = text;
    //let print = document.getElementById(id).getElementsByClassName('task')[0].textContent;
    console.log(id )
    

}

function DeleteRow(id){
    var row = document.getElementById(id)
    
    if(row_edit !== ''){
        edit_popup.style.display = "none";
        
    }
    row_edit = '';
    document.getElementsByClassName('rows')[0].removeChild(row);
      

}

function check(id){
    
    var row = document.getElementById(id);
    var check = row.getElementsByClassName('check')[0];
    var checked = row.getElementsByClassName('checked')[0];
    
    
    if(check.style.display === "none"){
        check.style.display = "block"
        checked.style.display = "none";
        if(row_edit !== id){
            row.style.backgroundColor = "#c3aaf0"
            row.style.transition = "background-color 0.4s"
            
        }
       
      
    }
    else{
        check.style.display = "none"
        checked.style.display = "block";
       
        if(row_edit !== id){
            row.style.backgroundColor = "#9783c9"
            row.style.transition = "background-color 0.4s"
        }
     
        
       
    }   
   
}

function isChecked(id){
    if(document.getElementById(id).getElementsByClassName('checked')[0].style.display === "block"){
        return true;
    } else{
        return false;
    }
}



function CancelPopup(str){
    document.getElementsByClassName(str)[0].style.display = "none";
    
}

function EditPopup(id){       
    
    let row;
    let input = edit_popup.getElementsByTagName('input')[0];

    let finish = () => {
        UpdateRow(id, input.value);

        console.log({row_edit: row_edit})
       
        if(isChecked(id)){
            row.style.backgroundColor = '#9783c9'
            row.style.transition = "background-color 0.4s";
        } else {
            row.style.backgroundColor = '#c3aaf0'
            row.style.transition = "background-color 0.4s";
        }          
        
        row_edit = '';
        CancelPopup('edit-popup') 
    }

    if (row_edit === ''){
        row_edit = id;         

        row = document.getElementById(id);           
    
        
        create_popup.style.display = "none";
        edit_popup.style.display = "flex";
        row.style.backgroundColor = '#f28574'

    
        input.value = row.getElementsByClassName('task')[0].textContent;

        edit_popup.getElementsByClassName('btn')[0].onclick = function (){     
           finish()
        };
        
        //'x' button
        edit_popup.getElementsByTagName('img')[0].onclick = function () {
            finish()
        }

        /*input.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key == 13){            
                UpdateRow(id, input.value)
                row.style.backgroundColor = row_color;
                
            } 
        })*/


    } else {     
        console.log({row_edit: row_edit, id: id})
        row = document.getElementById(row_edit);    
             
       

        //create_popup.style.display = "none";
        //edit_popup.style.display = "flex";
        if(isChecked(row_edit)){
            row.style.backgroundColor = '#9783c9'
        } else {
            row.style.backgroundColor = '#c3aaf0'
        }
        row_edit = id;
        row = document.getElementById(id); 
        row.style.backgroundColor = '#f28574'

    
        input.value = row.getElementsByClassName('task')[0].textContent;

        edit_popup.getElementsByClassName('btn')[0].onclick = function (){     
            finish()
        };
        
        //'x' button
        edit_popup.getElementsByTagName('img')[0].onclick = function () {
            finish()
        }

        /*input.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key == 13){            
                UpdateRow(id, input.value)
                row.style.backgroundColor = row_color;
                
            } 
        })*/

        
    }
   
  

   
}



function DisplayPopup(str, id){    
    if(str === 'form-popup'){
        create_popup.style.display = "flex";
        edit_popup.style.display = "none";

        create_popup.getElementsByTagName('input')[0].value = "";

        
    } else if(str === 'edit-popup'){       
        if(id !== null){
            console.log(isChecked(id).toString())
            EditPopup(id);           
          
          
        }
       

    

    } else {
        
    }
    
}
