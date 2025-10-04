// src/classes/LemonadeStand.ts

import Inventory from './Inventory';
import Recipe from './Recipe';
import { SuppliesBought, SuppliesPrices, WeatherType } from '../types';

export default class LemonadeStand {
    public currentCash: number;
    public currentInventory: Inventory;
    private recipe: Recipe;
    private lemonadePrice: number = 1.00; // 每杯柠檬水的售价

    constructor(initialCash: number) {
        this.currentCash = initialCash;
        this.currentInventory = new Inventory();
        this.recipe = new Recipe(1, 1, 1, 1); // 默认配方：1个柠檬，1个糖，1个冰，1个杯子 = 1杯柠檬水
    }

    // 处理购买供应品
    processPurchases(supplies: SuppliesBought, prices: SuppliesPrices): { success: boolean; cost: number } {
        const totalCost = this.calculatePurchaseCost(supplies, prices);
        
        if (this.currentCash >= totalCost) {
            this.currentCash -= totalCost;
            this.currentInventory.addSupplies(supplies);
            return { success: true, cost: totalCost };
        } else {
            return { success: false, cost: totalCost };
        }
    }

    // 计算购买成本
    private calculatePurchaseCost(supplies: SuppliesBought, prices: SuppliesPrices): number {
        return supplies.lemon * prices.lemon +
               supplies.sugar * prices.sugar +
               supplies.ice * prices.ice +
               supplies.cup * prices.cup;
    }

    // 执行销售（根据天气决定销售情况）
    executeSales(weather: WeatherType): number {
        // 根据天气调整配方
        const adjustedRecipe = this.recipe.adjustForWeather(weather);
        
        // 计算能制作多少杯柠檬水
        const maxCups = this.calculateMaxCups(adjustedRecipe);
        
        // 根据天气决定实际销售数量
        const demandMultiplier = this.getDemandMultiplier(weather);
        const actualSales = Math.floor(maxCups * demandMultiplier);
        
        // 使用供应品制作柠檬水
        const cupsMade = this.makeLemonade(actualSales, adjustedRecipe);
        
        // 计算收入
        const revenue = cupsMade * this.lemonadePrice;
        this.currentCash += revenue;
        
        return cupsMade;
    }

    // 计算能制作的最大杯数
    private calculateMaxCups(recipe: Recipe): number {
        const ingredients = recipe.getIngredients();
        
        if (ingredients.lemon === 0 || ingredients.sugar === 0 || ingredients.cup === 0) {
            return 0;
        }
        
        const maxByLemon = Math.floor(this.currentInventory.lemon / ingredients.lemon);
        const maxBySugar = Math.floor(this.currentInventory.sugar / ingredients.sugar);
        const maxByIce = Math.floor(this.currentInventory.ice / ingredients.ice);
        const maxByCup = Math.floor(this.currentInventory.cup / ingredients.cup);
        
        return Math.min(maxByLemon, maxBySugar, maxByIce, maxByCup);
    }

    // 根据天气获取需求倍数
    private getDemandMultiplier(weather: WeatherType): number {
        if (weather.includes("hot")) {
            return 1.5; // 热天需求更高
        } else if (weather.includes("cold")) {
            return 0.5; // 冷天需求更低
        } else {
            return 1.0; // 温和天气正常需求
        }
    }

    // 制作柠檬水
    private makeLemonade(cups: number, recipe: Recipe): number {
        const ingredients = recipe.getIngredients();
        const totalIngredients = {
            lemon: ingredients.lemon * cups,
            sugar: ingredients.sugar * cups,
            ice: ingredients.ice * cups,
            cup: ingredients.cup * cups
        };
        
        if (this.currentInventory.canMakeLemonade(totalIngredients)) {
            this.currentInventory.useSupplies(totalIngredients);
            return cups;
        } else {
            // 如果不能制作全部，计算能制作多少
            const maxCups = this.calculateMaxCups(recipe);
            const actualCups = Math.min(cups, maxCups);
            
            if (actualCups > 0) {
                const actualIngredients = {
                    lemon: ingredients.lemon * actualCups,
                    sugar: ingredients.sugar * actualCups,
                    ice: ingredients.ice * actualCups,
                    cup: ingredients.cup * actualCups
                };
                this.currentInventory.useSupplies(actualIngredients);
            }
            
            return actualCups;
        }
    }

    // 获取当前库存（用于显示）
    get currentInventoryDisplay(): SuppliesBought {
        return this.currentInventory.getCurrentInventory();
    }
}
