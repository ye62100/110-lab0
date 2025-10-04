// src/types.ts

// 供应品购买数量类型
export interface SuppliesBought {
    lemon: number;
    sugar: number;
    ice: number;
    cup: number;
}

// 供应品价格类型
export interface SuppliesPrices {
    lemon: number;
    sugar: number;
    ice: number;
    cup: number;
}

// 天气类型
export type WeatherType = "cold ❄️" | "mild 🌤️" | "hot 🔥";

// 天气常量
const WeatherConstants = {
    COLD: "cold ❄️" as WeatherType,
    MILD: "mild 🌤️" as WeatherType,
    HOT: "hot 🔥" as WeatherType
};

export default WeatherConstants;
export { WeatherType };
