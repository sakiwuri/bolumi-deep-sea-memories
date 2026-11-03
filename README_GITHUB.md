# 墨啵小魷的深海拾光記：GitHub Pages 部署

此 ZIP 是靜態網站成品，解壓縮後最外層應直接有 `index.html`、`src.js`、`style.css` 及 `assets`。不要把 ZIP 本身或最外層資料夾再多包一層上傳。新網址會有獨立的瀏覽器存檔，不會自動帶入 Sites 舊站進度。

## 不安裝軟體的部署方式

1. 在 Windows 解壓縮「網站成品 ZIP」。登入 GitHub，建立新的 repository。GitHub 免費方案一般使用公開 repository 才能使用 Pages；使用其他方案時以 GitHub 當前資格為準。
2. 在 repository 的 **Add file → Upload files**，選擇解壓縮後的所有檔案及資料夾，上傳到 repository 根目錄，再按 **Commit changes**。GitHub 網頁上傳有檔案數和大小限制；如一次上傳受限，可分批上傳並維持原有資料夾結構。
3. 開啟 **Settings → Pages**，在 **Build and deployment** 選 **Deploy from a branch**，選擇 `main` 與 `/(root)`，按 **Save**。
4. 等待 Pages 完成建置，頁面出現網址後再開啟；網址一般類似 `https://你的帳號.github.io/儲存庫名稱/`。若剛部署得到 404，先等 GitHub Pages 的部署狀態完成，並確認 `index.html` 位於根目錄。

重要：GitHub 的瀏覽器上傳介面可能限制整個資料夾的選取方式；必須確保 `assets` 及其子資料夾裡的檔案全部上傳，否則圖片與音樂會遺失。避免將原始碼備份 ZIP 當作網站成品上傳。

## 後續維護

另提供的原始碼 ZIP 保存遊戲程式、素材母版與開發紀錄。修改後在有 Node.js 的環境執行 `npm test` 及 `npm run build`，再把 `dist` **內部**內容更新到 Pages 分支根目錄。素材和遊戲皆不需要登入或付費 API。

## 存檔轉移現況

本版**尚未實作** JSON 存檔匯出／匯入按鈕，舊 Sites 版也沒有一般情況下的匯出按鈕；因此現在不能宣稱能透過一般遊戲介面安全轉移舊進度。請先保留舊站與原瀏覽器資料，勿清除網站資料，直到轉移功能完成並實測。計畫與資料格式詳見原始碼中的 `SAVE_TRANSFER_PLAN.md`。

遊戲資料仍使用 localStorage 的 `bubble-isles-save-v1`，音訊設定另存於 `bubble-isles-audio-v1`。不同網址或不同瀏覽器的 localStorage 相互隔離；上傳網站不會搬移使用者資料。
