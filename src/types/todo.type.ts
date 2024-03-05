export interface ITodo {
    id: string,
    title: string,
    isCompleted: boolean,
    owner: string,

    createdAt: string,
    updatedAt: string,
}

export type ITodoDto = Pick<ITodo, "title">

export type ITodoFull = ITodo & {
    loading?: boolean,
    deleting?: boolean,
    new?: boolean,
}
