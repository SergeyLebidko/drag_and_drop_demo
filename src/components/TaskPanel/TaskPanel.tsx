import React, {useContext, useState} from 'react';
import {IAppContext, Task} from '../../types';
import appContext from '../../context';
import {DNDMode} from '../../types';
import {isTask} from '../../utils';
import './TaskPanel.scss';

type TaskProps = {
    task: Task
}

const TaskPanel: React.FC<TaskProps> = ({task}) => {
    const {insertTask, setDnd, clearDnd, dndObject} = useContext<IAppContext>(appContext);
    const [dndMode, setDndMode] = useState<DNDMode>(DNDMode.NoDrag);

    const {id, title} = task;

    const getClasses = (): string => {
        const classes = ['task_panel'];
        if (dndMode === DNDMode.NoDrag) classes.push('task_panel_normal');
        if (dndMode === DNDMode.Dragged) classes.push('task_panel_dragged');
        if (dndMode === DNDMode.Dropped) classes.push('task_panel_dropped');
        return classes.join(' ');
    };

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
        <li
            className={getClasses()}
            data-id={id}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
        >
            {title}
        </li>
    );
}

export default TaskPanel;