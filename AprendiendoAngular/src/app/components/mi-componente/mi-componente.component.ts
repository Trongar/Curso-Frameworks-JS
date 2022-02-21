import { Component } from '@angular/core';

@Component({
    selector: 'mi-componente',
    template: `
    <h1>{{titulo}}<h1>
    <p>{{comentario}}</p>
    <p>{{year}}</p>
    `,
})
export class MiComponente{
    public titulo: string;
    public comentario: string;
    public year: number;
    constructor(){
        this.titulo = "Hola mundo"
        this.comentario = "Este es mi primer comentario"
        this.year = 2022
        console.log("mi-componente cargado");
        console.log(this.titulo);
        console.log(this.comentario);
        console.log(this.year);
    }
}
