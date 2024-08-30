// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { normalGuard } from './normal.guard';

// describe('normalGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => normalGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router'; // Import CanActivate interface

import { NormalGuard } from './normal.guard'; // Ensure the correct name of your guard and correct import path

describe('NormalGuard', () => { // Use the correct name "NormalGuard" (with a capital N)
  let guard: NormalGuard; // Declare the guard variable

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NormalGuard); // Initialize the guard using TestBed
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
