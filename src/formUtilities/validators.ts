export function valueRequiered(value: string): string | undefined {
    if (value) {
        return undefined
    } else {
        return `Необходимо заполнить поле`
    }
}