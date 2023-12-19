import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from './categorias.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [CategoriasService],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {
  categoria = {
    id: 0,
    nombre: '',
    descripcion: '',
  };

  categorias = [
    {
      id: 1,
      nombre: 'Zapateria',
      descripcion: 'Todo lo relacionado con zapatos',
    },
    { id: 2, nombre: 'Ropa', descripcion: 'Todo lo relacionado con ropa' },
    { id: 3, nombre: 'Hogar', descripcion: 'Todo lo relacionado con el hogar' },
    {
      id: 4,
      nombre: 'Tecnologia',
      descripcion: 'Todo lo relacionado con tecnologia',
    },
    {
      id: 5,
      nombre: 'Deportes',
      descripcion: 'Todo lo relacionado con deportes',
    },
  ];

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.categoriasService.getAllCategorias().subscribe({
      next: (v) => {
        this.categorias = v.categorias;
      },
      error: (e) => console.error('Error: ', e),
      complete: () => console.info('Se completa la llama: Si hay error o no'),
    });
  }

  create() {
    const posId = this.categorias.findIndex(
      (cat) => cat.id == this.categoria.id
    );
    if (posId == -1) {
      alert('Add Id: ' + this.categoria.id);
      alert('Add Name: ' + this.categoria.nombre);
      alert('Add Description: ' + this.categoria.descripcion);
      const categoriaSinVincular = {
        id: this.categoria.id,
        nombre: this.categoria.nombre,
        descripcion: this.categoria.descripcion,
      };
      this.categoriasService.createCategoria(categoriaSinVincular).subscribe({
        next: (resAPI) => {
          if (resAPI.estado == 1) {
            categoriaSinVincular.id = resAPI.categorias[0].id;
            this.categoria.id = resAPI.categorias[0].id;
            this.categorias.push(categoriaSinVincular);
            alert(resAPI.mensaje);
          } else {
            alert(resAPI.mensaje);
          }
        },
        error: (e) => {},
        complete: () => console.info('Solicitud Compeltada.'),
      });
      //Aqui la agregamos al arreglo
    } else {
      alert('Categoría existente y/o id invalido');
      console.log(this.categoria.nombre);
    }
  }

  seleccionarCategoria(categoriaSeleccionada: {
    id: number;
    nombre: string;
    descripcion: string;
  }) {
    this.categoria.id = categoriaSeleccionada.id;
    this.categoria.nombre = categoriaSeleccionada.nombre;
    this.categoria.descripcion = categoriaSeleccionada.descripcion;
  }

  eliminarCategoria(id: number) {
    alert('Eliminar categoria con id: ' + id + ' :p');
    const posId = this.categorias.findIndex((categoria) => categoria.id == id);
    this.categorias.splice(posId, 1);
  }

  actualizarCategoria() {
    const idActualizar = this.categorias.findIndex(
      (cat) => cat.id == this.categoria.id
    );
    this.categorias[idActualizar].id = this.categoria.id;
    this.categorias[idActualizar].nombre = this.categoria.nombre;
    this.categorias[idActualizar].descripcion = this.categoria.descripcion;
  }
}
