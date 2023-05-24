import { Component, OnInit } from '@angular/core';
import { Basestation } from '../model/basestation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  basestations: Basestation[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
