import { Component } from '@angular/core';
import { ContactUsFormComponent } from '../../components/contact-us-form/contact-us-form.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ContactUsFormComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {}
