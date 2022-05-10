import React, { useMemo } from "react";
import { PaginatedListDto } from "../dtos/PaginatedList.dto";
import { Pagination } from "react-bootstrap";

interface Props {
  pagination: PaginatedListDto<any>;
  onPageChange(page: number): void;
}

const TOTAL_DISPLAYED_ITEMS = 3;
const BOUNDS = Math.trunc(TOTAL_DISPLAYED_ITEMS / 2);

const AppPagination: React.FC<Props> = ({ pagination, onPageChange }) => {
  const { page, pageSize, itemCount } = pagination;
  const totalPages = useMemo(() => {
    if (pageSize === 0) return 0;

    return Math.ceil(itemCount / pageSize);
  }, [pageSize, itemCount]);

  const pageNumbers = useMemo(() => {
    const value = Array.from(new Array(totalPages), (_, index) => index);

    if (page < TOTAL_DISPLAYED_ITEMS - 1)
      return value.slice(0, TOTAL_DISPLAYED_ITEMS);

    if (totalPages - page < TOTAL_DISPLAYED_ITEMS)
      return value.slice(-1 * TOTAL_DISPLAYED_ITEMS);

    return value.slice(page - BOUNDS, page + BOUNDS + 1);
  }, [totalPages, page]);

  const getPaginationItems = () => {
    return pageNumbers.map((pageNumber) => (
      <Pagination.Item
        onClick={() => onPageChange(pageNumber)}
        active={page === pageNumber}
        key={`page-${pageNumber}`}
      >
        {pageNumber + 1}
      </Pagination.Item>
    ));
  };

  return (
    <Pagination>
      <Pagination.Prev
        disabled={pagination.page === 0}
        onClick={() => onPageChange(pagination.page - 1)}
      />
      {getPaginationItems()}
      <Pagination.Next
        disabled={pagination.page + 1 === totalPages}
        onClick={() => onPageChange(pagination.page + 1)}
      />
    </Pagination>
  );
};

export default AppPagination;
