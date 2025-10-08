import  Inventory  from './Inventory';
import Recipe  from './Recipe';

import  SuppliesBought from '../types';
import  SuppliesPrices from '../types';
import WeatherConstants, { WeatherType } from '../types';

export default class LemonadeStand {
    private cashBalance: number;
    private inventory: Inventory;
    private recipe: Recipe;

    constructor(initialCash: number) {
        this.cashBalance = initialCash;
        this.inventory = new Inventory(); // 聚合 Inventory 实例
        this.recipe = new Recipe();       // 聚合 Recipe 实例
    }

    public get currentCash(): number {
        return this.cashBalance;
    }

    public get currentInventory() {
        return this.inventory.status;
    }
    
    /**
     * 处理玩家购买物料的流程。
     * @returns boolean 购买是否成功 (例如: 现金不足购买失败)
     */
    public processPurchases(supplies: SuppliesBought, prices: SuppliesPrices): { success: boolean, cost: number } {
        const cost = 
            supplies.lemon * prices.lemon +
            supplies.sugar * prices.sugar +
            supplies.ice * prices.ice +
            supplies.cup * prices.cup;

        if (cost > this.cashBalance) {
            return { success: false, cost };
        }

        this.cashBalance -= cost;
        this.inventory.add(supplies);
        
        return { success: true, cost };
    }

    /**
     * 计算并执行当日的销售。
     * @param weather 当日的天气。
     * @returns 实际售出的杯数。
     */
   // LemonadeStand.ts (假设你已经导入了 WeatherConstants 和 WeatherType)


// 修正了参数类型和 switch 语句的判断对象
public executeSales(weather: WeatherType): number { 
    // 1. 根据天气估算潜在需求
    let potentialSales: number;

    // 修正：switch 语句应该基于传入的 'weather' 参数进行判断
    switch (weather) { 
        // 修正：case 后面使用 WeatherConstants 对象的 *值* (e.g., "hot 🔥")
        case WeatherConstants.HOT: 
            potentialSales = 80; // 热天需求高
            break;
        case WeatherConstants.MILD: 
            potentialSales = 40;
            break;
        case WeatherConstants.COLD: 
            potentialSales = 15; // 冷天需求低
            break;
        default:
            // 确保处理了所有可能的情况
            potentialSales = 0; 
            break;
    }

    // 2. 检查库存能制作的最大杯数
    const maxCupsFromInventory = this.inventory.getMaxCups(this.recipe);

    // 3. 实际销售量取决于潜在需求和库存限制中的最小值
    const actualSales = Math.min(potentialSales, maxCupsFromInventory);

    // 4. 执行交易和库存消耗
    const revenue = actualSales * this.recipe.pricePerCup;
    this.cashBalance += revenue;
    this.inventory.consume(actualSales, this.recipe);

    return actualSales;
}
}