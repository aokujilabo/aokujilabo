  /* =========================================================
     モバイルメニュー
     ========================================================= */

  const menuButton =
    document.getElementById("menuButton");

  const siteNav =
    document.getElementById("siteNav");


  menuButton.addEventListener(
    "click",
    () => {

      const open =
        siteNav.classList.toggle("is-open");

      menuButton.setAttribute(
        "aria-expanded",
        open
      );

    }
  );


  siteNav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          siteNav.classList.remove(
            "is-open"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });


  /* =========================================================
     未設定リンク用モーダル
     ========================================================= */

  const modal =
    document.getElementById("modal");

  const modalText =
    document.getElementById("modalText");

  const modalClose =
    document.getElementById("modalClose");


  document
    .querySelectorAll(".unset-link")
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          if (
            link.getAttribute("href") === "#"
          ) {

            event.preventDefault();

            const name =
              link.dataset.name || "LINK";

            modalText.textContent =
              `${name} のURLをHTMLの href に設定すると、ここから直接アクセスできます。`;

            modal.classList.add(
              "is-open"
            );

          }

        }
      );

    });


  modalClose.addEventListener(
    "click",
    () => {

      modal.classList.remove(
        "is-open"
      );

    }
  );


  modal.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        modal.classList.remove(
          "is-open"
        );

      }

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        modal.classList.remove(
          "is-open"
        );

      }

    }
  );

/* =========================================================
 ぼくのセリフ
 ========================================================= */
const icon = document.querySelector('.hero-icon');
const bubble = document.querySelector('.speech-bubble');

const messages = [
    'ん？',
    '遊びに来てくれてありがとう！',
    'おはなししてく？',
    '今日はなにすんの？',
    'ゆっくりしてってね',
    'おなかすいたなぁ…',
    'きれいな街並み…',
    'ウクレレ弾こうかな',
    'やっほー',
    'えへへ、だいすき'
];

let hideTimer;

icon.addEventListener('click', () => {

    const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

    bubble.textContent = randomMessage;
    bubble.style.display = 'block';

    // 前のタイマーをリセット
    clearTimeout(hideTimer);

    // クリックしたところから1秒後に消す
    hideTimer = setTimeout(() => {
        bubble.style.display = 'none';
    }, 1000);
});

  /* =========================================================
     今日の日付
     ========================================================= */

  const today =
    new Date();

  const displayDate =
    `${today.getFullYear()}.${String(
      today.getMonth() + 1
    ).padStart(2, "0")}.${String(
      today.getDate()
    ).padStart(2, "0")}`;


  document
    .querySelectorAll(".today-date")
    .forEach(el => {

      el.textContent =
        displayDate;

    });