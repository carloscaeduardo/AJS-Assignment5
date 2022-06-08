import React from "react";

class AddPanel extends React.Component {
    render() {
        return (
            <div id="addPanel" className="hidden">
                <div className="inputControl form-control bg-secondary">
                    <div className="inputControl">
                        <div className="inputLabel">ID</div>
                        <input id="addIdInput" className="form-control" type="number"  />
                    </div>
                    <div className="inputControl">
                        <div className="inputLabel">Category</div>

                        <select id="addCategoryInput" className="form-control">
                            <option value="APP">Appetizer</option>
                            <option value="ENT">Entree</option>
                            <option value="DES">Dessert</option>
                            
                        </select>
                    
                
                    </div>
                    <div className="inputControl">
                        <div className="inputLabel">Description</div>
                        <input className="form-control" id="addDescriptionInput" />
                    </div>
                    <div className="inputControl">
                        <div className="inputLabel">Price</div>
                        <input className="form-control" id="addPriceInput" type="number" />
                    </div>
                    <div className="inputControl">
                        <div className="inputLabel">Vegetarian</div>
                        <input  id="addVegetarianInput" type="checkbox" />
                    </div>
                    <div id="buttonPanel">
                        <button className="btn btn-secondary" id="addButton">Done</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddPanel;