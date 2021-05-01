import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ProjectW';

  @ViewChild('glCanvas')
  public glCanvas;

  ngAfterViewInit(): void {
    const gl: WebGL2RenderingContext = this.glCanvas.nativeElement.getContext('webgl2');

  }

}
