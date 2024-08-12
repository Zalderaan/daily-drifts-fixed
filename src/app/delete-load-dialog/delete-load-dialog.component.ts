import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-delete-load-dialog',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatDialogModule],
  templateUrl: './delete-load-dialog.component.html',
  styleUrl: './delete-load-dialog.component.css'
})
export class DeleteLoadDialogComponent {

}
