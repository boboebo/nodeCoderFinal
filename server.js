import express from 'express';
import cartRouter from './route/cart.router.js'
import productsRouter from './route/product.router.js';

const app = express();
app.use(express.json())

app.use('/api/cart', cartRouter);
app.use('/api/product', productsRouter);

app.listen(8080,()=>{
    console.log(`Escuchando en el puerto 8080`)
})
