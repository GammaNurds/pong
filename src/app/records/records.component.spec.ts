/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RecordsComponent } from './records.component';

describe('Component: Records', () => {
    let component;

    beforeEach(() => {
        component = new RecordsComponent();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('isWinner() should return boolean', () => {
        let record = {
            p1Name: "p1",
            p2Name: "p2",
            p1Points: 3,
            p2Points: 2
        }
        expect(component.isWinner("p1", record)).toBeTruthy();
        //expect(component.isWinner("p2", record)).toBeFalsy();
    });



});
