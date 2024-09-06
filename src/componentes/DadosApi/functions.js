export const filtrarPorNome = (array, nome) => {
    const filtroNome = array.filter((item) => item.name.toUpperCase().indexOf(nome.toUpperCase()) !== -1);
    return filtroNome;
}

export const filtrarPorCategoria = (array, idCategoria) => {
    const filtroCategoria = array.filter((item) => idCategoria === "" || item.category.id === idCategoria);
    return filtroCategoria;
}

export const verificarRaridade = (raridade) => {
    let numRaridade = 0;
    switch (raridade) {
        case "rarity_common_weapon":
            numRaridade = 1;
            break;

        case "rarity_uncommon_weapon":
            numRaridade = 2;
            break;

        case "rarity_rare_weapon":
            numRaridade = 3;
            break;

        case "rarity_mythical_weapon":
            numRaridade = 4;
            break;

        case "rarity_legendary_weapon":
            numRaridade = 5;
            break;

        case "rarity_ancient_weapon":
        case "rarity_ancient":
            numRaridade = 6;
            break;

        case "rarity_contraband_weapon":
            numRaridade = 7;
            break;
    
        default:
            numRaridade = 0;
            break;
    }
    return numRaridade;
}

export const ordenarPorRaridade = (array) => {
    const filtroOrdenacao = array.sort((a, b) => {
        if (verificarRaridade(a.rarity.id) < verificarRaridade(b.rarity.id)) {
            return -1;
        } else if (verificarRaridade(a.rarity.id) > verificarRaridade(b.rarity.id)) {
            return 1;
        }
        return 0;
    });
    return filtroOrdenacao;
}

export const ordenarPorNome = (array) => {
    const filtroOrdenacao = array.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
    return filtroOrdenacao;
}