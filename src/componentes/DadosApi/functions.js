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

export const verificarDesgaste = (desgaste) => {
    let numDesgaste = 0;
    switch (desgaste) {
        case "SFUI_InvTooltip_Wear_Amount_0":
            numDesgaste = 1;
            break;

        case "SFUI_InvTooltip_Wear_Amount_1":
            numDesgaste = 2;
            break;

        case "SFUI_InvTooltip_Wear_Amount_2":
            numDesgaste = 3;
            break;

        case "SFUI_InvTooltip_Wear_Amount_3":
            numDesgaste = 4;
            break;

        case "SFUI_InvTooltip_Wear_Amount_4":
            numDesgaste = 5;
            break;

        case "SFUI_InvTooltip_Wear_Amount_5":
            numDesgaste = 6;
            break;

        case "SFUI_InvTooltip_Wear_Amount_6":
            numDesgaste = 7;
            break;

        case "SFUI_InvTooltip_Wear_Amount_7":
            numDesgaste = 8;
            break;
        
        case "SFUI_InvTooltip_Wear_Amount_8":
            numDesgaste = 9;
            break;
        
        case "SFUI_InvTooltip_Wear_Amount_9":
            numDesgaste = 10;
            break;

        case "SFUI_InvTooltip_Wear_Amount_10":
            numDesgaste = 11;
            break;

        case "SFUI_InvTooltip_Wear_Amount_11":
            numDesgaste = 12;
            break;

        case "SFUI_InvTooltip_Wear_Amount_12":
            numDesgaste = 13;
            break;

        case "SFUI_InvTooltip_Wear_Amount_13":
            numDesgaste = 14;
            break;

        case "SFUI_InvTooltip_Wear_Amount_14":
            numDesgaste = 15;
            break;
    
        default:
            numDesgaste = 0;
            break;
    }
    return numDesgaste;
}

export const ordenarPorMenorRaridade = (array) => {
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

export const ordenarPorMaiorRaridade = (array) => {
    const filtroOrdenacao = array.sort((a, b) => {
        if (verificarRaridade(a.rarity.id) > verificarRaridade(b.rarity.id)) {
            return -1;
        } else if (verificarRaridade(a.rarity.id) < verificarRaridade(b.rarity.id)) {
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

export const ordenarPrecos = (array) => {
    const ordenacaoPrecos = array ? array.sort((a, b) => {
        if (a.price < b.price) {
            return -1;
        } else if (a.price > b.price) {
            return 1;
        }
        return 0;
    }) : [];
    return ordenacaoPrecos;
}

export const ordenarDesgaste = (array) => {
    const ordenacaoDesgaste = array.sort((a, b) => {
        if (verificarDesgaste(a.id) > verificarDesgaste(b.id)) {
            return 1;
        } else if (verificarDesgaste(a.id) < verificarDesgaste(b.id)) {
            return -1;
        }
        return 0;
    });
    return ordenacaoDesgaste;
}