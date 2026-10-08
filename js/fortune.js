// ==============================
// 今日の占い
// ==============================

const fortunes = [
    {
        name: "大吉",
        probability: 10,
        text: "今日は最高の運勢！\n思い切って行動してみよう！"
    },
    {
        name: "中吉",
        probability: 20,
        text: "いいことが起こりそう！\nいつもより少し積極的に。"
    },
    {
        name: "吉",
        probability: 30,
        text: "まずまずの運勢！\n小さなラッキーを見つけてみよう。"
    },
    {
        name: "小吉",
        probability: 25,
        text: "ゆっくり過ごすと吉。\n焦らずマイペースにいこう。"
    },
    {
        name: "凶",
        probability: 5,
        text: "今日はちょっと慎重に。\nでも、きっと大丈夫！"
    }
];


// ==============================
// 占いをランダムに選ぶ
// ==============================

function getRandomFortune() {

    const totalProbability = fortunes.reduce(
        (sum, fortune) => sum + fortune.probability,
        0
    );

    let random = Math.random() * totalProbability;

    for (const fortune of fortunes) {

        random -= fortune.probability;

        if (random < 0) {
            return fortune;
        }
    }

    return fortunes[fortunes.length - 1];
}