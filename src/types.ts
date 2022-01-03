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

export type InitialData = {
    cards: Array<Card>,
    tasks: Array<Task>
}