import { useMemo } from "react";
export const DOTS = "...";
const MIN_PAGES = 5;
const MIN_LEFT_PAGES = 3;
const MIN_RIGHT_PAGES = 2;

const LogicPagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  // properties from props object
  const totalPageCount = useMemo(
    () => Math.ceil(totalCount / pageSize),
    [totalCount, pageSize]
  );

  const paginationRange = useMemo(() => {
    //  array containing all the page numbers
    if (totalPageCount <= MIN_PAGES) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    //  range of page numbers to show
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > MIN_LEFT_PAGES;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - MIN_RIGHT_PAGES;

    // range based on the page numbers to show
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const rightItemCount = MIN_RIGHT_PAGES + siblingCount * 2;
      const leftRange = range(1, MIN_LEFT_PAGES + siblingCount * 2);

      return [...leftRange, DOTS, ...range(totalPageCount - rightItemCount + 1, totalPageCount)];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const leftItemCount = MIN_LEFT_PAGES + siblingCount * 2;
      const rightRange = range(totalPageCount - MIN_RIGHT_PAGES - siblingCount * 2 + 1, totalPageCount);

      return [...range(1, leftItemCount), DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, totalPageCount];
    }

    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, idx) => idx + start);

export default LogicPagination;
