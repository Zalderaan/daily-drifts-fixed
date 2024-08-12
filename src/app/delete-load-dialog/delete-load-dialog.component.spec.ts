import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLoadDialogComponent } from './delete-load-dialog.component';

describe('DeleteLoadDialogComponent', () => {
  let component: DeleteLoadDialogComponent;
  let fixture: ComponentFixture<DeleteLoadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLoadDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLoadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
