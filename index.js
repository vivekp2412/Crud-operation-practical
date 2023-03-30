// Variables declaration
let products=[];
let formFormate = /^\s*(?!\s$)\S.*\S\s*$/;
let form = document.getElementById("inputform");
let mimgUrl;
let imgUrl;
let applyfilter=true;
let sortcategory = document.getElementById("sort-category");
let isasc=false;

// Fetching the Local stored array if not null 
if(JSON.parse(localStorage.getItem("Products"))!=null){
    products = JSON.parse(localStorage.getItem("Products"));
}
// Toggle Sort Icon and Sorting  function
function togglesort(){
    if(isasc==false){
        document.getElementById("sort-symbol").classList.remove("fa-arrow-up");
        document.getElementById("sort-symbol").classList.add("fa-arrow-down");
        sorttype="asc";
        sortfunction();
        return
    }else{
        document.getElementById("sort-symbol").classList.add("fa-arrow-up");
        document.getElementById("sort-symbol").classList.remove("fa-arrow-down");
        sorttype="des";
        sortfunction();
        return
    }
}
// Sorting Logic
function sortfunction(){
        sortcategory = document.getElementById("sort-category").value;
        if(sorttype=="asc"){
            isasc=true;
        }else{
            isasc=false;
        }
        products = JSON.parse(localStorage.getItem("Products"));
        if(sortcategory=="name"){
            if(isasc){
                products.sort(function(a,b){
                    let x = a.name.toUpperCase();
                    let y = b.name.toUpperCase();
                    if(x<y){
                        return -1;
                    }else if(x>y){
                        return 1;
                    }else{
                        return 0
                    }
                });
            }else{
                products.sort(function(a,b){
                    let x = a.name.toUpperCase();
                    let y = b.name.toUpperCase();
                    if(x<y){
                        return 1;
                    }else if(x>y){
                        return -1;
                    }else{
                        return 0
                    }
                });
            }
        }else if(sortcategory=="price"){
            if(isasc){
                products.sort(function(a,b){return a.price-b.price});
            }else{
                products.sort(function(a,b){return b.price-a.price});
            }
        }else if(sortcategory=="id"){
            if(isasc){
                products.sort(function(a,b){return a.id-b.id});
            }else{
                products.sort(function(a,b){return b.id-a.id});
            }
        }
        showall(products);
        return;
}
// Clear Sort
function cancelsort(){
    products =  JSON.parse(localStorage.getItem("Products"));
    showall(products);
}
// Clear Search Function
function cancelsearch(){
    document.getElementById("filtertext").value=null;
    products = JSON.parse(localStorage.getItem("Products"));
    showall(products);
}
// Logic for Add Product Image Url Storing 
let uploadPic = document.querySelector("#productimage");

uploadPic.onchange = () => { 
        let updatedimg = document.querySelector("#add-product-img"); 
        if (uploadPic.files[0].size < 1000000) { 
            let fReader = new FileReader(); 
            fReader.onload = function (e) { 
                 imgUrl = e.target.result; 
                 updatedimg.src=imgUrl
                 };
                 fReader.readAsDataURL(uploadPic.files[0]);
        } else {
                 alert("File Size is too Long");
        }};
// Random ID Generator FUnction
function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
 }
// Setting the Random ID in Form
function setproductid(){
     document.getElementById("productid").value=Math.trunc(getRandomArbitrary(1000,9999))
}
// RESETING THE FORM
function resetform(){
    form.reset();
}
// ADDING NEW PRODUCT TO LOCAL STORAGE
function manageinput(){

    let updatedimg = document.querySelector("#add-product-img"); 
    let form = document.getElementById("inputform");
    let name = document.getElementById("productname").value;
    let id = document.getElementById("productid").value;
    let description = document.getElementById("productdescrp").value;
    let price = document.getElementById("productprice").value;
    let submitbutton=  document.getElementById("submitbutton");
    submitbutton.removeAttribute("data-dismiss","modal");
    if(!name.match(formFormate)||!price.match(formFormate)||!description.match(formFormate)||imgUrl==null){
        alert("Please fill all the Details");
        return
    }else{
        
        submitbutton.setAttribute("data-dismiss","modal");
        products.push({
            id:id,
            name:name,
            description:description,
            price:price,
            imageUrl:imgUrl
        });
        form.reset();
        updatedimg.src="assets/download.png";
        localStorage.setItem("Products" , JSON.stringify(products));
        products =  JSON.parse(localStorage.getItem("Products"));
        showall(JSON.parse(localStorage.getItem("Products")));
    }
}
//Function to show product on Screen
function showall(arr){
    let html="";
    if(arr.length==0){
        html=html+"<div>Nothing to  show</div>"
    }else{
        for(let i =0;i<arr.length;i++){
            html=html+ `
        <div class="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
            <div id=${arr[i].id} class="card">
                 <div class="card-body">
                 <div class="card-img-top"> 
                 <img src=${arr[i].imageUrl} alt="Card image cap">
                 </div>
                 <div class="card-details">
                 <h4 class="card-title name">${arr[i].name}</h4>
                 <h6 class="card-subtitle mb-2 text-muted">Product Id:${arr[i].id}</h6>
                 <h5 class="card-subtitle mb-2 text-success price"><b>Rs&nbsp${arr[i].price}</b></h5>
                 <p class="card-text description">${arr[i].description}</p>
                 <div class="card-button-group">
                 <a href="#" onclick="deleteitem(${arr[i].id})" class="card-link"> <button type="button" class="btn btn-outline-danger">Delete</button></a>
                 <a href="./view.html?id=${arr[i].id}" class="card-link"><button type="button" class="btn btn-outline-primary">View</button></a>
                 <a href="#" onclick="updateitem(${arr[i].id})"class="card-link" data-toggle="modal" data-target="#exampleModal"><button type="button" class="btn btn-outline-success">Edit</button></a>
                 </div>
                 </div>
                 </div>
            </div>
        </div>`
        }
    }
    let container =  document.getElementById("product-box");
    container.innerHTML=html;
}
// Function to delete item

