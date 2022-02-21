import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  public titulo: string;
  public peliculas: Array<Pelicula>;


  constructor() { 
    this.titulo = "Componente Peliculas";
    this.peliculas = [
      new Pelicula (2015, "Spiderman 4", "https://getwallpapers.com/wallpaper/full/c/a/e/1522613-amazing-spiderman-phone-wallpaper-1920x1080-ios.jpg"),
      new Pelicula (2020, "Endgame", "https://assets.fanart.tv/fanart/movies/299534/moviebackground/avengers-endgame-5ccf8e94abbd2.jpg"),
      new Pelicula(2019, "Batman v Superman", "https://th.bing.com/th/id/R.b3bdbdac43e5484028597dc46996e43b?rik=%2b6lSHtO%2bpfZ4HA&riu=http%3a%2f%2fwww.designbolts.com%2fwp-content%2fuploads%2f2015%2f12%2fBatman-v-Superman-2016-Official-Wallpaper-HD1.jpg&ehk=mbBtUlxtVIoAKwW%2bW77Zsuwp2OPaF9vg4ulGsQh02zs%3d&risl=&pid=ImgRaw&r=0")
    ]
  }

  cambiarTitulo(): void{}

  ngOnInit(): void {
  }

}
