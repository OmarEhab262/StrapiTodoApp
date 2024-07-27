interface IProps {
  page: number;
  pageCount: number;
  onClickPrev: () => void;
  onClickNext: () => void;
  total: number;
  isLoading: boolean;
}

const Paginator = ({
  page,
  pageCount,
  total,
  onClickPrev,
  onClickNext,
  isLoading,
}: IProps) => {
  // Static data
  //   const page = 1;
  //   const pageCount = 10;
  //   const total = 100;
  //   const isLoading = false;

  //   const onClickPrev = () => {
  //     console.log("Previous button clicked");
  //   };

  //   const onClickNext = () => {
  //     console.log("Next button clicked");
  //   };

  return (
    <div className="flex justify-center items-center flex-col gap-3 ">
      <div className="flex">
        <button
          type="button"
          disabled={page === 1 || isLoading}
          className={`bg-gray-200   rounded-l-md  flex items-center justify-center px-4 h-10 me-3 text-base font-medium rounded-lg ${
            page === 1
              ? "text-black disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:text-black disabled:hover:text-black cursor-not-allowed"
              : " hover:bg-violet-600 hover:text-white cursor-pointer"
          } `}
          // disabled={page === 1 || isLoading}
          onClick={onClickPrev}
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </button>
        <button
          type="button"
          disabled={page === pageCount || isLoading}
          className={`bg-gray-200   rounded-l-md  flex items-center justify-center px-4 h-10 me-3 text-base font-medium rounded-lg ${
            page === pageCount
              ? "text-black disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:text-black disabled:hover:text-black cursor-not-allowed"
              : " hover:bg-violet-600 hover:text-white cursor-pointer"
          } `}
          onClick={onClickNext}
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
      <div>
        <p className="text-sm text-gray-300 mx-3">
          Page{" "}
          <span className="mx-1 font-semibold text-gray-100 text-md-1">
            {page}
          </span>{" "}
          to
          <span className="mx-1 font-semibold text-gray-100">
            {pageCount}
          </span>{" "}
          of
          <span className="mx-1 font-semibold text-gray-100">{total}</span>{" "}
          Records
        </p>
      </div>
    </div>
  );
};

export default Paginator;
