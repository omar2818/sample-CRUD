var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var search=document.getElementById("search");

var productList ;
if(localStorage.getItem("theProducts")==null){
    productList=[];
}else{
    productList=JSON.parse(localStorage.getItem("theProducts"));
    displayProduct(productList);
}

function addProduct(){
    var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value
    };
    productList.push(product);
    localStorage.setItem("theProducts",JSON.stringify(productList));
    displayProduct(productList); 
    clearForm();
}
function displayProduct(productListA){
    var cont ="";
        for (var i =0 ; i < productListA.length ; i++){
            cont+= `<tr>
                    <td>${i+1}</td>
                    <td>${productListA[i].name}</td>
                    <td>${productListA[i].price}</td>
                    <td>${productListA[i].category}</td>
                    <td>${productListA[i].desc}</td>
                    <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                    </tr>`;
        }
        document.getElementById("tableBody").innerHTML=cont;
}
function clearForm(){
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value="";
}

function deleteProduct(i){
    productList.splice(i,1);
    localStorage.setItem("theProducts",JSON.stringify(productList));
    displayProduct(productList);
}

function searchProduct(){
    var word=search.value;
    var newProduct=[];
    for (var i =0 ; i < productList.length ; i++){
        if((productList[i].name.toLowerCase().includes(word.toLowerCase())) || (productList[i].category.toLowerCase().includes(word.toLowerCase())) || (productList[i].desc.toLowerCase().includes(word.toLowerCase()))){
            newProduct.push(productList[i]);   
        }
    }
    if(newProduct.length>=1){
        displayProduct(newProduct);
    }
}

searchProduct();

function updateProduct(i){
    productNameInput.value=productList[i].name;
    productPriceInput.value=productList[i].price;
    productCategoryInput.value=productList[i].category;
    productDescInput.value=productList[i].desc;
    deleteProduct(i);
}




function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(items) {
    var fileTitle = 'Products';
    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function addItem(){
    productNameInput=prompt("Product Name:");
    productPriceInput=prompt("Product Price:");
    productCategoryInput=prompt("Product Category:");
    productDescInput=prompt("Product Description:");
    var product={
        name:productNameInput,
        price:productPriceInput,
        category:productCategoryInput,
        desc:productDescInput
    };
    productList.push(product); 
    localStorage.setItem("theProducts",JSON.stringify(productList));
    displayProduct(productList); 
    clearForm();
}


