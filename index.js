let  products=[];
let uploadPic = document.querySelector("#productimage");
let imgUrl;
let form = document.getElementById("inputform");
if(JSON.parse(localStorage.getItem("Products"))!=null){
    products = JSON.parse(localStorage.getItem("Products"));
}
form.addEventListener("submit", function(event){
    event.preventDefault();
    form.reset();
})
uploadPic.onchange = () => { 
    console.log("hi")
    if (uploadPic.files[0].size < 1000000) { 
        let fReader = new FileReader(); 
        fReader.onload = function (e) { 
             imgUrl = e.target.result; 
             };
             fReader.readAsDataURL(uploadPic.files[0]);
    } else {
             alert("File Size is too Long");
    }};

function manageinput(){
    let name = document.getElementById("productname").value;
    let id = document.getElementById("productid").value;
    let description = document.getElementById("productdescrp").value;
    let price = document.getElementById("productprice").value;
    if(name==""|| id==""||description==""||price==""||imgUrl==""){
        alert("please fill the marked field")
        return;
    }
    products.push({
        id:id,
        name:name,
        description:description,
        price:price,
        imageUrl:imgUrl
    });
    localStorage.setItem("Products" , JSON.stringify(products));
    products =  JSON.parse(localStorage.getItem("Products"));
    console.log(products);
    showall(JSON.parse(localStorage.getItem("Products")));
    
}
function showitem(arr){
    let html="";
    if(arr.length==0){
       document.querySelector("#product-box").innerHTML="empty";
    }else{
        for(let i =arr.length-1;i>arr.length-2;i--){
            html=html+ `<div id=${arr[i].id} class="card" style="width: 18rem;">
            <div class="card-body">
                
              <h5 class="card-title">${arr[i].name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Product Id:${arr[i].id}</h6>
              <h6 class="card-subtitle mb-2 text-muted">Price:${arr[i].price}</h6>
              <img class="card-img-top" src=${arr[i].imageUrl} alt="Card image cap">
              <p class="card-text"><b>Description:-</b>${arr[i].description}</p>
              <a href="#" onclick="deleteitem(${arr[i].id}) class="card-link">Delete</a>
              <a href="./view.html?id=${arr[i].id}" class="card-link">View</a>
            </div>
          </div>`
        }
    }
    let container =  document.getElementById("product-box");
    container.innerHTML+=html;
}
function showall(arr){
    let html="";
    if(arr.length==0){
        html=html+"<div>Nothing to  show</div>"
    }else{
        for(let i =0;i<arr.length;i++){
            html=html+ `<div id=${arr[i].id} class="card" style="width: 18rem;">
            <div class="card-body">
                
              <h3 class="card-title">${arr[i].name}</h3>
              <h6 class="card-subtitle mb-2 text-muted">Product Id:${arr[i].id}</h6>
              <h5 class="card-subtitle mb-2 text-muted price"><b>Price-Rs&nbsp${arr[i].price}<b></h5>
              <img class="card-img-top" src=${arr[i].imageUrl} alt="Card image cap">
              <p class="card-text"><b>Description:-</b>${arr[i].description}</p>
              <a href="#" onclick="deleteitem(${arr[i].id})" class="card-link">Delete</a>
              <a href="./view.html?id=${arr[i].id}" class="card-link">View</a>
              <a href="#" onclick="updateitem(${arr[i].id})"class="card-link" data-toggle="modal" data-target="#exampleModal">Edit</a>
  
            </div>
          </div>`
        }
    }
    let container =  document.getElementById("product-box");
    container.innerHTML=html;
}
function deleteitem(x){
    console.log(`delete ${x}`);
    products = JSON.parse(localStorage.getItem("Products"));
    console.log(products);
    products.forEach(element => {
        if(element.id==x){
            let index = products.indexOf(element);
            console.log(index);
            if(products.length>1){
                products.splice(index,1);
            }
            else{
                products=[];
            }
            console.log(products);
            return;
        }
    });
    localStorage.setItem("Products" , JSON.stringify(products));
    showall(JSON.parse(localStorage.getItem("Products")));


}
function updateitem(x){
    let modelbody = document.getElementById("modal");
    console.log(modelbody);
    products = JSON.parse(localStorage.getItem("Products"));
    // console.log(products);
    // let mname = document.getElementById("productname").value;
    // let mid = document.getElementById("productid").value;
    // let mdescription = document.getElementById("productdescrp").value;
    // let mprice = document.getElementById("productprice").value;
    products.forEach(element => {
        if(element.id==x){
            let index = products.indexOf(element);
            console.log(element.description);
            modelbody.innerHTML = `
            <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
           <div class="modal-body">
            <form>
            <div class="form-group">
                <label for="productid">Product Id</label>
                <input type="number" class="form-control" id="mproductid" placeholder="Productid" value=${element.id} disabled required>
            </div>
            <div class="form-group">
                <label for="productname">Product Name</label> 
                <input type="text" class="form-control" id="mproductname" placeholder="Product name" value=${element.name} required>
            </div>
            <div class="form-group">
                <label for="productdescrp">Product Description</label>
                <input rols="5" cols="5" type="text" class="form-control" id="mproductdescrp" placeholder="Description" value=${element.description} required></input>
              </div>
              <div class="form-group">
                <label for="productprice">Price (INR)</label>
                <input type="number" class="form-control" id="mproductprice" placeholder="Enter the Price" value=${element.price} required>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="productimage">Image</label>
                  <input type="file" class="form-control" id="mproductimage" required>
                </div>
              </div>
          </form>
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="editdata(${element.id})">Save changes</button>
        </div>`
            return;
        }
    });
    localStorage.setItem("Products" , JSON.stringify(products));
    showall(JSON.parse(localStorage.getItem("Products")));
}
function editdata(x){
    let mname = document.getElementById("productname").value;
    let mid = document.getElementById("productid").value;
    let mdescription = document.getElementById("productdescrp").value;
    let mprice = document.getElementById("productprice").value;
    let products = JSON.parse(localStorage.getItem("Products"));
    products.forEach(element=>{
        if(element.id==mid){
            var index =  products.indexOf(element);
            products.insert(index,{id:mid,
                name:mname,
                description:mdescription,
                price:mprice,
                imageUrl:imgUrl});
                localStorage.setItem("Products" , JSON.stringify(products));
            
        }
    
    })
    
}
showall(JSON.parse(localStorage.getItem("Products")));