import React, {useContext, useState} from 'react';
import {IAppContext, Task} from '../../types';
import appContext from '../../context';
import {DNDMode} from '../../types';
import './TaskPanel.scss';

type TaskProps = {
    task: Task
}

const TaskPanel: React.FC<TaskProps> = ({task}) => {
    const {insertTask} = useContext<IAppContext>(appContext);
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
        event.dataTransfer.setData('Text', JSON.stringify(task));
        setDndMode(DNDMode.Dragged);
    }

    const dragEndHandler = (): void => {
        setDndMode(DNDMode.NoDrag);
    }

    // ---------- на приемнике ----------

    const dragEnterHandler = (): void => {
        setDndMode(oldMode => oldMode === DNDMode.NoDrag ? DNDMode.Dropped : oldMode);
    }

    const dragOverHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.preventDefault();
        event.stopPropagation();
    }

    const dragLeaveHandler = (): void => {
        setDndMode(oldMode => oldMode === DNDMode.Dropped ? DNDMode.NoDrag : oldMode);
    }

    const dropHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        setDndMode(DNDMode.NoDrag);

        const droppedTask: Task = JSON.parse(event.dataTransfer.getData('Text'));

        // Если исходный и целевой объект совпадают - просто выходим
        if (droppedTask.id === task.id) return;

        insertTask(droppedTask, task.cardId, task);
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