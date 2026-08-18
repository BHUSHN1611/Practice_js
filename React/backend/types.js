import zod from "zod"

const createTodoSchema = zod.object({
    title : zod.string(),
    description : zod.string()
})

const completedTodoSchema = zod.object({
    _id:zod.string()
})

export {
    completedTodoSchema,
    createTodoSchema
}