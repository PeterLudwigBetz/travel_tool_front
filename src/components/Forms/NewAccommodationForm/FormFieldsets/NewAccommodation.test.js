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
          {long_name: 'Las Vegas', short_name: 'Las Vegas', types: Array(2)},
          {long_name: 'Las Vegas', short_name: 'Las Vegas', types: Array(2)},
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
  };

  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'oneWay'
    },
  };

  const defaultState = {
    values: {
      houseName: '',
      location: '',
      bathRooms: '',
      image: '',
      preview: '',
    //  ...defaultRoom
    },
    rooms: [{}],
    errors: {},
    documentId: 1,
    hasBlankFields: true
  };


  beforeEach(() => {
    wrapper = mount(<NewAccommodation {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it('renders three fieldsets', () => {
  //   const fieldsets = wrapper.find('fieldset');
  //   expect(fieldsets).toHaveLength(2);
  // });

  // it('renders the personal details fieldset', () => {
  //   const personalDetails = wrapper.find('fieldset.personal-details');
  //   expect(personalDetails).toHaveLength(1);
  // });

  // it('renders the travel details fieldset', () => {
  //   const personalDetails = wrapper.find('fieldset.travel-details');
  //   expect(personalDetails).toHaveLength(1);
  // });

  // it('renders four buttons', () => {
  //   const buttons = wrapper.find('button');
  //   expect(buttons).toHaveLength(4);
  // });

  // it('picks input values', () => {
  //   wrapper.find('input[name="name"]').simulate('change', {
  //     target: {
  //       name: 'houseName',
  //       value: 'Freedom'
  //     }
  //   });
  //   expect(wrapper.state().values.name).toBe('John Mutuma');
  // });

  // it('validates input on blur', () => {
  //   wrapper.find('input[name="name"]').simulate('blur');
  //   wrapper.update();
  //   expect(wrapper.state().errors.name).toBe('This field is required');
  // });

  // it('validates form before sending data', () => {
  //   const form = wrapper.find('form');
  //   form.simulate('submit');
  //   expect(onSubmit).toHaveBeenCalledTimes(0);
  // });

  // it('call event when date is changed', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   const event = {
  //     nativeEvent: {
  //       path: [0,1,2,3,4,5,6,{id: 'departureDate-0_date'}]
  //     }
  //   };
  //   sinon.spy(shallowWrapper.instance(), 'onChangeDate');
  //   const date = {
  //     format: () => '2018-12-01'
  //   };
  //   shallowWrapper.instance().onChangeDate(date, event);
  //   expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
  // });

  // it('call event when date is changed', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   const event = {
  //     nativeEvent: {
  //       path: [0,1,2,3,4,5,6,{id: 'arrival-0_date'}]
  //     }
  //   };
  //   shallowWrapper.setState({
  //     selection: 'multi',
  //     parentIds: 2,
  //     trips: [
  //       {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30'},
  //     ]
  //   });
  //   sinon.spy(shallowWrapper.instance(), 'onChangeDate');
  //   const date = {
  //     format: () => '2018-12-01'
  //   };
  //   shallowWrapper.instance().onChangeDate(date, event);
  //   expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
  // });

  // it('call event when date is changed', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   const event = {
  //     nativeEvent: {
  //       path: [0,1,2,3,4,5,6,{id: 'departureDate-0_date'}]
  //     }
  //   };
  //   shallowWrapper.setState({
  //     selection: 'multi',
  //     parentIds: 2,
  //     trips: [
  //       {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30'},
  //     ]
  //   });
  //   sinon.spy(shallowWrapper.instance(), 'onChangeDate');
  //   const date = {
  //     format: () => '2018-12-01'
  //   };
  //   shallowWrapper.instance().onChangeDate(date, event);
  //   expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
  // });


  // it('call event when location is picked', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   const event = {
  //     target: {
  //       dataset: {  
  //         parentid: '0'
  //       },
  //       name: 'destination-0',
  //     },
  //   };
  //   sinon.spy(shallowWrapper.instance(), 'onChangeInput');
  //   shallowWrapper.instance().onChangeInput(event);
  //   expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  // });

  // it('call event when location is picked', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   const event = {
  //     target: {
  //       dataset: {  
  //         parentid: '0'
  //       },
  //       name: 'destination-0',
  //     },
  //   };
  //   shallowWrapper.setState({
  //     selection: 'multi',
  //     parentIds: 2,
  //     trips: [
  //       {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30'},
  //     ]
  //   });
  //   sinon.spy(shallowWrapper.instance(), 'onChangeInput');
  //   shallowWrapper.instance().onChangeInput(event);
  //   expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  // });

  // it('call event when location is picked', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   const event = {
  //     target: {
  //       dataset: {  
  //         parentid: '0'
  //       },
  //       name: 'origin-0',
  //     },
  //   };
  //   shallowWrapper.setState({
  //     selection: 'multi',
  //     parentIds: 2,
  //     trips: [
  //       {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30'},
  //     ]
  //   });
  //   sinon.spy(shallowWrapper.instance(), 'onChangeInput');
  //   shallowWrapper.instance().onChangeInput(event);
  //   expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  // });


  // it('should change the radio button on click to multi ', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   const event = {
  //     preventDefault: jest.fn(),
  //     target: {
  //       value: 'multi'
  //     },
  //   };
  //   sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
  //   shallowWrapper.instance().handleRadioButton(event);
  //   expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  // });

  // it('should change the radio buttton on click to single and collapse true', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   shallowWrapper.instance().state.collapse=true;
  //   const event = {
  //     preventDefault: jest.fn(),
  //     target: {
  //       value: 'single'
  //     },
  //   };
  //   sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
  //   shallowWrapper.instance().handleRadioButton(event);
  //   expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  // });

  // it('should change the radio button on click to return ', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   const event = {
  //     preventDefault: jest.fn(),
  //     target: {
  //       value: 'return'
  //     },
  //   };
  //   sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
  //   shallowWrapper.instance().handleRadioButton(event);
  //   expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  // });

  // it('should not close the personal details field if the radio button return ', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   shallowWrapper.setState({
  //     collapse: true
  //   });
  //   const event = {
  //     preventDefault: jest.fn(),
  //     target: {
  //       value: 'return'
  //     },
  //   };
  //   sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
  //   shallowWrapper.instance().handleRadioButton(event);
  //   expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  // });

  // it('should change the radio button on click to return ', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   shallowWrapper.setState({
  //     selection: 'return'
  //   });
  //   const event = {
  //     preventDefault: jest.fn(),
  //     target: {
  //       value: 'multi'
  //     },
  //   };
  //   sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
  //   shallowWrapper.instance().handleRadioButton(event);
  //   expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  // });

  // it('should update state when a trip is added and when it\'s removed', () => {
  //   expect.assertions(7);
  //   wrapper.instance().addNewTrip();
  //   wrapper.instance().addNewTrip();
  //   expect(wrapper.instance().state.values[`origin-1`]).toBe('');
  //   expect(wrapper.instance().state.values[`origin-2`]).toBe('');
  //   expect(wrapper.instance().state.parentIds).toBe(3);
  //   wrapper.instance().removeTrip(1);
  //   expect(wrapper.instance().state.parentIds).toBe(2);
  //   // still have one trip, origin-1 should now be what was at origin-2 and so forth
  //   expect(wrapper.instance().state.values[`origin-1`]).toBe('');
  //   // after shifting state values, origin-{parentIds} in state should be undefined
  //   expect(wrapper.instance().state.values[`origin-2`]).toBe(undefined);
  //   expect(wrapper.instance().state.trips).toHaveLength(2);
  // });

  // it('should close the personal field on button click ', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   shallowWrapper.setState({
  //     collapse: true,
  //     title: 'Show Details',
  //     position: 'rotate(266deg)',
  //     line: 'none'
  //   });
  //   sinon.spy(shallowWrapper.instance(), 'collapsible');
  //   shallowWrapper.instance().collapsible(event);
  //   expect(shallowWrapper.instance().collapsible.calledOnce).toEqual(true);
  // });


  // it('selects female gender on button click', () => {
  //   let femaleButton = wrapper.find('button[data-value="Female"]');
  //   femaleButton.simulate('click', {
  //     target: {
  //       name: 'gender',
  //       getAttribute: () => {},
  //       dataset: {
  //         value: 'Female'
  //       }
  //     }
  //   });

  //   expect(wrapper.state('values').gender).toBe('Female');
  // });

  // it('selects male gender on button click', () => {
  //   let maleButton = wrapper.find('button[data-value="Male"]');
  //   maleButton.simulate('click', {
  //     target: {
  //       name: 'gender',
  //       getAttribute: () => {},
  //       dataset: {
  //         value: 'Male'
  //       }
  //     }
  //   });

  //   expect(wrapper.state('values').gender).toBe('Male');
  // });

  // it('should change the radio button on click', () => {
  //   let maleButton = wrapper.find('button[data-value="Male"]');
  //   maleButton.simulate('click', {
  //     target: {
  //       name: 'gender',
  //       getAttribute: () => {},
  //       dataset: {
  //         value: 'Male'
  //       }
  //     }
  //   });
  //   expect(wrapper.state('values').gender).toBe('Male');
  // });



  // it('selects gender with browsers that do not support custom datasets', () => {
  //   let femaleButton = wrapper.find('button[data-value="Female"]');
  //   femaleButton.simulate('click', {
  //     target: {
  //       name: 'gender',
  //       getAttribute: attrib => 'Female'
  //     }
  //   });

  //   expect(wrapper.state('values').gender).toBe('Female');
  // });

  // it('should not toggle the modal if request submission failed', () => {
  //   wrapper.setState({
  //     values: {
  //       name: 'test',
  //       gender: 'test',
  //       department: 'test',
  //       role: 'test',
  //       manager: 'test',
  //       origin: 'test',
  //       destination: 'Nairobi',
  //       otherDestination: '',
  //       departureDate: '09/27/1988',
  //       arrivalDate: '09/27/1988'
  //     }
  //   });
  //   wrapper.setProps({
  //     errors: ['error while creating a new request']
  //   });

  //   const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
  //   wrapper.instance().forceUpdate();
  //   wrapper.find('form').simulate('submit');
  //   expect(spy).toHaveBeenCalledTimes(1);
  // });

  // it('should clear the form when the component unmounts', () => {
  //   const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
  //   wrapper.unmount();
  //   expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  // });

  // it('should call handleClearForm', () => {
  //   const wrapper = shallow(<NewRequestForm {...props} />);
  //   wrapper.instance().handleClearForm();
  //   expect(wrapper.state()).toMatchObject(defaultState);
  // });


  // it('should render a loading indicator while creating a new request', () => {
  //   wrapper.setProps({ creatingRequest: true });
  //   expect(wrapper.find('h5').text()).toEqual('Creating request...');
  // });


  // it('should submit travel details ', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   localStorage.setItem('state', 'clicked');
  //   shallowWrapper.setState({
  //     values: {
  //       name: 'tomato', // FIX: need to be refactor later
  //       gender: 'male',
  //       department: 'fame',
  //       role: 'job',
  //       manager: 'mango',
  //     },
  //     trips: [],
  //     selection: 'return',
  //   });
  //   const event = {
  //     preventDefault: jest.fn(),
  //   };
  //   sinon.spy(shallowWrapper.instance(), 'handleSubmit');
  //   shallowWrapper.instance().handleSubmit(event);
  //   expect(shallowWrapper.instance().handleSubmit.calledOnce).toEqual(true);
  // });

  // it('should add new trip field for multi trip  ', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   shallowWrapper.setState({
  //     parentIds: 5
  //   });
  //   sinon.spy(shallowWrapper.instance(), 'addNewTrip');
  //   shallowWrapper.instance().addNewTrip();
  //   expect(shallowWrapper.instance().addNewTrip.calledOnce).toEqual(true);
  // });

  
  // it('should save savePersonalDetails personal details ', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   shallowWrapper.setState({
  //     name: 'tomato', // FIX: need to be refactor later
  //     gender: 'male',
  //     department: 'fame',
  //     role: 'job',
  //     manager: 'mango',
  //   });
  //   sinon.spy(shallowWrapper.instance(), 'savePersonalDetails');
  //   shallowWrapper.instance().savePersonalDetails(event);
  //   expect(shallowWrapper.instance().savePersonalDetails.calledOnce).toEqual(true);
  // });

   
  // it('should save return hasBlankTrips', () => {
  //   const shallowWrapper = shallow(<NewRequestForm {...props} />);
  //   sinon.spy(shallowWrapper.instance(), 'hasBlankTrips');
  //   shallowWrapper.instance().hasBlankTrips(event);
  //   expect(shallowWrapper.instance().hasBlankTrips.calledOnce).toEqual(true);
  // });

  // it('check hasBlankTrips works', ()=>{
  //   const wrapper = shallow(<NewRequestForm {...props}/>)
  //   const wrapperInstance = wrapper.instance();
  //   wrapperInstance.state.trips = ['Nigeria', 'Ghana']
  //   expect(wrapperInstance.hasBlankTrips()).toEqual([false, false]);
  // });

});