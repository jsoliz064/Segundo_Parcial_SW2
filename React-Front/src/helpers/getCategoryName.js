

export const getCategoryName = (category_id) => {
    switch (category_id) {
        case 1:
            return 'Cientificos';
        case 2:
            return 'Monografias';
        case 3:
            return 'Recreativos';
        case 4:
            return 'Ficcion';
        case 5:
            return 'Comedia';
        default:
            return 'Sin Categoria';
    }
}
