import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

const productos = [
  { id: 1, nombre: "Lapicera", descripcion: "Lapicera azul", precio: 25, disponible: true },
  { id: 2, nombre: "Cuaderno", descripcion: "Cuaderno rayado A4", precio: 150, disponible: true },
  { id: 3, nombre: "Mochila", descripcion: "Mochila escolar", precio: 900, disponible: false },
  { id: 4, nombre: "Cartuchera", descripcion: "Cartuchera de tela", precio: 200, disponible: true },
];

@Injectable()
export class ProductoService {
  create(createProductoDto: CreateProductoDto) {
    const lastID = Math.max(...productos.map(productos => productos.id), 0)

    const newProducto = {
      id: lastID + 1,
      ...createProductoDto
    }

    productos.push(newProducto)

    return productos;
  }

  findAll() {
    return productos;
  }

  findOne(id: number) {
    return productos.find(productos => productos.id == id);
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    const upProductos = this.findOne(id);
    if (!upProductos) return productos;

    updateProductoDto.nombre && (upProductos.nombre = updateProductoDto.nombre)
    updateProductoDto.descripcion && (upProductos.descripcion = updateProductoDto.descripcion)
    updateProductoDto.precio && (upProductos.precio = updateProductoDto.precio)
    updateProductoDto.disponible && (upProductos.disponible = updateProductoDto.disponible)

    return productos;
  }

  remove(id: number) {
    const delProductos = productos.filter(productos => productos.id != id);
    return delProductos;
  }
}
