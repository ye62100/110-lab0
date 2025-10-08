export default class Recipe {
    // 制作一杯柠檬水所需的原材料比例
    public readonly lemonsPerCup: number = 2; // 2个柠檬/杯
    public readonly sugarPerCup: number = 1;  // 1勺糖/杯
    public readonly icePerCup: number = 3;    // 3块冰/杯

    // 假设售价也是配方的一部分，或者作为 LemonadeStand 的属性
    public readonly pricePerCup: number = 1.00; // 每杯售价 $1.00
}