import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LogicPagination, { DOTS } from "./LogicPagination";

import './Pagination.css';
// Using the LogicPagination hook to get the range of pages to display
const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = LogicPagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
 // If there are less than 3 page numbers to display, don't render the pagination component
  if (paginationRange.length < 3) {
    return null;
  }

  const onNext = () => {
    // Functions for handling page navigation for increasing
    onPageChange(currentPage + 1);
  };
  // Functions for handling page navigation for decreasing
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className={classnames('pagination-container', {
        [className]: className,
      })}
    >
      {/* Left navigation arrow for navigation */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        //  render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={`dots-${index}`} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={`page-${pageNumber}`}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow for navi*/}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Pagination;
