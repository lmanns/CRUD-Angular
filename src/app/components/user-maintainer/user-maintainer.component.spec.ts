import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMaintainerComponent } from './user-maintainer.component';

describe('UserMaintainerComponent', () => {
  let component: UserMaintainerComponent;
  let fixture: ComponentFixture<UserMaintainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMaintainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMaintainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
