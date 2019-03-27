import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '%/actions';
import * as C from '%/components';
import * as k from '%/constants/keywords';
import * as selectors from '%/selectors';
import * as tr from '%/translations';

const mapStateToProps = state => {
  const pageId = selectors.getActivePageId(state);
  return {
    pageProps: selectors.getPropsForPageNav(state),
    sectionProps: selectors.getPropsForSectionNav(pageId)(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onAddPage: () => dispatch(actions.addPage()),
  onAddSection: pageId => dispatch(actions.addSection(pageId)),
  onDragEnd: ({ type, source, destination }, a, pageId) => {
    if (destination) {
      dispatch(actions.dragItem(type, source.index, destination.index, pageId));
    }
},
});

const Navigation = ({
  pageProps,
  sectionProps,
  onAddPage,
  onAddSection,
  onDragEnd,
}) => [
  pageProps && <C.NavBar
    key='pageNav'
    level='1'
    type={k.PAGES}
    onDragEnd={onDragEnd}
  >
    {pageProps.itemIds.map((id, index) => (
      <C.NavItem
        key={id}
        id={id}
        index={index}
        type={k.PAGES}
      />
    ))}
    {pageProps.canAdd && (
      <C.Button onClick={onAddPage} classes='navbar__button'>
        <Translate id={tr.ADD} />
      </C.Button>
    )}
  </C.NavBar>
  ,
  sectionProps && <C.NavBar
    key='sectionNav'
    level={pageProps ? '2' : '1'}
    type={k.SECTIONS}
    onDragEnd={(...props) => onDragEnd(...props, sectionProps.pageId)}
  >
    {sectionProps.itemIds.map((id, index) => (
      <C.NavItem
        key={id}
        id={id}
        index={index}
        type={k.SECTIONS}
      />
    ))}
    {sectionProps.canAdd && (
      <C.Button onClick={() => onAddSection(sectionProps.pageId)} classes='navbar__button'>
        <Translate id={tr.ADD} />
      </C.Button>
    )}
  </C.NavBar>
];

Navigation.propTypes = {
  pageProps: PropTypes.object,
  sectionProps: PropTypes.object,
  onAddPage: PropTypes.func,
  onAddSection: PropTypes.func,
  onDragEnd: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
