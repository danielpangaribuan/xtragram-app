import React from "react";
import ReactPaginate from "react-paginate";
import { ic_keyboard_arrow_left } from "react-icons-kit/md/ic_keyboard_arrow_left";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";
import Icon from "react-icons-kit";

function Component({ data, itemOffset, handlePageClick, showData }) {
  const pageCount = Math.ceil(data.length / showData);

  // Invoke when user click to request another page.

  return (
    <div className="flex justify-end">
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<Icon icon={ic_keyboard_arrow_right} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={<Icon icon={ic_keyboard_arrow_left} />}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Component;
