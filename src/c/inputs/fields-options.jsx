

export function getFiledOptions(props) {
    const key = props.f?.split('[')[0]
    return options[key] ?? { min: 5, max: 15 }
}

export function _getFiledOptions(fieldkey) {
    const key = fieldkey?.split('[')[0]
    return options[key] ?? { min: 5, max: 15 }
}

const options = {
    // Section 1
    's1_1': { min: 5, max: 25 },
    's1_2': { min: 5, max: 50 },
    's1_3': { min: 5, max: 50 },
    's1_4': { min: 5, max: 200 },
    's1_6': { min: 0, max: 15 },
    'vk': { min: 5, max: 100 },
    'fb': { min: 5, max: 100 },
    'inst': { min: 5, max: 100 },
    'whatsapp': { min: 5, max: 30 },
    'viber': { min: 5, max: 30 },
    'telegram': { min: 5, max: 30 },
    // Section 2
    's2_1': { min: 5, max: 90 },
    's2_2': { min: 15, max: 500 },
    's2_3': { min: 5, max: 25 },
    's2_4': { min: 15, max: 100 },
    's2_5': { min: 1, max: 100 },
    's2_6': { min: 5, max: 25 },
    's2_7': { min: 15, max: 100 },
    's2_8': { min: 1, max: 100 },
    's2_9': { min: 5, max: 25 },
    's2_10': { min: 15, max: 100 },
    's2_11': { min: 1, max: 100 },
    's2_12': { min: 5, max: 25 },
    's2_13': { min: 15, max: 100 },
    's2_14': { min: 1, max: 100 },
    // Section 3
    's3_1': { min: 5, max: 200 },
    's3_2': { min: 15, max: 1200 },
    's3_3': { min: 1, max: 100 },
    's3_4': { min: 5, max: 35 },
    's3_5': { min: 15, max: 250 },
    's3_6': { min: 1, max: 100 },
    // Section 2, Advantages
    's2_1-1': { min: 5, max: 25 },
    's2_1-2': { min: 15, max: 100 },
    's2_1-3': { min: 1, max: 100 },
    's2_2-1': { min: 5, max: 25 },
    's2_2-2': { min: 15, max: 100 },
    's2_2-3': { min: 1, max: 100 },
    's2_3-1': { min: 5, max: 25 },
    's2_3-2': { min: 15, max: 100 },
    's2_3-3': { min: 1, max: 100 },
    // Catalog titles
    'catalog_0': { min: 5, max: 25 },
    'catalog_1': { min: 5, max: 25 },
    'catalog_2': { min: 5, max: 25 },
}