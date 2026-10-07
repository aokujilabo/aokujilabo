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
     かくれんぼ
     ========================================================= */

	// ===== かくれんぼ設定 =====

	const hideImages = [
	"image/hide00.png",
	"image/hide01.png",
	"image/hide02.png",
	"image/hide03.png"
	];

	const hideSpots = [
	[".link-card", "left",   -35, 35, 105],
	[".link-card", "right",   35, 35, 105],
	[".link-card", "bottom",   0, 20, 100],

	[".hero-menu a", "left",  -25,  5, 85],
	[".hero-menu a", "right", 25,  5, 85],

	[".brand", "right",         25,  5, 90],
	[".site-header", "bottom", 120,  5, 90],

	[".hero-copy", "left",    -20, 80, 100],
	[".hero-copy", "right",    20, 80, 100],

	[".section-title", "right", 25, 5, 80],
	[".section-title", "left", -25, 5, 80],

	[".about-box", "left",     -25, 80, 110],
	[".about-box", "right",     25, 80, 110],

	[".archive-card", "left",  -30, 30, 100],
	[".archive-card", "right", 30, 30, 100],
	[".archive-card", "bottom", 0, 15, 95],

	["footer", "top",          120, -15, 105],
	["footer", "right",        -30, 30, 100]
	];


	// ===== 本体 =====

	const hiddenCharacter = document.getElementById("hidden-character");
	const hidePopup = document.getElementById("hide-popup");
	const hidePopupClose = document.getElementById("hide-popup-close");

	let lastImage = -1;
	let lastSpot = -1;


	function hideAokujira() {
		const game = document.getElementById("hide-game");
		const spots = [];

		hideSpots.forEach(([selector, side, x, y, size]) => {
		document.querySelectorAll(selector).forEach(element => {
		spots.push({ element, side, x, y, size });
		});
		});

		if (!spots.length) return;

		let image;
		do {
		image = Math.floor(Math.random() * hideImages.length);
		} while (image === lastImage && hideImages.length > 1);

		let index;
		do {
		index = Math.floor(Math.random() * spots.length);
		} while (index === lastSpot && spots.length > 1);

		lastImage = image;
		lastSpot = index;

		const spot = spots[index];
		const rect = spot.element.getBoundingClientRect();
		const base = game.getBoundingClientRect();
		const s = spot.size;

		let left = rect.left - base.left;
		let top = rect.top - base.top;

		if (spot.side === "left") {
		left -= s * .55;
		top += rect.height * .35;
		}

		if (spot.side === "right") {
		left += rect.width - s * .45;
		top += rect.height * .35;
		}

		if (spot.side === "top") {
		left += rect.width / 2 - s / 2;
		top -= s * .55;
		}

		if (spot.side === "bottom") {
		left += rect.width / 2 - s / 2;
		top += rect.height - s * .45;
		}

		left += spot.x;
		top += spot.y;

		hiddenCharacter.src = hideImages[image];
		hiddenCharacter.style.width = `${s}px`;
		hiddenCharacter.style.left = `${left}px`;
		hiddenCharacter.style.top = `${top}px`;
		hiddenCharacter.style.display = "block";
	}


	hiddenCharacter.onclick = () => {
		hidePopup.classList.add("show");
		hiddenCharacter.style.display = "none";
	};

	hidePopupClose.onclick = () => {
		hidePopup.classList.remove("show");
		hideAokujira();
	};

	hideAokujira();

	window.addEventListener("resize", () => {
		if (hiddenCharacter.style.display !== "none") {
		hideAokujira();
		}
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