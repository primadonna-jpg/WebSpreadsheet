import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetListComponent } from './spreadsheet-list.component';

describe('SpreadsheetListComponent', () => {
  let component: SpreadsheetListComponent;
  let fixture: ComponentFixture<SpreadsheetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpreadsheetListComponent]
    });
    fixture = TestBed.createComponent(SpreadsheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
