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

        const MAX_LEVEL = 10;
        const COLS = 7;
        const ROWS = 9;
        const TOTAL_CELLS = COLS * ROWS;

        const CRAFT_RECIPES = [
            { id: 'thread', name: '糸', item: { cat: 'crafted', id: 'thread', name: '糸', level: 1, baseColor: '#9b59b6', secColor: '#8e44ad', symbol: '🧵' }, ing1: { cat: 'grass', level: 3 }, ing2: { cat: 'stone', level: 3 } },
            { id: 'knife', name: 'ナイフ', item: { cat: 'crafted', id: 'knife', name: 'ナイフ', level: 1, baseColor: '#95a5a6', secColor: '#7f8c8d', symbol: '🔪' }, ing1: { cat: 'stone', level: 3 }, ing2: { cat: 'tree', level: 3 } },
            { id: 'sand', name: '砂', item: { cat: 'crafted', id: 'sand', name: '砂', level: 1, baseColor: '#f1c40f', secColor: '#f39c12', symbol: '⏳' }, ing1: { cat: 'stone', level: 1 }, ing2: { craftedId: 'knife' } },
            { id: 'gear', name: '歯車', item: { cat: 'crafted', id: 'gear', name: '歯車', level: 1, baseColor: '#7f8c8d', secColor: '#34495e', symbol: '⚙️' }, ing1: { cat: 'stone', level: 2 }, ing2: { craftedId: 'knife' } },
            { id: 'pot', name: '石の器', item: { cat: 'crafted', id: 'pot', name: '石の器', level: 1, baseColor: '#95a5a6', secColor: '#34495e', symbol: '🥣' }, ing1: { cat: 'stone', level: 3 }, ing2: { craftedId: 'knife' } },
            { id: 'flint', name: '火打石', item: { cat: 'crafted', id: 'flint', name: '火打石', level: 1, baseColor: '#e74c3c', secColor: '#c0392b', symbol: '🔥' }, ing1: { cat: 'stone', level: 2 }, ing2: { craftedId: 'knife' } },
            { id: 'shell', name: '貝殻', item: { cat: 'crafted', id: 'shell', name: '貝殻', level: 1, baseColor: '#ff9ff3', secColor: '#f368e0', symbol: '🐚' }, ing1: { cat: 'stone', level: 1 }, ing2: { cat: 'flower', level: 2 } },
            { id: 'nuts', name: '木の実', item: { cat: 'crafted', id: 'nuts', name: '木の実', level: 1, baseColor: '#d35400', secColor: '#e67e22', symbol: '🌰' }, ing1: { cat: 'tree', level: 2 }, ing2: { cat: 'flower', level: 2 } },
            { id: 'letter', name: '手紙', item: { cat: 'crafted', id: 'letter', name: '手紙', level: 1, baseColor: '#ecf0f1', secColor: '#bdc3c7', symbol: '✉️' }, ing1: { cat: 'flower', level: 1 }, ing2: { craftedId: 'thread' } },
            { id: 'rod', name: '釣竿', item: { cat: 'crafted', id: 'rod', name: '釣竿', level: 1, baseColor: '#d35400', secColor: '#e67e22', symbol: '🎣' }, ing1: { cat: 'tree', level: 3 }, ing2: { craftedId: 'thread' } },
            { id: 'net', name: '投網', item: { cat: 'crafted', id: 'net', name: '投網', level: 1, baseColor: '#3498db', secColor: '#2980b9', symbol: '🥅' }, ing1: { craftedId: 'thread' }, ing2: { craftedId: 'thread' } },
            { id: 'bignet', name: '丈夫な投網', item: { cat: 'crafted', id: 'bignet', name: '丈夫な投網', level: 1, baseColor: '#2980b9', secColor: '#1f618d', symbol: '🕸️' }, ing1: { craftedId: 'net' }, ing2: { craftedId: 'net' } },
            { id: 'bait', name: '釣り餌', item: { cat: 'crafted', id: 'bait', name: '釣り餌', level: 1, baseColor: '#e67e22', secColor: '#d35400', symbol: '🪱' }, ing1: { craftedId: 'nuts' }, ing2: { cat: 'grass', level: 2 } },
            { id: 'baitedthread', name: '釣り餌の着いた糸', item: { cat: 'crafted', id: 'baitedthread', name: '釣り餌の着いた糸', level: 1, baseColor: '#e67e22', secColor: '#e67e22', symbol: '🪡' }, ing1: { craftedId: 'bait' }, ing2: { craftedId: 'thread' } },
            { id: 'baitedrod', name: '釣り餌の着いた釣竿', item: { cat: 'crafted', id: 'baitedrod', name: '釣り餌の着いた釣竿', level: 1, baseColor: '#e67e22', secColor: '#b9770e', symbol: '🥢' }, ing1: { craftedId: 'baitedthread' }, ing2: { cat: 'tree', level: 3 } },
            { id: 'lure', name: 'ルアー', item: { cat: 'crafted', id: 'lure', name: 'ルアー', level: 1, baseColor: '#1abc9c', secColor: '#16a085', symbol: '🐟' }, ing1: { cat: 'stone', level: 2 }, ing2: { cat: 'tree', level: 2 } },
            { id: 'lurethread', name: 'ルアーの付いた糸', item: { cat: 'crafted', id: 'lurethread', name: 'ルアーの付いた糸', level: 1, baseColor: '#1abc9c', secColor: '#117a65', symbol: '🧶' }, ing1: { craftedId: 'lure' }, ing2: { craftedId: 'thread' } },
            { id: 'lurerod', name: 'ルアーの付いた釣竿', item: { cat: 'crafted', id: 'lurerod', name: 'ルアーの付いた釣竿', level: 1, baseColor: '#16a085', secColor: '#0e6655', symbol: '🎋' }, ing1: { craftedId: 'lurethread' }, ing2: { cat: 'tree', level: 3 } },
            { id: 'frypan', name: 'フライパン', item: { cat: 'crafted', id: 'frypan', name: 'フライパン', level: 1, baseColor: '#34495e', secColor: '#2c3e50', symbol: '🍳' }, ing1: { craftedId: 'pot' }, ing2: { cat: 'tree', level: 4 } },
            { id: 'potpan', name: '鍋', item: { cat: 'crafted', id: 'potpan', name: '鍋', level: 1, baseColor: '#7f8c8d', secColor: '#95a5a6', symbol: '🍲' }, ing1: { craftedId: 'pot' }, ing2: { cat: 'tree', level: 3 } },
            { id: 'axe', name: '斧', item: { cat: 'crafted', id: 'axe', name: '斧', level: 1, baseColor: '#e74c3c', secColor: '#c0392b', symbol: '🪓' }, ing1: { craftedId: 'knife' }, ing2: { cat: 'tree', level: 5 } },
            { id: 'maki', name: 'まき', item: { cat: 'crafted', id: 'maki', name: 'まき', level: 1, baseColor: '#d35400', secColor: '#ba4a00', symbol: '🪵' }, ing1: { cat: 'tree', level: 5 }, ing2: { craftedId: 'axe' } },
            { id: 'campfire', name: '焚き火', item: { cat: 'crafted', id: 'campfire', name: '焚き火', level: 1, baseColor: '#e67e22', secColor: '#cf711f', symbol: '🏕️' }, ing1: { craftedId: 'maki' }, ing2: { craftedId: 'flint' } },
            { id: 'bottle', name: 'きれいな小瓶', item: { cat: 'crafted', id: 'bottle', name: 'きれいな小瓶', level: 1, baseColor: '#00d2d3', secColor: '#01a3a4', symbol: '🍾' }, ing1: { craftedId: 'pot' }, ing2: { craftedId: 'sand' } },
            { id: 'hourglass', name: '砂時計', item: { cat: 'crafted', id: 'hourglass', name: '砂時計', level: 1, baseColor: '#ff9f43', secColor: '#ee5253', symbol: '⌛' }, ing1: { craftedId: 'bottle' }, ing2: { craftedId: 'sand' } },
            { id: 'clock', name: '時計', item: { cat: 'crafted', id: 'clock', name: '時計', level: 1, baseColor: '#54a0ff', secColor: '#2e86de', symbol: '⏰' }, ing1: { craftedId: 'gear' }, ing2: { craftedId: 'gear' } },
            { id: 'boundflower', name: '縛った花', item: { cat: 'crafted', id: 'boundflower', name: '縛った花', level: 1, baseColor: '#ff6b81', secColor: '#ff4757', symbol: '💐' }, ing1: { cat: 'flower', level: 5 }, ing2: { craftedId: 'thread' } },
            { id: 'smallbouquet', name: '小さい花束', item: { cat: 'crafted', id: 'smallbouquet', name: '小さい花束', level: 1, baseColor: '#ff4757', secColor: '#ff6b81', symbol: '🌷' }, ing1: { craftedId: 'boundflower' }, ing2: { craftedId: 'boundflower' } },
            { id: 'midbouquet', name: '中くらいの花束', item: { cat: 'crafted', id: 'midbouquet', name: '中くらいの花束', level: 1, baseColor: '#ff3838', secColor: '#ff4d4d', symbol: '🌻' }, ing1: { craftedId: 'smallbouquet' }, ing2: { craftedId: 'boundflower' } },
            { id: 'bigbouquet', name: '大きい花束', item: { cat: 'crafted', id: 'bigbouquet', name: '大きい花束', level: 1, baseColor: '#ff4d4d', secColor: '#fa8231', symbol: '🌹' }, ing1: { craftedId: 'midbouquet' }, ing2: { craftedId: 'boundflower' } },
            { id: 'bugnet', name: '虫あみ', item: { cat: 'crafted', id: 'bugnet', name: '虫あみ', level: 1, baseColor: '#27ae60', secColor: '#2ecc71', symbol: '🦋' }, ing1: { cat: 'grass', level: 3 }, ing2: { craftedId: 'thread' } },
            { id: 'skewer', name: '串焼き', item: { cat: 'crafted', id: 'skewer', name: '串焼き', level: 1, baseColor: '#d35400', secColor: '#e67e22', symbol: '🍡' }, ing1: { cat: 'tree', level: 2 }, ing2: { craftedId: 'nuts' } },
            { id: 'plates', name: 'スープ皿', item: { cat: 'crafted', id: 'plates', name: 'スープ皿', level: 1, baseColor: '#bdc3c7', secColor: '#95a5a6', symbol: '🥣' }, ing1: { craftedId: 'pot' }, ing2: { cat: 'flower', level: 3 } },
            { id: 'woodflute', name: '木の笛', item: { cat: 'crafted', id: 'woodflute', name: '木の笛', level: 1, baseColor: '#d35400', secColor: '#b9770e', symbol: '🎵' }, ing1: { cat: 'tree', level: 3 }, ing2: { cat: 'stone', level: 2 } },
            { id: 'ukuleleparts', name: '弦楽器のパーツ', item: { cat: 'crafted', id: 'ukuleleparts', name: '弦楽器のパーツ', level: 1, baseColor: '#e67e22', secColor: '#d35400', symbol: '🪵' }, ing1: { cat: 'tree', level: 4 }, ing2: { craftedId: 'thread' } },
            { id: 'miniyuku', name: 'ミニウクレレ', item: { cat: 'crafted', id: 'miniyuku', name: 'ミニウクレレ', level: 1, baseColor: '#f39c12', secColor: '#d35400', symbol: '🎸' }, ing1: { craftedId: 'ukuleleparts' }, ing2: { cat: 'tree', level: 4 } },
            { id: 'charm', name: 'お守り', item: { cat: 'crafted', id: 'charm', name: 'お守り', level: 1, baseColor: '#e74c3c', secColor: '#c0392b', symbol: '🎋' }, ing1: { craftedId: 'boundflower' }, ing2: { cat: 'stone', level: 3 } }
        ];

        let stamina = 10000;
        let maxStamina = 10000;
        let coins = 500;

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
            const saveData = { stamina, coins, fieldData, bagData, unlockedZukan, unlockedRecipes, randomQuests, dailyProgress };
            localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        }

        function loadGame() {
            const savedJson = localStorage.getItem(SAVE_KEY);
            if (savedJson) {
                try {
                    const data = JSON.parse(savedJson);
                    stamina = data.stamina ?? 10000;
                    coins = data.coins ?? 500;
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

        function initIcons() {
            CATEGORIES.forEach(cat => {
                if (cat.id !== 'crafted') {
                    let symbol = '🌿';
                    if (cat.id === 'flower') symbol = '🌸';
                    else if (cat.id === 'tree') symbol = '🌲';
                    else if (cat.id === 'stone') symbol = '💎';

                    for (let lv = 1; lv <= MAX_LEVEL; lv++) {
                        itemIcons[`${cat.id}_${lv}`] = generateItemIcon(cat.iconBaseColor, cat.secondaryColor, symbol, `Lv.${lv}`, lv);
                    }
                }
            });

            CRAFT_RECIPES.forEach(rec => {
                itemIcons[`crafted_${rec.id}`] = generateItemIcon(rec.item.baseColor, rec.item.secColor, rec.item.symbol, '', null);
            });
        }

        function getItemIconUrl(item) {
            if (item.category === 'crafted') {
                return itemIcons[`crafted_${item.craftedId}`];
            } else {
                return itemIcons[`${item.category}_${item.level}`];
            }
        }

        /* ==========================================
           初期化処理
           ========================================== */
        window.onload = function() {
            initIcons();
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
           アイテム要素 ＆ ポインターD&D (スクロール誤作動防止対応)
           ========================================== */
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

            let hasMoved = false;

            itemDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!hasMoved) {
                    if (locationType === 'field') openItemMenuModal(locationType, index, itemData);
                    else openBagMenuModal(index, itemData);
                }
            });

            let startX = 0, startY = 0, isDragging = false;
            itemDiv.onpointerdown = function(event) {
                if (event.button !== 0 && event.pointerType === 'mouse') return;
                startX = event.clientX;
                startY = event.clientY;
                hasMoved = false;
                isDragging = false;
            };

            itemDiv.onpointermove = function(event) {
                if (event.buttons) {
                    if (Math.hypot(event.clientX - startX, event.clientY - startY) > 4) {
                        hasMoved = true;
                        isDragging = true;
                    }
                    if (isDragging) {
                        event.preventDefault(); // ドラッグ中の画面スクロールを完全に防止
                        this.style.left     = (parseInt(this.style.left || 0) + event.movementX) + 'px';
                        this.style.top      = (parseInt(this.style.top || 0) + event.movementY) + 'px';
                        this.style.position = 'absolute';
                        this.style.zIndex   = '1000';
                        try { this.setPointerCapture(event.pointerId); } catch(e){}
                    }
                }
            };

            itemDiv.onpointerup = function(event) {
                if (isDragging) {
                    try { this.releasePointerCapture(event.pointerId); } catch(e){}
                    this.style.position = 'relative';
                    this.style.left = '0px';
                    this.style.top = '0px';
                    this.style.zIndex = '5';

                    const dropTarget = document.elementFromPoint(event.clientX, event.clientY);
                    handlePointerDrop(locationType, index, dropTarget);
                }
                isDragging = false;
            };

            return itemDiv;
        }

        function handlePointerDrop(srcLocation, srcIndex, dropTarget) {
            if (!dropTarget) return;

            const bagSlotElem = dropTarget.closest('.bag-slot');
            if (bagSlotElem) {
                const destBagIndex = parseInt(bagSlotElem.dataset.bagIndex);
                if (srcLocation === 'field') moveFieldToBag(srcIndex, destBagIndex);
                return;
            }

            const cellElem = dropTarget.closest('.cell');
            if (cellElem) {
                const destIndex = parseInt(cellElem.dataset.index);
                if (srcLocation === 'field') processFieldInteraction(srcIndex, destIndex);
                else if (srcLocation === 'bag') moveBagToField(srcIndex, destIndex);
                return;
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
            let chosenCat = rand < 40 ? 'grass' : rand < 70 ? 'flower' : rand < 90 ? 'tree' : 'stone';
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
                let chosenCat = rand < 40 ? 'grass' : rand < 70 ? 'flower' : rand < 90 ? 'tree' : 'stone';
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
            saveGame();
        }

        /* ==========================================
           常時表示クエスト機能 (クラフト品30%確率追加 ＆ 一括リセット)
           ========================================== */
        function generateRandomQuest() {
            // 約30%の確率でクラフト品クエスト、70%の確率で通常ベース素材クエスト
            const isCrafted = Math.random() < 0.3;

            if (isCrafted) {
                const rec = CRAFT_RECIPES[Math.floor(Math.random() * CRAFT_RECIPES.length)];
                return {
                    type: 'crafted',
                    craftedId: rec.id,
                    catName: rec.item.name,
                    reward: 300 + Math.floor(Math.random() * 200)
                };
            } else {
                const cat = CATEGORIES.filter(c => c.id !== 'crafted')[Math.floor(Math.random() * 4)];
                const levels = [3, 3, 4, 4, 5, 5, 6, 7, 8];
                const lv = levels[Math.floor(Math.random() * levels.length)];
                return {
                    type: 'base',
                    category: cat.id,
                    catName: cat.name,
                    level: lv,
                    reward: lv * 50 + Math.floor(Math.random() * 50)
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

                const img = document.createElement('img');
                if (quest.type === 'base') {
                    img.src = itemIcons[`${quest.category}_${quest.level}`];
                } else {
                    img.src = itemIcons[`crafted_${quest.craftedId}`];
                }
                card.appendChild(img);

                const title = document.createElement('div');
                title.className = 'quest-card-title';
                title.innerText = quest.type === 'base' ? `${quest.catName} (Lv.${quest.level})` : `${quest.catName}`;
                card.appendChild(title);

                const reward = document.createElement('div');
                reward.className = 'quest-card-reward';
                reward.innerText = `💰 ${quest.reward}`;
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
            if (fieldData[fieldIdx] !== null) { alert('フィールドのそのマスには既にアイテムがあります！'); return; }
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
                        slot.innerHTML = `<img src="${itemIcons[key]}"><div class="lv-badge">Lv${lv}</div>`;
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

                if (isUnlocked) {
                    formulaDiv.innerHTML = `
                        <div class="recipe-icon-box"><img src="${getIngIconUrl(rec.ing1)}"></div>
                        <span>＋</span>
                        <div class="recipe-icon-box"><img src="${getIngIconUrl(rec.ing2)}"></div>
                        <span>＝</span>
                        <div class="recipe-icon-box" style="border-color:#2ed573;"><img src="${itemIcons[`crafted_${rec.id}`]}"></div>
                        <span style="margin-left:6px;">${rec.item.name}</span>
                    `;
                } else {
                    formulaDiv.innerHTML = `
                        <div class="recipe-icon-box"><span class="recipe-unknown">?</span></div>
                        <span>＋</span>
                        <div class="recipe-icon-box"><span class="recipe-unknown">?</span></div>
                        <span>＝</span>
                        <div class="recipe-icon-box"><span class="recipe-unknown">?</span></div>
                        <span style="margin-left:6px; color:#a4b0be;">??? (未発見)</span>
                    `;
                }
                card.appendChild(formulaDiv);
                container.appendChild(card);
            });
        }

        function getIngIconUrl(ing) {
            if (ing.craftedId) {
                const targetRec = CRAFT_RECIPES.find(r => r.id === ing.craftedId);
                return itemIcons[`crafted_${targetRec.id}`];
            } else {
                return itemIcons[`${ing.cat}_${ing.level}`];
            }
        }