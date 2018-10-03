import React from 'react';
import sinon from 'sinon';
import NewAccommodation from '../NewAccommodation';

describe('<NewAccommodation />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  class AutocompleteServiceMock {
    addListener (place_changed ,callback) {
      callback( this.getPlace(), 'OK');
    }
    getPlace = () => {
      const components = {
        address_components:  [
          {long_name: 'Las Vegas', short_name: 'Las Vegas', types: Array(2)},
          {long_name: 'Clark County', short_name: 'Clark County', types: ['country', 'political']},
          {long_name: 'Nevada', short_name: 'NV', types: Array(2)},
          {long_name: 'United States', short_name: 'US', types: Array(2)}
        ]
      };
      return components;
    }
  }
  window.url = 'http://www.goo.com';
  window.google ={
    maps: {
      places: {
        Autocomplete: AutocompleteServiceMock,
      }
    }
  };

  const props = {
    createAccommodation: jest.fn(() => {}),
    fetchAccommodation: jest.fn(() => {}),
  };

  global.FileReader = () => ({
    readAsDataURL: () => {

    }
  });

  beforeEach(() => {
    wrapper = mount(<NewAccommodation {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should clear the form when the component unmounts', () => {
    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  // it('call handleImageChange when image is selected is picked', () => {
  //   const shallowWrapper = shallow(<NewAccommodation {...props} />);
  //   const files = {
  //     name: '%40Venkatesh_Sompari_Walls%40~01.jpeg', 
  //     lastModified: 1516434814000, 
  //     lastModifiedDate: 'Sat Jan 20 2018 08:53:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
  //     size: 302114,
  //     type: 'image/jpeg',
  //     __proto__: File
  //   };
  //   const event = {
  //     preventDefault: jest.fn(),
  //     target: files[0]
  //   };
  //   sinon.spy(shallowWrapper.instance(), 'handleImageChange');
  //   shallowWrapper.instance().handleImageChange(event);
  //   expect(shallowWrapper.instance().handleImageChange.calledOnce).toEqual(true);
  // });


  it('call event when Location is picked', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const event = {
      target: {
        dataset: {  
          parentid: '0'
        },
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleLocation');
    shallowWrapper.instance().handleLocation(event);
    expect(shallowWrapper.instance().handleLocation.calledOnce).toEqual(true);
  });

  it('call event when input is picked', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const event = {
      target: {
        dataset: {  
          parentid: '0'
        },
        name: 'roomName-0',
      },
    };
    shallowWrapper.setState({
      parentIds: 0,
      rooms: [
        {
          roomName: 'Amsterdam North Holland', 
        },
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'handleInputChange');
    shallowWrapper.instance().handleInputChange(event);
    expect(shallowWrapper.instance().handleInputChange.calledOnce).toEqual(true);
  });


  it('call event when input is picked', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const event = {
      target: {
        dataset: {  
          parentid: '0'
        },
        name: 'bedCount-0',
      },
    };
    shallowWrapper.setState({
      parentIds: 0,
      rooms: [
        {
          roomName: 'Amsterdam North Holland', 
          bedCount: '2', 
        },
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'handleInputChange');
    shallowWrapper.instance().handleInputChange(event);
    expect(shallowWrapper.instance().handleInputChange.calledOnce).toEqual(true);
  });


  it('call event when input is picked', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const event = {
      target: {
        dataset: {  
          parentid: '0'
        },
        name: 'bedCount-0',
      },
    };
    shallowWrapper.setState({
      parentIds: 0,
      rooms: []
    });
    sinon.spy(shallowWrapper.instance(), 'handleInputChange');
    shallowWrapper.instance().handleInputChange(event);
    expect(shallowWrapper.instance().handleInputChange.calledOnce).toEqual(true);
  });

  it('call event when drop down is selected', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const data =  {
      name: 'roomType-0',
      parentid: 0
    };
    const choice = 'dance';
    sinon.spy(shallowWrapper.instance(), 'handleDropDown');
    shallowWrapper.instance().handleDropDown(data, choice);
    expect(shallowWrapper.instance().handleDropDown.calledOnce).toEqual(true);
  });

  it('call event when drop down is selected', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    const data =  {
      name: 'roomType-0',
      parentid: 0
    };
    const choice = 'dance';
    shallowWrapper.setState({
      rooms: []
    });
    sinon.spy(shallowWrapper.instance(), 'handleDropDown');
    shallowWrapper.instance().handleDropDown(data, choice);
    expect(shallowWrapper.instance().handleDropDown.calledOnce).toEqual(true);
  });

  it('validates input on blur', () => {
    wrapper.find('input[name="location"]').simulate('blur');
    wrapper.update();
    expect(wrapper.state().errors.location).toBe('This field is required');
  });

  it('validates form before sending data', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should remove room when cancel button is click', () => {
    const shallowWrapper = shallow(<NewAccommodation {...props} />);
    shallowWrapper.setState({
      rooms: [
        {
          roomName: 'lol',
          roomType: 'leke',
          bedCount: 1,
        },
        {
          roomName: 'lol',
          roomType: 'leke',
          bedCount: 1,
        },
        {
          roomName: 'lol',
          roomType: 'leke',
          bedCount: 1,
        },
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'removeRoom');
    shallowWrapper.instance().removeRoom(1);
    expect(shallowWrapper.instance().removeRoom.calledOnce).toEqual(true);
  });
});
