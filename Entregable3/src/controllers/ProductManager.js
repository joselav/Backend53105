//FileSystem con promesas
import fs from 'fs/promises'
//const fs = require("fs").promises;
//console.log(fs);

class ProductManager {
    // static staticIDProd = 0; //Contador del ID autoincrementable, utilizado en el entregable anterior. No funciona en este, no autoincrementa. 

    constructor(){
        this.path = ("./src/models/products.json"); //Ruta donde se guardaran los productos.
    }

    async nextID(){
        //Creamos una función para el ID autoincrementable, dado que el ID static no funcionaba. 
        //Primero, leemos el archivo completo.
        const data= JSON.parse(await fs.readFile(this.path, "utf-8"));
        //Segundo, después de leer el archivo, utilizamos reduce para que acumule el valor.
        const maxID= data.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        //Por útlimo, le sumamos uno al último valor existente.
        return maxID+1;
    }

 
    //El método getProducts debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
    async getProducts(){
        const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const pr = data.products;

        if(!pr){
             return {sucess:false, message: "No se han encontrado productos"}; }

        return {success: true, message: pr}
    }

    async getProductsByID(id){
        //Esta función debe buscar en el arreglo el producto que coincida con el ID que se indica.
        const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const productID = data.products.find(item=> item.id === id)

        if(!productID){
            return 'NOT FOUND. No hay producto existente con ese número de ID.'
        }

        //Le apliqué un sucess= true y un Message para poder llamarlo más fácil en el app.js. También le agregué un JSON.Stringify porque sino salia [object Object].
        return {sucess:true, message: `Se ha encontrado el producto con id ${productID.id}: ${JSON.stringify(productID)}`};
    }

   async addProduct(title, description, price, thumbnail, code, stock){
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));

        //Verificación que expresa que si no existe alguno de los campos, no se agregue el producto hasta que no se complete. 
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return "Todos los campos son obligatorios";
        }

         //Verigicación para que el código sea único.
        //El método "some()" sirve para verificar si al menos un elemento en el arreglo cumple con la condición expecificada. 
        //En este caso si el código ingresado en el nuevo producto ya existe en la base de datos, por ejemplo. 
        //data llama a la constante que lee la ruta "products" hace referencia al nombre del arreglo dentro de la ruta.
        if(data.products.some(item=> item.code === code)){
            return 'El código (code) ingresado ya existe en nuestra base de datos. Por favor, ingrese uno que sea único.'
        }


         
        //Recibo los datos y los ordeno dentro de un nuevo objeto de productos. 
        const newProduct = {
            id: await this.nextID(), //ID incrementable, espero la información de la función.
            title, 
            description,
            price, 
            thumbnail, 
            code, 
            stock
        }

        //pusheo la información.
        data.products.push(newProduct);
        //espero la reescritura desde FileSystem para que se agregue correctamente el producto y transformo los produtos para que se guarden en formato .json.
        await fs.writeFile(this.path, JSON.stringify(data));
        return {sucess: true, message: `Se ha añadido el producto ${title} exitosamente`};
    }

    async updateProduct(id,product){
        //El producto a actualizar primero debe leer el archivo, buscar el ID al que se llama y tomar acción desde ahí en adelante.
        const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const index = data.products.findIndex((item)=> item.id === id)

        if(index != -1){
            //En este caso decimos que si Index es diferente a -1, dependiendo a que atributo quiera cambiar, lo modifique. 
            const prodUpdate = data.products[index];

            //Si, por ejemplo, se quiera cambiar solo el título, se debería hacer de la siguiente manera: {title: "OtroTítuo"};
            if(product.title) prodUpdate.title = product.title;
            
            if(product.description) prodUpdate.description = product.description;

            if(product.price) prodUpdate.price = product.price;

            if(product.thumbnail) prodUpdate.thumbnail = product.thumbnail;

            if(product.code) prodUpdate.code = product.code;

            if(product.stock) prodUpdate.stock = product.stock;

            //Esperamos a que se reescriba el archivo y se actualice el producto
            await fs.writeFile(this.path, JSON.stringify(data));
            return {sucess: true, message: `Se ha actualizado el producto ${product.title} exitosamente.`};
        } else{
            return {sucess: false, message:"Producto no encontrado o inexistente"};
        }
    }

    async deleteProduct(id){
        //En este caso, se nos pide que; dependiendo que ID se llame, el producto se elimine completamente
        //Primero se lee el archivo:
        const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
        //Después se confirma que el id que se quiera eliminar coincida con alguno dentro del archivo: 
        const deleteProd = data.products.find((item)=> item.id === id);

        if(deleteProd){
            //Si el ID existe, se elimina. Con Filter lo que estamos diciendo es que si el ID es diferente al 
            //ID que se ha enviado, se queda. De lo contrario, se elimina. 
            data.products = data.products.filter((item)=> item.id !== id);
            //Esperamos a que el archivo se actualice con la información.
            await fs.writeFile(this.path, JSON.stringify(data));

            return {sucess: true, message: `Producto con id ${id} eliminado exitosamente`};
        } else{
            return {sucess: false, message: `Producto con id ${id} no encontrado o inexistente.`}
        }
    }
}

export default ProductManager;

// const results = async () =>{
//     const mng = new ProductManager();

//     //Mostrar los prodcutos
//   const gp = await mng.getProducts();
//   console.log("mostrar todos los productos", gp);


//   // -----   Agregar producto -------
//   const agregarProducto= await mng.addProduct("Producto de prueba", "Este es un producto de prueba", 200, "sin imágen", "abc123", 25);
//   console.log("Producto agregado", agregarProducto);



//   //------ Mostrar productos por ID ----- 
  
//   //const prodID= await mng.getProductsByID(1);
//   //console.log("Mostrar producto con ID1", prodID)

//   //----- Actualizar producto: -----

//   //const updateProducto = await mng.updateProduct(1,{title: "Arroz"})
//   //console.log("Modificar Nombre ID1", updateProducto);

//   // ------ Eliminar producto: -------

//   //const deleteProducto = await mng.deleteProduct(1);
//   //console.log("Eliminar Producto ID 1", deleteProducto)


//  //--------Para mostrar nuevamente la lista de productos actualizada:----- 
//  //Debe estar a lo último, ya que al ser una función asincrónica se va deteniendo por partes. Sino, no me mostraba los productos actualizados. 
//   const updateDB = await mng.getProducts();
//   console.log("Productos actualizados", updateDB);

// }

// results()


