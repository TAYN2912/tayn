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

// 3.localStorageから1杵削除(さくしょ)
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_sel = "0";     //
            w_sel = selectCheckBox();//テーブルからデータ選択(せんたく)version-up2chg: selectRadioBtn ==>selectCheckBox
            if (w_sel === "1") {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorageから「" + key + " : " + value + "」を削除(delete)ますか？");
                if (w_confirm === true) {
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = "LocalStorageから" + key + "  " + value + "を削除(delete)しました。";
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
            selectCheckBox();//テーブルからデータ選択(せんたく)version-up2 chg:selectRadioBtn ==>selectCheckBox
        }, false
    );
};

//
// テーブルからデータ選択(せんたく)
function selectCheckBox() {
    let w_sel = "0";          // 選択されていれば "1" にする
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
    if (w_cnt === 1) {  
        return w_sel = "1";
    }else{
    window.alert("1つ選択(select)してください。");
    return w_sel = "0"; 
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