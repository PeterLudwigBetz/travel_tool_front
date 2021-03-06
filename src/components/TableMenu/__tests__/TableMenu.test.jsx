import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TableMenu from '../TableMenu';


let props = {
  request: {
    id: 'xDh20btGz',
    name: 'Amarachukwo Agbo',
    tripType: 'oneWay',
    status: 'Open',
    manager: 'Ezrqn Kiptanui',
    gender: 'Female',
    trips: [],
    department: 'TDD',
    role: 'Learning Facilitator'
  },
  menuOpen: {
    id: 1,
    open: true
  },
  showTravelChecklist: jest.fn(),
  toggleMenu: jest.fn(),
  requestStatus: '',
  type: '',
  editRequest: sinon.spy(() => Promise.resolve())
};

let wrapper = shallow(<TableMenu {...props} />);

describe('<TableMenu />', () => {
  it('should render the component', () => {
    expect(wrapper.find('.menu__container').length).toBe(1);
    expect(wrapper.find('.fa-ellipsis-v').length).toBe(1);
    expect(wrapper.find('div').length).toBe(3);
  });

  it('should render the component when props change', () => {
    props = {
      ...props,
      requestStatus: 'Open',
      type: 'requests',
    };
    wrapper = shallow(<TableMenu {...props} />);

    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper.find('img').length).toBe(3);
  });

  it('should render Onclick request works as exepected', () => {
    wrapper = mount(<TableMenu {...props} />);

    const spy = sinon.spy(wrapper.props().toggleMenu);
    const toggleIcon = wrapper.find('#toggleIcon');
    toggleIcon.simulate('click');
    expect(spy.calledOnce).toEqual(false);
  });

  it('should render Onclick request works as exepected', () => {
    wrapper = mount(<TableMenu {...props} />);

    const spy = sinon.spy(wrapper.props().toggleMenu);
    const toggleButton = wrapper.find('#toggleButton');
    toggleButton.simulate('click');
    expect(spy.calledOnce).toEqual(false);
  });

  it('should render Onclick request works as exepected', () => {

    wrapper = mount(<TableMenu {...props} />);

    const { editRequest, request } = props;
    const iconBtn = wrapper.find('#iconBtn');
    iconBtn.simulate('click');
    expect(editRequest.called).toEqual(true);
    expect(editRequest.calledWith(request.id)).toEqual(true);
  });

  it('should call `showTravelChecklist` on click', () => {
    let newProps = {
      ...props,
      requestStatus: 'Open',
      type: 'requests'
    };
    wrapper = shallow(<TableMenu {...newProps} />);

    const { showTravelChecklist, request } = props;
    const travelChecklistBtn = wrapper.find('#travelChecklistBtn');
    travelChecklistBtn.simulate('click');
    expect(showTravelChecklist).toHaveBeenCalled();
    expect(wrapper.find('#travelChecklistBtn').length).toBe(1);
  });
});
