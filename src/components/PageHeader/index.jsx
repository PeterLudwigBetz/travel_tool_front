import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './_header.scss';

class PageHeader extends PureComponent{
  render(){
    const {title, actionBtn, toggleNewRequestModal} = this.props;

    return(
      <div className="PageHeader">
        <div>
          <span className="title">
            {title}
          </span>
        </div>
        {
          actionBtn ? (
            <div>
              <button onClick={toggleNewRequestModal} type="button" className="action-btn btn-new-request">
                {actionBtn}
              </button>
            </div>
          ) :
            ''
        }
      </div>
    );
  }
}

export default PageHeader;

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  actionBtn: PropTypes.string,
  toggleNewRequestModal: PropTypes.func
};

PageHeader.defaultProps = {
  actionBtn: '',
  toggleNewRequestModal: ()=>{}
};
