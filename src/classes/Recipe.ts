// src/classes/Recipe.ts

export default class Recipe {
    public lemon: number;
    public sugar: number;
    public ice: number;
    public cup: number;

    constructor(lemon: number = 1, sugar: number = 1, ice: number = 1, cup: number = 1) {
        this.lemon = lemon;
        this.sugar = sugar;
        this.ice = ice;
        this.cup = cup;
    }

    // 获取制作一杯柠檬水所需的供应品
    getIngredients(): { lemon: number; sugar: number; ice: number; cup: number } {
        return {
            lemon: this.lemon,
            sugar: this.sugar,
            ice: this.ice,
            cup: this.cup
        };
    }

    // 根据天气调整配方（热天需要更多冰，冷天需要更少冰）
    adjustForWeather(weather: string): Recipe {
        const adjustedRecipe = new Recipe(this.lemon, this.sugar, this.ice, this.cup);
        
        if (weather.includes("hot")) {
            adjustedRecipe.ice = Math.max(1, this.ice + 1); // 热天需要更多冰
        } else if (weather.includes("cold")) {
            adjustedRecipe.ice = Math.max(0, this.ice - 1); // 冷天需要更少冰
        }
        
        return adjustedRecipe;
    }

    // 计算制作一杯柠檬水的成本
    calculateCost(prices: { lemon: number; sugar: number; ice: number; cup: number }): number {
        return this.lemon * prices.lemon +
               this.sugar * prices.sugar +
               this.ice * prices.ice +
               this.cup * prices.cup;
    }
}
