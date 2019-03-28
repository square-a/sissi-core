import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import { Draggable } from 'react-beautiful-dnd';

import * as selectors from '%/selectors';

const mapStateToProps = (state, ownProps) => ({
  ...selectors.getPropsForNavItem(ownProps.id, ownProps.type)(state),
});

const NavItem = ({
  isActive,
  backLinkArray,
  id,
  index,
  linkArray,
  title,
  type,
}) => (
  <Draggable draggableId={id} index={index} type={type}>
    {provided => (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <NavLink
            activeClassName='navbar__item--selected'
            className='navbar__item'
            to={isActive ? backLinkArray : linkArray}
          >
            {title}
          </NavLink>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);

NavItem.propTypes = {
  backLinkArray: PropTypes.array,
  id: PropTypes.string,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  linkArray: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default connect(mapStateToProps)(NavItem);
