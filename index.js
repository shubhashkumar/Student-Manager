
//get the submit button
const formSubmitBtn=document.querySelector("#submit-form");
//get the usename,use phone,use email 
let username=document.querySelector("#user-name");
let phoneNumber=document.querySelector("#phone-number");
let emailId=document.querySelector("#email-id");
//get the total number of students
let count=0;
let totalStudents=document.querySelector("#counting");
//final id
let id="";


//add eventListener on clocking sumbit button
//when form is submitted,detail should be send to the backend
formSubmitBtn.addEventListener("click",callPostMethod);
function callPostMethod(event)
{
  if(id)
    {
      let userObj={};
      userObj["name"]=username.value;
      userObj["phone"]=phoneNumber.value;
      userObj["email"]=emailId.value;
      //get parent element of this id
      let getNode= document.getElementsByClassName(id);
      getNode[0].parentNode.childNodes[0]=userObj.name;
      getNode[0].parentNode.childNodes[1]=userObj.phone;
      getNode[0].parentNode.childNodes[2]=userObj.name;
      axios.put(`https://crudcrud.com/api/6debe469a89a43e3bd4385958ebb4a12/studentInfo/${id}`,userObj)
         .then((resolve)=>{
           
         })
        .catch((reject)=>{})
      id="";
    }
  else
 { 
  event.preventDefault();   
  //get the all details in object
  let userObj={};
  userObj["name"]=username.value;
  userObj["phone"]=phoneNumber.value;
  userObj["email"]=emailId.value;
 
  axios
  .post("https://crudcrud.com/api/6debe469a89a43e3bd4385958ebb4a12/studentInfo",userObj)
  .then((resolve)=>{
    count++;
    totalStudents.textContent=count;
   //create a list element
   var newLi=document.createElement("li");
   newLi.setAttribute("class" ,"newUser")
   //create a nameTextNode
   let nameTextNode=username.value;
   let phoneTextNode=phoneNumber.value;
   let emailTextNode=emailId.value;
   //create a text node and append it 
   newLi.appendChild(nameTextNode);
   newLi.appendChild(phoneTextNode);
   newLi.appendChild(emailTextNode);
   //create an edit button
   const editBtn= document.createElement("button");
   editBtn.innerText="Edit";
   //create a delete button
   const dlttBtn= document.createElement("button");
   dlttBtn.innerText="delete";
   //append both button to list
   newLi.appendChild(editBtn);
   newLi.appendChild(dlttBtn);
   //append this new li to the parent ul
   let parentUl=document.querySelector("#student-details-output");
   parentUl.appendChild(newLi)
   //empty all input fields
   username.value="";
   phoneNumber.value="";
   emailId.value="";
    editBtn.setAttribute("class",`${resolve.data._id}`);
    dlttBtn.setAttribute("class",`${resolve.data._id}`);

  })
  .catch((reject)=>{console.log(reject);})
 }
}
//edit events on whole unordered list element
let parentUl=document.querySelector("#student-details-output");
parentUl.addEventListener("click",function(event)
{
  event.preventDefault();
  if(event.target.textContent=="Edit")
  {
    window.alert("do you want to edit????");
   let parentLiElement= event.target.parentNode;
   username.value=parentLiElement.childNodes[0].textContent;
   phoneNumber.value=parentLiElement.childNodes[1].textContent;
   emailId.value=parentLiElement.childNodes[2].textContent;
   id=event.target.className;
   console.log(id);
  }
})

//edit functionality
parentUl.addEventListener("click",function(event)
{
  event.preventDefault();
  if(event.target.textContent=="delete")
  {
    window.alert("do you want to delete????");
    id=event.target.className;
    let parentLiElement= event.target.parentNode;
    axios.delete(`https://crudcrud.com/api/6debe469a89a43e3bd4385958ebb4a12/studentInfo/${id}`)
    .then((resolve)=>{ 
    })
    .catch((reject)=>{})
    count--;
    totalStudents.textContent=count;
    parentLiElement.remove();
  }
})

/////////////////////////
////////////////////
///////////////
////////////
//////////
////////

  document.addEventListener("DOMContentLoaded", (event) => 
  {
    axios
    .get("https://crudcrud.com/api/6debe469a89a43e3bd4385958ebb4a12/studentInfo")
    .then((resolve)=>{
      count=resolve.data.length;
      totalStudents.textContent=count;
      resolve.data.forEach(element => {
        let nameTextNode=document.createTextNode(element.name);
        let phoneTextNode=document.createTextNode(element.phone);
        let emailTextNode=document.createTextNode(element.email);
        let newLi=document.createElement("li");
        newLi.setAttribute("class" ,"newUser");
       // console.log(newLi);
        newLi.appendChild(nameTextNode);
        newLi.appendChild(phoneTextNode);
        newLi.appendChild(emailTextNode);
        //create an edit button
        const editBtn= document.createElement("button");
        editBtn.innerText="Edit";
        //create a delete button
        const dlttBtn= document.createElement("button");
        dlttBtn.innerText="delete";
        editBtn.setAttribute("class",`${element._id}`);
       dlttBtn.setAttribute("class",`${element._id}`);
        //append both button to list
        newLi.appendChild(editBtn);
        newLi.appendChild(dlttBtn);
        const parentUl=document.querySelector("#student-details-output");
        parentUl.appendChild(newLi);
        

      });
    })
    .catch((reject)=>{console.log(reject);})
  
});

