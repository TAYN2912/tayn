"use strict";

// A イベントリスナーを追加
window.addEventListener("DOMContentLoaded", function () {

    // 1 localStorageが使えるか確認
    if (typeof localStorage === "undefined") {
        window.alert("このブラウザはLocal Storage機能が実装されていません。");
        return;
    } else {
        viewStorage();
        saveLocalStorage();
        delLocalStorage();
        selectTable();
        allClearLocalStorage();
    }
}, false
)


function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            if (key === "" || value === "") {
                window.alert("Key、Memoはいずれも必須です。");
                return;
            } else {
                let w_confirm = window.confirm("LocalStorageに「" + key + " : " + value + "」を保存しますか？");
                if (w_confirm === true) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに「" + key + " : " + value + "」を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
};

// 3.localStorageから選択されている行を削除(さくじ上)//version-up3 chg 1件削除(さくじょ) ==> 選択されている行を削除(さくじょ)
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");// version-up3 add
            const tablel = document.getElementById("tablel");// version-up3 add
            let w_cnt = "0";     //
            w_cnt = selectCheckBox("del");//テーブルからデータ選択(せんたく)version-up2chg: selectRadioBtn ==>selectCheckBox
            if (w_cnt >= 1) {
                //const key = document.getElementById("textKey").value;
                //const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorageから選択されている" + w_cnt + "件を削除(delete) しますか?"); // version-up3 chg          
                if (w_confirm === true) {
                    for (let i = 0; i < chkbox1.length; i++) {
                        if (chkbox1[i].checked) { //version-up3 add
                            localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data); // version-up3 chg                    viewStorage();
                        }
                    }
                    viewStorage(); //localStorageからのデータの取得 (しゅとく)とテーブルへ表示(ひょうじ)
                    let w_msg = "LocalStorageから" + w_cnt + "件を削除(delete)しました。"; // version-up3 chg
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
};


//4.localStorageからすべて削除(さくしょ)
function allClearLocalStorage() {
    const allclear = document.getElementById("allClear");
    allclear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = window.confirm("LocalStorageからをすべて削除(allclear)しますか？");
            //確認(かくにん) ダイアログで「OK」を押されたとき、すべて削除(さくじょ) する
            if (w_confirm == true) {
                localStorage.clear();
                viewStorage();
                let w_confirm = "LocalStorageのデータをすべて削除(allclear)しました。";
                window.alert(w_confirm);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};

// 5.データ選択(せんたく)
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select"); //テーブルからデータ選択 (せんたく) // version-up3 chg 引数:なし==>"select"      
        },
        false);
};

//
// テーブルからデータ選択(せんたく)
function selectCheckBox(mode) { // version-up3 chg 引数:なし==> mode
    //let w_sel = "0";          // 選択されていれば "1" にする
    let w_cnt = 0;            // チェックされた数
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }

            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (mode === "select") {
        if (w_cnt === 1) {   // strict equal
            return w_cnt;
        } else {
            window.alert("1つ選択(select)してください。");
        }
    }
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        }
        else {
            window.alert("1つ以上選択（select）してください。");
        }

    }
}


//localStorageからのデータの取得 (しゅとく)とテーブルへ表示(ひょうじ)
function viewStorage() {
    const list = document.getElementById("list");
    // htmlのテーブル初期化 (しょきが)
    while (list.rows[0]) list.deleteRow(0);
    // localStorageすべての情報 (じょうほう)の取得(しゅとく)
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);
        //localStorageのキーと値(あたい) を表示(ひょうじ)
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    // jQuery plugin tablesorterを使ってテーブルのソート
    // sortList: 引数1... 最初からソートしておく列を指定、引数2...0...昇順,1降順
    $("#table1").tablesorter({//tablesort add
        sortList: [[1, 0]]//tablesort add
    });//tablesort add
    $("#table1").trigger("update"); //tablesort add
}