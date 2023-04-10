import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  addPost,
  deletePost,
  addComment,
  deleteComment,
} from "../../redux/actions/posts";
import { getUser } from "../../redux/actions/user";
import Icon from "react-icons-kit";
import { user } from "react-icons-kit/fa/user";
import { commentO } from "react-icons-kit/fa/commentO";
import { paperPlaneO } from "react-icons-kit/fa/paperPlaneO";
import { ic_edit } from "react-icons-kit/md/ic_edit";
import { ic_delete } from "react-icons-kit/md/ic_delete";
import { Modal, Pagination } from "../../components";

function Posts({ keyword }) {
  const dispatch = useDispatch();
  const { postsList, userList } = useSelector((state) => {
    return {
      postsList: state.postsList.data,
      userList: state.userList.data,
    };
  });
  const [data, setData] = useState(postsList);
  const [objDelete, setObjDelete] = useState({});
  const [itemOffset, setItemOffset] = useState(0);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [resModal, setResModal] = useState({ title: "", message: "" });
  const defaultValues = {
    title: "",
    body: "",
    userId: "",
  };
  const [addForm, setAddForm] = useState(defaultValues);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    const newData = postsList.filter(
      (v) =>
        v.name.toLowerCase().includes(keyword.toLowerCase()) ||
        v.title.toLowerCase().includes(keyword.toLowerCase()) ||
        v.body.toLowerCase().includes(keyword.toLowerCase())
    );
    setData(
      keyword.length ? newData : newData.slice(itemOffset, itemOffset + 10)
    );
  }, [postsList, itemOffset, keyword]);

  const handlerOptionUser = useMemo(() => {
    let arr = [];
    if (userList.length)
      for (let i = 0; i < userList.length; i++)
        arr.push(
          <option value={userList[i].id} key={`option-${i}`}>
            {userList[i].name}
          </option>
        );

    return arr;
  }, [userList]);

  const handlerAddComent = (obj) => {
    const idx = userList.findIndex((v) => v.id.toString() === obj.userId);
    if (idx >= 0) {
      let user = userList[idx];
      dispatch(
        addComment({
          postId: obj.postId,
          name: user.name,
          email: user.email,
          body: obj.body,
        })
      )
        .then((res) => {
          setResModal({
            title: "Success Add Comment",
            message: "Successfully added comment",
          });
          setIsResModalOpen(true);
        })
        .catch((err) => {
          setResModal({
            title: "Error Add Comment",
            message: "Failed to add comment",
          });
          setIsResModalOpen(true);
        });
    }
  };

  const handlerListPost = useMemo(() => {
    let arr = [];
    if (data.length) {
      data.forEach((v, i) => {
        arr.push(
          <div
            key={`list-user-${i}`}
            className="flex flex-col gap-x-4 bg-white drop-shadow py-4 rounded border-2 border-neuteal-400"
          >
            <div className="border-b border-neutral-200 mb-4 pb-2">
              <div className="flex flex-col gap-y-2 w-full px-4">
                <div className="flex justify-between font-semibold gap-x-2">
                  <div className="flex gap-x-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-black overflow-hidden drop-shadow-xl bg-white">
                      <Icon icon={user} size={28} className="relative top-2" />
                    </div>
                    <div className="text-lg">{v.name}</div>
                  </div>
                  <div className="flex gap-x-2">
                    <button className="flex justify-center items-center text-center bg-blue-500 hover:bg-blue-700 text-white h-8 w-8 rounded shadow">
                      <Icon icon={ic_edit} />
                    </button>
                    <button
                      onClick={() => {
                        setModalDelete(true);
                        setObjDelete({
                          type: "post",
                          title: v.title,
                          id: v.id,
                        });
                      }}
                      className="flex justify-center items-center text-center bg-red-500 hover:bg-red-700 text-white h-8 w-8 rounded shadow"
                    >
                      <Icon icon={ic_delete} />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="font-medium capitalize">{v.title}</div>
                  <div className="flex justify-between">
                    <div className="text-base">{v.body}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-4 mb-2 px-4">
                <button
                  onClick={() => {
                    let newData = data.map((vPrev) => {
                      if (vPrev.id === v.id)
                        return {
                          ...vPrev,
                          commentIsOpen: v.commentIsOpen ? false : true,
                        };
                      return vPrev;
                    });
                    setData(newData);
                  }}
                  className="flex items-center gap-x-1 text-neutral-500 cursor-pointer"
                >
                  <Icon icon={commentO} size={16} className="-mt-1" />
                  <div>{v.comment.length}</div>
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className={`flex flex-col gap-y-2 px-4 ease-in-out duration-300 opacity-1 mb-2 ${
                  v.commentIsOpen === true
                    ? "max-h-[2000px]"
                    : "opacity-0 max-h-0"
                }`}
              >
                {v.comment.map((vComment, iComment) => (
                  <div
                    key={`comment-${iComment}`}
                    className="border px-4 py-2 rounded-lg"
                  >
                    <div className="flex justify-between">
                      <div className="font-medium">{vComment.email}</div>

                      <div className="flex gap-x-2">
                        <button className="flex justify-center items-center text-center bg-blue-500 hover:bg-blue-700 text-white h-8 w-8 rounded shadow">
                          <Icon icon={ic_edit} />
                        </button>
                        <button
                          onClick={() => {
                            setModalDelete(true);
                            setObjDelete({
                              type: "comment",
                              title: vComment.email,
                              id: vComment.id,
                            });
                          }}
                          className="flex justify-center items-center text-center bg-red-500 hover:bg-red-700 text-white h-8 w-8 rounded shadow"
                        >
                          <Icon icon={ic_delete} />
                        </button>
                      </div>
                    </div>
                    <div className="text-base">{vComment.body}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex px-4 gap-x-2">
              <div className="flex gap-x-1 w-full">
                <select
                  className="appearance-none border border-neutral-200 rounded-lg w-fit py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  // value={addForm.userId}
                  // onChange={(e) =>
                  //   setAddForm((prev) => ({ ...prev, userId: e.target.value }))
                  // }
                >
                  <option value="">Please choose a user</option>
                  {handlerOptionUser}
                </select>
                <input
                  type="text"
                  placeholder="Write a comment"
                  className="border w-full rounded-lg px-4 py-2 border-neutral-200 focus:border-neutral-400 outline-none"
                />
              </div>
              <button
                onClick={(e) => {
                  let button = e.target;
                  let userId =
                    button.parentNode.firstChild.querySelector("select").value;
                  let body =
                    button.parentNode.firstChild.querySelector("input").value;
                  handlerAddComent({ userId: userId, body, postId: v.id });
                }}
                className="flex items-center justify-center w-12 border border-neutral-200 rounded-lg"
                type="button"
              >
                <Icon
                  icon={paperPlaneO}
                  size={20}
                  className="text-neutral-500 pointer-events-none"
                />
              </button>
            </div>
          </div>
        );
      });
    }
    return arr;
  }, [data]);

  const handleSubmitAdd = () => {
    dispatch(addPost(addForm))
      .then((res) => {
        setModalAdd(false);
        setAddForm(defaultValues);
        dispatch(getPosts());
        setResModal({
          title: "Success Add Post",
          message: "Successfully added post",
        });
        setIsResModalOpen(true);
      })
      .catch((err) => {
        setModalAdd(false);
        setAddForm(defaultValues);
        setResModal({
          title: "Error Add Post",
          message: "Failed to add post",
        });
        setIsResModalOpen(true);
      });
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % postsList.length;
    setItemOffset(newOffset);
  };

  const handleConfirmDelete = () => {
    if (objDelete.type === "post") {
      dispatch(deletePost({ id: objDelete.id }))
        .then((res) => {
          setModalDelete(false);
          dispatch(getPosts());
          setResModal({
            title: "Success Delete Post",
            message: "Data deleted successfully",
          });
          setIsResModalOpen(true);
        })
        .catch((err) => {
          setModalDelete(false);
          setResModal({
            title: "Error Delete Post",
            message: "Failed to deleted post",
          });
          setIsResModalOpen(true);
        });
    } else {
      dispatch(deleteComment({ id: objDelete.id }))
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            setModalDelete(false);
            dispatch(getPosts());
            setResModal({
              title: "Success Delete Post",
              message: "Data deleted successfully",
            });
            setIsResModalOpen(true);
          } else {
            setModalDelete(false);
            setResModal({
              title: "Error Delete Post",
              message: "Failed to deleted post",
            });
            setIsResModalOpen(true);
          }
        })
        .catch((err) => {
          setModalDelete(false);
          setResModal({
            title: "Error Delete Post",
            message: "Failed to deleted post",
          });
          setIsResModalOpen(true);
        });
    }
  };

  return (
    <div>
      <div
        className={`flex items-center ${
          !keyword.length ? "justify-between" : "justify-end"
        }`}
      >
        {!keyword.length && (
          <Pagination
            data={postsList}
            handlePageClick={handlePageClick}
            itemOffset={itemOffset}
            showData={10}
          />
        )}
        <button
          onClick={() => setModalAdd(true)}
          className="py-2 px-4 mb-2 bg-black text-white rounded-lg font-medium"
        >
          Add New Post
        </button>
      </div>
      <div className="flex flex-col gap-y-4">{handlerListPost}</div>
      <Modal isOpen={modalAdd} handleClose={() => setModalAdd(false)}>
        <div className="flex flex-col w-full">
          <div className="capitalize text-xl font-bold border-b-2 border-neutral-400 pb-2 mb-4">
            <div className="mr-4">Add Post</div>
          </div>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                value={addForm.userId}
                onChange={(e) =>
                  setAddForm((prev) => ({ ...prev, userId: e.target.value }))
                }
              >
                <option>Please choose a user</option>
                {handlerOptionUser}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Title"
                value={addForm.title}
                onChange={(e) =>
                  setAddForm((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="body"
              >
                Body
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="body"
                type="text"
                placeholder="Body"
                value={addForm.body}
                onChange={(e) =>
                  setAddForm((prev) => ({ ...prev, body: e.target.value }))
                }
              ></textarea>
            </div>
            <div className="flex items-center justify-end gap-x-2">
              <button
                onClick={() => setModalAdd(false)}
                className="border-2 border-black hover:bg-black/20 font-semibold py-1 px-4 rounded"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitAdd()}
                className="bg-black hover:bg-black/80 border-2 border-black text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal isOpen={modalDelete} handleClose={() => setModalDelete(false)}>
        <div className="flex flex-col w-full">
          <div className="capitalize text-xl text-red-500 font-bold border-b-2 border-neutral-400 pb-2 mb-4">
            <div className="mr-4">Delete</div>
          </div>
          <div>Are you sure want to delete this data ?</div>
          <div className="flex justify-end gap-x-2 mt-8">
            <button
              onClick={() => setModalDelete(false)}
              className="hover:bg-black/80 hover:text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              onClick={() => handleConfirmDelete()}
              className="bg-red-600 hover:bg-red-700 border-2 border-red-600 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isResModalOpen}
        handleClose={() => setIsResModalOpen(false)}
      >
        <div className="flex flex-col w-full">
          <div className="capitalize text-xl font-bold border-b-2 border-neutral-400 pb-2 mb-4">
            <div className="mr-4">{resModal.title}</div>
          </div>
          <div>{resModal.message}</div>
        </div>
      </Modal>
    </div>
  );
}
export default Posts;
