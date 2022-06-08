export function getTable() {
    let url = "http://localhost:8000/api/menuItems";
    let method = "GET";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
              console.log(JSON.parse(xhr.response));
            } else {
                alert(response.err);
                
            }
            
        }
    };
    xhr.open(method, url, true);
    xhr.send();
  }