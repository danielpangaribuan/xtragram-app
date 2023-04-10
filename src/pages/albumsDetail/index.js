import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbumDetail } from "../../redux/actions/albums";
import { Pagination } from "../../components";
import { useParams } from "react-router-dom";
import { Modal } from "../../components";

function AlbumsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [data, setData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const { albumDetail } = useSelector((state) => {
    return {
      albumDetail: state.albumDetail.data,
    };
  });

  useEffect(() => {
    dispatch(getAlbumDetail({ id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    setData(albumDetail.slice(itemOffset, itemOffset + 12));
  }, [albumDetail, itemOffset]);

  const handlerListPost = useMemo(() => {
    let arr = [];
    if (data.length) {
      data.forEach((v, i) => {
        arr.push(
          <div
            key={`list-user-${i}`}
            onClick={() => {
              setModal(true);
              setModalContent(v);
            }}
            className="flex flex-col gap-x-4 bg-white drop-shadow-lg rounded-lg overflow-hidden cursor-pointer ease-in-out duration-300 hover:scale-105"
          >
            <div className="w-full">
              <img src={v.url} className="w-full" alt={v.url} />
            </div>
          </div>
        );
      });
    }
    return arr;
  }, [data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 12) % albumDetail.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="flex justify-start mb-4">
        <Pagination
          data={albumDetail}
          itemOffset={itemOffset}
          handlePageClick={handlePageClick}
          showData={12}
        />
      </div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-2 mb-4">
        {handlerListPost}
      </div>
      <Modal isOpen={modal} handleClose={() => setModal(false)}>
        <div className="flex flex-col w-full">
          <div className="capitalize text-xl font-bold border-b-2 border-neutral-400 pb-4 mb-4">
            <div className="mr-4">{modalContent.title}</div>
          </div>

          <div className="grid grid-cols-2 gap-x-2">
            <div className="px-4 py-2 border border-neutral-400 rounded-lg">
              <div className="font-medium text-center">Thumbnail</div>
              <div>
                <img src={modalContent.thumbnailUrl} alt="thumbnail" />
              </div>
            </div>
            <div className="px-4 py-2 border border-neutral-400 rounded-lg">
              <div className="font-medium text-center">Photo</div>
              <div>
                <img src={modalContent.url} alt="url" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default AlbumsDetail;
