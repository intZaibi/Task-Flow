import { useState } from "react";

type InputDialogPropsType = {
  isOpen: boolean,
  closeDialog: ()=> void
}

export default function InputDialog({isOpen, closeDialog}: InputDialogPropsType) {

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60"
        onClick={closeDialog}
      />
      
      {/* Dialog Content */}
      <div className="relative bg-black border border-gray-900 rounded-lg shadow-lg w-full max-w-md mx-4 p-6 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight mb-2 text-slate-50">
            Add To-Do
          </h2>
          <p className="text-sm text-slate-400">
            This will be added in the "To Do" section.
          </p>
        </div>

        {/* Content */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 grid gap-2">
            <label htmlFor="link" className="sr-only">
              Link
            </label>
            <input
              id="link"
              type="text"
              className="flex h-10 w-full rounded-md border border-gray-800 bg-slate-950 text-slate-50 px-3 py-2 text-sm ring-offset-slate-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-start">
          <button
            type="button"
            onClick={closeDialog}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer h-10 px-4 py-2"
          >
            Close
          </button>
        </div>

        {/* Close button (X) in top right */}
        <button
          onClick={closeDialog}
          className="cursor-pointer absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  ) : <></> ;
}