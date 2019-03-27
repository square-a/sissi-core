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
  <Draggable draggableId={id} type={type} index={index}>
    {provided => (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <NavLink
            to={isActive ? backLinkArray : linkArray}
            className='navbar__item'
            activeClassName='navbar__item--selected'
          >{title}</NavLink>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);

NavItem.propTypes = {
  isActive: PropTypes.bool,
  backLinkArray: PropTypes.array,
  id: PropTypes.string,
  index: PropTypes.number,
  linkArray: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default connect(mapStateToProps)(NavItem);
