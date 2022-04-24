import { backend } from "../config/backend"

export const imageURLhelper = (data) => {
    return `${backend}/images/${data}`
}