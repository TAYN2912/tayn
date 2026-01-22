"use strict";

let n = ""; // ランダムにおみくじの内容を決定する変数
let nBefore = ""; //前回の変数nの値

window.addEventListener("DOMContentLoaded",
    function() {

        $("header").textillate({
            loop: false, 
            minDisplayTime: 2000, 
            initialDelay: 2000, 
            autoStart: true, 
            in: { 
            effect: "fadeInLeftBig", 
            delayScale: 1.5, 
            delay: 50, 
            sync: false, 
            shuffle: true 
            }
        });
        $(function(){
            ScrollReveal().reveal("#btn1", { duration: 9000 });
        });

    }, false
);

const btn1= document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiContent = document.getElementById("omikujiContent");
const omikujiTextImage = document.getElementById("omikujiTextImage");
btn1.addEventListener("click",
    function(){
        let resultText= ["大吉!!!!!","中吉!!!","小吉!!","末吉!","凶","大凶"];
        let resultColor =["#ff0000", "#c71585","#ff7600","#ff69b4","#1e90ff","#1e1fff"];
        let resultFontSize=["50px","48px","45px","40px","38px","35px"];
        let resultTextImage = ["img/tanjiro1.png","img/tanjiro2.png","img/tanjiro3.png","img/tanjiro4.png","img/tanjiro5.png","img/tanjiro6.png"];

        // let n =Math.floor(Math.random() * resultText.length);
        while (n === nBefore){
            n =Math.floor(Math.random() * resultText.length);
        }
        nBefore = n; //nの値をsave

        let resultMaxSpeed=[5,5,1,1,1,5];
        let resultMaxSize=[30,30,40,60,35,20];
        let resultMinSize=[1,1,20,50,25,1];
        let resultImage=["img/star.png","img/sakura_hanabira.png","img/butterfly1.png","img/candy1.png","img/water2.png","img/snowflakes.png"];
        let resultSound = ["sound/kimetsu_sound1.mp3","sound/kimetsu_sound2.mp3","sound/kimetsu_sound3.mp3","sound/kimetsu_sound4.mp3","sound/kimetsu_sound5.mp3","sound/kimetsu_sound6.mp3"];

        omikujiText.classList.remove("notDisplay");

        omikujiContent.textContent = resultText[n];
        omikujiContent.style.color= resultColor[n];
        omikujiContent.style.fontSize= resultFontSize[n];

        // おみくじのテキスト画像対応
        omikujiTextImage.src =resultTextImage[n]; 
        omikujiTextImage.classList.add("omikujiPaper");
        //アニメーション終了時にclassを削除
        omikujiTextImage.addEventListener("animationend",
            function() {
                omikujiTextImage.classList.remove("omikujiPaper");
            }, false
        );

        // snowfall
        $(document).snowfall("clear");
        $(document).ready(function(){
            $(document).snowfall({
                maxSpeed : resultMaxSpeed[n],
                minSpeed : 1,
                maxSize : resultMaxSize[n],
                minSize : resultMinSize[n],
                image : resultImage[n],
            });
        });

        // HTML5のaudioは一旦playをすると終了するまで音が鳴らない仕様である。
        // これではクリックを連続で行った場合に、現在再生されている音が終了するまで
        // 次の音が鳴らないため「currentTime」で開始時間をリセットする。
        let music = new Audio(resultSound[n]);
        music.currentTime = 0;
        music.play();  // 再生

    }, false
);