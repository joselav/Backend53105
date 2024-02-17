import fs from 'fs/promises';

class CartManager{
    
    constructor(){
        this.path=("./src/models/carts.json"); 
        //path al .json.
    }

    async nextID(){
        //Creamos una función para el ID autoincrementable, dado que el ID static no funcionaba. 
        //Primero, leemos el archivo completo.
        const data= JSON.parse(await fs.readFile(this.path, "utf-8"));
        //Segundo, después de leer el archivo, utilizamos reduce para que acumule el valor.
        const maxID= data.carrito.reduce((max, product) => (product.id > max ? product.id : max), 0);
        //Por útlimo, le sumamos uno al último valor existente.
        return maxID+1;
    }


    //Función para mostrar todo lo que hay en los carritos
    async getCartAll(){
        const cart = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const cartShow = cart.carrito;

        return{success: true, message: cartShow || []}
    }

    //El getCartByID deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
    async getCartByID(id){
        //Utilicé la misma lógica que el ProductManager. 

        //Primero se lee el archivo de carts.json
        const data = JSON.stringify( await fs.readFile(this.path, "utf-8"));
        //Se busca que el id ingresado coincida con el id del archivo.
        const cartID = data.carrito.find(item=> item.id === id);

        //Si o se encuentra, se manda el mensaje.
        if(!cartID){
            return {success: false, message:'NOT FOUND. No hay producto existente con ese número de ID.'}
        }

        //Si se encuentra, se mande el mensaje y el array del carrito que se buscó.
        return {success:true, message: `Se ha encontrado el producto con id ${cartID.id}: ${JSON.stringify(cartID)}`};
    };



// addCart --> deberá crear un nuevo carrito con la siguiente estructura:
// Id:Number/String (autoincrementable);  // products: Array que contendrá objetos que representen cada producto
    async addCart(){
      try{  //Leemos el archivo (cart.json) en el cual agregaremos el carrito:
        const data = await fs.readFile(this.path, "utf-8");
        const cart = JSON.parse(data);

        //especificamos la estructura: 
        const newCart = {id: await this.nextID(), product: []};

        //pusheamos el carrito: 
        cart.carrito.push(newCart);
        //Escribimos el archivo con el nuevo carrito. 
        await fs.writeFile(this.path, JSON.stringify(cart));

        return {success: true, message: `Carrito con id ${newCart.id} creado exitosamente en el carrito`};


    }catch(error){
        return {success: false, message: `No se ha logrado crear el carrito`};
    }
    };


    //La función addProductsToCart deberá agregar el producto al arreglo “products” del carrito seleccionado.
    //cid ---> id del carrito 
    //pid ---> id del producto
    async addProductsToCart(cid, pid){
        //Leemos el .json:
        const data = JSON.parse( await fs.readFile(this.path, "utf-8"));
        //Buscamos que el cid ingresado coincida con uno dentro del archivo:  
        const index = data.carrito.findIndex((cart)=> cart.id === cid);

        //Verificamos que se haya encontrado el cid pedido: 
        if(index !== -1){
            //Seleccionamos el carrito
            const cartData = data.carrito[index];
            //Buscamos que el pid ingresado coincida con algún producto existente:
            const productIndex= cartData.product.findIndex((prod)=> prod.product === pid);

            //Verificamos que se haya encontrado el pid deseado en el carrito para sumar la cantidad:
            if(productIndex !== -1){
                cartData.product[productIndex].quantity++;
            }else{
                //En caso que no exista, lo pusheamos: 
                cartData.product.push({product: pid, quantity:1});
            }  

            await fs.writeFile(this.path, JSON.stringify(data));
            return {success:true, message: `El producto con id ${pid} se ha agregado correctamente.`}
        }else{
            //Enviamos un mensaje de que no se pudo crear el carrito:
            return {success: false, message: 'No se ha podido crear el producto'}
        }
    }

}

export default CartManager;