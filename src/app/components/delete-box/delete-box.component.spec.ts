import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoxComponent } from './delete-box.component';

describe('DeleteBoxComponent', () => {
  let component: DeleteBoxComponent;
  let fixture: ComponentFixture<DeleteBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteBoxComponent]
    });
    fixture = TestBed.createComponent(DeleteBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
