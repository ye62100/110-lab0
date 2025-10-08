// src/types.ts

const WeatherConstants = {
    COLD: "cold ❄️",
    MILD: "mild 🌤️",
    HOT: "hot 🔥",
} as const;
 

// 默认导出整个常量对象
export default WeatherConstants;

// ⚠️ 可选：如果你希望在其他文件中使用严格的联合类型，可以同时导出这个类型
export type WeatherType = typeof WeatherConstants[keyof typeof WeatherConstants];

export default interface SuppliesPrices {
    lemon: number;
    sugar: number;
    ice: number;
    cup: number;
}

export default interface SuppliesBought {
    lemon: number;
    sugar: number;
    ice: number;
    cup: number;
}