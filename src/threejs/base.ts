import * as THREE from 'three';
import * as dat from 'dat.gui';

export class Base {

  scene: any;
  camera: any;
  renderer: any;
  gui: any;

  animationFrame: any;

  init(dom: HTMLElement) {
    const width = dom.offsetWidth;
    const height = dom.offsetHeight;

    // 初始化场景
    this.scene = new THREE.Scene();

    // 初始化相机
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.set(0, 0, 150);

    // 初始化渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    // this.renderer.setClearColor(0x000000, 1);
    dom.appendChild(this.renderer.domElement);

    // 初始化交互控制界面
    this.gui = new dat.GUI();
    this.initGui();

    this.initShader();

    this.render();

    return this;
  }

  initGui() { }

  initShader() { }

  renderContent() { }

  render() {
    this.animationFrame = requestAnimationFrame(() => {
      this.render();
    });
    this.renderContent();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.animationFrame);
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer.domElement = null;
      this.renderer = null;
    }
    this.gui.destroy();
    console.log('disposed!');
  }
}