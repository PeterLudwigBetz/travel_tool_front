import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/modal/Modal';
import { NewAccommodationForm } from '../../components/Forms';
import AccommodationPanelHeader from '../../components/AccommodationPanelHeader';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { createAccommodation, fetchAccommodation } from '../../redux/actionCreator/accommodationActions';
import WithLoadingCentreGrid from '../../components/CentreGrid';

export class Accommodation extends Component {
  componentDidMount() {
    const { fetchAccommodation } = this.props;
    fetchAccommodation();
  }
  
  renderAccommodationPanelHeader() {
    let { openModal } = this.props;
    return (
      <div className="rp-role__header">
        <AccommodationPanelHeader openModal={openModal} />
      </div>
    );
  }

  renderAccommodationForm() {
    const { closeModal, shouldOpen, modalType, createAccommodation, fetchAccommodation } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        width="800px"
        visibility={
          shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'
        }
        title="Add Guest House"
      >
        <NewAccommodationForm
          closeModal={closeModal}
          createAccommodation={createAccommodation}
          fetchAccommodation={fetchAccommodation}
        />
      </Modal>
    );
  }

  render() {
    const { guestHouses, isLoading, accommodationError } = this.props;
    return (
      <Fragment>
        {this.renderAccommodationPanelHeader() }
        {this.renderAccommodationForm()}
        <div className="table__container">
          <WithLoadingCentreGrid
            guestHouses={guestHouses}
            isLoading={isLoading}
            error={accommodationError}
          />
        </div>
      </Fragment>
    );
  }
}

Accommodation.propTypes = {
  history: PropTypes.shape({}).isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  createAccommodation: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  guestHouses:  PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    houseName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
    bathRooms: PropTypes.number.isRequired
  })),
  isLoading: PropTypes.bool,
  accommodationError: PropTypes.string,
  fetchAccommodation: PropTypes.func.isRequired,
};

Accommodation.defaultProps = {
  guestHouses: [],
  accommodationError: '',
  isLoading: false
};

Accommodation.defaultProps = {
  modalType: '',
};


const actionCreators = {
  openModal,
  closeModal,
  fetchAccommodation,
  createAccommodation,
};

export const mapStateToProps = ({ accommodation, modal }) => ({
  ...accommodation,
  ...modal.modal,
});


export default connect(mapStateToProps, actionCreators)(Accommodation);
