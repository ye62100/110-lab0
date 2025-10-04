// src/main.ts

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import  LemonadeStand  from './classes/LemonadeStand';
import  SuppliesBought from './types';
import  SuppliesPrices from './types';
import WeatherConstants, { WeatherType } from './types';

// ===================================
// I/O 工具函数 (Console Input)
// ===================================

/**
 * 获取并验证用户输入的非负整数。
 */
async function getValidatedInput(query: string): Promise<number> {
    const rl = readline.createInterface({ input, output });
    
    let answer = -1;
    while (answer < 0 || isNaN(answer)) {
        const inputString = await rl.question(query);
        answer = parseInt(inputString.trim());
        if (answer < 0 || isNaN(answer)) {
            console.log("Invalid input. Please enter a non-negative integer.");
        }
    }
    
    rl.close();
    return answer;
}

// ===================================
// 游戏流程函数 (Game Logic Helpers)
// ===================================

// 假设的随机生成每日数据函数
/**
 * 随机生成每日天气和物料价格。
 * @returns 包含 WeatherType 和 SuppliesPrices 的对象。
 */
function generateRandomDayData(): { weather: WeatherType, prices: SuppliesPrices } {
    // 1. 获取 WeatherConstants 对象中的所有值 (即 "cold ❄️", "mild 🌤️", "hot 🔥")
    //    Object.values() 将返回一个包含所有这些字符串的数组。
    const weatherOptions = Object.values(WeatherConstants);
    
    // 2. 随机选择一个天气值
    const randomIndex = Math.floor(Math.random() * weatherOptions.length);
    const weather = weatherOptions[randomIndex] as WeatherType; 
    
    // 3. 价格生成逻辑保持不变
    const prices: SuppliesPrices = {
        lemon: 0.25 + Math.random() * 0.1, // 0.25 到 0.35
        sugar: 0.10 + Math.random() * 0.05,
        ice: 0.05 + Math.random() * 0.02,
        cup: 0.15 + Math.random() * 0.05,
    };
    
    // 4. 返回包含正确类型数据的对象
    return { weather, prices };
}

// ===================================
// 游戏主循环 (Main Game Loop)
// ===================================

async function main() {
    const stand = new LemonadeStand(20.00); // 初始现金 $20.00
    let day = 1;

    console.log("--- begin ---");
    
    while (stand.currentCash > 0 && day <= 10) { // 玩10天或直到破产
        console.log(`\n--- the ${day} days ---`);
        
        const dayData = generateRandomDayData();
        console.log(`weather report: ${dayData.weather}`);
        console.log(`cash now: $${stand.currentCash.toFixed(2)} | inventory now:`, stand.currentInventory);
        console.log("today price:");
        console.log(`  lemon: $${dayData.prices.lemon.toFixed(2)} / ea`);
        console.log(`  sugar: $${dayData.prices.sugar.toFixed(2)} / ea`);
        console.log(`  ice: $${dayData.prices.ice.toFixed(2)} / ea`);
        console.log(`  cup: $${dayData.prices.cup.toFixed(2)} / ea`);

        // 玩家购买流程
        let purchaseSuccess = false;
        while (!purchaseSuccess) {
            console.log("\n--- buy things ---");
            const bought: SuppliesBought = {
                lemon: await getValidatedInput("buy lemon(ea): "),
                sugar: await getValidatedInput("buy sugar(ea): "),
                ice: await getValidatedInput("buy ice(ea): "),
                cup: await getValidatedInput("buy cup(ea): "),
            };

            const result = stand.processPurchases(bought, dayData.prices);
            if (result.success) {
                purchaseSuccess = true;
                console.log(`✅ success:cost $${result.cost.toFixed(2)}.`);
            } else {
                console.log(`❌ failure:nees $${result.cost.toFixed(2)},money isnt enough.`);
            }
        }
        
        // 销售和报告
        const cupsSold = stand.executeSales(dayData.weather);
        
        console.log(`\n--- the ${day} day report ---`);
        console.log(`daily sale: ${cupsSold} cup`);
        console.log(`current inventory:`, stand.currentInventory);
        console.log(`current cash: $${stand.currentCash.toFixed(2)}`);

        day++;
    }
    
    if (stand.currentCash <= 0) {
        console.log("\n--- game over ---");
        console.log("you are broke! 💸");
    } else {
        console.log("\n--- success---");
        console.log(`congraulation! you have $${stand.currentCash.toFixed(2)} finish the 10 days! 🎉`);
    }
}

main();