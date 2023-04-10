import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../redux/actions/albums";
import { Pagination } from "../../components";
import { Link } from "react-router-dom";

function Albums({ keyword }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const { albumsList } = useSelector((state) => {
    return {
      albumsList: state.albumsList.data,
    };
  });

  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch]);

  useEffect(() => {
    const newData = albumsList.filter(
      (v) =>
        v.name.toLowerCase().includes(keyword.toLowerCase()) ||
        v.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setData(
      keyword.length ? newData : newData.slice(itemOffset, itemOffset + 10)
    );
  }, [albumsList, itemOffset, keyword]);

  const handlerListAlbum = useMemo(() => {
    let arr = [];
    if (data.length) {
      data.forEach((v, i) => {
        arr.push(
          <Link
            to={`/albums/${v.id}`}
            key={`list-user-${i}`}
            className="flex flex-col gap-x-4 bg-gradient-to-b from-black/70 to-black drop-shadow-lg py-4 rounded-lg cursor-pointer ease-in-out duration-300 hover:scale-105"
          >
            <div className="flex flex-col justify-between gap-y-2 w-full px-4">
              <div className="flex flex-col items-center justify-center h-40">
                <div className="text-white/80">ALBUMS</div>
                <div className="font-medium uppercase text-white text-center text-xl">
                  {v.title}
                </div>
              </div>
              <div className="flex justify-end font-semibold">
                <div className="text-base text-neutral-200">{v.name}</div>
              </div>
            </div>
          </Link>
        );
      });
    }
    return arr;
  }, [data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % albumsList.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="flex justify-start mb-2">
        {!keyword.length && (
          <Pagination
            data={albumsList}
            itemOffset={itemOffset}
            handlePageClick={handlePageClick}
            showData={10}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-4 bg-b">
        {handlerListAlbum}
      </div>
    </div>
  );
}
export default Albums;
