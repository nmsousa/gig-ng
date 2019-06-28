import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-live-code',
  templateUrl: './live-code.component.html',
  styleUrls: ['./live-code.component.css']
})
export class LiveCodeComponent implements OnInit {

  @Input() code: number;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
