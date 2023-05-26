import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();



  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalClosed.emit();
  }

}
