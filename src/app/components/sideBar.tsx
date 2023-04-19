const SideBar = () => {
  return (
    <div className="fixed w-64 h-screen sidebar-purple">
      <div className="m-4 h-96">
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 w-56 text-xs font-medium text-purple-700 bg-transparent rounded-lg border border-purple-700 focus:ring-purple-500 focus:border-purple-500 block hover:border-purple-950 hover:text-purple-950"
        >
          + New Chat
        </button>
        
        <div className="flex-col">
        <button className="py-2.5 px-5 mr-2 mb-2 w-56 text-xs font-medium  bg-purple-400 hover:bg-purple-700 text-white 4 rounded">Chat Room 1</button>
        <button className="py-2.5 px-5 mr-2 mb-2 w-56 text-xs font-medium  bg-purple-400 hover:bg-purple-700 text-white 4 rounded">Chat Room 1</button>
        </div>
      </div>
      <hr className="w-56 h-0.5 mx-auto my-4 bg-purple-900 border-0 rounded md:my-4 dark:bg-gray-700" />
      <div className="ml-4 text-purple-950">Algorithm</div>
          <div className="ml-1 flex gap-10">
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                data-ripple-dark="true"
              >
                <input
                  id="html"
                  name="type"
                  type="radio"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-purple-500 text-purple-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-purple-500 opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </div>
              </label>
              <label className="mt-px cursor-pointer select-none text-purple-900">
                KMP
              </label>
            </div>
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                data-ripple-dark="true"
              >
                <input
                  id="react"
                  name="type"
                  type="radio"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-purple-500 text-purple-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-purple-500 opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </div>
              </label>
              <label className="mt-px cursor-pointer  text-purple-900">
                BM
              </label>
            </div>
          </div>
        </div>
  );
};

export default SideBar;
