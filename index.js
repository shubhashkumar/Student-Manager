const addDetails = document.querySelector(".add-details");
//console.log(addDetails);
const sName = document.getElementById("name");
//console.log(sName.value);
const sMob = document.getElementById("mob");
//console.log(sMob.value);
const sAddress = document.getElementById("address");
//console.log(sAddress.value);


//adding student while clicking on add button
addDetails.addEventListener("click", addStudentsDetails);
function addStudentsDetails(event) {
  event.preventDefault();
  var enteredName = sName.value;
  var enteredMob = sMob.value;
  var enteredAdd = sAddress.value;
  //create a full text node
  var fullDetails = document.createTextNode(
    enteredName + " " + enteredMob + " " + enteredAdd
  );
  console.log(fullDetails);
  //create a list element
  var newLi = document.createElement("li");
  newLi.setAttribute("class", "text-center");
  newLi.appendChild(fullDetails);
  console.log(newLi);
  //append this list to div
  document.querySelector(".student-details").appendChild(newLi);
  //create an edit button
  const editBtn = document.createElement("button");
  editBtn.setAttribute("class", "btn btn-primary");
  editBtn.innerText = "Edit";
  //add event listner on edit button
  editBtn.addEventListener("click",function(event)
  {

  document.getElementById("name").value=enteredName;
  document.getElementById("mob").value=enteredMob;
  document.getElementById("address").value=enteredAdd;
  newLi.remove();
  });
  //create a delete button
  const dlttBtn = document.createElement("button");

  dlttBtn.setAttribute("class", "btn btn-primary");

  dlttBtn.innerText = "delete";

  //append both button to list
  newLi.appendChild(editBtn);
  newLi.appendChild(dlttBtn);
  

}

