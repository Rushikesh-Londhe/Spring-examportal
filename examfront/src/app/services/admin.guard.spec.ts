// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { adminGuard } from './admin.guard';

// describe('adminGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => adminGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
//import { CanActivate } from '@angular/router'; // Import CanActivate interface

import { AdminGuard } from './admin.guard'; // Make sure the name and import path are correct

describe('AdminGuard', () => { // Ensure the correct name "AdminGuard" (with a capital A)
  let guard: AdminGuard; // Declare the guard variable

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard], // Provide the AdminGuard in the TestBed
    });
    guard = TestBed.inject(AdminGuard); // Initialize the guard using TestBed
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
