export type Card = {
    id: number,
    title: string,
    order: number
}

export type Task = {
    id: number,
    cardId: number,
    title: string,
    order: number
}

export interface IData {
    cards: Array<Card>,
    tasks: Array<Task>,
}

export interface IAppContext extends IData {
    insertCard: (card: Card, before?: Card) => void
    insertTask: (task: Task, cardId: number, before?: Task) => void
}

export enum DNDMode {
    NoDrag,    // Нормальное сосотояние элемента
    Dragged,   // Элемент перетаскивается пользователем
    Dropped    // Элемент является целью перетаскивания
}