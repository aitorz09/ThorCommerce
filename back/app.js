import express from 'express';
import { PORT, VITE_URL_FRONT,MongooseURL, JWT_SECRET } from './env.js';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import multer from 'multer';
import { Product } from './src/models/product.js';
import { User } from './src/models/Users.js';
import { Category } from './src/models/Categories.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { log } from 'console';


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(MongooseURL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión', err));



const storage = multer.diskStorage({
  destination: './src/uploads/images', // Usa path.join para construir la ruta
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Sirve las imágenes desde el directorio uploads/images
app.use('/images', express.static( './src/uploads/images'));
app.get('/products/:id',async (req,res,next)=>{
  try {
    const { id } = req.params
    const product = await Product.find({id})
    res.json({
      code:"200",
      product:product
    })
  } catch (error) {
    next(error)
  }
})
app.get('/products',async (req,res,next)=>{
  try {
    const products = await Product.find()
    res.json({
      code:"200",
      products:products
    })
  } catch (error) {
    next(error)
  }
})
app.get('/products/category/:category',async (req,res,next)=>{
  try {
    const { category } = req.params
    const products = await Product.find({category})
    if(!products){
      res.json({
        code:"404",
        message:"No se encontraron productos con esta categoria"
      })
    }
    res.json({
      code:"200",
      products:products
    })
  } catch (error) {
    next(error)
  }
})
app.post('/products', upload.array('product_images', 10), async (req, res, next) => {
  try {
    // Convertir las rutas de Windows a rutas web-friendly
    const imagePaths = req.files.map(file => file.filename); // Solo guardamos el nombre del archivo

    const product = new Product({
      name: req.body.name,
      images: imagePaths, // Guardamos solo el nombre del archivo
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      available: req.body.available,
      sizes: req.body.sizes,
      description: req.body.description,
      category: req.body.category,
      date: new Date()
    });

    const response = await product.save();

    res.json({
      status: 200,
      response,
      imageUrls: imagePaths.map(image => `${VITE_URL_FRONT}/images/${image}`) // URLs completas
    });
  } catch (error) {
    next(error);
  }
});
app.post('/register', async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
      name: req.body.name,
      avatar: 'TODO',
      password: hashedPassword, // Guardar la contraseña cifrada
      email: req.body.email,
      verified: false,
      regCode: "TODO",
      recPassCode: "TODO",
      date: new Date()
    });
    
    const response = await user.save();
    
    res.json({
      status: 200,
      response
    });
  } catch (error) {
    next(error);
  }
});
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      status: 200,
      message: "Usuario logueado con éxito",
      token
    });
  } catch (error) {
    next(error);
  }
});
app.post('/uploads', upload.single('product'), async (req, res, next) => {
  try {
    res.json({
      success: 1,
      image_url: `${VITE_URL_FRONT}/images/${req.file.filename}`
    });
  } catch (error) {
    next(error);
  }
});
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ status: 200, categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    const result = await category.save();
    res.status(201).json({ status: 201, category: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || 'Internal Server Error',
  });
});
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
