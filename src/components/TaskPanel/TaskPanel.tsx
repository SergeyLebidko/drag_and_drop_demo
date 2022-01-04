import React from 'react';
import {Task} from '../../types';
import './TaskPanel.scss';

type TaskProps = {
    task: Task
}

const TaskPanel: React.FC<TaskProps> = ({task}) => {
    const {id, title} = task;

    // ---------- на источнике ----------

    const dragStartHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.dataTransfer.setData('Text', '' + id);

        // const id = (event.target as HTMLLIElement).dataset.id;
        // console.log('dragStart', id);
    }

    const dragEndHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        // event.preventDefault();
        // event.stopPropagation();
        // const id = (event.target as HTMLLIElement).dataset.id;
        // console.log('dragEnd', id);
    }

    // ---------- на приемнике ----------

    const dragEnterHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        // event.preventDefault();
        // event.stopPropagation();
        // const id = (event.target as HTMLLIElement).dataset.id;
        // console.log('dragEnter', id);
    }

    const dragOverHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        // const id = (event.target as HTMLLIElement).dataset.id;
        // console.log('dragOver', id);
    }

    const dragLeaveHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        // event.preventDefault();
        // event.stopPropagation();
        // const id = (event.target as HTMLLIElement).dataset.id;
        // console.log('dragLeave', id);
    }

    const dropHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        const id = (event.target as HTMLLIElement).dataset.id;
        console.log('drop', event.dataTransfer.getData('Text'), id);
    }

    return (
        <li
            className="task_panel"
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