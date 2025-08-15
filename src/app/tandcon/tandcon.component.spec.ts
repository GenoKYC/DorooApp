import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TandconComponent } from './tandcon.component';

describe('TandconComponent', () => {
  let component: TandconComponent;
  let fixture: ComponentFixture<TandconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TandconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TandconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
