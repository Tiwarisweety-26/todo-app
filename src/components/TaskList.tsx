import React, { useEffect, useState } from "react";
import "./TaskList.scss";
import { IInputField } from "../interface/toDo";

const TaskList: React.FC = () => {
  const [inputFields, setInputFields] = useState<IInputField[]>([]);

  useEffect(() => {
    const storedTaskList = JSON.parse(
      localStorage.getItem("taskList") as string
    );

    if (storedTaskList) {
      setInputFields(storedTaskList);
    } else {
      setInputFields([{ value: "" }]);
    }
  }, []);

  const handleAddField = () => {
    if (inputFields[inputFields.length - 1].value.trim() !== "")
      setInputFields([...inputFields, { value: "" }]);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = [...inputFields];
    value[index].value = event.target.value;
    setInputFields(value);
    localStorage.setItem("taskList", JSON.stringify(value));
    handleAddField();
  };

  const handleRemoveTask = (index: number) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    localStorage.setItem("taskList", JSON.stringify(values));
  };

  const handleCompleteTask = (index:number,isChecked:boolean) => {
    const values =[...inputFields];

    if(isChecked){
      let CompletedTask = []
      const newCompletedTask = JSON.parse(localStorage.getItem('completedTaskList')as string);
      if(newCompletedTask){
        CompletedTask = newCompletedTask;

      }
      CompletedTask.push(values[index])
      localStorage.setItem('CompletedTask',JSON.stringify(CompletedTask));
      values.splice(index,1)
      localStorage.setItem('taskList',JSON.stringify(values));
      setInputFields(values)
    }

 }

 
 

  return (
    <>
      <div className="task_list_section">
        {inputFields.map((item, index) => (
          <div className="task_list_item" key={index}>
            {item.value ? (
              <input
                type="checkbox"
                title="check"
                className="task_checkbox"
                onChange={(event) => {
                  handleCompleteTask(index, event.target.checked);
                }}
              />
            ) : (
              <span>+</span>
            )}

            <input
              type="text"
              title="input"
              className="task_input"
              value={item.value}
              onChange={(event) => {
                handleChange(index, event);
              }}
            />

            {item.value && (
              <button
                type="button"
                title="submit"
                onClick={() => {
                  handleRemoveTask(index);
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;