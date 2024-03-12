import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNgifComponent } from './task-ngif.component';

describe('TaskNgifComponent', () => {
  let component: TaskNgifComponent;
  let fixture: ComponentFixture<TaskNgifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskNgifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskNgifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
