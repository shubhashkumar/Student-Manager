// add it to backend
const detailObj = {};
const form = document.querySelector("#userDetails-form");
let id="";
//show user details as output list items on screen
const userDetailsOutput = document.querySelector("#user-details-output");
userDetailsOutput.style.backgroundColor = "pink";
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if(id)
    {
      console.log(id);
      //update on server side
      axios.put(`https://crudcrud.com/api/fd5062dadbd74984a1dae144574c6fa6/userInfo/${id}`,
        {
          name:document.querySelector("#user-name").value,
          phone:document.querySelector("#user-phone").value,
          email:document.querySelector("#user-email").value
        })
        .then((resolve)=>
        {
          console.log(resolve);
          
        })
        .catch((reject)=>{
          console.log(reject);
        })
      
      id="";
    }
    else{ 
  (detailObj.name = document.querySelector("#user-name").value),
    (detailObj.phone = document.querySelector("#user-phone").value),
    (detailObj.email = document.querySelector("#user-email").value),
    // console.log(detailObj);
    axios
      .post(
        "https://crudcrud.com/api/fd5062dadbd74984a1dae144574c6fa6/userInfo",
        detailObj
      )
      .then((resolve) => {})
      .catch((reject) => {
        console.log(reject);
      });
    }
});

//get element on the screen
function getUser() {
  axios
    .get("https://crudcrud.com/api/fd5062dadbd74984a1dae144574c6fa6/userInfo")
    .then((resolve) => {
      resolve.data.forEach((element) => {
        const newLi = document.createElement("li");
        newLi.className = "saveDetails";
        newLi.style.listStyleType = "none";
        newLi.innerHTML =
          JSON.stringify(element) +
          ` <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
        userDetailsOutput.appendChild(newLi);
        // console.log(userDetailsOutput);
      });
      //edit/update
      const editUserDetails = document.querySelectorAll(".edit-btn");
      //console.log(editUserDetails);
      editUserDetails.forEach((element) => {
        // console.log(element.parentNode);
        element.addEventListener("click", function (event) {
          event.preventDefault();
          const getParentNode = element.parentNode;
          const detailsIntoObject = JSON.parse(
            getParentNode.firstChild.textContent
          );
          id=detailsIntoObject._id;
          //console.log(detailsIntoObject);
          document.querySelector("#user-name").value = detailsIntoObject.name;
          document.querySelector("#user-phone").value = detailsIntoObject.phone;
          document.querySelector("#user-email").value = detailsIntoObject.email;

        });
      });
      //delete
      const deleteUserDetails = document.querySelectorAll(".delete-btn");
      //console.log(deleteUserDetails);
      deleteUserDetails.forEach((element) => {
        element.addEventListener("click", function (event) {
          const getParentNodeToDelete = element.parentNode;
          const detailsToDelete = JSON.parse(
            getParentNodeToDelete.firstChild.textContent
          );
          axios
            .delete(
              `https://crudcrud.com/api/fd5062dadbd74984a1dae144574c6fa6/userInfo/${detailsToDelete._id}`
            )
            .then((resolve) => {
              getParentNodeToDelete.remove();
            })
            .catch((reject) => {
              console.log(reject);
            });
        });
      });
    })
    .catch((reject) => {
      console.log(reject);
    });
  //})
}
