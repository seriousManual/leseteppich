interface Matrix {
    width: number
    height: number
}

export function getMatrixByList(listLength: number): Matrix {
    let width = Math.floor(Math.sqrt(listLength))
    let height = Math.ceil(Math.sqrt(listLength))

    if (width * height > listLength) {
        height = height - 1
    }

    return { width, height }
}

export function shuffle(list: any[]) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        
        [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
}