import { ArrowDown } from "lucide-react";
import TodoSkeleton from "../components/ui/TodoSkeleton";
import useAuthenticationQuery from "../hooks/useAuthenticationQuery";
import { useState } from "react";
import Paginator from "../components/ui/Paginator";
import Button from "../components/ui/Button";
import { faker } from "@faker-js/faker";
import axiosInstance from "../config/axios.config";
const Todos = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [newData, setNewData] = useState(1);
  const [sortBy, setSortBy] = useState<string>("DESC");
  const [openDescriptionId, setOpenDescriptionId] = useState<number | null>(
    null
  );

  const { isLoading, isError, data, isFetched } = useAuthenticationQuery({
    queryKey: [`todos-page-${page},${pageSize},${sortBy},${newData}`],
    url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
    config: { headers: { Authorization: `Bearer ${userData?.jwt}` } },
  });
  // Handlers
  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };
  if (isLoading) {
    return <TodoSkeleton />;
  }

  if (isError || !data) {
    return <div>Error fetching todos</div>;
  }

  const handlerDescriptionModel = (todoId: number) => {
    setOpenDescriptionId(openDescriptionId === todoId ? null : todoId);
  };
  const onChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const onChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value);
  };
  const onGenerateTodos = async () => {
    for (let i = 0; i < 100; i++) {
      try {
        await axiosInstance.post(
          `/todos`,
          {
            data: {
              title: faker.word.words(5),
              description: faker.lorem.paragraph(5),
              user: [userData?.user?.id],
            },
          },
          {
            headers: {
              Authorization: `Bearer ${userData?.jwt}`,
            },
          }
        );
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setNewData((prev) => prev + 1);
        console.log(newData);
      }
    }
  };
  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="btn" size={"sm"} onClick={onGenerateTodos}>
            Generate todos
          </Button>
        </div>
        <div className="flex items-center justify-between space-x-2 text-md">
          <select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={sortBy}
            onChange={onChangeSortBy}
          >
            <option disabled>Sort by</option>
            <option value="ASC">Oldest</option>
            <option value="DESC">Latest</option>
          </select>
          <select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={pageSize}
            onChange={onChangePageSize}
          >
            <option disabled>Page Size</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      {data?.data?.length > 0 ? (
        data.data.map(
          (
            {
              id,
              attributes: { title, description },
            }: {
              id: number;
              attributes: { title: string; description: string };
            },
            inx: number
          ) => (
            <div
              key={id}
              className="bg-gray-100 p-3 rounded-md m-5"
              onClick={() => handlerDescriptionModel(id)}
            >
              <div className="flex items-center justify-between w-full">
                <ArrowDown
                  size={30}
                  strokeWidth={4}
                  className={`mr-2 cursor-pointer duration-300 ${
                    openDescriptionId === id ? "rotate-180" : ""
                  }`}
                />
                <p className="cursor-pointer font-semibold mr-2">{inx + 1}-</p>
                <p className="w-full cursor-pointer font-semibold">{title}</p>
              </div>
              <div
                className={` ${openDescriptionId === id ? "block" : "hidden"}`}
              >
                <p className="w-full duration-300 bg-gray-300 p-3 rounded-md my-3">
                  {description ? description : "No description"}
                </p>
              </div>
            </div>
          )
        )
      ) : (
        <div className="flex my-10 items-center justify-center bg-cyan-800 hover:bg-gray-100 duration-300 p-3 rounded-md text-[25px]">
          <p className="w-full font-semibold text-center">No todos</p>
        </div>
      )}
      <div className="my-16">
        <Paginator
          page={page}
          pageCount={data.meta.pagination.pageCount}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
          total={data.meta.pagination.total}
          isLoading={isLoading || isFetched}
        />
      </div>
    </section>
  );
};

export default Todos;
