import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us-form',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './contact-us-form.component.html',
  styleUrl: './contact-us-form.component.scss',
})
export class ContactUsFormComponent {
  onSubmit(contactForm: NgForm) {
    console.log(contactForm.value);
  }
}
