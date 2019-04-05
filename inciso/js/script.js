//document.getElementById("enviar").addEventListener("click", enviar);

var inputs = document.getElementsByClassName('formulario__input');
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function(){
        if(this.value.length>=1){
            this.nextElementSibling.classList.add('fijar');
        }else{
            this.nextElementSibling.classList.remove('fijar');
        }
    });
}

function controltag(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8) return true; // para la tecla de retroseso
    else if (tecla==0||tecla==9)  return true; //<-- PARA EL TABULADOR-> su keyCode es 9 pero en tecla se esta transformando a 0 asi que porsiacaso los dos
   patron =/[0-9\s]/;// -> solo numeros
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
var productos = [];

function enviar() {
    let nam = document.getElementById('product').value;
    let pric = document.getElementById('price').value;
    let qanty = document.getElementById('Quantity').value;
    if(nam===''){
        alert('porfavor llena el campo producto');
    }if(pric===''){
        alert('porfavor llena el campo precio');  
    }if(qanty===''){
        alert('porfavor llena el campo cantidad');  
    }else{
        console.log(nam);
        console.log(pric);
        console.log(qanty);
        let p = parseFloat(pric);
        let qty = parseInt(qanty);
        let sub = p*qty;
        console.log(p);
        console.log(qty);
        console.log(sub);
    
        var objProduct = {
            name : nam,
            price : p,
            Quantity : qty,
            subtotal : sub
        }
    
        productos.push(objProduct);
    
        listar();
    
        document.getElementById("product").value = '';
        document.getElementById("price").value = "";
        document.getElementById("Quantity").value = "";
    }

    function validarSiNumero(numero){
        if (!/^([0-9])*$/.test(numero))
          alert("El valor " + numero + " no es un número");
      }
    
    
}

function listar(){
    let contenido = '';
    let suma = 0.0;
    for (let i = 0; i < productos.length; i++) {
        const element = productos[i];
        suma += parseFloat(element.subtotal);
        contenido = contenido + '<tr><td>' + (i+1) + '</td><td>' + element.name + '</td><td>' + element.price + 
        '</td><td>' + element.Quantity + '</td><td>' + element.subtotal + '</td><td>'+ '<img src="img/edit.png" width="30px" onclick="modificar(' + i + ')">' + 
        '<img src="img/delete.png" width="30px" onclick="eliminar(' + i +')">' + '</td></tr>';
    }
    console.log(suma);
    let igv = suma*0.18;
    let igv1=parseFloat(igv.toFixed(2));
    let total = suma + igv1;
    document.getElementsByTagName('tbody')[0].innerHTML = contenido;
    document.getElementById('total_sub').value = suma;
    document.getElementById('igv').value = igv1;
    document.getElementById('total').value = total;
    let data = document.getElementsByTagName("td");
    alinear_tdata(data);
}

function alinear_tdata(data){
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        element.classList.add('dato');
    }
}

function eliminar(index) {
    console.log(index);
    if (confirm("Desea eliminar este producto")) {

        productos.splice(index , 1);
        listar();
    }
}

function modificar(index){
    console.log(index);
    if (confirm("Desea modificar este producto")) {
    document.getElementById("product").value = productos[index].name;
    document.getElementById("price").value = productos[index].price;
    document.getElementById("Quantity").value = productos[index].Quantity;
    document.getElementById('boton_enviar').innerHTML = '<input type="submit" value="Modificar" class="formulario__submit btn_modificar" onclick="cambiar(' + index + ')">';
    }
}

function cambiar(index){
    let nam = document.getElementById('product').value;
    let pric = document.getElementById('price').value;
    let qanty = document.getElementById('Quantity').value;
    console.log(nam);
    console.log(pric);
    console.log(qanty);
    let p = parseFloat(pric);
    let qty = parseInt(qanty);
    let sub = p*qty;
    console.log(p);
    console.log(qty);
    console.log(sub);
    var objProduct = {
        name : nam,
        price : p,
        Quantity : qty,
        subtotal : sub
    }
    productos[index] = objProduct;
    Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Se actualizo Corectamente',
        showConfirmButton: false,
        timer: 1500
      })
    listar();

    document.getElementById("product").value = '';
    document.getElementById("price").value = "";
    document.getElementById("Quantity").value = "";
    document.getElementById('boton_enviar').innerHTML = '<input type="submit" class="formulario__submit" onclick="enviar()">';
}