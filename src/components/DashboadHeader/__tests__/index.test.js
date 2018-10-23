import React from 'react';
import { shallow, mount } from 'enzyme';
import DashboardHeader from '..';
// import  CheckInTable } from '..';

describe('<DashboardHeader />', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<DashboardHeader />);
    expect(wrapper).toMatchSnapshot();
  });
})