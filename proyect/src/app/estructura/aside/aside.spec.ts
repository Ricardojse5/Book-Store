import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aside } from './aside';

describe('Aside', () => {
  let component: Aside;
  let fixture: ComponentFixture<Aside>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Aside]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Aside);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
