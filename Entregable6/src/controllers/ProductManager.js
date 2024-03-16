const ProductModel = require("../models/products.model.js");

class ProductManager {

 //El método getProducts debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
    async getProducts(){
        const products = await ProductModel.find();

        if(!products){
             return {sucess:false, message: "No se han encontrado productos"}; }

        return {success: true, message: products}
    }

    async getProductsByID(id){
        //Esta función debe buscar en el arreglo el producto que coincida con el ID que se indica

        const productID = await ProductModel.findById(id);

        if(!productID){
            return {success: false, message: 'NOT FOUND. No hay producto existente con ese número de ID.'}
        }

        //Le apliqué un sucess= true y un Message para poder llamarlo más fácil en el app.js. También le agregué un JSON.Stringify porque sino salia [object Object].
        return {success:true, message: `Se ha encontrado el producto con id ${productID.id}: ${JSON.stringify(productID)}`};
    }

   async addProduct({title, description, price, thumbnail, code, category, stock}){

    try{

        const validate = title && description && price && code && category && stock;
        //Verificación que expresa que si no existe alguno de los campos, no se agregue el producto hasta que no se complete. 
     if(!validate){
        console.error("no ha sido posible subir producto, controla". error)
       // return {success: false, message:"Todos los campos, a excepción del Thumbnails, son obligatorios"};
         }
       
         //Verigicación para que el código sea único.
        //El método "some()" sirve para verificar si al menos un elemento en el arreglo cumple con la condición expecificada. 
        //En este caso si el código ingresado en el nuevo producto ya existe en la base de datos, por ejemplo. 
        //data llama a la constante que lee la ruta "products" hace referencia al nombre del arreglo dentro de la ruta.

        const productExist = await ProductModel.findOne({code: code})

        if(productExist){
            return {success: false, message: 'El código (code) ingresado ya existe en nuestra base de datos. Por favor, ingrese uno que sea único.'}
        }

         
        //Recibo los datos y los ordeno dentro de un nuevo objeto de productos. 
        const newProduct = await ProductModel.create({
            title, description, price, thumbnail, code, stock,category, status:true //Valor predeterminado, booleano. 
        }); 

        return {success: true, message: `El producto se ha creado exitosamente ${newProduct}`}}

        catch(error){
            console.error("Error al agregar producto:", error);
            return { success: false, message: "Ha ocurrido un error al agregar el producto. Por favor, inténtalo de nuevo más tarde." };
        }
    }

    async updateProduct(id,product){
        //El producto a actualizar primero debe leer el archivo, buscar el ID al que se llama y tomar acción desde ahí en adelante.
       const updateProdu = await ProductModel.findByIdAndUpdate(id, product);

       if(!updateProdu){
        console.log("No se ha encontrado producto.")
        return null
       }       

   
    return {success: true, message: `Se ha actualizado el producto exitosamente: ${updateProdu}`};

    }

    async deleteProduct(id){
        //En este caso, se nos pide que; dependiendo que ID se llame, el producto se elimine completamente
        const deleteProd = await ProductModel.findByIdAndDelete(id);

        if(!deleteProd){
            return {success: false, message: `Producto con id ${deleteProd.id} no encontrado o inexistente.`}
        }

        return {success: true, message: 'Producto eliminado exitosamente', deletedProduct: deleteProd};
    }
}

//export default ProductManager;

//versión sin importación ("type": "module"):
module.exports = ProductManager;