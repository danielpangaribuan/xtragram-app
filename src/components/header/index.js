import React from "react";
import Icon from "react-icons-kit";
import { ic_search } from "react-icons-kit/md/ic_search";
import { Link } from "react-router-dom";

function Component({ keyword, setKeyword }) {
  return (
    <div className="bg-black py-3">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 items-center space-x-4">
          <Link to="/" className="flex flex-col cursor-pointer">
            <div className="text-white font-medium text-xl">XTAGRAM</div>
            <div className="text-neutral-400 text-xs">
              By Daniel Parlindungan
            </div>
          </Link>
          <div className="col-span-2">
            <div className="flex items-center bg-white/20 py-2 px-4 text-neutral-400 rounded gap-x-2">
              <Icon icon={ic_search} size={20} />
              <input
                placeholder="Search"
                className="w-full bg-transparent border-none outline-none"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Component;
