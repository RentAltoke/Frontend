import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquilinoList } from './inquilino-list';

describe('InquilinoList', () => {
  let component: InquilinoList;
  let fixture: ComponentFixture<InquilinoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquilinoList],
    }).compileComponents();

    fixture = TestBed.createComponent(InquilinoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
