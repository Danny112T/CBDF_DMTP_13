import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  categoria = {
    id: 0,
    nombre: "",
    descripcion: "",
  };

  categorias = [
    {id: 1, nombre: "Zapateria", descripcion: "Todo lo relacionado con zapatos"},
    {id: 2, nombre: "Ropa", descripcion: "Todo lo relacionado con ropa"},
    {id: 3, nombre: "Hogar", descripcion: "Todo lo relacionado con el hogar"},
    {id: 4, nombre: "Tecnologia", descripcion: "Todo lo relacionado con tecnologia"},
    {id: 5, nombre: "Deportes", descripcion: "Todo lo relacionado con deportes"},
  ];

  agregarCategoria() {
    const posId = this.categorias.findIndex((cat) => cat.id == this.categoria.id);
    if (this.categoria.id>0 && posId==-1) {
        alert('vas a agregar la categoria con nombre ' + this.categoria.nombre);
        const categoriaSinVincular = {
            id: this.categoria.id,
            nombre: this.categoria.nombre,
            descripcion: this.categoria.descripcion,
        }
        this.categorias.push(categoriaSinVincular);
    } else {
      alert("Error: verifica tus datos")
      console.log(this.categoria.nombre)
    }
  }

  seleccionarCategoria(categoriaSeleccionada: {id: number, nombre: string, descripcion: string}) {
    this.categoria.id = categoriaSeleccionada.id;
    this.categoria.nombre = categoriaSeleccionada.nombre;
    this.categoria.descripcion = categoriaSeleccionada.descripcion;

  }

  eliminarCategoria(id: number) {
    alert("Eliminar categoria con id: " + id + " :p")
    const posId = this.categorias.findIndex((categoria) => categoria.id == id);
    this.categorias.splice(posId, 1);
  }

  actualizarCategoria() {
    const idActualizar = this.categorias.findIndex((cat) => cat.id == this.categoria.id);
    this.categorias[idActualizar].id = this.categoria.id;
    this.categorias[idActualizar].nombre = this.categoria.nombre;
    this.categorias[idActualizar].descripcion = this.categoria.descripcion;
  }
}
