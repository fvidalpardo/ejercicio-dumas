import { X } from "lucide-react";
import React, { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";

const TableRow = ({ task }) => {
  const [checked, setChecked] = useState(task.state);
  const { deleteTask } = useTaskStore();

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.dateLimit ? task.dateLimit : "Sin fecha limite"}</td>
      <td>
        <input
          type="checkbox"
          className="checkbox"
          id="estado"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </td>
      <td>
        <button
          className="btn btn-sm btn-error"
          onClick={() => deleteTask(task._id)}
        >
          <X className="size-3" />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
