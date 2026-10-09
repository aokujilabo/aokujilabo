// ==============================
// 今日の占い
// ==============================

const fortunes = [
    {
        name: "大吉",
        probability: 10,
        text: "今日は最高の運勢！\n思い切っていろいろやっちゃお！"
    },
    {
        name: "吉",
        probability: 20,
        text: "実は結構いい運勢！\n帰り道に野良猫とあいさつできるかも！"
    },
    {
        name: "中吉",
        probability: 30,
        text: "中吉と吉の差には諸説あるよね\n吉の方が上派です\n何事もチャレンジ！"
    },
    {
        name: "小吉",
        probability: 25,
        text: "占いなんていいのを信じればいいんだ。\n焦らずゆっくり行こうぜ"
    },
    {
        name: "けも吉",
        probability: 15,
        text: "これはけも吉！\n君の手の甲にふっさふさの毛皮が生えてくるかも！\nけものと話してみてね"
    },
    {
        name: "レレ吉",
        probability: 15,
        text: "レレ吉のレレはウクレレのレレ！\nさぁ君もウクレレを買って\nレッツウクレレライフ！"
    },
    {
        name: "ゲーム吉",
        probability: 15,
        text: "ゲーム吉はゲームをするんじゃない！\n今たくさん積んでクリアできてない\nそのゲームをやるんだ！\nさぁ今すぐ！"
    },
    {
        name: "凶",
        probability: 5,
        text: "逆に考えてこれが一番レアだということ\n意外といいことあるかもね"
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

/* ==============================
   占い結果のシェア・終了ボタン
   ============================== */

function addFortuneActions(resultElement, fortune) {
    // 既存のボタンがあれば重複を防ぐ
    const oldActions = resultElement.querySelector(".fortune-actions");
    if (oldActions) oldActions.remove();

    const actions = document.createElement("div");
    actions.className = "fortune-actions";

    // Xで結果を投稿
    const shareButton = document.createElement("button");
    shareButton.type = "button";
    shareButton.textContent = "Xで結果を投稿する";

    shareButton.addEventListener("click", () => {
        const message =
            `今日のあおくじら占いは「${fortune.name}」！\n` +
            `${fortune.text}\n\n` +
            "あおくじらのひみつきち\n" +
            "https://aokujilabo.github.io/aokujilabo/";

        const url =
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(message);

        window.open(url, "_blank", "noopener,noreferrer");
    });

    // またね！
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.textContent = "またね！";

    closeButton.addEventListener("click", () => {
        resultElement.style.display = "none";
    });

    actions.append(shareButton, closeButton);
    resultElement.appendChild(actions);
}