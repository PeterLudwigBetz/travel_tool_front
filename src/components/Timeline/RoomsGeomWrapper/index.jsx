import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import RoomGeomWrapper from './RoomGeomWrapper';
import './RoomsGeomWrapper.scss';

class RoomsGeomWrapper extends PureComponent {
  render() {
    const {rooms, timelineStartDate, tripDayWidth, timelineViewType} = this.props;
    const roomGeoms = rooms.map(room => (
      <RoomGeomWrapper
        status={room.faulty}
        key={room.id}
        beds={room.beds}
        timelineStartDate={timelineStartDate}
        tripDayWidth={tripDayWidth}
        timelineViewType={timelineViewType}
      />
    ));
    return (
      <div className="rooms-geometry-wrapper">
        {roomGeoms}
      </div>
    );
  }
}

RoomsGeomWrapper.propTypes = {
  rooms: PropTypes.array.isRequired,
  timelineStartDate: PropTypes.object.isRequired,
  tripDayWidth: PropTypes.number.isRequired,
  timelineViewType: PropTypes.string
};

RoomsGeomWrapper.defaultProps = {
  timelineViewType: 'month'
};

export default RoomsGeomWrapper;
