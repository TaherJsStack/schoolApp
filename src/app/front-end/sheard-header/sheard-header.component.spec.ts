import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheardHeaderComponent } from './sheard-header.component';

describe('SheardHeaderComponent', () => {
  let component: SheardHeaderComponent;
  let fixture: ComponentFixture<SheardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
