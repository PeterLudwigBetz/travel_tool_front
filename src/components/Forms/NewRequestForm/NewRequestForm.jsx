import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Script from 'react-load-script';
import { isEqual, pick, mapValues } from 'lodash';
import moment from 'moment';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import PersonalDetailsFieldset from './FormFieldsets/PersonalDetails';
import TravelDetailsFieldset from './FormFieldsets/TravelDetails';
import SubmitArea from './FormFieldsets/SubmitArea';
import './NewRequestForm.scss';

class NewRequestForm extends PureComponent {
  constructor(props) {
    super(props);
    const { modalType, requestOnEdit } = this.props;
    const isEdit = modalType === 'edit request';
    const { name, gender, department, role, manager } = this.getPersonalDetails(
      modalType,
      requestOnEdit
    );
    const defaultTripStateValues = this.getDefaultTripStateValues(0);
    const editTripsStateValues = isEdit ? this.getTrips(requestOnEdit) : {};
    const requestTrips = isEdit ? this.setTrips(requestOnEdit) : [{}];
    this.defaultState = {
      values: {
        name: name,
        gender,
        department,
        role,
        manager,
        ...defaultTripStateValues,
        ...editTripsStateValues
      },
      trips: requestTrips,
      errors: {},
      hasBlankFields: true,
      checkBox: 'notClicked',
      selection: 'return',
      collapse: false,
      title: 'Hide Details',
      position: 'none',
      line: '1px solid #E4E4E4',
      parentIds: 1
    };
    this.state = { ...this.defaultState };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentDidMount() {
    const { modalType } = this.props;
    if (modalType === 'edit request') {
      this.handleEditForm();
    }
  }

  componentWillUnmount() {
    const { fetchUserRequests } = this.props;
    fetchUserRequests();
    this.handleClearForm();
  }

  getPersonalDetails = (modalType, detailsSource) => {
    const { userData } = this.props;
    const personalDetails = {};
    const personalDetailsAttributes = [
      'name',
      'gender',
      'department',
      'role',
      'manager'
    ];
    personalDetailsAttributes.map(attrb => {
      if (modalType === 'edit request')
        return (personalDetails[attrb] = detailsSource[attrb]);
      userData.name = userData.passportName;
      userData.role = userData.occupation;
      let value = userData[attrb];
      value = !/^null|undefined$/.test(value) ? value : '';
      return (personalDetails[attrb] = value);
    });
    return personalDetails;
  };

  setTrips = requestOnEdit => {
    const { trips } = requestOnEdit;
    let allTrips = [];
    trips.map(trip => allTrips.push(trip));
    return allTrips;
  };
  getTrips = requestOnEdit => {
    const { trips } = requestOnEdit;
    const tripsStateValues = [];
    trips.map((trip, index) => {
      tripsStateValues[`origin-${index}`] = trip.origin;
      tripsStateValues[`destination-${index}`] = trip.destination;
      tripsStateValues[`arrivalDate-${index}`] = moment(trip.returnDate);
      tripsStateValues[`departureDate-${index}`] = moment(trip.departureDate);
    });
    return tripsStateValues;
  };
  handleEditForm = () => {
    const { requestOnEdit } = this.props;
    const event = {
      target: {
        value: requestOnEdit.tripType
      }
    };
    this.handleRadioButton(event);
  };
  onChangeDate = (date, event) => {
    const { trips, selection } = this.state;
    const dateFormat = date.format('YYYY-MM-DD');
    const dateWrapperId = event.nativeEvent.path[7].id;
    const dateName = dateWrapperId.split('_')[0];
    const getId = dateName.split('-')[1];
    const dateStartsWithDeparture = dateName.startsWith('departure');
    if (trips[getId]) {
      if (dateStartsWithDeparture) {
        trips[getId].departureDate = dateFormat;
      } else if (dateName.startsWith('arrival')) {
        trips[getId].returnDate = dateFormat;
      }
    } else {
      trips.push({
        [dateName.split('-')[0]]: dateFormat
      });
    }

    const onPickDate =
      dateStartsWithDeparture && selection !== 'oneWay'
        ? () => this.resetTripArrivalDate(getId, dateName)
        : () => this.validate(dateName);

    this.setState(
      prevState => ({
        values: {
          ...prevState.values,
          [dateName]: date
        }
      }),
      onPickDate
    );
  };

  resetTripArrivalDate = (id, dateName) => {
    this.setState(
      prevState => ({
        values: {
          ...prevState.values,
          [`arrivalDate-${id}`]: null
        }
      }),
      () => this.validate(dateName)
    );
  };

  onChangeInput = event => {
    const name = event.target.name;
    const getId = event.target.dataset.parentid;
    const { trips } = this.state;
    const options = {
      types: ['(cities)']
    };
    const autocomplete = new google.maps.places.Autocomplete(
      event.target,
      options
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace().address_components;
      const countryIndex = place.findIndex(addr =>
        addr.types.includes('country')
      );
      const places = place[0].long_name + ', ' + place[countryIndex].long_name;
      if (trips[getId]) {
        if (name.startsWith('destination')) {
          trips[getId].destination = places;
        } else if (name.startsWith('origin')) {
          trips[getId].origin = places;
        }
      } else {
        trips.push({
          [name.split('-')[0]]: places
        });
      }
      this.setState(
        prevState => ({
          values: {
            ...prevState.values,
            [name]: places
          }
        }),
        this.validate
      );
    });
  };

