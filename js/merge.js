        /* ==========================================
           定数・データ定義
           ========================================== */
        const CATEGORIES = [
            { id: 'grass', name: '草', iconBaseColor: '#2ecc71', secondaryColor: '#27ae60' },
            { id: 'flower', name: '花', iconBaseColor: '#e84393', secondaryColor: '#fd79a8' },
            { id: 'tree', name: '木', iconBaseColor: '#e67e22', secondaryColor: '#d35400' },
            { id: 'stone', name: '石', iconBaseColor: '#718093', secondaryColor: '#4a5568' },
            { id: 'crafted', name: '特製品', iconBaseColor: '#9b59b6', secondaryColor: '#8e44ad' }
        ];

        const MAX_LEVEL = 6;
        const COLS = 7;
        const ROWS = 7;
        const TOTAL_CELLS = COLS * ROWS;

        const CRAFT_RECIPES = [
            {"id": "bait", "name": "釣り餌", "item": {"cat": "crafted", "id": "bait", "name": "釣り餌", "level": 1, "baseColor": "#e67e22", "secColor": "#d35400", "symbol": "🪱"}, "ing1": {"cat": "flower", "level": 1}, "ing2": {"cat": "grass", "level": 1}},
            {"id": "shell", "name": "貝殻", "item": {"cat": "crafted", "id": "shell", "name": "貝殻", "level": 1, "baseColor": "#ff9ff3", "secColor": "#f368e0", "symbol": "🐚"}, "ing1": {"cat": "flower", "level": 1}, "ing2": {"cat": "tree", "level": 1}},
            {"id": "nuts", "name": "木の実", "item": {"cat": "crafted", "id": "nuts", "name": "木の実", "level": 1, "baseColor": "#d35400", "secColor": "#e67e22", "symbol": "🌰"}, "ing1": {"cat": "flower", "level": 1}, "ing2": {"cat": "stone", "level": 1}},
            {"id": "grassflute", "name": "草笛", "item": {"cat": "crafted", "id": "grassflute", "name": "草笛", "level": 1, "baseColor": "#2ecc71", "secColor": "#27ae60", "symbol": "🌱"}, "ing1": {"cat": "grass", "level": 1}, "ing2": {"cat": "tree", "level": 1}},
            {"id": "pendant", "name": "ペンダント", "item": {"cat": "crafted", "id": "pendant", "name": "ペンダント", "level": 1, "baseColor": "#f1c40f", "secColor": "#f39c12", "symbol": "📿"}, "ing1": {"cat": "grass", "level": 1}, "ing2": {"cat": "stone", "level": 1}},
            {"id": "paper", "name": "紙", "item": {"cat": "crafted", "id": "paper", "name": "紙", "level": 1, "baseColor": "#ecf0f1", "secColor": "#bdc3c7", "symbol": "📄"}, "ing1": {"cat": "tree", "level": 1}, "ing2": {"cat": "stone", "level": 1}},
            {"id": "sachet", "name": "香り袋", "item": {"cat": "crafted", "id": "sachet", "name": "香り袋", "level": 1, "baseColor": "#e84393", "secColor": "#d63031", "symbol": "袋"}, "ing1": {"cat": "flower", "level": 2}, "ing2": {"cat": "grass", "level": 2}},
            {"id": "lure", "name": "ルアー", "item": {"cat": "crafted", "id": "lure", "name": "ルアー", "level": 1, "baseColor": "#1abc9c", "secColor": "#16a085", "symbol": "🐟"}, "ing1": {"cat": "flower", "level": 2}, "ing2": {"cat": "tree", "level": 2}},
            {"id": "paint", "name": "絵具", "item": {"cat": "crafted", "id": "paint", "name": "絵具", "level": 1, "baseColor": "#9b59b6", "secColor": "#8e44ad", "symbol": "🎨"}, "ing1": {"cat": "flower", "level": 2}, "ing2": {"cat": "stone", "level": 2}},
            {"id": "woodflute", "name": "木の笛", "item": {"cat": "crafted", "id": "woodflute", "name": "木の笛", "level": 1, "baseColor": "#d35400", "secColor": "#b9770e", "symbol": "🎵"}, "ing1": {"cat": "grass", "level": 2}, "ing2": {"cat": "tree", "level": 2}},
            {"id": "thread", "name": "糸", "item": {"cat": "crafted", "id": "thread", "name": "糸", "level": 1, "baseColor": "#9b59b6", "secColor": "#8e44ad", "symbol": "🧵"}, "ing1": {"cat": "grass", "level": 2}, "ing2": {"cat": "stone", "level": 2}},
            {"id": "knife", "name": "ナイフ", "item": {"cat": "crafted", "id": "knife", "name": "ナイフ", "level": 1, "baseColor": "#95a5a6", "secColor": "#7f8c8d", "symbol": "🔪"}, "ing1": {"cat": "tree", "level": 2}, "ing2": {"cat": "stone", "level": 2}},
            {"id": "flowercrown", "name": "花冠", "item": {"cat": "crafted", "id": "flowercrown", "name": "花冠", "level": 1, "baseColor": "#ff7675", "secColor": "#d63031", "symbol": "👑"}, "ing1": {"cat": "flower", "level": 3}, "ing2": {"cat": "grass", "level": 3}},
            {"id": "flowerwreath", "name": "花のリース", "item": {"cat": "crafted", "id": "flowerwreath", "name": "花のリース", "level": 1, "baseColor": "#fd79a8", "secColor": "#e84393", "symbol": "🛞"}, "ing1": {"cat": "flower", "level": 3}, "ing2": {"cat": "tree", "level": 3}},
            {"id": "flowervase", "name": "花瓶", "item": {"cat": "crafted", "id": "flowervase", "name": "花瓶", "level": 1, "baseColor": "#00cec9", "secColor": "#00b894", "symbol": "🏺"}, "ing1": {"cat": "flower", "level": 3}, "ing2": {"cat": "stone", "level": 3}},
            {"id": "basket", "name": "丈夫なかご", "item": {"cat": "crafted", "id": "basket", "name": "丈夫なかご", "level": 1, "baseColor": "#e67e22", "secColor": "#d35400", "symbol": "🧺"}, "ing1": {"cat": "grass", "level": 3}, "ing2": {"cat": "tree", "level": 3}},
            {"id": "tinder", "name": "火口", "item": {"cat": "crafted", "id": "tinder", "name": "火口", "level": 1, "baseColor": "#e74c3c", "secColor": "#c0392b", "symbol": "💥"}, "ing1": {"cat": "grass", "level": 3}, "ing2": {"cat": "stone", "level": 3}},
            {"id": "axe", "name": "斧", "item": {"cat": "crafted", "id": "axe", "name": "斧", "level": 1, "baseColor": "#e74c3c", "secColor": "#c0392b", "symbol": "🪓"}, "ing1": {"cat": "tree", "level": 3}, "ing2": {"cat": "stone", "level": 3}},
            {"id": "gear", "name": "歯車", "item": {"cat": "crafted", "id": "gear", "name": "歯車", "level": 1, "baseColor": "#7f8c8d", "secColor": "#34495e", "symbol": "⚙️"}, "ing1": {"craftedId": "knife"}, "ing2": {"cat": "stone", "level": 3}},
            {"id": "pot", "name": "石の器", "item": {"cat": "crafted", "id": "pot", "name": "石の器", "level": 1, "baseColor": "#95a5a6", "secColor": "#34495e", "symbol": "🥣"}, "ing1": {"craftedId": "knife"}, "ing2": {"cat": "stone", "level": 2}},
            {"id": "woodcontainer", "name": "木の器", "item": {"cat": "crafted", "id": "woodcontainer", "name": "木の器", "level": 1, "baseColor": "#d35400", "secColor": "#ba4a00", "symbol": "🪵"}, "ing1": {"craftedId": "knife"}, "ing2": {"cat": "tree", "level": 2}},
            {"id": "sand", "name": "砂", "item": {"cat": "crafted", "id": "sand", "name": "砂", "level": 1, "baseColor": "#f1c40f", "secColor": "#f39c12", "symbol": "⏳"}, "ing1": {"craftedId": "knife"}, "ing2": {"cat": "stone", "level": 1}},
            {"id": "rod", "name": "釣り竿", "item": {"cat": "crafted", "id": "rod", "name": "釣り竿", "level": 1, "baseColor": "#d35400", "secColor": "#e67e22", "symbol": "🎣"}, "ing1": {"craftedId": "thread"}, "ing2": {"cat": "tree", "level": 3}},
            {"id": "net", "name": "投網", "item": {"cat": "crafted", "id": "net", "name": "投網", "level": 1, "baseColor": "#3498db", "secColor": "#2980b9", "symbol": "🥅"}, "ing1": {"craftedId": "thread"}, "ing2": {"craftedId": "thread"}},
            {"id": "baitedthread", "name": "釣り餌のついた糸", "item": {"cat": "crafted", "id": "baitedthread", "name": "釣り餌のついた糸", "level": 1, "baseColor": "#e67e22", "secColor": "#d35400", "symbol": "🪡"}, "ing1": {"craftedId": "thread"}, "ing2": {"craftedId": "bait"}},
            {"id": "lurethread", "name": "ルアーのついた糸", "item": {"cat": "crafted", "id": "lurethread", "name": "ルアーのついた糸", "level": 1, "baseColor": "#1abc9c", "secColor": "#117a65", "symbol": "🧶"}, "ing1": {"craftedId": "thread"}, "ing2": {"craftedId": "lure"}},
            {"id": "boundflower", "name": "縛った花", "item": {"cat": "crafted", "id": "boundflower", "name": "縛った花", "level": 1, "baseColor": "#ff6b81", "secColor": "#ff4757", "symbol": "💐"}, "ing1": {"craftedId": "thread"}, "ing2": {"cat": "flower", "level": 4}},
            {"id": "ukuleleparts", "name": "弦楽器のパーツ", "item": {"cat": "crafted", "id": "ukuleleparts", "name": "弦楽器のパーツ", "level": 1, "baseColor": "#e67e22", "secColor": "#d35400", "symbol": "🪵"}, "ing1": {"craftedId": "thread"}, "ing2": {"cat": "tree", "level": 2}},
            {"id": "smallbouquet", "name": "小さい花束", "item": {"cat": "crafted", "id": "smallbouquet", "name": "小さい花束", "level": 1, "baseColor": "#ff4757", "secColor": "#ff6b81", "symbol": "🌷"}, "ing1": {"craftedId": "boundflower"}, "ing2": {"cat": "flower", "level": 4}},
            {"id": "midbouquet", "name": "中くらいの花束", "item": {"cat": "crafted", "id": "midbouquet", "name": "中くらいの花束", "level": 1, "baseColor": "#ff3838", "secColor": "#ff4d4d", "symbol": "🌻"}, "ing1": {"craftedId": "smallbouquet"}, "ing2": {"cat": "flower", "level": 4}},
            {"id": "bigbouquet", "name": "大きい花束", "item": {"cat": "crafted", "id": "bigbouquet", "name": "大きい花束", "level": 1, "baseColor": "#ff4d4d", "secColor": "#fa8231", "symbol": "🌹"}, "ing1": {"craftedId": "midbouquet"}, "ing2": {"cat": "flower", "level": 4}},
            {"id": "letter", "name": "手紙", "item": {"cat": "crafted", "id": "letter", "name": "手紙", "level": 1, "baseColor": "#ecf0f1", "secColor": "#bdc3c7", "symbol": "✉️"}, "ing1": {"craftedId": "paper"}, "ing2": {"cat": "flower", "level": 2}},
            {"id": "sketchbook", "name": "スケッチブック", "item": {"cat": "crafted", "id": "sketchbook", "name": "スケッチブック", "level": 1, "baseColor": "#f39c12", "secColor": "#d35400", "symbol": "📓"}, "ing1": {"craftedId": "paper"}, "ing2": {"craftedId": "paint"}},
            {"id": "baitedrod", "name": "釣り餌のついた釣り竿", "item": {"cat": "crafted", "id": "baitedrod", "name": "釣り餌のついた釣り竿", "level": 1, "baseColor": "#e67e22", "secColor": "#b9770e", "symbol": "🥢"}, "ing1": {"craftedId": "baitedthread"}, "ing2": {"cat": "tree", "level": 3}},
            {"id": "lurerod", "name": "ルアーのついた釣り竿", "item": {"cat": "crafted", "id": "lurerod", "name": "ルアーのついた釣り竿", "level": 1, "baseColor": "#16a085", "secColor": "#0e6655", "symbol": "🎋"}, "ing1": {"craftedId": "lurethread"}, "ing2": {"cat": "tree", "level": 3}},
            {"id": "bignet", "name": "大きい投網", "item": {"cat": "crafted", "id": "bignet", "name": "大きい投網", "level": 1, "baseColor": "#2980b9", "secColor": "#1f618d", "symbol": "🕸️"}, "ing1": {"craftedId": "net"}, "ing2": {"craftedId": "net"}},
            {"id": "maki", "name": "薪", "item": {"cat": "crafted", "id": "maki", "name": "薪", "level": 1, "baseColor": "#d35400", "secColor": "#ba4a00", "symbol": "🪵"}, "ing1": {"craftedId": "axe"}, "ing2": {"cat": "tree", "level": 4}},
            {"id": "bonfire", "name": "たき火", "item": {"cat": "crafted", "id": "bonfire", "name": "たき火", "level": 1, "baseColor": "#e67e22", "secColor": "#cf711f", "symbol": "🏕️"}, "ing1": {"craftedId": "maki"}, "ing2": {"craftedId": "tinder"}},
            {"id": "bottle", "name": "きれいな小瓶", "item": {"cat": "crafted", "id": "bottle", "name": "きれいな小瓶", "level": 1, "baseColor": "#00d2d3", "secColor": "#01a3a4", "symbol": "🍾"}, "ing1": {"craftedId": "sand"}, "ing2": {"craftedId": "bonfire"}},
            {"id": "hourglass", "name": "砂時計", "item": {"cat": "crafted", "id": "hourglass", "name": "砂時計", "level": 1, "baseColor": "#ff9f43", "secColor": "#ee5253", "symbol": "⌛"}, "ing1": {"craftedId": "sand"}, "ing2": {"craftedId": "bottle"}},
            {"id": "clock", "name": "時計", "item": {"cat": "crafted", "id": "clock", "name": "時計", "level": 1, "baseColor": "#54a0ff", "secColor": "#2e86de", "symbol": "⏰"}, "ing1": {"craftedId": "gear"}, "ing2": {"craftedId": "gear"}},
            {"id": "potpan", "name": "鍋", "item": {"cat": "crafted", "id": "potpan", "name": "鍋", "level": 1, "baseColor": "#7f8c8d", "secColor": "#95a5a6", "symbol": "🍲"}, "ing1": {"craftedId": "pot"}, "ing2": {"cat": "tree", "level": 3}},
            {"id": "frypan", "name": "フライパン", "item": {"cat": "crafted", "id": "frypan", "name": "フライパン", "level": 1, "baseColor": "#34495e", "secColor": "#2c3e50", "symbol": "🍳"}, "ing1": {"craftedId": "pot"}, "ing2": {"cat": "tree", "level": 2}},
            {"id": "ukulele", "name": "ウクレレ", "item": {"cat": "crafted", "id": "ukulele", "name": "ウクレレ", "level": 1, "baseColor": "#f39c12", "secColor": "#d35400", "symbol": "🎸"}, "ing1": {"craftedId": "ukuleleparts"}, "ing2": {"cat": "tree", "level": 4}}
        ];

        let stamina = 10000;
        let maxStamina = 10000;
        let coins = 500;
        
        // プレイヤーレベルと経験値
        let playerLevel = 1;
        let playerExp = 0;

        let fieldData = new Array(TOTAL_CELLS).fill(null);
        let bagData = new Array(20).fill(null);
        let unlockedZukan = {};
        let unlockedRecipes = {};
        let itemIcons = {};

        let randomQuests = [];
        let dailyProgress = { merged: false, sold: false, questCleared: false, claimed: false };

        let currentSelectedItem = null;
        let currentBagSelectedItem = null;

        /* ==========================================
           ローカルストレージ セーブ ＆ ロード
           ========================================== */
        const SAVE_KEY = 'merge_game_save_data_v5';

        function saveGame() {
            const saveData = { stamina, coins, fieldData, bagData, unlockedZukan, unlockedRecipes, randomQuests, dailyProgress, playerLevel, playerExp };
            localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
            
            updateItemDeliverableHighlights();
        }

        function loadGame() {
            const savedJson = localStorage.getItem(SAVE_KEY);
            if (savedJson) {
                try {
                    const data = JSON.parse(savedJson);
                    stamina = data.stamina ?? 10000;
                    coins = data.coins ?? 500;
                    playerLevel = data.playerLevel ?? 1; // ← 追加
                    playerExp = data.playerExp ?? 0;     // ← 追加
                    fieldData = data.fieldData ?? new Array(TOTAL_CELLS).fill(null);
                    bagData = data.bagData ?? new Array(20).fill(null);
                    unlockedZukan = data.unlockedZukan ?? {};
                    unlockedRecipes = data.unlockedRecipes ?? {};
                    randomQuests = data.randomQuests ?? [];
                    dailyProgress = data.dailyProgress ?? { merged: false, sold: false, questCleared: false, claimed: false };
                    return true;
                } catch (e) { console.error(e); }
            }
            return false;
        }

        function resetGameData() {
            if (confirm('セーブデータを初期化してはじめからやり直しますか？')) {
                localStorage.removeItem(SAVE_KEY);
                location.reload();
            }
        }

        /* ==========================================
           カラーコード変更ヘルパー（レベルに応じて色を濃く）
           ========================================== */
        function adjustColorBrightness(hexColor, level) {
            const factor = 1 - ((level - 1) * 0.06);
            let hex = hexColor.replace('#', '');
            if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');

            let r = parseInt(hex.substring(0, 2), 16);
            let g = parseInt(hex.substring(2, 4), 16);
            let b = parseInt(hex.substring(4, 6), 16);

            r = Math.max(0, Math.floor(r * factor));
            g = Math.max(0, Math.floor(g * factor));
            b = Math.max(0, Math.floor(b * factor));

            const toHex = (n) => n.toString(16).padStart(2, '0');
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }

        /* ==========================================
           アイコン生成
           ========================================== */
        function generateItemIcon(baseColor, secColor, symbol, levelText, level) {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');

            const darkenedBaseColor = level ? adjustColorBrightness(baseColor, level) : baseColor;
            const darkenedSecColor = level ? adjustColorBrightness(secColor, level) : secColor;

            ctx.fillStyle = darkenedBaseColor;
            ctx.beginPath();
            ctx.arc(32, 32, 28, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = darkenedSecColor;
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(symbol, 32, 26);

            if (levelText) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.font = 'bold 14px sans-serif';
                ctx.fillText(levelText, 32, 52);
            }
            return canvas.toDataURL();
        }
        /* ==========================================
           アイコン生成（image/merge/ 内のPNG画像を参照）
        ========================================== */
        function getItemIconUrl(item) {
            if (item.category === 'crafted') {
                // 特製品の場合（例: image/merge/bait.png など、アイテムIDとレベル）
                const lv = item.level || 1;
                return `image/merge/${item.craftedId}.png`;
            } else {
                // 基礎素材の場合（例: image/merge/grass1.png, flower2.png など）
                return `image/merge/${item.category}${item.level}.png`;
            }
        }
        

        // クエスト用アイコン呼び出し.
        function getItemIconQuest(quest) {
            if (quest.type == 'base') {
                // 基礎素材の場合（例: image/merge/grass1.png, flower2.png など）
                return `image/merge/${quest.category}${quest.level}.png`;
            } else {
                // 特製品の場合（例: image/merge/bait.png など、アイテムIDとレベル）
                return `image/merge/${quest.craftedId}.png`;
            }
        }
        

        // 図鑑、レシピ用アイコン呼び出し.
        function getItemIconBook(book, level) {
            if (book.cat == 'crafted') {
                // 特製品の場合（例: image/merge/bait.png など、アイテムIDとレベル）
                return `image/merge/${book.id}.png`;
            } else {
                // 基礎素材の場合（例: image/merge/grass1.png, flower2.png など）
                return `image/merge/${book.id}${level}.png`;
            }
        }

        function getIngIconUrl(ing) {
            if (ing.craftedId) {
                const targetRec = CRAFT_RECIPES.find(r => r.id === ing.craftedId);
                return `image/merge/${ing.craftedId}.png`;
            } else {
                const cat = ing.cat || 'grass';
                const lv = ing.level || 1;
                return `image/merge/${cat}${lv}.png`;
            }
        }

        /* ==========================================
           初期化処理
           ========================================== */
        window.onload = function() {
            initFieldDOM();
            initBagDOM();

            if (!loadGame()) {
                fieldData[0] = { category: 'grass', level: 1 };
                fieldData[1] = { category: 'grass', level: 1 };
                fieldData[2] = { category: 'flower', level: 1 };
                fieldData[7] = { category: 'stone', level: 1 };
                unlockedZukan['grass_1'] = true;
                unlockedZukan['flower_1'] = true;
                unlockedZukan['stone_1'] = true;

                while (randomQuests.length < 5) {
                    randomQuests.push(generateRandomQuest());
                }
                saveGame();
            }

            updateStatusDisplay();
            renderTopQuestUI();
            renderField();
        };

        /* ==========================================
           フィールド描画
           ========================================== */
        function initFieldDOM() {
            const gridField = document.getElementById('grid-field');
            gridField.innerHTML = '';
            for (let i = 0; i < TOTAL_CELLS; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.index = i;
                gridField.appendChild(cell);
            }
        }

        function renderField() {
            const gridField = document.getElementById('grid-field');
            const cells = gridField.children;
            for (let i = 0; i < TOTAL_CELLS; i++) {
                const cell = cells[i];
                const existingItem = cell.querySelector('.item');
                if (existingItem) existingItem.remove();

                const itemData = fieldData[i];
                if (itemData) {
                    cell.appendChild(createItemElement(itemData, 'field', i));
                }
            }
            saveGame();
        }

        /* ==========================================
           アイテム要素 ＆ ポインターD&D (プレビュー追従・座標判定版)
           ========================================== */
        let activeDragGhost = null;
        let dragSourceInfo = null;

        function createItemElement(itemData, locationType, index) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';

            const iconImg = document.createElement('img');
            iconImg.src = getItemIconUrl(itemData);
            itemDiv.appendChild(iconImg);

            const lvBadge = document.createElement('div');
            lvBadge.className = 'item-level';
            lvBadge.innerText = itemData.category === 'crafted' ? '特製' : `Lv${itemData.level}`;
            itemDiv.appendChild(lvBadge);
            
            // --- 👑 王冠マーク（進化なし判定）のロジック ---
            let hasNoEvolution = false;

            if (itemData.category === 'crafted') {
                // 特製品の場合：「他のレシピの材料として使われていない」なら最終完成品（＝王冠）
                const isUsedAsMaterial = isCraftedItemUsedInRecipes(itemData.craftedId);
                hasNoEvolution = !isUsedAsMaterial; 
            } else {
                // 基礎素材の場合：最大レベル（Lv.6など）に達しているなら王冠
                hasNoEvolution = (itemData.level >= MAX_LEVEL);
            }

            if (hasNoEvolution) {
                const crownBadge = document.createElement('div');
                crownBadge.className = 'item-crown';
                crownBadge.innerText = '👑';
                itemDiv.appendChild(crownBadge);
            }
            // ---------------------------------------------

            let hasMoved = false;
            let startX = 0, startY = 0, isDragging = false;

            itemDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!hasMoved) {
                    if (locationType === 'field') openItemMenuModal(locationType, index, itemData);
                    else openBagMenuModal(index, itemData);
                }
            });

            itemDiv.onpointerdown = function(event) {
                if (event.button !== 0 && event.pointerType === 'mouse') return;
                event.preventDefault(); // スマホ等のスクロール誤作動を防止
                startX = event.clientX;
                startY = event.clientY;
                hasMoved = false;
                isDragging = false;
            };

            // ドラッグ処理.
            itemDiv.onpointermove = function(event) {
                if (event.buttons) {
                    if (!isDragging && Math.hypot(event.clientX - startX, event.clientY - startY) > 5) {
                        hasMoved = true;
                        isDragging = true;
                        dragSourceInfo = { locationType, index, itemData };
                        
                        // 既存のドラッグ用ゴーストをすべて削除
                        document.querySelectorAll('body > .item').forEach(ghost => {
                            if (ghost.style.position === 'fixed' && ghost.style.zIndex === '9999') {
                                ghost.remove();
                            }
                        });

                        // 参照もリセット
                        activeDragGhost = null;

                        // 王冠やIDの重複を防ぐため、ドラッグ用ゴーストは最小限の構成で作成する
                        activeDragGhost = document.createElement('div');
                        activeDragGhost.className = 'item';
                        activeDragGhost.style.position = 'fixed';
                        activeDragGhost.style.zIndex = '9999';
                        activeDragGhost.style.pointerEvents = 'none';
                        activeDragGhost.style.opacity = '0.8';

                        const ghostImg = document.createElement('img');
                        ghostImg.src = getItemIconUrl(itemData);
                        activeDragGhost.appendChild(ghostImg);

                        const ghostLv = document.createElement('div');
                        ghostLv.className = 'item-level';
                        ghostLv.innerText = itemData.category === 'crafted' ? '特製' : `Lv${itemData.level}`;
                        activeDragGhost.appendChild(ghostLv);

                        document.body.appendChild(activeDragGhost);

                        // 元の要素を半透明にする
                        itemDiv.style.opacity = '0.3';
                        try { this.setPointerCapture(event.pointerId); } catch(e){}
                    }
                    
                    if (isDragging && activeDragGhost) {
                        event.preventDefault();
                        activeDragGhost.style.left = (event.clientX - 32) + 'px';
                        activeDragGhost.style.top = (event.clientY - 32) + 'px';
                    }
                }
            };

            itemDiv.onpointerup = function(event) {
                if (isDragging) {
                    try { this.releasePointerCapture(event.pointerId); } catch(e){}
                    
                    // ゴースト要素の削除と元の透明度復元
                    if (activeDragGhost) {
                        activeDragGhost.remove();
                        activeDragGhost = null;
                    }
                    itemDiv.style.opacity = '1';

                    // 離した瞬間のクライアント座標からドロップ先を確定
                    handleDropAtCoordinates(locationType, index, event.clientX, event.clientY);
                }
                isDragging = false;
                dragSourceInfo = null;
            };

            return itemDiv;
        }
        
        // 指定されたクラフトIDが、他のレシピの材料として使われているか判定する関数
        function isCraftedItemUsedInRecipes(craftedId) {
            return CRAFT_RECIPES.some(rec => {
                return (rec.ing1 && rec.ing1.craftedId === craftedId) || 
                       (rec.ing2 && rec.ing2.craftedId === craftedId);
            });
        }

        // 画面上の座標からバッグまたはフィールドのセルを正確に特定する
        function handleDropAtCoordinates(srcLocation, srcIndex, clientX, clientY) {
            // 1. バッグスロットの判定
            const bagSlots = document.querySelectorAll('.bag-slot');
            for (let slot of bagSlots) {
                const rect = slot.getBoundingClientRect();
                if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
                    const destBagIndex = parseInt(slot.dataset.bagIndex);
                    if (srcLocation === 'field') moveFieldToBag(srcIndex, destBagIndex);
                    return;
                }
            }

            // 2. フィールドセルの判定
            const cells = document.querySelectorAll('#grid-field .cell');
            for (let cell of cells) {
                const rect = cell.getBoundingClientRect();
                if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
                    const destIndex = parseInt(cell.dataset.index);
                    if (srcLocation === 'field') {
                        processFieldInteraction(srcIndex, destIndex);
                    } else if (srcLocation === 'bag') {
                        moveBagToField(srcIndex, destIndex);
                    }
                    return;
                }
            }
        }

        function processFieldInteraction(srcIdx, destIdx) {
            if (srcIdx === destIdx) return;
            const srcItem = fieldData[srcIdx];
            const destItem = fieldData[destIdx];
            if (!srcItem) return;

            if (!destItem) {
                fieldData[destIdx] = srcItem;
                fieldData[srcIdx] = null;
            } else {
                const craftedResult = checkCraftRecipe(srcItem, destItem);
                if (craftedResult) {
                    fieldData[destIdx] = craftedResult;
                    fieldData[srcIdx] = null;
                    unlockZukanOrCraft(craftedResult);
                    alert(`✨ クラフト成功: ${craftedResult.name} を作成しました！`);
                    renderField();
                    return;
                }

                if (srcItem.category !== 'crafted' && destItem.category !== 'crafted' &&
                    srcItem.category === destItem.category && srcItem.level === destItem.level) {
                    if (destItem.level < MAX_LEVEL) {
                        destItem.level += 1;
                        fieldData[srcIdx] = null;
                        unlockZukanItem(destItem.category, destItem.level);
                        dailyProgress.merged = true;
                        updateDailyUI();
                    } else {
                        fieldData[srcIdx] = destItem;
                        fieldData[destIdx] = srcItem;
                    }
                } else {
                    fieldData[srcIdx] = destItem;
                    fieldData[destIdx] = srcItem;
                }
            }
            renderField();
        }

        function checkCraftRecipe(itemA, itemB) {
            for (let rec of CRAFT_RECIPES) {
                if (matchRecipeIng(itemA, rec.ing1) && matchRecipeIng(itemB, rec.ing2)) {
                    unlockedRecipes[rec.id] = true;
                    return { category: 'crafted', craftedId: rec.id, name: rec.item.name, level: 1 };
                }
                if (matchRecipeIng(itemA, rec.ing2) && matchRecipeIng(itemB, rec.ing1)) {
                    unlockedRecipes[rec.id] = true;
                    return { category: 'crafted', craftedId: rec.id, name: rec.item.name, level: 1 };
                }
            }
            return null;
        }

        function matchRecipeIng(item, ing) {
            if (ing.craftedId) {
                return item.category === 'crafted' && item.craftedId === ing.craftedId;
            } else {
                return item.category === ing.cat && item.level === ing.level;
            }
        }

        /* ==========================================
           採集・一括採集・スタミナ
           ========================================== */
        function getFirstEmptyCellIndex() {
            for (let i = 0; i < TOTAL_CELLS; i++) {
                if (fieldData[i] === null) return i;
            }
            return -1;
        }

        function gatherItem() {
            if (stamina < 10) { alert('スタミナが足りません！'); return; }
            const emptyIdx = getFirstEmptyCellIndex();
            if (emptyIdx === -1) { alert('フィールドに空きマスがありません！'); return; }

            stamina -= 10;
            updateStatusDisplay();

            const rand = Math.random() * 100;
                let chosenCat = rand < 25 ? 'stone' : rand < 50 ? 'tree' : rand < 75 ? 'grass' : 'flower';
            fieldData[emptyIdx] = { category: chosenCat, level: 1 };
            unlockZukanItem(chosenCat, 1);
            renderField();

            if (randomQuests.length < 5) {
                randomQuests.push(generateRandomQuest());
                renderTopQuestUI();
            }
            saveGame();
        }

        function gatherBatch() {
            const costPerItem = 10;
            const emptyIndices = [];
            for (let i = 0; i < TOTAL_CELLS; i++) {
                if (fieldData[i] === null) emptyIndices.push(i);
            }

            if (emptyIndices.length === 0) { alert('フィールドに空きマスがありません！'); return; }

            const totalCost = emptyIndices.length * costPerItem;
            if (stamina < totalCost) {
                alert(`スタミナが足りません！（必要スタミナ: ${totalCost}）`);
                return;
            }

            stamina -= totalCost;
            updateStatusDisplay();

            emptyIndices.forEach(idx => {
                const rand = Math.random() * 100;
                let chosenCat = rand < 25 ? 'stone' : rand < 50 ? 'tree' : rand < 75 ? 'grass' : 'flower';
                fieldData[idx] = { category: chosenCat, level: 1 };
                unlockZukanItem(chosenCat, 1);
            });

            renderField();
            while (randomQuests.length < 5) {
                randomQuests.push(generateRandomQuest());
            }
            renderTopQuestUI();
            saveGame();
            alert(`⚡ 一括採集を行いました！（消費スタミナ: ${totalCost}）`);
        }

        function recoverStamina() {
            if (coins < 100) { alert('コインが足りません！'); return; }
            coins -= 100;
            stamina = Math.min(maxStamina, stamina + 5000);
            updateStatusDisplay();
            alert('スタミナを回復しました！');
            saveGame();
        }

        function updateStatusDisplay() {
            document.getElementById('stamina-text').innerText = stamina;
            document.getElementById('coin-text').innerText = coins;
            
            // スタミナの左側に置いたレベル表示を更新
            const levelEl = document.getElementById('level-text');
            if (levelEl) levelEl.innerText = playerLevel;

            // レベル表示ボックス自体の緑ゲージを更新
            const gaugeEl = document.getElementById('level-exp-gauge');
            if (gaugeEl) {
                if (playerLevel >= 999) {
                    gaugeEl.style.width = '100%';
                } else {
                    const reqExp = getRequiredExp(playerLevel);
                    const percentage = Math.min(100, Math.max(0, (playerExp / reqExp) * 100));
                    gaugeEl.style.width = `${percentage}%`;
                }
            }

            saveGame();
        }

        /* ==========================================
           常時表示クエスト機能 (クラフト品30%確率追加 ＆ 一括リセット)
           ========================================== */
        // 図鑑とクラフトの開放％を計算する関数 (0.0 〜 1.0)
        function calculateUnlockPercentage() {
            const totalZukanSlots = (4 * MAX_LEVEL) + CRAFT_RECIPES.length;
            let unlockedCount = 0;

            for (let c of ['grass', 'flower', 'tree', 'stone']) {
                for (let lv = 1; lv <= MAX_LEVEL; lv++) {
                    if (unlockedZukan[`${c}_${lv}`]) unlockedCount++;
                }
            }
            CRAFT_RECIPES.forEach(rec => {
                if (unlockedZukan[`crafted_${rec.id}`] || unlockedRecipes[rec.id]) unlockedCount++;
            });

            return unlockedCount / totalZukanSlots;
        }

        function generateRandomQuest() {
            const unlockRatio = calculateUnlockPercentage(); 
            // 解放度(0〜1)に合わせてクエストの最大レベルを 2 から 6 の間で変動
            const maxQuestLevel = Math.min(6, Math.max(2, Math.floor(2 + unlockRatio * 4)));
            const isCrafted = Math.random() < 0.3;

            if (isCrafted) {
                const rec = CRAFT_RECIPES[Math.floor(Math.random() * CRAFT_RECIPES.length)];
                // クラフト品の種類によって報酬を変動させる
                let reward = 300;
                if (['bigbouquet', 'lurerod', 'baitedrod', 'campfire', 'clock'].includes(rec.id)) {
                    reward = 700 + Math.floor(Math.random() * 300);
                } else if (['net', 'bignet', 'rod', 'frypan', 'potpan', 'axe', 'hourglass'].includes(rec.id)) {
                    reward = 500 + Math.floor(Math.random() * 200);
                } else {
                    reward = 300 + Math.floor(Math.random() * 150);
                }

                return {
                    type: 'crafted',
                    craftedId: rec.id,
                    catName: rec.item.name,
                    reward: reward
                };
            } else {
                const cat = CATEGORIES.filter(c => c.id !== 'crafted')[Math.floor(Math.random() * 4)];
                // 1 〜 maxQuestLevel の間でランダムに難易度を決定
                const lv = Math.floor(Math.random() * maxQuestLevel) + 1;
                return {
                    type: 'base',
                    category: cat.id,
                    catName: cat.name,
                    level: lv,
                    reward: lv * 60 + Math.floor(Math.random() * 40)
                };
            }
        }

        function refreshAllQuests() {
            if (coins < 50) {
                alert('コインが足りません！（クエスト更新には50コイン必要です）');
                return;
            }
            if (confirm('50コインを消費してすべてのクエストを新しく更新しますか？')) {
                coins -= 50;
                updateStatusDisplay();
                randomQuests = [];
                while (randomQuests.length < 5) {
                    randomQuests.push(generateRandomQuest());
                }
                renderTopQuestUI();
                alert('クエストを更新しました！');
            }
        }

        function renderTopQuestUI() {
            const container = document.getElementById('quest-horizontal-list');
            container.innerHTML = '';

            randomQuests.forEach((quest, index) => {
                const card = document.createElement('div');
                card.className = 'quest-card-mini';

                // 納品可能ならカード背景をグリーンにハイライト
                const isDeliverable = checkIsQuestDeliverable(quest);
                if (isDeliverable) {
                    card.classList.add('deliverable');
                }

                const img = document.createElement('img');
                img.src = getItemIconQuest(quest);
                card.appendChild(img);

                const title = document.createElement('div');
                title.className = 'quest-card-title';
                title.innerText = quest.type === 'base' ? `${quest.catName} (Lv.${quest.level})` : `${quest.catName}`;
                card.appendChild(title);

                // 報酬コインと、数値としてのEXP表示
                const earnedExp = Math.floor(quest.reward * 0.5);
                const reward = document.createElement('div');
                reward.className = 'quest-card-reward';
                reward.innerHTML = `<div>💰 ${quest.reward}</div><div style="font-size:10px; color:#2ed573; font-weight:bold;">✨ +${earnedExp} EXP</div>`;
                card.appendChild(reward);

                const btn = document.createElement('button');
                btn.className = 'quest-card-btn';
                btn.innerText = '納品';
                btn.onclick = () => fulfillQuest(index);
                card.appendChild(btn);

                container.appendChild(card);
            });
            saveGame();
        }
        
        function checkIsQuestDeliverable(quest) {
            for (let i = 0; i < fieldData.length; i++) {
                const item = fieldData[i];
                if (item && matchesQuestItem(item, quest)) return true;
            }
            for (let i = 0; i < bagData.length; i++) {
                const item = bagData[i];
                if (item && matchesQuestItem(item, quest)) return true;
            }
            return false;
        }

        // フィールド上のアイテムのふちをグリーンに光らせる処理
        function updateItemDeliverableHighlights() {
            // フィールド上のアイテムかつ、現在のクエストのいずれかと一致するか判定
            // クエストカード（ミニリスト）の納品可能ハイライト
            const questCards = document.querySelectorAll('.quest-card-mini');
            questCards.forEach((card, index) => {
                if (randomQuests[index]) {
                    const isDeliverable = checkIsQuestDeliverable(randomQuests[index]);
                    if (isDeliverable) {
                        card.classList.add('deliverable');
                    } else {
                        card.classList.remove('deliverable');
                    }
                }
            });

            // フィールド上のアイテムのふちを光らせる処理（各セル内のDOMを直接安全にチェック）
            const cellElems = document.querySelectorAll('#grid-field .cell');
            cellElems.forEach((cell, idx) => {
                const itemElem = cell.querySelector('.item');
                if (itemElem) {
                    const itemData = fieldData[idx];
                    let canDeliver = itemData ? randomQuests.some(q => matchesQuestItem(itemData, q)) : false;
                    if (canDeliver) {
                        itemElem.classList.add('deliverable-item');
                    } else {
                        itemElem.classList.remove('deliverable-item');
                    }
                }
            });
        }

        function fulfillQuest(questIndex) {
            const quest = randomQuests[questIndex];
            let foundLocation = null, foundIndex = -1;

            for (let i = 0; i < fieldData.length; i++) {
                const item = fieldData[i];
                if (item && matchesQuestItem(item, quest)) { foundLocation = 'field'; foundIndex = i; break; }
            }
            if (!foundLocation) {
                for (let i = 0; i < bagData.length; i++) {
                    const item = bagData[i];
                    if (item && matchesQuestItem(item, quest)) { foundLocation = 'bag'; foundIndex = i; break; }
                }
            }

            if (!foundLocation) {
                alert(`ボード上（フィールドまたはバッグ）に対象の「${quest.catName}」が見つかりません！`);
                return;
            }

            if (foundLocation === 'field') { fieldData[foundIndex] = null; renderField(); }
            else { bagData[foundIndex] = null; renderBag(); }

            coins += quest.reward;
            
            // 報酬に応じたEXPを獲得（例：報酬コインの半分、またはクエスト難易度に応じた数値）
            const earnedExp = Math.floor(quest.reward * 0.5);
            addExp(earnedExp);
            
            updateStatusDisplay();

            randomQuests[questIndex] = generateRandomQuest();
            renderTopQuestUI();

            dailyProgress.questCleared = true;
            updateDailyUI();
            alert('クエストをクリアしました！');
        }

        function matchesQuestItem(item, quest) {
            if (quest.type === 'base') {
                return item.category === quest.category && item.level === quest.level;
            } else {
                return item.category === 'crafted' && item.craftedId === quest.craftedId;
            }
        }

        /* ==========================================
           アイテムメニューポップアップ
           ========================================== */
        function openItemMenuModal(locationType, index, itemData) {
            currentSelectedItem = { type: locationType, index: index, data: itemData };
            const nameStr = itemData.category === 'crafted' ? itemData.name : `${CATEGORIES.find(c=>c.id===itemData.category).name} (Lv.${itemData.level})`;
            document.getElementById('menu-item-title').innerText = nameStr;
            document.getElementById('item-menu-modal').style.display = 'flex';
        }
        function closeItemMenuModal() { document.getElementById('item-menu-modal').style.display = 'none'; currentSelectedItem = null; }

        function menuActionBag() {
            if (!currentSelectedItem) return;
            const emptyBagIdx = bagData.findIndex(slot => slot === null);
            if (emptyBagIdx === -1) { alert('バッグがいっぱいです！'); closeItemMenuModal(); return; }
            bagData[emptyBagIdx] = fieldData[currentSelectedItem.index];
            fieldData[currentSelectedItem.index] = null;
            renderField();
            renderBag();
            closeItemMenuModal();
        }

        function menuActionSell() {
            if (!currentSelectedItem) return;
            const item = currentSelectedItem.data;
            const price = item.category === 'crafted' ? 150 : item.level * 15;
            coins += price;
            fieldData[currentSelectedItem.index] = null;
            renderField();

            dailyProgress.sold = true;
            updateDailyUI();
            updateStatusDisplay();
            closeItemMenuModal();
        }

        function openBagMenuModal(index, itemData) {
            currentBagSelectedItem = { index: index, data: itemData };
            const nameStr = itemData.category === 'crafted' ? itemData.name : `${CATEGORIES.find(c=>c.id===itemData.category).name} (Lv.${itemData.level})`;
            document.getElementById('bag-menu-item-title').innerText = nameStr;
            document.getElementById('bag-menu-modal').style.display = 'flex';
        }
        function closeBagMenuModal() { document.getElementById('bag-menu-modal').style.display = 'none'; currentBagSelectedItem = null; }

        function menuActionTakeOut() {
            if (!currentBagSelectedItem) return;
            const emptyFieldIdx = getFirstEmptyCellIndex();
            if (emptyFieldIdx === -1) { alert('フィールドに空きマスがありません！'); closeBagMenuModal(); return; }

            fieldData[emptyFieldIdx] = bagData[currentBagSelectedItem.index];
            bagData[currentBagSelectedItem.index] = null;
            renderField();
            renderBag();
            closeBagMenuModal();
        }

        function menuActionBagSell() {
            if (!currentBagSelectedItem) return;
            const item = currentBagSelectedItem.data;
            const price = item.category === 'crafted' ? 150 : item.level * 15;
            coins += price;
            bagData[currentBagSelectedItem.index] = null;
            renderBag();

            dailyProgress.sold = true;
            updateDailyUI();
            updateStatusDisplay();
            closeBagMenuModal();
        }

        /* ==========================================
           バッグ機能
           ========================================== */
        function initBagDOM() {
            const bagGrid = document.getElementById('bag-grid-container');
            bagGrid.innerHTML = '';
            for (let i = 0; i < bagData.length; i++) {
                const slot = document.createElement('div');
                slot.className = 'bag-slot';
                slot.dataset.bagIndex = i;
                bagGrid.appendChild(slot);
            }
        }

        function renderBag() {
            const bagGrid = document.getElementById('bag-grid-container');
            const slots = bagGrid.children;
            for (let i = 0; i < bagData.length; i++) {
                const slot = slots[i];
                const existing = slot.querySelector('.item');
                if (existing) existing.remove();

                const itemData = bagData[i];
                if (itemData) {
                    slot.appendChild(createItemElement(itemData, 'bag', i));
                }
            }
            saveGame();
        }

        function moveFieldToBag(fieldIdx, bagIdx) {
            if (bagData[bagIdx] !== null) { alert('そのバッグスロットには既にアイテムがあります！'); return; }
            bagData[bagIdx] = fieldData[fieldIdx];
            fieldData[fieldIdx] = null;
            renderField();
            renderBag();
        }

        function moveBagToField(bagIdx, fieldIdx) {
            if (fieldData[fieldIdx] !== null) { alert('フィールドのそのマス既にアイテムがあります！'); return; }
            fieldData[fieldIdx] = bagData[bagIdx];
            bagData[bagIdx] = null;
            renderField();
            renderBag();
        }

        function openBagModal() { renderBag(); document.getElementById('bag-modal').style.display = 'flex'; }
        function closeBagModal() { document.getElementById('bag-modal').style.display = 'none'; }

        /* ==========================================
           デイリークエスト機能
           ========================================== */
        function openDailyModal() { updateDailyUI(); document.getElementById('daily-modal').style.display = 'flex'; }
        function closeDailyModal() { document.getElementById('daily-modal').style.display = 'none'; }

        function updateDailyUI() {
            const mergeStatus = document.getElementById('daily-merge-status');
            const sellStatus = document.getElementById('daily-sell-status');
            const questStatus = document.getElementById('daily-quest-status');
            const claimBtn = document.getElementById('daily-claim-btn');

            if (dailyProgress.merged) { mergeStatus.innerText = '完了済 ✔'; mergeStatus.className = 'daily-status done'; }
            if (dailyProgress.sold) { sellStatus.innerText = '完了済 ✔'; sellStatus.className = 'daily-status done'; }
            if (dailyProgress.questCleared) { questStatus.innerText = '完了済 ✔'; questStatus.className = 'daily-status done'; }

            if (dailyProgress.merged && dailyProgress.sold && dailyProgress.questCleared && !dailyProgress.claimed) {
                claimBtn.disabled = false;
            }
            if (dailyProgress.claimed) { claimBtn.innerText = '受取済み'; claimBtn.disabled = true; }
            saveGame();
        }

        function claimDailyReward() {
            stamina = maxStamina;
            dailyProgress.claimed = true;
            updateStatusDisplay();
            updateDailyUI();
            alert('デイリー報酬として体力が全回復しました！');
        }

        /* ==========================================
           図鑑 ＆ クラフトレシピブック
           ========================================== */
        function openZukanModal() { document.getElementById('zukan-modal').style.display = 'flex'; buildZukanUI(); buildRecipeBookUI(); }
        function closeZukanModal() { document.getElementById('zukan-modal').style.display = 'none'; }

        function switchTab(tabName) {
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            if (tabName === 'zukan') {
                document.querySelectorAll('.tab-btn')[0].classList.add('active');
                document.getElementById('tab-zukan').classList.add('active');
            } else {
                document.querySelectorAll('.tab-btn')[1].classList.add('active');
                document.getElementById('tab-craft').classList.add('active');
            }
        }

        function unlockZukanItem(catId, level) {
            unlockedZukan[`${catId}_${level}`] = true;
            saveGame();
        }

        function unlockZukanOrCraft(craftedItem) {
            unlockedZukan[`crafted_${craftedItem.craftedId}`] = true;
            saveGame();
        }

        function buildZukanUI() {
            const container = document.getElementById('zukan-content-container');
            container.innerHTML = '';
            CATEGORIES.forEach(cat => {
                if (cat.id === 'crafted') return;
                const catDiv = document.createElement('div');
                catDiv.className = 'zukan-category';
                catDiv.innerHTML = `<div class="zukan-cat-title">${cat.name}系統</div>`;
                const gridDiv = document.createElement('div');
                gridDiv.className = 'zukan-grid';
                for (let lv = 1; lv <= MAX_LEVEL; lv++) {
                    const slot = document.createElement('div');
                    const key = `${cat.id}_${lv}`;
                    if (unlockedZukan[key]) {
                        slot.className = 'zukan-slot unlocked';
                        slot.innerHTML = `<img src="${getItemIconBook(cat, lv)}"><div class="lv-badge">Lv${lv}</div>`;
                    } else {
                        slot.className = 'zukan-slot';
                        slot.innerHTML = `<div class="unknown-mark">?</div>`;
                    }
                    gridDiv.appendChild(slot);
                }
                catDiv.appendChild(gridDiv);
                container.appendChild(catDiv);
            });
        }

        function buildRecipeBookUI() {
            const container = document.getElementById('recipe-list-container');
            container.innerHTML = '';

            CRAFT_RECIPES.forEach(rec => {
                const card = document.createElement('div');
                card.className = 'recipe-card';

                const isUnlocked = unlockedRecipes[rec.id];

                const formulaDiv = document.createElement('div');
                formulaDiv.className = 'recipe-formula';

                // ing1 または ing2 に craft（特製品）が含まれているか判定する
                // ing.craftedId が存在すればクラフトアイテム
                const isIng1Crafted = !!rec.ing1.craftedId;
                const isIng2Crafted = !!rec.ing2.craftedId;
                
                // クラフト品が含まれているならオレンジ枠、ベースアイテムだけなら緑枠
                const borderColor1 = isIng1Crafted ? '#e67e22' : '#2ed573'; // オレンジ or 緑
                const borderColor2 = isIng2Crafted ? '#e67e22' : '#2ed573'; // オレンジ or 緑
                if (isUnlocked) {

                    formulaDiv.innerHTML = `
                        <div class="recipe-icon-box" style="border-color:${borderColor1};"><img src="${getIngIconUrl(rec.ing1)}"></div>
                        <span>＋</span>
                        <div class="recipe-icon-box" style="border-color:${borderColor2};"><img src="${getIngIconUrl(rec.ing2)}"></div>
                        <span>＝</span>
                        <div class="recipe-icon-box" style="border-color:#e67e22;"><img src="${getItemIconBook(rec.item)}"></div>
                        <span style="margin-left:6px;">${rec.item.name}</span>
                    `;
                } else {
                    formulaDiv.innerHTML = `
                        <div class="recipe-icon-box" style="border-color:${borderColor1};"><span class="recipe-unknown">?</span></div>
                        <span>＋</span>
                        <div class="recipe-icon-box" style="border-color:${borderColor2};"><span class="recipe-unknown">?</span></div>
                        <span>＝</span>
                        <div class="recipe-icon-box" style="border-color:#e67e22;"><span class="recipe-unknown">?</span></div>
                        <span style="margin-left:6px; color:#a4b0be;">??? (未発見)</span>
                    `;
                }
                card.appendChild(formulaDiv);
                container.appendChild(card);
            });
        }

        // 次のレベルに必要な経験値を計算する関数（Lvに応じて必要量が少しずつ増える例）
        function getRequiredExp(level) {
            if (level >= 999) return Infinity; // 最大Lv.999
            return Math.floor(100 * Math.pow(1.05, level - 1));
        }

        // EXPを加算し、レベルアップ判定を行う関数
        function addExp(amount) {
            if (playerLevel >= 999) return;

            playerExp += amount;
            let requiredExp = getRequiredExp(playerLevel);

            while (playerExp >= requiredExp && playerLevel < 999) {
                playerExp -= requiredExp;
                playerLevel += 1;
                requiredExp = getRequiredExp(playerLevel);
                
                // レベルアップ時のボーナス（お好みでスタミナ全快など）
                stamina = maxStamina;
                alert(`🎉 レベルが ${playerLevel} に上がりました！スタミナが全回復しました！`);
            }
            updateStatusDisplay();
        }