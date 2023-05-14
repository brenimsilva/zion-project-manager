import React from "react";

export default function Message({ message, error }: any) {
  if (error) {
    return (
      <div className="fadeIn">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          Error
        </div>
        <h5
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {error}
        </h5>
      </div>
    );
  } else if (message) {
    return (
      <div className="fadeIn">
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Success</p>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
