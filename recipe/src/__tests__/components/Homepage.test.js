import React from 'react';
import { shallow } from 'enzyme';
import Homepage from '../../../src/components/homepage';

describe('Homepage', () => {
    it('renders without crashing', () => {
        shallow(<Homepage />);
    });
});