"use client";
import React, { useEffect, useState } from "react";
import MarketScreen from "./MarketScreen";
import Heat from "./Heat";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Market = () => {
  const { data } = useSWR("/api/get-user", fetcher);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="md:pt-6 py-4">
      <dialog
        id="loading-modal"
        className={`modal bg-primary ${loading ? "opacity-100" : ""}`}
      >
        <div className="flex items-center justify-center gap-3">
          <span className="loading loading-dots loading-lg bg-white"></span>
        </div>
      </dialog>
      <div className="mycontainer">
        <div className="px-2 md:px-4">
          <div>
            <div className="h-[580px]">
              <MarketScreen />
            </div>
            <div className="hidden md:block">
              <Heat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
