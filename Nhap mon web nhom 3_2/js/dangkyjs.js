/*DANG KY*/

function validateForm()  {
    var u = document.getElementById("tendangnhap").value;
    var p = document.getElementById("matkhau").value;
    var rp = document.getElementById("xnmatkhau").value;
    var e = document.getElementById("email").value;
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    var s = document.getElementById("SDT").value;

    if(u== "" || u.length < 5 || !/^[a-zA-Z0-9]+$/.test(u) ) {
        alert("Tên đăng nhập không hợp lệ. Vui lòng nhập lại tên đăng nhập!");
        return false;
    }
    

    if(p == "" || p.length < 8) {
        alert("Mật khẩu không hợp lệ. Vui lòng nhập lại mật khẩu!");
        return false;
    }

    if(p != rp) {
        alert("Xác nhận mật khẩu không đúng. Vui lòng nhập xác nhận lại!");
        return false;
    }
    
    if (!mailformat.test(e)){
        alert("Email không hợp lệ. Vui lòng nhập xác nhận lại!");
        return false;
        }
    
    if (s != '' &&  !/^[0-9]{10}$/.test(s)){
        alert("Số điện thoại không hợp lệ. Vui lòng nhập lại!");
        return false;
        }

    alert("Đăng ký tài khoản thành công!");

    return true;
}

/*DANG NHAP*/
function validateForm()  {
    var u = document.getElementById("tendangnhap").value;
    var p = document.getElementById("matkhau").value;

    if(u== "" || u.length < 5 || !/^[a-zA-Z0-9]+$/.test(u) ) {
        alert("Tên đăng nhập không hợp lệ. Vui lòng nhập lại tên đăng nhập!");
        return false;
    }
    

    if(p == "" || p.length < 8) {
        alert("Mật khẩu không hợp lệ. Vui lòng nhập lại mật khẩu!");
        return false;
    }

    alert("Đăng nhập tài khoản thành công!");

    return true;
}
/*TIM KIEM*/

function doSearch(){
    var frm=document.forms["frm-search"];
    if(frm.words.value.length>0)
    frm.submit();

}

function showSearch()
{
	var url = new URL(window.location);
	var ws = url.searchParams.get("words");
	document.getElementById("searchDetail").innerHTML="<h1>Từ khóa tìm kiếm: </h1> <b>"+ws+"</b>";
}

function checkKeySearch(e){

var key =Event.which|| Event.keyCode;
    if(key==32) {doSearch();}

}


/* THEM SAN BANH VAO GIO */
function addCart(code){

    var number=parseInt(document.getElementById(code).value);
    var name=itemList[code].name;
    if(number==0) return;
    if(typeof localStorage[code]==="undefined"){
        window.localStorage.setItem(code,number);
    }else{
        var current=parseInt(window.localStorage.getItem(code));
        if(current+number>100)
        {
            window.localStorage.setItem(code,100);
            alert("mỗi mặt hàng chỉ có thể đặt 100 sản phẩm cho ,mỗi đơn hàng. Bạn đã đặt 100 sản phẩm của "+name+" này.");
            return;
    }
    else 
        window.localStorage.setItem(code,current+number);
    }
    alert("Đã cập nhật sản phẩm "+name+" với số lượng "+number+" vào giỏ hàng. Số lượng sản phẩm "+name+" đã đặt là "+parseInt(window.localStorage.getItem(code))+".");
    }
    
    function openCart(){
        window.location.href = "donhang.html";
    }
    
    function showCart(){
        var formatter = new Intl.NumberFormat('vi-VN',{
            style: 'currency',
            currency: 'VND'
        });
        var
        container=document.getElementById("cartDetail").getElementsByTagName('tbody')[0];
        container.innerHTML=""
    var sum=0;
    var totalPreTax=0;
    var discountRate=getDiscountRate();
    var taxRate=0.1;
    var discount=0;
    var tax=0;
    for(var i=0;i<window.localStorage.lenght;i++)
    {
        if(typeof itemList[localStorage.key(i)]=="undefined")
        continue;
        var tr=document.createElement("tr");
        var photoCell=document.createElement("td");
        var nameCell=document.createElement("td");
        var priceCell=document.createElement("td");
        var numberCell=document.createElement("td");
        var removeCell=document.createElement("td");
        var removeLink=document.createElement("a");
        var item=itemList[localStorage.key(i)];
        var number=localStorage.getItem(localStorage.key(i));
    
        photoCell.style.textAlign="center";
        photoCell.innerHTML="<img src='"+item.photo+"' class='round-figure' width='100px'/>";
    
        nameCell.innerHTML=item.name;
        priceCell.innerHTML=formatter.format(item.price);
        priceCell.style.textAlign="right";
    
        numberCell.innerHTML=number;
        numberCell.style.textAlign="right";
        
        sum=number*item.price;
        sumCell.innerHTML=formatter.format(sum);
        sumCell.style.textAlign="right";
    
        removeLink.innerHTML="<i class='fa fa-trash icon-pink'></i>";
        removeLink.setAttribute("href","#");
        removeLink.setAttribute("data-code",localStorage.key(i));
        removeLink.onclick=function(){
            removeCart(this.dataset.code);
    };
        removeCell.style.textAlign="center";
        removeCell.appendChild(removeLink);
        
        tr.appendChild(photoCell);
        tr.appendChild(nameCell);
        tr.appendChild(numberCell);
        tr.appendChild(priceCell);
        tr.appendChild(sumCell);
        tr.appendChild(removeCell);
        container.appendChild(tr);
        totalPreTax+=sum;
    }
        var discount=totalPreTax*discountRate;
        var tax=(totalPreTax-discount)*taxRate;
        document.getElementById("bill_pre_tax_total").innerHTML=formatter.format(totalPreTax);
        
        document.getElementById("bill_discount").innerHTML=discountRate+" x A ="+formatter.format(discount);
        document.getElementById("bill_tax").innerHTML=formatter.format(tax);
        document.getElementById("bill_total").innerHTML=formatter.format(totalPreTax-discount+tax);
    }
    



