import React from "react";

const useHorizontalScrollEvent = (
  callback: (e: React.WheelEvent<HTMLDivElement>) => void
) => {
  const positionRef = React.useRef(0);
  return (e: React.WheelEvent<HTMLDivElement>) => {
    const x = e.currentTarget?.scrollLeft;
    if (x !== positionRef.current) {
      positionRef.current = x;
      callback(e);
    }
  };
};

export default useHorizontalScrollEvent;
