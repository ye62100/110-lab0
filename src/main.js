// src/main.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { LemonadeStand } from './classes/LemonadeStand';
import { Weather } from './types';
// ===================================
// I/O 工具函数 (Console Input)
// ===================================
/**
 * 获取并验证用户输入的非负整数。
 */
function getValidatedInput(query) {
    return __awaiter(this, void 0, void 0, function () {
        var rl, answer, inputString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rl = readline.createInterface({ input: input, output: output });
                    answer = -1;
                    _a.label = 1;
                case 1:
                    if (!(answer < 0 || isNaN(answer))) return [3 /*break*/, 3];
                    return [4 /*yield*/, rl.question(query)];
                case 2:
                    inputString = _a.sent();
                    answer = parseInt(inputString.trim());
                    if (answer < 0 || isNaN(answer)) {
                        console.log("Invalid input. Please enter a non-negative integer.");
                    }
                    return [3 /*break*/, 1];
                case 3:
                    rl.close();
                    return [2 /*return*/, answer];
            }
        });
    });
}
// ===================================
// 游戏流程函数 (Game Logic Helpers)
// ===================================
// 假设的随机生成每日数据函数
function generateRandomDayData() {
    // 简化的实现...
    var weatherOptions = [Weather.HOT, Weather.MILD, Weather.COLD];
    var weather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
    var prices = {
        lemon: 0.25 + Math.random() * 0.1, // 0.25 到 0.35
        sugar: 0.10 + Math.random() * 0.05,
        ice: 0.05 + Math.random() * 0.02,
        cup: 0.15 + Math.random() * 0.05,
    };
    return { weather: weather, prices: prices };
}
// ===================================
// 游戏主循环 (Main Game Loop)
// ===================================
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var stand, day, dayData, purchaseSuccess, bought, result, cupsSold;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    stand = new LemonadeStand(20.00);
                    day = 1;
                    console.log("--- begin ---");
                    _b.label = 1;
                case 1:
                    if (!(stand.currentCash > 0 && day <= 10)) return [3 /*break*/, 8];
                    console.log("\n--- the ".concat(day, " days ---"));
                    dayData = generateRandomDayData();
                    console.log("weather report: ".concat(dayData.weather));
                    console.log("cash now: $".concat(stand.currentCash.toFixed(2), " | inventory now:"), stand.currentInventory);
                    console.log("today price:");
                    console.log("  lemon: $".concat(dayData.prices.lemon.toFixed(2), " / ea"));
                    console.log("  sugar: $".concat(dayData.prices.sugar.toFixed(2), " / ea"));
                    console.log("  ice: $".concat(dayData.prices.ice.toFixed(2), " / ea"));
                    console.log("  cup: $".concat(dayData.prices.cup.toFixed(2), " / ea"));
                    purchaseSuccess = false;
                    _b.label = 2;
                case 2:
                    if (!!purchaseSuccess) return [3 /*break*/, 7];
                    console.log("\n--- buy things ---");
                    _a = {};
                    return [4 /*yield*/, getValidatedInput("buy lemon(ea): ")];
                case 3:
                    _a.lemon = _b.sent();
                    return [4 /*yield*/, getValidatedInput("buy sugar(ea): ")];
                case 4:
                    _a.sugar = _b.sent();
                    return [4 /*yield*/, getValidatedInput("buy ice(ea): ")];
                case 5:
                    _a.ice = _b.sent();
                    return [4 /*yield*/, getValidatedInput("buy cup(ea): ")];
                case 6:
                    bought = (_a.cup = _b.sent(),
                        _a);
                    result = stand.processPurchases(bought, dayData.prices);
                    if (result.success) {
                        purchaseSuccess = true;
                        console.log("\u2705 success:cost $".concat(result.cost.toFixed(2), "."));
                    }
                    else {
                        console.log("\u274C failure:nees $".concat(result.cost.toFixed(2), ",money isnt enough."));
                    }
                    return [3 /*break*/, 2];
                case 7:
                    cupsSold = stand.executeSales(dayData.weather);
                    console.log("\n--- the ".concat(day, " day report ---"));
                    console.log("daily sale: ".concat(cupsSold, " cup"));
                    console.log("current inventory:", stand.currentInventory);
                    console.log("current cash: $".concat(stand.currentCash.toFixed(2)));
                    day++;
                    return [3 /*break*/, 1];
                case 8:
                    if (stand.currentCash <= 0) {
                        console.log("\n--- game over ---");
                        console.log("you are broke! 💸");
                    }
                    else {
                        console.log("\n--- success---");
                        console.log("congraulation! you have $".concat(stand.currentCash.toFixed(2), " finish the 10 days! \uD83C\uDF89"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main();
