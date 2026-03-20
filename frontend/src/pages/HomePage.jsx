import React, { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { Plus } from "lucide-react";
import TableRow from "../components/TableRow";

const HomePage = () => {
  const { tasks, selectedTask, getTasks } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div>
      <table className="w-full justify-center">
        <tbody>
          <tr>
            <td className="w-1/2">
              <table className="w-full justify-center">
                <tbody>
                  <tr>
                    <td>
                      <div className="flex justify-center text-xl mb-5 text-primary">
                        <b>Mis Tareas</b>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="btn btn-sm btn-square">
                        <Plus className="size-4" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-full">
                      <table className="table table-zebra w-full">
                        <thead>
                          <tr>
                            <th>Titulo</th>
                            <th>Fecha limite</th>
                            <th>Estado</th>
                            <th>Accion</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.map((task) => (
                            <TableRow task={task} key={task._id} />
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className="w-1/2">
              {!selectedTask ? (
                <div className="flex text-3xl text-center">
                  Selecciona o apreta el boton más para manejar tus tareas!
                </div>
              ) : (
                <div>1</div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
