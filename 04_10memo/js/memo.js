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

// 2.localStorageへの保存 (ほぞん)
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            // 値の入力チェック
            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app",  // タイトル
                    html: "Key、Memoはいずれも必須です。",  // メッセージ内容
                    type: "error",      // warning,error,success,info,question
                    allowOutsideClick: false
                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " : " + value + "」\nを保存（save）しますか？";
                Swal.fire({
                    title: "Memo app",  // タイトル
                    html: w_msg,        // メッセージ
                    type: "question",
                    showCancelButton: true
                }).then(function (result) {
                    // OK を押した時だけ保存する
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに「" + key + " : " + value + "」を保存（ほぞん）しました。";
                        Swal.fire({
                            title: "Memo app",
                            html: w_msg,
                            type: "success",
                            allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
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
            const table1 = document.getElementById("table1");// version-up3 add
            let w_cnt = "0";     //
            w_cnt = selectCheckBox("del");//テーブルからデータ選択(せんたく)version-up2chg: selectRadioBtn ==>selectCheckBox
            if (w_cnt >= 1) {
                let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除 (delete) しますか?"; //
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: w_msg // メッセージ内容をここに設定
                    , type: "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, info, question
                    , showCancelButton: true // キャンセルボタンの表示
                }).then(function (result) {
                    //確認(かくにん) ダイアログで「OK」を押されたとき、削除(さくじょ) する
                    if (result.value) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage(); //localStorageからのデータの取得 (しゅとく)とテーブルへ表示(ひょうじ)
                        let w_msg = "LocalStorageから" + w_cnt + "件を削除 (delete) しました。";
                        Swal.fire({
                            title: "Memo app" //タイトルをここに設定
                            , html: w_msg // メッセージ内容をここに設定
                            , type: "success" // ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, info, question
                            , allowOutsideClick: false //枠外クリックは許可しない
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );
}
// ゴミ箱アイコン（trash）クリック処理
const table1 = document.getElementById("table1");
table1.addEventListener("click", function (e) {
    // trash クラス以外は処理しない
    if (e.target.classList.contains("trash") === true) {
        const index = e.target.parentNode.parentNode.rowIndex;
        const key = table1.rows[index].cells[1].firstChild.data;
        const value = table1.rows[index].cells[2].firstChild.data;
        let w_delete = `LocalStorageから「${key} : ${value}」を削除しますか？`;
        Swal.fire({
            title: "Memo app",
            html: w_delete,
            type: "question",
            showCancelButton: true
        }).then(result => {
            if (result.value === true) {
                localStorage.removeItem(key);
                viewStorage();
                let w_msg = `LocalStorageから「${key} : ${value}」を削除しました。`;
                Swal.fire({
                    title: "Memo app",
                    html: w_msg,
                    type: "success",
                    allowOutsideClick: false
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        })
    }
});
//4.localStorageからすべて削除(さくしょ)
function allClearLocalStorage() {
    const allclear = document.getElementById("allClear");
    allclear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_msg = "LocalStorageのデータをすべて削除 (all clear) します。\nよろしいですか?";
            Swal.fire({
                title: "Memo app" // タイトルをここに設定
                , html: w_msg // メッセージ内容をここに設定
                , type: "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, info, question
                , showCancelButton: true // キャンセルボタンの表示
            }).then(function (result) {
                if (result.value) {
                    localStorage.clear();
                    viewStorage(); //localStorageからのデータの取得 (しゅとく)とテーブルへ表示(ひょうじ)
                    let w_msg = "LocalStorageのデータをすべて削除 (all clear) しました。";
                    // window.alert(w_msg);
                    Swal.fire({
                        title: "Memo app" // タイトルをここに設定
                        , html: w_msg // メッセージ内容をここに設定
                        , type: "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, info, question
                        , allowOutsideClick: false //枠外クリックは許可しない
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
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
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: "1つ選択 (select) してください。"//メッセージ内容をここに設定
                , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, info, question
                , allowOutsideClick: false //枠外クリックは許可しない
            });
        }
    }
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        }
        else {
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: "1つ以上選択 (select) してください。"//メッセージ内容をここに設定
                , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, info, question
                , allowOutsideClick: false //枠外クリックは許可しない
            });
        }
    }
};


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
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }
    // jQuery plugin tablesorterを使ってテーブルのソート
    // sortList: 引数1... 最初からソートしておく列を指定、引数2...0...昇順,1降順
    $("#table1").tablesorter({//tablesort add
        sortList: [[1, 0]]//tablesort add
    });//tablesort add
    $("#table1").trigger("update"); //tablesort add
}