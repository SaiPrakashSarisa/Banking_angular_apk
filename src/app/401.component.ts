import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<div><img src="../assets/images/404_Page_Not_Found.png"><h1>404 Page Not Found</h1></div>',
  styles: [
    'div { background-color: cyan; height : 100vh; display : flex; flex-direction : column; align-items : center; justify-content : center; }',
    'h1 { font-size : 5rem; font-family: cursive; color : black;}'
  ]
})
export class PageNotFoundComponent {
  title = 'AngularBanking';

  
   
  constructor(){
    let audio = new Audio();
    audio.src = "../assets/sounds/windows_error.mp3";
    audio.onloadeddata = function(){
      audio.play();
    }
    audio.load();
  }
}