import React from 'react';

type SkeletonProps = {
  isLoading: boolean;
};

const CustomSkeleton: React.FC<SkeletonProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
        {/* Image Skeleton */}
        <div
          className="w-full lg:w-1/2 aspect-square bg-gray-200 rounded-lg animate-pulse"
        />

        {/* Product Details Skeleton */}
        <div className="w-full lg:w-1/2 lg:max-w-[573px]">
          <div className="bg-gray-200 h-6 lg:h-8 rounded-lg animate-pulse mb-4 w-3/4" />
          <div className="bg-gray-200 h-4 lg:h-6 rounded-lg animate-pulse mb-2 w-1/2" />
          <div className="bg-gray-200 h-20 lg:h-24 rounded-lg animate-pulse mb-4" />
          
          {/* Size options skeleton */}
          <div className="flex space-x-2 mb-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 w-7 h-7 lg:w-8 lg:h-8 rounded-full animate-pulse"
              />
            ))}
          </div>

          {/* Action buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="bg-gray-200 h-8 w-8 rounded-full animate-pulse" />
              <div className="bg-gray-200 h-8 w-8 animate-pulse" />
              <div className="bg-gray-200 h-8 w-8 rounded-full animate-pulse" />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="bg-gray-200 h-10 w-full sm:w-32 rounded-lg animate-pulse" />
              <div className="bg-gray-200 h-10 w-full sm:w-32 rounded-lg animate-pulse" />
              <div className="bg-gray-200 h-10 w-10 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="bg-gray-200 h-4 w-16 rounded-full animate-pulse" />
            <div className="bg-gray-200 h-4 w-20 rounded-full animate-pulse" />
            <div className="bg-gray-200 h-4 w-14 rounded-full animate-pulse" />
          </div>

          {/* Share icons skeleton */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-gray-200 h-4 w-32 rounded-lg animate-pulse" />
            <div className="bg-gray-200 h-6 w-6 rounded-full animate-pulse" />
            <div className="bg-gray-200 h-6 w-6 rounded-full animate-pulse" />
            <div className="bg-gray-200 h-6 w-6 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="mt-8 lg:mt-16 mb-8 lg:mb-20">
        <div className="bg-gray-200 h-4 rounded-lg animate-pulse mb-2 w-1/3" />
        <div className="bg-gray-200 h-4 rounded-lg animate-pulse mb-2" />
        <div className="bg-gray-200 h-4 rounded-lg animate-pulse mb-2" />
        <div className="bg-gray-200 h-4 rounded-lg animate-pulse mb-2" />
      </div>
    </div>
  );
};

export default CustomSkeleton;