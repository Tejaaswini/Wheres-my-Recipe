import React from 'react';

export const Loading = () => {
    /* Helper component to indicate loading state */
    return (
        <div>
            <button className="btn btn-info btn-sm">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i> ...
                <span class="sr-only">Loading...</span>
            </button>
        </div>
    );
};

