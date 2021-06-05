import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ProjectW';
  gl: WebGL2RenderingContext;

  @ViewChild('glCanvas')
  public glCanvas;

  ngAfterViewInit(): void {
    this.gl = this.glCanvas.nativeElement.getContext('webgl2');
  }

}
