import {Card, IData, Task} from './types';
import {CARD_MIN_COUNT, CARD_MAX_COUNT, TASK_MIN_COUNT, TASK_MAX_COUNT} from './settings';

export function createInitialData(): IData {
    const cards: Array<Card> = [];
    const tasks: Array<Task> = [];

    const cardsCount = CARD_MIN_COUNT + Math.floor(Math.random() * (CARD_MAX_COUNT - CARD_MIN_COUNT + 1));
    for (let index = 0; index < cardsCount; index++) {
        cards.push({
            id: index,
            order: index,
            title: `Карточка ${index + 1}`
        });
    }

    let taskIndex = 0;
    cards.forEach(card => {
        const taskCount = TASK_MIN_COUNT + Math.floor(Math.random() * (TASK_MAX_COUNT - TASK_MIN_COUNT + 1));
        for (let index = 0; index < taskCount; index++) {
            tasks.push({
                id: taskIndex,
                cardId: card.id,
                order: taskIndex,
                title: `Задача ${taskIndex + 1}`
            });
            taskIndex++;
        }
    });

    return {cards, tasks};
}