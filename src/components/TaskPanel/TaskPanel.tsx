import React, {useContext, useState} from 'react';
import {RemoveTaskButton} from '../../styled/buttons';
import {TaskContainer} from '../../styled/panels';
import {IAppContext, Task} from '../../types';
import {DNDMode} from '../../types';
import appContext from '../../context';
import {isTask} from '../../utils';

type TaskProps = {
    task: Task
}

const TaskPanel: React.FC<TaskProps> = ({task}) => {
    const {insertTask, setDnd, clearDnd, dndObject, removeTask} = useContext<IAppContext>(appContext);
    const [dndMode, setDndMode] = useState<DNDMode>(DNDMode.NoDrag);

    const {id, title} = task;

    // ---------- на источнике ----------

    const dragStartHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.stopPropagation();
        setDndMode(DNDMode.Dragged);
        setDnd(task);
    }

    const dragEndHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.stopPropagation();
        setDndMode(DNDMode.NoDrag);
        clearDnd();
    }

    // ---------- на приемнике ----------

    const dragEnterHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.stopPropagation();
        if (dndObject !== null && isTask(dndObject)) {
            setDndMode(oldMode => oldMode === DNDMode.NoDrag ? DNDMode.Dropped : oldMode);
        }
    }

    const dragOverHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.preventDefault();
        event.stopPropagation();
    }

    const dragLeaveHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.stopPropagation();
        setDndMode(oldMode => oldMode === DNDMode.Dropped ? DNDMode.NoDrag : oldMode);
    }

    const dropHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        setDndMode(DNDMode.NoDrag);

        if (dndObject === null) return;
        if (isTask(dndObject) && dndObject.id !== task.id) {
            insertTask(dndObject, task.cardId, task);
        }
        clearDnd();
    }

    return (
        <TaskContainer
            draggable
            dndMode={dndMode}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
        >
            <span>{title}</span>
            <RemoveTaskButton onClick={() => removeTask(id)}>&#10006;</RemoveTaskButton>
        </TaskContainer>
    );
}

export default TaskPanel;