function deleteitem(x){
    products = JSON.parse(localStorage.getItem("Products"));
    products.forEach(element => {
        if(element.id==x){
            let index = products.indexOf(element);
            if(products.length>1){
                products.splice(index,1);
            }
            else{
                products=[];
            }
            return;
        }
    });
    localStorage.setItem("Products" , JSON.stringify(products));
    showall(JSON.parse(localStorage.getItem("Products")));
}
// Function to autofill the value in edit form
function modalValueAdder(x) {
    let prod = JSON.parse(localStorage.getItem("Products"));
    let data;
    prod.forEach(element => {
      if (element.id == x) {
        data = element;
      }
    });
    document.getElementById("mproductname").value =data.name;
    document.getElementById("mproductid").value =data.id;
    document.getElementById("mproductdescrp").value =data.description;
    document.getElementById("mproductprice").value =data.price;
  }
// Edit modal opener function
function updateitem(x){
    let modelbody = document.getElementById("modal");
    modelbody.innerHTML=""
    let prod = JSON.parse(localStorage.getItem("Products"));
    prod.forEach(element => {
        if(element.id==x){
            console.log(element);
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
              <div>
              <img id="edit-product-img" class="edit-form-img" src=${element.imageUrl}>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="productimage">Image</label>
                  <input type="file" class="form-control" onchange="changeimg()" accept="image/png, image/jpg, image/jpeg" id="mproductimage">
                </div>
              </div>
          </form>
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="editdata(${element.id})" id="editform-submit">Save changes</button>
        </div>`
        modalValueAdder(element.id)
       }
    });
}
// Edit Modal Image handler
function changeimg(){
    let muploadPic = document.querySelector("#mproductimage"); 
    let updatedimg = document.querySelector("#edit-product-img"); 
    let mfReader = new FileReader(); 
    mfReader.onload = function (e) { 
         mimgUrl = e.target.result; 
         updatedimg.src = mimgUrl
         };
         mfReader.readAsDataURL(muploadPic.files[0]);
}
// Storing the edited data to local storage by fetching from update modal
function editdata(x){
    let mname = document.getElementById("mproductname").value;
    let mid = document.getElementById("mproductid").value;
    let mdescription = document.getElementById("mproductdescrp").value;
    let mprice = document.getElementById("mproductprice").value;
    let products = JSON.parse(localStorage.getItem("Products"));
    let esubmitbutton =  document.getElementById("editform-submit");
    esubmitbutton.removeAttribute("data-dismiss","modal");
    if(!mname.match(formFormate)||!mdescription.match(formFormate)||!mprice.match(formFormate)){
        alert("Please fill all the Details");
        return
    }
    products.forEach(element=>{
        esubmitbutton.setAttribute("data-dismiss","modal");
        if(element.id==x){
            let index =  products.indexOf(element);
            console.log(index);
            products[index].id=mid;
            products[index].name=mname;
            products[index].price=mprice;
            products[index].description=mdescription;
            if(mimgUrl==undefined){
                mimgUrl=element.imageUrl;
            }
            products[index].imageUrl=mimgUrl;
            localStorage.setItem("Products" , JSON.stringify(products));
        }
    })
    mimgUrl=undefined;
    localStorage.setItem("Products" , JSON.stringify(products));
    showall(JSON.parse(localStorage.getItem("Products")));
}
showall(JSON.parse(localStorage.getItem("Products")));
// SEARCH LOGIC FUNCTION
function search(){
    let filtercategory =  document.getElementById("filter-category").value;
    let filtervalue  = document.getElementById("filtertext").value;
    console.log(filtercategory,filtervalue);
    products =  JSON.parse(localStorage.getItem("Products"));
     let filtered_array = products.filter(function(x){
        if(x[filtercategory].toUpperCase().includes(filtervalue.toUpperCase())) {
            return x;
        }
    });
     console.log(filtered_array);
     showall(filtered_array)
}
//debouncing FOR SEARCH
function debounce(){
    let timer;
    return function(){
        clearTimeout(timer);
        timer=setTimeout(()=>{
          search();
        },300)
    }
}
// CALLLED WHEN SEARCH INPUT CHANEGD
const searchproduct =  debounce();
//UPDATE THE VALUE IN RANGE
function updaterange(){
    let rangevalue;
    rangevalue = document.getElementById("pricefilter").value;
    document.getElementById("currentvalue").innerHTML=rangevalue;
}
updaterange();
// CLEARING THE PRICE RNAGE FILTER
function clearrange(){
    document.getElementById("pricefilter").value=100000;
    updaterange();
    showall(JSON.parse(localStorage.getItem("Products")));
}
// LOGIC TO FILTER THE PRODUCTS IN THE GIVEN RANGE
function showrange(){
    updaterange();
    rangevalue = document.getElementById("pricefilter").value;
    products =  JSON.parse(localStorage.getItem("Products"));
    let filtered_array = products.filter(function(x){
        if(Number(x.price)>=0 && Number(x.price)<=Number(rangevalue)) {
            return x;
        }
    });
    showall(filtered_array)
    document.getElementById("filterbutton").innerHTML="Clear Filter";
    applyfilter=false;
}


    