  handleRadioButton = event => {
    const { modalType, requestOnEdit } = this.props;
    let { collapse, trips } = this.state;
    const tripType = event.target.value;
    this.setState(
      {
        selection: tripType
      },
      this.validate
    );
    if (tripType === 'multi' && !collapse) {
      this.collapsible();
      let parentIds,
        secondTripStateValues = {};
      if (modalType === 'edit request') {
        parentIds = requestOnEdit.trips.length;
        trips = requestOnEdit.trips;
      } else {
        parentIds = 2;
        trips = [].concat([trips[0] || {}, {}]);
        secondTripStateValues = this.getDefaultTripStateValues(1);
      }
      this.setState(prevState => ({
        parentIds,
        trips,
        values: { ...prevState.values, ...secondTripStateValues }
      }));
    } else if (!collapse) {
      this.setState(prevState => {
        const { newValues, trips } = this.refreshValues(prevState, tripType);
        return {
          parentIds: 1,
          values: newValues,
          trips: trips || [{}]
        };
      });
    } else {
      this.setState(prevState => {
        const { newValues, trips } = this.refreshValues(prevState, tripType);
        return {
          parentIds: 1,
          values: newValues,
          trips: trips || [{}]
        };
      });
      this.collapsible();
    }
  };
  getDefaultTripStateValues = index => ({
    [`origin-${index}`]: '',
    [`destination-${index}`]: '',
    [`arrivalDate-${index}`]: null,
    [`departureDate-${index}`]: null
  });
  refreshValues = (prevState, tripType) => {
    // squash state.values to the shape defaultState keeping the values from state
    const { values, trips } = prevState;
    const newValues = { ...this.defaultState.values };
    Object.keys(newValues).map(
      inputName => (newValues[inputName] = values[inputName])
    );
    if (tripType === 'oneWay') {
      let newTrip = { ...trips[0] };
      delete newValues['arrivalDate-0'];
      delete newTrip.returnDate;
      trips[0] = newTrip;
      const slicedTrips = trips.slice(0, 1);
      return { newValues, trips: slicedTrips };
    }
    if (tripType === 'return') {
      const slicedTrips = trips.slice(0, 1);
      return { newValues, trips: slicedTrips };
    }
    return { newValues, trips };
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      handleCreateRequest,
      handleEditRequest,
      getUserData,
      modalType,
      requestOnEdit,
      updateUserProfile,
      userData,
      user
    } = this.props;
    const { values, selection, trips } = this.state;
    userData.name = userData.passportName;
    userData.role = userData.occupation;

    const attrb = ['name', 'gender', 'role', 'department', 'manager'];
    const defaultUserData = pick(userData, attrb);
    const newUserData = pick(values, attrb);
    const newData = {
      ...newUserData,
      trips,
      tripType: selection
    };

