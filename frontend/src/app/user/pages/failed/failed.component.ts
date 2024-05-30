import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-failed',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './failed.component.html',
  styleUrl: './failed.component.scss',
})
export class FailedComponent {}
