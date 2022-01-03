import React from 'react';
import {Task} from '../../types';
import './TaskPanel.scss';

type TaskProps = {
    task: Task
}

const TaskPanel: React.FC<TaskProps> = ({task}) => {

    const {title} = task;
    return (
        <li className="task_panel" draggable>
            {title}
        </li>
    );
}

export default TaskPanel;