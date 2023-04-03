import { RouteObject } from "react-router-dom";
import { Table } from "../pages/table";
import { Journals } from "../pages/journals";

export const routes: RouteObject[] = [
  {
    path: '404',
    element: <div>Not Found</div>
  },
  {
    path: '/',
    element: <Journals />
  },
  {
    path: '/:id',
    element: <Table />
  },
];