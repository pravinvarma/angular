import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTBComponent } from './edit-tb.component';

describe('EditTBComponent', () => {
  let component: EditTBComponent;
  let fixture: ComponentFixture<EditTBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
