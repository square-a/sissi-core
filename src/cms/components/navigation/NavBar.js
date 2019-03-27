import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const NavBar = ({
  children,
  level,
  type,
  onDragEnd,
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId={type} type={type}>
      {(provided) => (
        <nav
          className={`navbar navbar--level-${level}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
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
