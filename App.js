//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import MenuItemsTable from './components/MenuItemTable';
import AddPanel from './components/AddPanel';
import UpdatePanel from './components/UpdatePanel';


class App extends React.Component {
  

  // analogous to window.onload
  componentDidMount() {
  

     // click on table row
     document
     .querySelector("#menuItems")
     .addEventListener("click", handleTableClick);

 // toggle update panel button
 document
     .querySelector("#updatePanelToggle")
     .addEventListener("click", function () {
         document.querySelector("#updatePanel").classList.toggle("hidden");
         document.querySelector("#addPanel").classList.add("hidden");
     });
 // toggle update panel button
 document
     .querySelector("#addPanelToggle")
     .addEventListener("click", function () {
         document.querySelector("#addPanel").classList.toggle("hidden");
         document.querySelector("#updatePanel").classList.add("hidden");
     });

 // delete button
 document.querySelector("#deleteButton").addEventListener("click", doDelete);

 // update button
 document.querySelector("#updateButton").addEventListener("click", doUpdate);
 
 // Add button 
 document.querySelector("#addButton").addEventListener("click", doAdd);
 
    refreshTable();
    
    
    // let objects = [];
    // menuItems.forEach((i) => {
    //     objects.push({
    //         menuItem: i,
    //         selected: false,
    //     });
    // });
    // //objects[0].selected = true;
    // this.setState({ menuItems: objects });
  }

  render() {
      return (
        
          <div className="container font-light">
            <h1 className="font-light">McDogalds Menu Items Manager</h1>
            <div className="row">
              <div className="d-grid gap-2  my-3">
                  <button className="btn btn-outline-primary" id="addPanelToggle" data-bs-toggle="collapse" href="#addPanel"  aria-expanded="false" aria-controls="addPanel">Add</button>
                  <button className="btn btn-outline-primary" id="updatePanelToggle" data-bs-toggle="collapse" href="#updatePanel">Update</button>
                  <button className="btn btn-outline-primary" id="deleteButton">Delete</button>

              </div>
                
                <div id="addPanel" className="col-12">
                  <AddPanel></AddPanel>

                </div>
                <div className="col-12">
                  <UpdatePanel></UpdatePanel>

                </div>
                <div className="col-12">
              
                  <MenuItemsTable ></MenuItemsTable>
                  

                </div>
            </div>
          </div>
       
          
      );
  }
}

function clearSelections() {
    let rows = document.querySelectorAll("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("selected");
    }
}
  
function handleTableClick(evt) {
    let elem = evt.target;
    if (elem.nodeName !== "TD") return;
    clearSelections();
    let row = elem.parentElement;
    row.classList.add("selected");
    populateInputPanel();
  }

function populateInputPanel() {
    let row = document.querySelector(".selected");
    let tds = row.querySelectorAll("td");
    let id = Number(tds[0].innerHTML);
    let category = tds[1].innerHTML;
    let description = tds[2].innerHTML;
    let price = tds[3].innerHTML;
    let vegetarian = tds[4].innerHTML;
    //console.log(vegetarian);
    if(vegetarian === "true"){
        (document.querySelector("#vegetarianInput").checked = true);
    }else if(vegetarian === "false"){
        (document.querySelector("#vegetarianInput").checked = false);
    }

    
    document.querySelector("#idInput").value = id;
    document.querySelector("#categoryInput").value = category;
    document.querySelector("#descriptionInput").value = description;
    document.querySelector("#priceInput").value = price;
    document.querySelector("#vegetarianInput").value = vegetarian;
  }

  
  

function  refreshTable() {
    let url = "http://localhost:8000/api/menuItems";
    let method = "GET";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
              let elem = document.querySelector("#menuItems");
              let html = "<table class='table bg-secondary border border-light border-2 rounded shadow '>";
              html +=
                  "<tr><th>ID</th><th>Category</th><th>Description</th><th>Price</th><th>Vegetarian?</th></tr>";
              response.data.forEach((item) => {
                  html += "<tr>";
                  html += `<td>${item.id}</td>`;
                  html += `<td>${item.category}</td>`;
                  html += `<td>${item.description}</td>`;
                  html += `<td>${item.price}</td>`;
                  html += `<td>${item.vegetarian}</td>`;
                  html += "</tr>";
              });
              html += "</table>";
              elem.innerHTML = html;
            } else {
                alert(response.err);
            }
        }
    };
    xhr.open(method, url, true);
    xhr.send();
  }

  

function  doUpdate() {
      let id = Number(document.querySelector("#idInput").value);
      let category = document.querySelector("#categoryInput").value;
      let description = document.querySelector("#descriptionInput").value;
      let price = (document.querySelector("#priceInput")).value;
      let vegetarian = Boolean(document.querySelector("#vegetarianInput").checked);
      console.log(id + category +description + Number(price) + vegetarian);
      let updateObj = {
          id: id,
          category: category,
          description: description,
          price: Number(price),
          vegetarian: vegetarian,
      };

      let url = "http://localhost:8000/api/menuItems/" + id;
      let method = "PUT";

      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  let resp = JSON.parse(xhr.responseText);
                  if (resp.data) {
                      alert("update successful");
                  } else {
                      alert(resp.err);
                  }
                  refreshTable();
              } else {
                  alert("need to change item to update");
              }
          }
      };
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", "application/json"); // IMPORTANT
      xhr.send(JSON.stringify(updateObj));
  }

function  doDelete() {
    let row = document.querySelector(".selected");
    let id = Number(row.querySelector("td").innerHTML);
   
    let url = "http://localhost:8000/api/menuItems/" + id;
    console.log(url);
    let method = "DELETE";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let resp = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                alert("delete successful");
            } else {
                alert(resp.err);
            }
            refreshTable();
        } 
    };
    xhr.open(method, url, true);
    xhr.send();
  }
  
function doAdd() {
    let id = Number(document.querySelector("#addIdInput").value);
    let category = document.querySelector("#addCategoryInput").value;
    let description = document.querySelector("#addDescriptionInput").value;
    let price = Number(document.querySelector("#addPriceInput").value);
    let vegetarian = Boolean(document.querySelector("#addVegetarianInput").checked);

    let addObj = {
        id: id,
        category: category,
        description: description,
        price: price,
        vegetarian: vegetarian,
    };

    let url = "http://localhost:8000/api/menuItems/" + id;
    let method = "POST";

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 201) {
                let resp = JSON.parse(xhr.responseText);
                if (resp.data) {
                    alert("Item was added to the Menu");
                } else {
                    alert(JSON.parse(xhr.responseText).err);
                }
                refreshTable();
            } else  if (xhr.status === 409){
                alert("item Already exists");
            }
            else{
                alert("Item id must be between 100 and 999");
            }
        }
    };
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json"); // IMPORTANT
    xhr.send(JSON.stringify(addObj));
  }



  






export default App;
