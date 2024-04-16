import React from 'react';

const Pagination = ({ handleNext, handlePrev, page, pageCount, setPage }) => {
  // Function to handle clicking on the ellipsis button to navigate to a specific page
  const handleEllipsisClick = (pageNumber) => {
    setPage(pageNumber);
  };

  // Number of pages to display before and after the current page
  const surroundingPages = 2;

  return (
    pageCount > 0 ? (
      <nav aria-label="Page navigation" className="d-flex justify-content-end">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => handlePrev()}>{'<<'}</button>
          </li>
          {/* Render ellipsis if there are more pages before the current page */}
          {page - surroundingPages > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => handleEllipsisClick(1)}>...</button>
            </li>
          )}
          {/* Render pages around the current page */}
          {Array.from({ length: pageCount }, (_, index) => {
            if (index + 1 >= page - surroundingPages && index + 1 <= page + surroundingPages) {
              return (
                <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setPage(index + 1)}>{index + 1}</button>
                </li>
              );
            }
            return null;
          })}
          {/* Render ellipsis if there are more pages after the current page */}
          {page + surroundingPages < pageCount && (
            <li className="page-item">
              <button className="page-link" onClick={() => handleEllipsisClick(pageCount)}>...</button>
            </li>
          )}
          <li className="page-item">
            <button className="page-link" onClick={() => handleNext()}>{'>>'}</button>
          </li>
        </ul>
      </nav>
    ) : null
  );
}

export default Pagination;