    let data = { ...newData };
    if (this.validate() && modalType === 'edit request') {
      handleEditRequest(requestOnEdit.id, data);
    } else {
      handleCreateRequest(data);
    }
    const checkBoxState = localStorage.getItem('checkBox');
    if (checkBoxState === 'clicked') {
      if (!isEqual(newUserData, defaultUserData)) {
        values.passportName = values.name;
        values.occupation = values.role;
        const userId = user.UserInfo.id;
        // this adds user profile to the database *do not remove
        updateUserProfile(values, userId);
        getUserData(userId);
      }
    }
  };

  addNewTrip = () => {
    return this.setState(prevState => {
      const { parentIds, values, trips } = prevState;
      const addedTripStateValues = this.getDefaultTripStateValues(parentIds);
      return {
        parentIds: parentIds + 1,
        trips: trips.concat([{}]),
        values: { ...values, ...addedTripStateValues }
      };
    }, this.validate);
  };
  removeTrip = i => {
    const tripProps = ['origin', 'destination', 'arrivalDate', 'departureDate'];
    this.setState(prevState => {
      let { parentIds, trips, values, errors } = prevState;
      trips.splice(i, 1);
      parentIds--;
      tripProps.map(prop => {
        // shift trips state values up a level from deleted index
        let start = i;
        while (start < parentIds) {
          values[`${prop}-${start}`] = values[`${prop}-${start + 1}`];
          start++;
        }
        // remove other redundant things from state
        delete values[`${prop}-${parentIds}`];
        delete errors[`${prop}-${i}`];
      });
      return { trips, values, parentIds, errors };
    }, this.validate);
  };
  handleClearForm = () => {
    this.setState({ ...this.defaultState });
  };
  collapsible = () => {
    const { collapse } = this.state;
    if (!collapse) {
      this.setState({
        collapse: true,
        title: 'Show Details',
        position: 'rotate(266deg)',
        line: 'none'
      });
    } else {
      this.setState({
        collapse: false,
        title: 'Hide Details',
        position: 'none',
        line: '1px solid #E4E4E4'
      });
    }
  };

  renderPersonalDetailsFieldset = () => {
    const { collapse, title, position, line, values } = this.state;
    const { managers, occupations } = this.props;
    return (
      <PersonalDetailsFieldset
        values={values}
        savePersonalDetails={this.savePersonalDetails}
        collapsible={this.collapsible}
        collapse={collapse}
        title={title}
        position={position}
        line={line}
        managers={managers}
        occupations={occupations}
        value="232px"
      />
    );
  };

  renderTravelDetailsFieldset = () => {
    const { selection, parentIds, values } = this.state;
    return (
      <TravelDetailsFieldset
        values={values}
        value="232px"
        selection={selection}
        handleDate={this.onChangeDate}
        handleRadioButtonChange={this.handleRadioButton}
        onChangeInput={this.onChangeInput}
        parentIds={parentIds}
        addNewTrip={this.addNewTrip}
        removeTrip={this.removeTrip}
      />
    );
  };

  renderForm = () => {
    const { errors, values, hasBlankFields } = this.state;
    const { modalType, creatingRequest } = this.props;
    return (
      <FormContext
        targetForm={this}
        values={values}
        errors={errors}
        validatorNam="validate"
      >
        {creatingRequest && <h5 className="style-h5">Creating request...</h5>}
        <form onSubmit={this.handleSubmit} className="new-request">
          {this.renderPersonalDetailsFieldset()}
          {this.renderTravelDetailsFieldset()}
          <Script
            url={process.env.REACT_APP_CITY}
            onCreate={this.handleScriptCreate}
            onError={this.handleScriptError}
            onLoad={this.handleScriptLoad}
          />
          <SubmitArea
            onCancel={this.handleClearForm}
            hasBlankFields={hasBlankFields}
            send={
              modalType === 'edit request' ? 'Update Request' : 'Send Request'
            }
          />
        </form>
      </FormContext>
    );
  };

  render() {
    const { managers, creatingRequest, occupations } = this.props;

    return <div>{this.renderForm()}</div>;
  }
}

NewRequestForm.propTypes = {
  handleCreateRequest: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  handleEditRequest: PropTypes.func.isRequired,
  managers: PropTypes.array,
  creatingRequest: PropTypes.bool,
  modalType: PropTypes.string,
  requestOnEdit: PropTypes.object.isRequired,
  fetchUserRequests: PropTypes.func.isRequired,
  occupations: PropTypes.array.isRequired,
  getUserData: PropTypes.func.isRequired
};

NewRequestForm.defaultProps = {
  creatingRequest: false,
  modalType: null,
  managers: []
};

export default NewRequestForm;
