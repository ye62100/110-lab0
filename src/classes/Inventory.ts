import  Recipe  from "./Recipe";
import  SuppliesBought  from "../types"; // 假设类型定义在同一目录

export default class Inventory {
    private lemons: number = 0;
    private sugar: number = 0;
    private ice: number = 0;
    private cups: number = 0;

    // 获取当前库存状态的方法 (用于报告)
    public get status() {
        return {
            lemons: this.lemons,
            sugar: this.sugar,
            ice: this.ice,
            cups: this.cups,
        };
    }

    /**
     * 将购买的物料添加到库存中。
     * @param supplies 玩家购买的物料数量。
     */
    public add(supplies: SuppliesBought): void {
        this.lemons += supplies.lemon;
        this.sugar += supplies.sugar;
        this.ice += supplies.ice;
        this.cups += supplies.cup;
    }

    /**
     * 计算当前库存最多能制作多少杯柠檬水。
     * @param recipe 当前配方。
     * @returns 最大可制作杯数。
     */
    public getMaxCups(recipe: Recipe): number {
        // 杯子是独立的限制
        let maxByCups = this.cups; 
        
        // 原材料的限制
        const maxByLemon = Math.floor(this.lemons / recipe.lemonsPerCup);
        const maxBySugar = Math.floor(this.sugar / recipe.sugarPerCup);
        const maxByIce = Math.floor(this.ice / recipe.icePerCup);

        // 最终可制作杯数取决于最少的限制因素
        return Math.min(maxByCups, maxByLemon, maxBySugar, maxByIce);
    }

    /**
     * 根据销售数量消耗库存。
     * @param count 实际售出的杯数。
     * @param recipe 当前配方。
     */
    public consume(count: number, recipe: Recipe): void {
        this.lemons -= count * recipe.lemonsPerCup;
        this.sugar -= count * recipe.sugarPerCup;
        this.ice -= count * recipe.icePerCup;
        this.cups -= count;
        
        // 确保数量不为负（虽然逻辑上不应该发生）
        this.lemons = Math.max(0, this.lemons);
        this.sugar = Math.max(0, this.sugar);
        this.ice = Math.max(0, this.ice);
        this.cups = Math.max(0, this.cups);
    }
}