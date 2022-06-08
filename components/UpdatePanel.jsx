import React from "react";

class UpdatePanel extends React.Component {
    render() {
        return (
            <div id="updatePanel" className="hidden">
                <div className="inputControl form-control bg-secondary">
                    <div className="inputLabel ">ID</div>
                    <input id="idInput" type="number" disabled />
                    <br></br>
                    <div className="inputLabel ">Category</div>

                    <select id="categoryInput" className="inputControl form-control">
                        <option value="APP">Appetizer</option>
                        <option value="ENT">Entree</option>
                        <option value="DES">Dessert</option>
                        
                    </select>
                
            
               
                    <div className="inputLabel">Description</div>
                    <input id="descriptionInput" className="form-control" />
                    
                    <div className="inputLabel">Price</div>
                    <input id="priceInput" type="number" />
                    <br></br>
                    <div className="inputLabel">Vegetarian</div>
                    <input id="vegetarianInput" type="checkbox" />
               
                    <div id="buttonPanel">
                        <button id="updateButton" className="btn btn-light">Done</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdatePanel;
