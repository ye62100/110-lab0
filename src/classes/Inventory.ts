// src/classes/Inventory.ts

import { SuppliesBought } from '../types';

export default class Inventory {
    public lemon: number = 0;
    public sugar: number = 0;
    public ice: number = 0;
    public cup: number = 0;

    constructor(initialSupplies?: Partial<SuppliesBought>) {
        if (initialSupplies) {
            this.lemon = initialSupplies.lemon || 0;
            this.sugar = initialSupplies.sugar || 0;
            this.ice = initialSupplies.ice || 0;
            this.cup = initialSupplies.cup || 0;
        }
    }

    // 添加供应品到库存
    addSupplies(supplies: SuppliesBought): void {
        this.lemon += supplies.lemon;
        this.sugar += supplies.sugar;
        this.ice += supplies.ice;
        this.cup += supplies.cup;
    }

    // 检查是否有足够的供应品制作柠檬水
    canMakeLemonade(recipe: { lemon: number; sugar: number; ice: number; cup: number }): boolean {
        return this.lemon >= recipe.lemon &&
               this.sugar >= recipe.sugar &&
               this.ice >= recipe.ice &&
               this.cup >= recipe.cup;
    }

    // 使用供应品制作柠檬水
    useSupplies(recipe: { lemon: number; sugar: number; ice: number; cup: number }): boolean {
        if (this.canMakeLemonade(recipe)) {
            this.lemon -= recipe.lemon;
            this.sugar -= recipe.sugar;
            this.ice -= recipe.ice;
            this.cup -= recipe.cup;
            return true;
        }
        return false;
    }

    // 获取当前库存信息
    getCurrentInventory(): SuppliesBought {
        return {
            lemon: this.lemon,
            sugar: this.sugar,
            ice: this.ice,
            cup: this.cup
        };
    }

    // 计算总库存价值（用于调试）
    getTotalValue(prices: { lemon: number; sugar: number; ice: number; cup: number }): number {
        return this.lemon * prices.lemon +
               this.sugar * prices.sugar +
               this.ice * prices.ice +
               this.cup * prices.cup;
    }
}
