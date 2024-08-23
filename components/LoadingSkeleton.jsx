import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AspectRatioContainer from "./AspectRatioContainer";

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col relative">
      <div className="relative mb-4 h-full w-full">
        <AspectRatioContainer
          aspectRatio={3 / 4}
          className="block relative mb-4 h-full w-full"
        >
          <Skeleton className="w-full h-full"></Skeleton>
        </AspectRatioContainer>

        <div className="grid" style={{ gridTemplateColumns: "auto auto" }}>
          <Skeleton className="mt-[1px] mr-[10px] mb-2 ml-0 h4 leading-[1.2]"></Skeleton>
          <div>
            <div className="flex justify-end items-baseline flex-wrap">
              <Skeleton className="text-sm md:text-[16px]"></Skeleton>
            </div>
          </div>
          <div className="flex items-center" style={{ gridColumn: "span 2" }}>
            <Skeleton className="h3 text-sm mr-[15px] text-lightBrown block mb-[6px]"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
