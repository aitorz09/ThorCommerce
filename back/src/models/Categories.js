import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true // Opcional: Para asegurar que no haya duplicados
  }
});

export const Category = mongoose.model('Category', categorySchema);


