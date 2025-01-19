import React from 'react';

const ProjectSkeleton = () => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-10 w-36 bg-gray-200 rounded-md animate-pulse" />
            </div>

            <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                        {/* Image skeleton */}
                        <div className="relative h-48 bg-gray-200 animate-pulse">
                            <div className="absolute top-2 right-2 flex gap-2">
                                <div className="h-8 w-8 bg-gray-300 rounded-full" />
                                <div className="h-8 w-8 bg-gray-300 rounded-full" />
                            </div>
                        </div>

                        {/* Content skeleton */}
                        <div className="p-4 space-y-4">
                            <div>
                                <div className="flex items-center justify-between">
                                    {/* Title skeleton */}
                                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                                    {/* Icons skeleton */}
                                    <div className="flex gap-2">
                                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                </div>
                                {/* Description skeleton */}
                                <div className="mt-2 space-y-2">
                                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Technologies skeleton */}
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4].map((tech) => (
                                    <div
                                        key={tech}
                                        className="h-6 w-16 bg-gray-200 rounded-md animate-pulse"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectSkeleton;