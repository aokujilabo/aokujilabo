
        /* ==========================================
           定数・データ定義
           ========================================== */
        const CATEGORIES = [
            { id: 'grass', name: '草', iconBaseColor: '#2ecc71', secondaryColor: '#27ae60' },
            { id: 'flower', name: '花', iconBaseColor: '#e84393', secondaryColor: '#fd79a8' },
            { id: 'tree', name: '木', iconBaseColor: '#e67e22', secondaryColor: '#d35400' },
            { id: 'stone', name: '石', iconBaseColor: '#718093', secondaryColor: '#4a5568' }
        ];

        const MAX_LEVEL = 10;
        const COLS = 7;
        const ROWS = 9;
        const TOTAL_CELLS = COLS * ROWS;

        let stamina = 10000;
        let maxStamina = 10000;
        let coins = 500;

        let fieldData = new Array(TOTAL_CELLS).fill(null);
        let bagData = new Array(20).fill(null);
        let unlockedZukan = {};
        let itemIcons = {};

        let randomQuests = [];
        let dailyProgress = {
            merged: false,
            sold: false,
            questCleared: false,
            claimed: false
        };

        let currentSelectedItem = null;

        /* ==========================================
           ローカルストレージ セーブ ＆ ロード機能
           ========================================== */
        const SAVE_KEY = 'merge_game_save_data_v1';

        function saveGame() {
            const saveData = {
                stamina,
                coins,
                fieldData,
                bagData,
                unlockedZukan,
                randomQuests,
                dailyProgress
            };
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
                    randomQuests = data.randomQuests ?? [];
                    dailyProgress = data.dailyProgress ?? { merged: false, sold: false, questCleared: false, claimed: false };
                    return true;
                } catch (e) {
                    console.error('セーブデータの読み込みに失敗しました', e);
                }
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
           アイコン生成
           ========================================== */
        function generateItemIcon(catId, level) {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            const cat = CATEGORIES.find(c => c.id === catId);

            ctx.fillStyle = cat.iconBaseColor;
            ctx.beginPath();
            ctx.arc(32, 32, 28, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = cat.secondaryColor;
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            let symbol = '🌿';
            if (catId === 'flower') symbol = '🌸';
            else if (catId === 'tree') symbol = '🌲';
            else if (catId === 'stone') symbol = '💎';

            ctx.fillText(symbol, 32, 26);
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.font = 'bold 14px sans-serif';
            ctx.fillText(`Lv.${level}`, 32, 52);

            return canvas.toDataURL();
        }

        function initIcons() {
            CATEGORIES.forEach(cat => {
                for (let lv = 1; lv <= MAX_LEVEL; lv++) {
                    itemIcons[`${cat.id}_${lv}`] = generateItemIcon(cat.id, lv);
                }
            });
        }

        /* ==========================================
           初期化処理
           ========================================== */
        window.onload = function() {
            initIcons();
            initFieldDOM();
            initBagDOM();

            // セーブデータがあれば読み込み、なければ初期配置
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

            buildZukanUI();
            buildCraftUI();
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
            saveGame(); // 状態が変わるごとに自動セーブ
        }

        /* ==========================================
           アイテム要素 ＆ ポインターイベントD&D処理
           ========================================== */
        function createItemElement(itemData, locationType, index) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';

            const iconImg = document.createElement('img');
            iconImg.src = itemIcons[`${itemData.category}_${itemData.level}`];
            itemDiv.appendChild(iconImg);

            const lvBadge = document.createElement('div');
            lvBadge.className = 'item-level';
            lvBadge.innerText = `Lv${itemData.level}`;
            itemDiv.appendChild(lvBadge);

            let hasMoved = false;

            itemDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!hasMoved) {
                    openItemMenuModal(locationType, index, itemData);
                }
            });

            let startX = 0, startY = 0;
            let isDragging = false;

            itemDiv.onpointerdown = function(event) {
                if (event.button !== 0 && event.pointerType === 'mouse') return;
                startX = event.clientX;
                startY = event.clientY;
                hasMoved = false;
                isDragging = false;
            };

            itemDiv.onpointermove = function(event) {
                if (event.buttons) {
                    const moveDist = Math.hypot(event.clientX - startX, event.clientY - startY);
                    if (moveDist > 4) {
                        hasMoved = true;
                        isDragging = true;
                    }

                    if (isDragging) {
                        this.style.left     = (parseInt(this.style.left || 0) + event.movementX) + 'px';
                        this.style.top      = (parseInt(this.style.top || 0) + event.movementY) + 'px';
                        this.style.position = 'absolute';
                        this.style.zIndex   = '1000';
                        this.setPointerCapture(event.pointerId);
                    }
                }
            };

            itemDiv.onpointerup = function(event) {
                if (isDragging) {
                    this.releasePointerCapture(event.pointerId);
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
                if (srcLocation === 'field') {
                    moveFieldToBag(srcIndex, destBagIndex);
                }
                return;
            }

            const cellElem = dropTarget.closest('.cell');
            if (cellElem) {
                const destIndex = parseInt(cellElem.dataset.index);
                if (srcLocation === 'field') {
                    processFieldMergeOrMove(srcIndex, destIndex);
                } else if (srcLocation === 'bag') {
                    moveBagToField(srcIndex, destIndex);
                }
                return;
            }
        }

        function processFieldMergeOrMove(srcIdx, destIdx) {
            if (srcIdx === destIdx) return;
            const srcItem = fieldData[srcIdx];
            const destItem = fieldData[destIdx];
            if (!srcItem) return;

            if (!destItem) {
                fieldData[destIdx] = srcItem;
                fieldData[srcIdx] = null;
            } else {
                if (srcItem.category === destItem.category && srcItem.level === destItem.level) {
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

        /* ==========================================
           採集・スタミナ
           ========================================== */
        function gatherItem() {
            if (stamina < 10) {
                alert('スタミナが足りません！');
                return;
            }
            const emptyIndices = [];
            for (let i = 0; i < TOTAL_CELLS; i++) if (fieldData[i] === null) emptyIndices.push(i);
            if (emptyIndices.length === 0) {
                alert('フィールドに空きマスがありません！');
                return;
            }

            stamina -= 10;
            updateStatusDisplay();

            const rand = Math.random() * 100;
            let chosenCat = rand < 40 ? 'grass' : rand < 70 ? 'flower' : rand < 90 ? 'tree' : 'stone';
            const randomCellIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            fieldData[randomCellIdx] = { category: chosenCat, level: 1 };
            unlockZukanItem(chosenCat, 1);
            renderField();

            if (randomQuests.length < 5) {
                randomQuests.push(generateRandomQuest());
                renderTopQuestUI();
            }
            saveGame();
        }

        function recoverStamina() {
            if (coins < 100) {
                alert('コインが足りません！');
                return;
            }
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
           常時表示のクエスト機能
           ========================================== */
        function generateRandomQuest() {
            const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
            const levels = [3, 3, 4, 4, 5, 5, 6, 7, 8];
            const lv = levels[Math.floor(Math.random() * levels.length)];
            const rewardCoins = lv * 50 + Math.floor(Math.random() * 50);

            return {
                category: cat.id,
                catName: cat.name,
                level: lv,
                reward: rewardCoins
            };
        }

        function renderTopQuestUI() {
            const container = document.getElementById('quest-horizontal-list');
            container.innerHTML = '';

            randomQuests.forEach((quest, index) => {
                const card = document.createElement('div');
                card.className = 'quest-card-mini';

                const img = document.createElement('img');
                img.src = itemIcons[`${quest.category}_${quest.level}`];
                card.appendChild(img);

                const title = document.createElement('div');
                title.className = 'quest-card-title';
                title.innerText = `${quest.catName} (Lv.${quest.level})`;
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

            let foundLocation = null;
            let foundIndex = -1;

            for (let i = 0; i < fieldData.length; i++) {
                if (fieldData[i] && fieldData[i].category === quest.category && fieldData[i].level === quest.level) {
                    foundLocation = 'field';
                    foundIndex = i;
                    break;
                }
            }
            if (!foundLocation) {
                for (let i = 0; i < bagData.length; i++) {
                    if (bagData[i] && bagData[i].category === quest.category && bagData[i].level === quest.level) {
                        foundLocation = 'bag';
                        foundIndex = i;
                        break;
                    }
                }
            }

            if (!foundLocation) {
                alert(`ボード上（フィールドまたはバッグ）に対象の「${quest.catName} Lv.${quest.level}」が見つかりません！`);
                return;
            }

            if (foundLocation === 'field') {
                fieldData[foundIndex] = null;
                renderField();
            } else {
                bagData[foundIndex] = null;
                renderBag();
            }

            coins += quest.reward;
            updateStatusDisplay();

            randomQuests[questIndex] = generateRandomQuest();
            renderTopQuestUI();

            dailyProgress.questCleared = true;
            updateDailyUI();

            alert('クエストをクリアしました！');
        }

        /* ==========================================
           アイテムメニュー (売却 or バッグへ)
           ========================================== */
        function openItemMenuModal(locationType, index, itemData) {
            currentSelectedItem = { type: locationType, index: index, data: itemData };
            const catObj = CATEGORIES.find(c => c.id === itemData.category);
            document.getElementById('menu-item-title').innerText = `${catObj.name} (Lv.${itemData.level})`;
            document.getElementById('item-menu-modal').style.display = 'flex';
        }

        function closeItemMenuModal() {
            document.getElementById('item-menu-modal').style.display = 'none';
            currentSelectedItem = null;
        }

        function menuActionBag() {
            if (!currentSelectedItem) return;
            if (currentSelectedItem.type === 'bag') {
                alert('すでにバッグに入っています');
                closeItemMenuModal();
                return;
            }
            const emptyBagIdx = bagData.findIndex(slot => slot === null);
            if (emptyBagIdx === -1) {
                alert('バッグがいっぱいです！');
                closeItemMenuModal();
                return;
            }
            bagData[emptyBagIdx] = fieldData[currentSelectedItem.index];
            fieldData[currentSelectedItem.index] = null;
            renderField();
            renderBag();
            closeItemMenuModal();
        }

        function menuActionSell() {
            if (!currentSelectedItem) return;
            const item = currentSelectedItem.data;
            const price = item.level * 15;
            coins += price;

            if (currentSelectedItem.type === 'field') {
                fieldData[currentSelectedItem.index] = null;
                renderField();
            } else {
                bagData[currentSelectedItem.index] = null;
                renderBag();
            }

            dailyProgress.sold = true;
            updateDailyUI();

            updateStatusDisplay();
            closeItemMenuModal();
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
            if (bagData[bagIdx] !== null) {
                alert('そのバッグスロットには既にアイテムがあります！');
                return;
            }
            bagData[bagIdx] = fieldData[fieldIdx];
            fieldData[fieldIdx] = null;
            renderField();
            renderBag();
        }

        function moveBagToField(bagIdx, fieldIdx) {
            if (fieldData[fieldIdx] !== null) {
                alert('フィールドのそのマスには既にアイテムがあります！');
                return;
            }
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
        function openDailyModal() {
            updateDailyUI();
            document.getElementById('daily-modal').style.display = 'flex';
        }
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
            if (dailyProgress.claimed) {
                claimBtn.innerText = '受取済み';
                claimBtn.disabled = true;
            }
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
           図鑑 ＆ クラフト
           ========================================== */
        function openZukanModal() { document.getElementById('zukan-modal').style.display = 'flex'; buildZukanUI(); buildCraftUI(); }
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

        function buildZukanUI() {
            const container = document.getElementById('zukan-content-container');
            container.innerHTML = '';
            CATEGORIES.forEach(cat => {
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

        function buildCraftUI() {
            const container = document.getElementById('craft-list-container');
            container.innerHTML = '';
            const recipes = [
                { cat: 'grass', level: 3, cost: 200, name: '上質な草 (Lv3)' },
                { cat: 'flower', level: 3, cost: 250, name: '美しい花束 (Lv3)' },
                { cat: 'tree', level: 3, cost: 300, name: '若木 (Lv3)' },
                { cat: 'stone', level: 3, cost: 350, name: '硬い岩石 (Lv3)' }
            ];
            recipes.forEach(recipe => {
                const card = document.createElement('div');
                card.className = 'craft-card';
                card.innerHTML = `<div class="craft-info"><img src="${itemIcons[`${recipe.cat}_${recipe.level}`]}"><div><div class="craft-name">${recipe.name}</div><div class="craft-desc">必要コイン: ${recipe.cost} 💰</div></div></div>`;
                const btn = document.createElement('button');
                btn.className = 'craft-btn';
                btn.innerText = 'クラフト';
                btn.onclick = () => executeCraft(recipe.cat, recipe.level, recipe.cost);
                card.appendChild(btn);
                container.appendChild(card);
            });
        }

        function executeCraft(catId, level, cost) {
            if (coins < cost) { alert('コインが足りません！'); return; }
            const emptyIndices = [];
            for (let i = 0; i < TOTAL_CELLS; i++) if (fieldData[i] === null) emptyIndices.push(i);
            if (emptyIndices.length === 0) { alert('フィールドに空きマスがありません！'); return; }

            coins -= cost;
            updateStatusDisplay();
            const randomCellIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            fieldData[randomCellIdx] = { category: catId, level: level };
            unlockZukanItem(catId, level);
            renderField();
            alert('クラフト成功！');
        }