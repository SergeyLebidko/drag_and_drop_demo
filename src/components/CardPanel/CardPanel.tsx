import React, {useContext, useState} from 'react';
import TaskPanel from '../TaskPanel/TaskPanel';
import {Card, DNDMode, IAppContext} from '../../types';
import appContext from '../../context';
import {isTask} from '../../utils';
import './CardPanel.scss';

type CardProps = {
    card: Card
}

const CardPanel: React.FC<CardProps> = ({card}) => {
    const context: IAppContext = useContext(appContext);
    const {tasks, setDnd, clearDnd, dndObject, removeCard, createTask, insertCard, insertTask} = context;
    const [dndMode, setDndMode] = useState<DNDMode>(DNDMode.NoDrag);

    const {id, title} = card;

    const getClasses = (): string => {
        const classes = ['card_panel'];
        if (dndMode === DNDMode.NoDrag) classes.push('card_panel_normal');
        if (dndMode === DNDMode.Dragged) classes.push('card_panel_dragged');
        if (dndMode === DNDMode.Dropped) classes.push('card_panel_dropped');
        return classes.join(' ');
    };

    // ---------- на источнике ----------

    const dragStartHandler = (): void => {
        setDndMode(DNDMode.Dragged);
        setDnd(card);
    }

    const dragEndHandler = (): void => {
        setDndMode(DNDMode.NoDrag);
        clearDnd();
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
        setDndMode(DNDMode.NoDrag);

        if (dndObject === null) return;
        if (isTask(dndObject)) {
            insertTask(dndObject, card.id);
        } else if (dndObject.id !== card.id) {
            insertCard(dndObject, card);
        }
        clearDnd();
    }

    return (
        <li
            className={getClasses()}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDragEnter={dragEnterHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
        >
            <div className="card_panel__title">
                <span>{title}</span>
                <button className="card_panel__remove_card" onClick={() => removeCard(id)}>&#10006;</button>
            </div>
            <ul>
                {tasks
                    .filter(task => task.cardId === id)
                    .sort((a, b) => a.order - b.order)
                    .map(task => <TaskPanel key={task.id} task={task}/>)
                }
            </ul>
            <button className="card_panel__add_task" onClick={() => createTask(id)}>+</button>
        </li>
    );
}

export default CardPanel;