import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🔥 IMPORTANTE

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule], // 🔥 AQUÍ
  templateUrl: './inquilino-form.html',
  styleUrls: ['./inquilino-form.css']
})
export class InquilinoForm {

  inquilino: any = {}; // 🔥 IMPORTANTE

}