import { useEffect, useMemo, useState } from "react";
import { getUser } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-icons-kit";
import { user } from "react-icons-kit/fa/user";

function Users({ keyword }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { userList } = useSelector((state) => {
    return {
      userList: state.userList.data,
    };
  });

  useEffect(() => {
    let newData = userList.filter(
      (v) => v.name.includes(keyword) || v.username.includes(keyword)
    );
    setData(newData);
  }, [keyword, userList]);

  const handlerListUser = useMemo(() => {
    let arr = [];
    if (data.length) {
      data.map((v, i) => {
        arr.push(
          <div
            key={`list-user-${i}`}
            className="flex gap-x-4 border px-2 py-2 rounded-lg"
          >
            <div className="rounded-full w-10 h-10 flex items-end justify-center bg-black overflow-hidden">
              <Icon
                icon={user}
                className="text-white top-1 relative"
                size={36}
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="font-medium">{v.name}</div>
              <div className="flex justify-between">
                <div className="italic text-xs">{v.username}</div>
              </div>
            </div>
          </div>
        );
      });
    }
    return arr;
  }, [data]);

  return (
    <div className="flex flex-col gap-x-4 bg-white drop-shadow py-4 rounded px-4">
      <div className="font-medium text-xl mb-4">List All User</div>
      <div className="flex flex-col gap-y-4">{handlerListUser}</div>
    </div>
  );
}
export default Users;
