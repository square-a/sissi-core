import React from 'react';
import PropTypes from 'prop-types';
import {
  DragDropContext,
  Droppable,
} from 'react-beautiful-dnd';

const NavBar = ({
  children,
  level,
  type,
  onDragEnd,
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId={type} type={type}>
      {provided => (
        <nav
          ref={provided.innerRef}
          className={`navbar navbar--level-${level}`}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </nav>
      )}
    </Droppable>
  </DragDropContext>
);

NavBar.propTypes = {
  children: PropTypes.array,
  level: PropTypes.string,
  type: PropTypes.string,
  onDragEnd: PropTypes.func,
};

export default NavBar;
