import { ThisReceiver } from '@angular/compiler';
import { HostListener, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three'

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.css']
})
export class TestcomponentComponent implements OnInit{
 
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
 
  @HostListener('window:keypress', ['$event']) handleKeyEvent(event:any){
   this.key = event.key;
  }
  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.mouse_x = (event.x - this.width/2) ;
    this.mouse_y = (event.y - this.height/2)* -1 + 100;
    //console.log(event.x);
    //console.log(event.y);
  }
  @HostListener('mousedown', ['$event'])
    onMousedown(event) {
        this.mouseDown = true;
    }
    @HostListener('mouseup')
    onMouseup() {
        this.mouseDown = false;
    }

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;
  width = 700;
  height = 700;
  key:string = null;
  speed:number = 100;
  mouse_mesh:THREE.Mesh = null;
  mouse_x:number = 0;
  mouse_y:number = 0;
  mouseDown:boolean = false;

  constructor() {
      this.scene = new THREE.Scene();

      this.camera = new THREE.OrthographicCamera( this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, 1, 1000 );
      this.camera.position.z = 1000;

      const geometry = new THREE.PlaneGeometry(100,100,32);
     
      const loader = new THREE.TextuBUGreLoader();
      const material = new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg')});

      this.mesh = new THREE.Mesh(geometry, material);

      const object = new THREE.Object3D();

      const mouse_geometry = new THREE.PlaneGeometry(50,50,32);
      const red_material = new THREE.MeshBasicMaterial({color: 0x00ff11});
      this.mouse_mesh = new THREE.Mesh(mouse_geometry, red_material);

      this.scene.add(this.mesh);
      this.scene.add(this.mouse_mesh);

  }

  ngAfterViewInit() {
      this.renderer.setSize(this.width, this.height);
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
      this.animate();
  }
  x:number = 0;
  animate() {
      window.requestAnimationFrame(() => this.animate());
      if(this.key == "w"){
        this.mesh.translateY(0.5 * this.speed);
      }
      if(this.key == "s"){
        this.mesh.translateY(-0.5 * this.speed);
      }
      if(this.key == "a"){
        this.mesh.translateX(-0.5* this.speed);
      }
      if(this.key == "d"){
        this.mesh.translateX(0.5* this.speed);
      }
      this.key = null;
      this.x+=0.1;
      this.mesh.translateX(Math.sin(this.x)*5);
     
      this.mouse_mesh.position.x = this.mouse_x;
      this.mouse_mesh.position.y = this.mouse_y;
      if(this.mouseDown){
        this.mouse_mesh.translateY(-0.5 * this.speed);
      }

      this.renderer.render(this.scene, this.camera);
  }
  ngOnInit(): void {

  }
}
