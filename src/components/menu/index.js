import { Link, useLocation } from "react-router-dom";
import { home } from "react-icons-kit/fa/home";
import { newspaperO } from "react-icons-kit/fa/newspaperO";
import { user } from "react-icons-kit/fa/user";
import { pictureO } from "react-icons-kit/fa/pictureO";
import Icon from "react-icons-kit";
import { useEffect } from "react";

function Component({ resetKeyword }) {
  const location = useLocation();
  const menu = [
    {
      id: "home",
      label: "Home",
      url: "/",
      icon: home,
    },
    {
      id: "posts",
      label: "Posts",
      url: "/posts",
      icon: newspaperO,
    },
    {
      id: "albums",
      label: "Albums",
      url: "/albums",
      icon: pictureO,
    },
    {
      id: "users",
      label: "Users",
      url: "/users",
      icon: user,
    },
  ];

  useEffect(() => {
    resetKeyword("");
  }, [location, resetKeyword]);

  return (
    <div className="bg-white drop-shadow px-4 pt-8 pb-2 rounded h-fit">
      <div className="uppercase font-medium text-xl mb-3">Menu</div>
      <div className="flex flex-col">
        {menu.map((v, i) => (
          <Link
            to={v.url}
            key={v.id}
            className={`flex px-2 gap-x-3 h-8 items-center cursor-pointer rounded ${
              location.pathname === v.url
                ? "bg-black text-white"
                : "text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            <Icon icon={v.icon} size={18} />
            <div>{v.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Component;
