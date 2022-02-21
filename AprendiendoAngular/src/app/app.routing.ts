//importar módulos de angular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";

//importar componentes para hacer página 
import { HomeComponent } from "./components/home/home.component";
import { BlogComponent } from './components/blog/blog.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { PaginaComponent } from './components/pagina/pagina.component';
import { ErrorComponent } from './components/error/error.component';

//array de rutas

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'peliculas', component:PeliculasComponent },
    {path: 'formulario', component:FormularioComponent },
    {path: 'pagina', component:PaginaComponent },
    {path: 'pagina/:nombre/:apellido', component:PaginaComponent },
    {path: '**', component:ErrorComponent}  
];

//Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

