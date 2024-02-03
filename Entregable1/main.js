class ProductManager{
    static staticId = 0; //Para el ID Autoincrementable.
    constructor() {
        this.product = []; // Elemento "product" que devuelve un array vacío. 
    }

    addProduct(title, description, price, thumbnail, code, stock){
        //Verificación que expresa que si no existe alguno de los campos, no se agregue el producto hasta que no se complete. 
        if( !title || !description || !price || !thumbnail || !code || !stock){
            return 'Todos los campos son obligatorios.';
        }

        //Verigicación para que el código sea único.
        //El método "some()" sirve para verificar si al menos un elemento en el arreglo cumple con la condición expecificada. 
        //En este caso si el código ingresado en el nuevo producto ya existe en la base de datos, por ejemplo. 
        if(this.product.some(item=> item.code === code)){
            return 'El código (code) ingresado ya existe en nuestra base de datos. Por favor, ingrese uno que sea único.'
        }
        
        //Recibo los datos y los ordeno dentro de un nuevo objeto de productos. 
        const newProduct = {
            id: ++ProductManager.staticId, //ID incrementable, con el static que agregamos antes del constructor.
            title, 
            description,
            price, 
            thumbnail, 
            code, 
            stock
        }

        //Pusheo los datos dentro del array de productos. 
        this.product.push(newProduct);
    }

    getProduct(){
        //Esta función solo debe devolver todos los productos ya existentes. 
        return this.product;
    } 

    getProductById(id){
        //Esta función debe buscar en el arreglo el producto que coincida con el ID que se indica.

        const productID = this.product.find(item=> item.id === id)

        if(!productID){
            return 'NOT FOUND. No hay producto existente con ese número de ID.'
        }

        return productID;
    }
}

const mng = new ProductManager();

//Mostrar los productos
console.log(mng.getProduct())

//Agregar un producto; 
console.log(mng.addProduct("producto prueba", "este es un producto de prueba", 200, "sin imágen", "abc123", 25));
console.log(mng.getProduct());

//Control para buscar el producto por su ID;
console.log("Producto con ID 1;")
console.log(mng.getProductById(1))

//Control para buscar el producto por un ID inexistente: 
console.log("Producto con ID 3;")
console.log(mng.getProductById(3))