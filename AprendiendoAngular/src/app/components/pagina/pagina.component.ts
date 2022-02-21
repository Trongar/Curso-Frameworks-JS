import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';


@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  public nombre:string | undefined;
  public apellido:string | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.nombre = params['nombre'];
      this.apellido = params['apellido'];
    });
  }
  redirection(){
    this._router.navigate(['pagina', 'Edgar', 'Ulises']);
  }
}
