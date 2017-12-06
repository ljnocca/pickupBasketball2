import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGameComponent } from './next-game.component';

describe('NextGameComponent', () => {
  let component: NextGameComponent;
  let fixture: ComponentFixture<NextGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
