import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  loginForm: FormGroup;
  
  hide = true;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
