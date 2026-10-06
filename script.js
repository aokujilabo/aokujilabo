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

	const hiddenCharacter =
	  document.getElementById("hidden-character");

	const hidePopup =
	  document.getElementById("hide-popup");

	const hidePopupClose =
	  document.getElementById("hide-popup-close");


	// ---------------------------------------------------------
	// あおくじら画像
	// ---------------------------------------------------------

	const hideImages = [
	  "image/hide00.png",
	  "image/hide01.png",
	  "image/hide02.png",
	  "image/hide03.png"
	];


	// ---------------------------------------------------------
	// 隠れる場所
	//
	// selector : 目印にするHTML要素
	// side     : どちら側から隠れるか
	// offsetX  : 横方向の微調整
	// offsetY  : 縦方向の微調整
	// size     : あおくじらの大きさ
	// ---------------------------------------------------------

	const hideSpotSettings = [

	  /* =====================================================
	     CONTENTS
	     ===================================================== */

	  {
	    selector: ".link-card",
	    side: "left",
	    offsetX: -35,
	    offsetY: 35,
	    size: 105
	  },

	  {
	    selector: ".link-card",
	    side: "right",
	    offsetX: 35,
	    offsetY: 35,
	    size: 105
	  },

	  {
	    selector: ".link-card",
	    side: "bottom",
	    offsetX: 0,
	    offsetY: 20,
	    size: 100
	  },


	  /* =====================================================
	     HERO MENU
	     ===================================================== */

	  {
	    selector: ".hero-menu a",
	    side: "left",
	    offsetX: -25,
	    offsetY: 5,
	    size: 85
	  },

	  {
	    selector: ".hero-menu a",
	    side: "right",
	    offsetX: 25,
	    offsetY: 5,
	    size: 85
	  },


	  /* =====================================================
	     HEADER
	     ===================================================== */

	  {
	    selector: ".brand",
	    side: "right",
	    offsetX: 25,
	    offsetY: 5,
	    size: 90
	  },

	  {
	    selector: ".site-header",
	    side: "bottom",
	    offsetX: 120,
	    offsetY: 5,
	    size: 90
	  },


	  /* =====================================================
	     HERO
	     ===================================================== */

	  {
	    selector: ".hero-copy",
	    side: "left",
	    offsetX: -20,
	    offsetY: 80,
	    size: 100
	  },

	  {
	    selector: ".hero-copy",
	    side: "right",
	    offsetX: 20,
	    offsetY: 80,
	    size: 100
	  },


	  /* =====================================================
	     SECTION TITLE
	     ===================================================== */

	  {
	    selector: ".section-title",
	    side: "right",
	    offsetX: 25,
	    offsetY: 5,
	    size: 80
	  },

	  {
	    selector: ".section-title",
	    side: "left",
	    offsetX: -25,
	    offsetY: 5,
	    size: 80
	  },


	  /* =====================================================
	     ABOUT
	     ===================================================== */

	  {
	    selector: ".about-box",
	    side: "left",
	    offsetX: -25,
	    offsetY: 80,
	    size: 110
	  },

	  {
	    selector: ".about-box",
	    side: "right",
	    offsetX: 25,
	    offsetY: 80,
	    size: 110
	  },


	  /* =====================================================
	     ARCHIVE
	     ===================================================== */

	  {
	    selector: ".archive-card",
	    side: "left",
	    offsetX: -30,
	    offsetY: 30,
	    size: 100
	  },

	  {
	    selector: ".archive-card",
	    side: "right",
	    offsetX: 30,
	    offsetY: 30,
	    size: 100
	  },

	  {
	    selector: ".archive-card",
	    side: "bottom",
	    offsetX: 0,
	    offsetY: 15,
	    size: 95
	  },


	  /* =====================================================
	     FOOTER
	     ===================================================== */

	  {
	    selector: "footer",
	    side: "top",
	    offsetX: 120,
	    offsetY: -15,
	    size: 105
	  },

	  {
	    selector: "footer",
	    side: "right",
	    offsetX: -30,
	    offsetY: 30,
	    size: 100
	  }

	];


	// ---------------------------------------------------------
	// 実際の隠れ場所を作る
	// ---------------------------------------------------------

	function createHideSpots() {

	  const spots = [];

	  hideSpotSettings.forEach(setting => {

	    const elements =
	      document.querySelectorAll(setting.selector);

	    elements.forEach(element => {

	      spots.push({
	        element: element,
	        side: setting.side,
	        offsetX: setting.offsetX || 0,
	        offsetY: setting.offsetY || 0,
	        size: setting.size || 120
	      });

	    });

	  });

	  return spots;
	}


	// ---------------------------------------------------------
	// 前回と同じ画像・場所をなるべく避ける
	// ---------------------------------------------------------

	let lastImage = -1;
	let lastSpot = -1;


	// ---------------------------------------------------------
	// あおくじらを隠す
	// ---------------------------------------------------------

	function hideAokujira() {

	  const hideSpots =
	    createHideSpots();

	  if (!hideSpots.length) {
	    return;
	  }


	  /* ---------------------------------------------
	     画像を選ぶ
	     --------------------------------------------- */

	  let imageIndex;

	  do {

	    imageIndex =
	      Math.floor(
	        Math.random() *
	        hideImages.length
	      );

	  } while (
	    hideImages.length > 1 &&
	    imageIndex === lastImage
	  );


	  /* ---------------------------------------------
	     場所を選ぶ
	     --------------------------------------------- */

	  let spotIndex;

	  do {

	    spotIndex =
	      Math.floor(
	        Math.random() *
	        hideSpots.length
	      );

	  } while (
	    hideSpots.length > 1 &&
	    spotIndex === lastSpot
	  );


	  lastImage = imageIndex;
	  lastSpot = spotIndex;


	  const spot =
	    hideSpots[spotIndex];

	  const rect =
	    spot.element.getBoundingClientRect();


	  /* ---------------------------------------------
	     画像サイズ
	     --------------------------------------------- */

	  hiddenCharacter.style.width =
	    `${spot.size}px`;


	  /* ---------------------------------------------
	     基本位置
	     --------------------------------------------- */

	  let left =
	    rect.left +
	    window.scrollX;

	  let top =
	    rect.top +
	    window.scrollY;


	  /* ---------------------------------------------
	     隠れる方向
	     --------------------------------------------- */

	  switch (spot.side) {

	    case "left":

	      left =
	        rect.left +
	        window.scrollX -
	        spot.size * 0.55;

	      top =
	        rect.top +
	        window.scrollY +
	        rect.height * 0.35;

	      break;


	    case "right":

	      left =
	        rect.right +
	        window.scrollX -
	        spot.size * 0.45;

	      top =
	        rect.top +
	        window.scrollY +
	        rect.height * 0.35;

	      break;


	    case "top":

	      left =
	        rect.left +
	        window.scrollX +
	        rect.width * 0.5 -
	        spot.size * 0.5;

	      top =
	        rect.top +
	        window.scrollY -
	        spot.size * 0.55;

	      break;


	    case "bottom":

	      left =
	        rect.left +
	        window.scrollX +
	        rect.width * 0.5 -
	        spot.size * 0.5;

	      top =
	        rect.bottom +
	        window.scrollY -
	        spot.size * 0.45;

	      break;

	  }


	  /* ---------------------------------------------
	     微調整
	     --------------------------------------------- */

	  left += spot.offsetX;
	  top += spot.offsetY;


	  /* ---------------------------------------------
	     画面から完全にはみ出さないようにする
	     --------------------------------------------- */

	  const margin = 8;

	  const maxLeft =
	    document.documentElement.scrollWidth -
	    spot.size -
	    margin;

	  const maxTop =
	    document.documentElement.scrollHeight -
	    spot.size -
	    margin;


	  left =
	    Math.max(
	      margin,
	      Math.min(left, maxLeft)
	    );

	  top =
	    Math.max(
	      margin,
	      Math.min(top, maxTop)
	    );


	  /* ---------------------------------------------
	     表示
	     --------------------------------------------- */

	  hiddenCharacter.src =
	    hideImages[imageIndex];

	  hiddenCharacter.style.left =
	    `${left}px`;

	  hiddenCharacter.style.top =
	    `${top}px`;

	  hiddenCharacter.style.display =
	    "block";
	}


	// ---------------------------------------------------------
	// 見つけた！
	// ---------------------------------------------------------

	hiddenCharacter.addEventListener(
	  "click",
	  () => {

	    hidePopup.classList.add("show");

	    hiddenCharacter.style.display =
	      "none";

	  }
	);


	// ---------------------------------------------------------
	// OK → また別の場所へ
	// ---------------------------------------------------------

	hidePopupClose.addEventListener(
	  "click",
	  () => {

	    hidePopup.classList.remove("show");

	    hideAokujira();

	  }
	);


	// ---------------------------------------------------------
	// 最初の1匹
	// ---------------------------------------------------------

	hideAokujira();


	// ---------------------------------------------------------
	// 画面サイズ変更時に位置を更新
	// ---------------------------------------------------------

	window.addEventListener(
	  "resize",
	  () => {

	    if (
	      hiddenCharacter.style.display !==
	      "none"
	    ) {

	      hideAokujira();

	    }

	  }
	);

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