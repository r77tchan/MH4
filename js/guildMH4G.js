const monsterName = new Array ("なし","リオレイア","リオレウス","リオレイア亜種","リオレウス亜種","リオレイア希少種","リオレウス希少種","イャンクック","イャンクック亜種","ゲリョス","ゲリョス亜種","ティガレックス","ティガレックス亜種","ドスゲネポス","ドスイーオス","ドスジャギィ","ドスランポス","ババコンガ","ババコンガ亜種","ラージャン","ケチャワチャ","テツカブラ","ザボアザキル","ガララアジャラ","ダラ・アマデュ","アルセルタス","ゲネルセルタス","ネルスキュラ","ゴア・マガラ","シャガル・マガラ","イャンガルルガ","クシャルダオラ","テオ・テスカトル","アカムトルム","キリン","キリン亜種","フルフル","フルフル亜種","バサルモス","バサルモス亜種","グラビモス","グラビモス亜種","イビルジョー","怒り喰らうイビ","ブラキディオス","激昂したラージ","ダレン・モーラ","ウルクスス","ジンオウガ","ジンオウガ亜種","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","セルレギオス","","","","","","","","","","","ディアブロス","ディアブロス亜種","","","オオナズチ","","","","","ダイミョウザザミ亜種");
const areaName = new Array ("BC","迷路","傾斜","崖","水","豚","蔦","天井","柱","ゴール","宝","水晶","砂漠");
let count = 0;
let weaponKinds = new Array(6);

//クエスト作成者名
let Author = document.getElementById('$Author');
let AuthorName = ["0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000"];
//以下2つ16進数変換
function AuthorChange(){
    for(i=0;i<12;i++){
        if(Author.value[i]==null){
            for(j=i;j<13;j++){
            AuthorName[j] = "0000";
            }
            break;
        }
      AuthorName[i] = convertASCIItoHex(Author.value[i]);
      switch(AuthorName[i].length){
          case 1: AuthorName[i] = "000" + AuthorName[i]; break;
          case 2: AuthorName[i] = "00" + AuthorName[i]; break;
          case 3: AuthorName[i] = "0" + AuthorName[i]; break;
      }
    }
}
Author.onchange=function(){
    AuthorChange();
    removeOutput();
}
function convertASCIItoHex(asciiVal) {
    let asciiCode = asciiVal.charCodeAt(0);
    let hexValue = asciiCode.toString(16).toUpperCase();
    // console.log("コンソールログ : 0x" + hexValue);
    return hexValue;
}

//乱数生成用
function getRandom( min, max ) {
    let random = Math.floor( Math.random() * (max + 1 - min) ) + min;
  
    return random;
}
//クエスト識別 ID
let questID1;
let questID2;
function generationID(){
    
    questID1 = getRandom( 0, 4294967295);
    questID2 = getRandom( 0, 4294967295);

    function transID(ID){
        let reID = ID.toString(16).toUpperCase();
        if(reID.length < 8){
            while(reID.length != 8){
                reID = "0" + reID;
            }
        }
        return reID;
    }

    questID1 = transID(questID1);
    questID2 = transID(questID2);

    $questID.value = questID1 + " " + questID2;

}
//乱数生成ボタン
const btnID = document.getElementById("$btnID");
btnID.addEventListener("click", function(){
    generationID();
    removeOutput();
});
//txtフォームからの変更時
$questID.onchange = function(){
    if($questID.value.length != 17){
        $questID.value = "";
    }else{
        questID1 = "";
        questID2 = "";

        for(i=0;i<8;i++){
            questID1 = questID1 + $questID.value[i];
        }
        for(i=9;i<17;i++){
            questID2 = questID2 + $questID.value[i];
        }
    }
    removeOutput();
}

//モンスターテキストの変更
let ele1 = document.getElementsByClassName("$m1Name");
let ele2 = document.getElementsByClassName("$m2Name");
function textSetM1(){
    if($monster1.value == ""){
        for( i=0; i<ele1.length; i++){
            document.getElementsByClassName("$m1Name")[i].textContent = "モンスター";
            }
    }else{
        for( i=0; i<ele1.length; i++){
            document.getElementsByClassName("$m1Name")[i].textContent = monsterName[parseInt($monster1.value,16)];
            }
    }
    //イビルジョー、キリン亜種、クシャルダオラ
    if($monster1.value == "2A" || $monster1.value == "23" || $monster1.value == "1F"){
        $weapon[1].textContent = "スラッシュアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / ライトボウガン";

        weaponKinds[0] = "(激流斧、エイムofトリック)";
        weaponKinds[1] = "(輝剣、ラスティクレイモア)";
        weaponKinds[2] = "(峰山小太刀、祭囃子・無形ノ調)";
        weaponKinds[3] = "(シルバープロミネンス、砕牙砲)";
        weaponKinds[4] = "(星砕きプロメテオル、獄琴)";
        weaponKinds[5] = "(エクリプスボウ、フリルパラソル)";

        $armor[1].textContent = "オリジナルA (ダマスク)";
        $armor[2].textContent = "オリジナルB (ダマスク、デスギア)";
        $armor[3].textContent = "オリジナルC (ダマスク、デスギア)";
        $armor[4].textContent = "オリジナルD (ダマスク、デスギア)";
        $armor[5].textContent = "オリジナルE (ダマスク)";
        $armor[6].textContent = "オリジナルF (ダマスク)";
        $armor[7].textContent = "トライA (荒天/蒼天)";
        $armor[8].textContent = "トライB (荒天/蒼天、デスギア)";
        $armor[9].textContent = "トライC (荒天/蒼天、デスギア)";
        $armor[10].textContent ="トライD (荒天/蒼天、デスギア)";
        $armor[11].textContent ="トライE (荒天/蒼天)";
        $armor[12].textContent ="トライF (荒天/蒼天)";
        $armor[13].textContent ="ドスA (ミラバルZ)";
        $armor[14].textContent ="ドスB (ミラバルZ、デスギア)";
        $armor[15].textContent ="ドスC (ミラバルZ、デスギア)";
        $armor[16].textContent ="ドスD (ミラバルZ、デスギア)";
        $armor[17].textContent ="ドスE (ミラバルZ)";
        $armor[18].textContent ="ドスF (ミラバルZ)";
    }
    //イャンクック
    else if($monster1.value == '07'){
        $weapon[1].textContent = "スラッシュアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / ライトボウガン";

        weaponKinds[0] = "(ディーエッジ、エイムofトリック)";
        weaponKinds[1] = "(41式対飛竜大剣、凍刀)";
        weaponKinds[2] = "(マスターバング、ランポスクロウズ)";
        weaponKinds[3] = "(合戦槍、フルボルテージ)";
        weaponKinds[4] = "(ウォーバッシュ、ガンズ＝ロック)";
        weaponKinds[5] = "(クイーンブラスター、ボルボバレット)";

        $armor[1].textContent = "オリジナルA (アロイ)";
        $armor[2].textContent = "オリジナルB (アロイ)";
        $armor[3].textContent = "オリジナルC (アロイ)";
        $armor[4].textContent = "オリジナルD (アロイ)";
        $armor[5].textContent = "オリジナルE (アロイ)";
        $armor[6].textContent = "オリジナルF (アロイ)";
        $armor[7].textContent = "トライA (ルドロス)";
        $armor[8].textContent = "トライB (ルドロス)";
        $armor[9].textContent = "トライC (ルドロス)";
        $armor[10].textContent = "トライD (ルドロス)";
        $armor[11].textContent = "トライE (ルドロス)";
        $armor[12].textContent = "トライF (ルドロス)";
        $armor[13].textContent = "ドスA (ハンター)";
        $armor[14].textContent = "ドスB (ハンター)";
        $armor[15].textContent = "ドスC (ハンター)";
        $armor[16].textContent = "ドスD (ハンター)";
        $armor[17].textContent = "ドスE (ハンター)";
        $armor[18].textContent = "ドスF (ハンター)";
    }
    //ゴアマガラ、ディアブロス
    else if($monster1.value == '1C' || $monster1.value == '63'){
        $weapon[1].textContent = "チャージアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / ライトボウガン";

        weaponKinds[0] = "(ディア＝ルテミス、エイムofトリック)";
        weaponKinds[1] = "(雷剣、成敗刀)";
        weaponKinds[2] = "(ヒドゥンエッジ、王双刃)";
        weaponKinds[3] = "(バベル、ナナ＝ハウル)";
        weaponKinds[4] = "(ねこハンマー、ウネリシェルン)";
        weaponKinds[5] = "(鋼氷馬弓、ベルクーツ)";

        $armor[1].textContent = "オリジナルA (レウス)";
        $armor[2].textContent = "オリジナルB (レウス、フルフルU)";
        $armor[3].textContent = "オリジナルC (レウス、キリン)";
        $armor[4].textContent = "オリジナルD (フルフルU、キリン)";
        $armor[5].textContent = "オリジナルE (フルフルU)";
        $armor[6].textContent = "オリジナルF (キリン)";
        $armor[7].textContent = "トライA (レックス)";
        $armor[8].textContent = "トライB (レックス、フルフルU)";
        $armor[9].textContent = "トライC (レックス、キリン)";
        $armor[10].textContent = "トライD (フルフルU、キリン)";
        $armor[11].textContent = "トライE (フルフルU)";
        $armor[12].textContent = "トライF (キリン)";
        $armor[13].textContent = "ドスA (ゲリョスU)";
        $armor[14].textContent = "ドスB (ゲリョスU、フルフルU)";
        $armor[15].textContent = "ドスC (ゲリョスU、キリン)";
        $armor[16].textContent = "ドスD (フルフルU、キリン)";
        $armor[17].textContent = "ドスE (フルフルU)";
        $armor[18].textContent = "ドスF (キリン)";
    }
    //ダイミョウザザミ亜種、バサルモス亜種
    else if($monster1.value == '6C' || $monster1.value == '27'){
        $weapon[1].textContent = "スラッシュアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / へビィボウガン";

        weaponKinds[0] = "(ディア＝ルテミス、ボーンロッド)";
        weaponKinds[1] = "(ジークムント、飛竜刀)";
        weaponKinds[2] = "(ポイズンタバルジン、ギルドナイトセーバー)";
        weaponKinds[3] = "(トゥースランス、プリンセスバースト)";
        weaponKinds[4] = "(ヒドゥンブレイカー、ガンズロック)";
        weaponKinds[5] = "(プロミネンスボウ、デュエルスタップ)";

        $armor[1].textContent = "オリジナルA (レイア)";
        $armor[2].textContent = "オリジナルB (レイア)";
        $armor[3].textContent = "オリジナルC (レイア)";
        $armor[4].textContent = "オリジナルD (レイア)";
        $armor[5].textContent = "オリジナルE (レイア)";
        $armor[6].textContent = "オリジナルF (レイア)";
        $armor[7].textContent = "トライA (ラギア)";
        $armor[8].textContent = "トライB (ラギア)";
        $armor[9].textContent = "トライC (ラギア)";
        $armor[10].textContent = "トライD (ラギア)";
        $armor[11].textContent = "トライE (ラギア)";
        $armor[12].textContent = "トライF (ラギア)";
        $armor[13].textContent = "ドスA (ザザミ)";
        $armor[14].textContent = "ドスB (ザザミ)";
        $armor[15].textContent = "ドスC (ザザミ)";
        $armor[16].textContent = "ドスD (ザザミ)";
        $armor[17].textContent = "ドスE (ザザミ)";
        $armor[18].textContent = "ドスF (ザザミ)";
    }
    //セルレギオス、キリン
    else if($monster1.value == '58' || $monster1.value == '22'){
        $weapon[1].textContent = "スラッシュアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / ライトボウガン";

        weaponKinds[0] = "(王剣斧、セクトハルバー)";
        weaponKinds[1] = "(雷剣、成敗刀)";
        weaponKinds[2] = "(ヒドゥンエッジ、王双刃)";
        weaponKinds[3] = "(バベル、ナナ＝ハウル)";
        weaponKinds[4] = "(ねこハンマー、ソニックビードロー)";
        weaponKinds[5] = "(鋼氷馬弓、ベルクーツ)";

        $armor[1].textContent = "オリジナルA (リオソウル)";
        $armor[2].textContent = "オリジナルB (リオソウル、ゴア)";
        $armor[3].textContent = "オリジナルC (リオソウル、クシャナ)";
        $armor[4].textContent = "オリジナルD (ゴア、クシャナ)";
        $armor[5].textContent = "オリジナルE (ゴア)";
        $armor[6].textContent = "オリジナルF (クシャナ)";
        $armor[7].textContent = "トライA (レックスU)";
        $armor[8].textContent = "トライB (レックスU、ゴア)";
        $armor[9].textContent = "トライC (レックスU、クシャナ)";
        $armor[10].textContent = "トライD (ゴア、クシャナ)";
        $armor[11].textContent = "トライE (ゴア)";
        $armor[12].textContent = "トライF (クシャナ)";
        $armor[13].textContent = "ドスA (凛)";
        $armor[14].textContent = "ドスB (凛、ゴア)";
        $armor[15].textContent = "ドスC (凛、クシャナ)";
        $armor[16].textContent = "ドスD (ゴア、クシャナ)";
        $armor[17].textContent = "ドスE (ゴア)";
        $armor[18].textContent = "ドスF (クシャナ)";
    }
    //ティガレックス、ジンオウガ
    else if($monster1.value == '0B' || $monster1.value == '30'){
        $weapon[1].textContent = "スラッシュアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / へビィボウガン";

        weaponKinds[0] = "(ヒドゥンアックス、ボーンロッド)";
        weaponKinds[1] = "(ジークムント、飛竜刀)";
        weaponKinds[2] = "(ポイズンタバルジン、ギルドナイトセーバー)";
        weaponKinds[3] = "(トゥースランス、プリンセスバースト)";
        weaponKinds[4] = "(ヒドゥンブレイカー、ウネリシェルン)";
        weaponKinds[5] = "(プロミネンスボウ、デュエルスタップ)";

        $armor[1].textContent = "オリジナルA (モノブロ)";
        $armor[2].textContent = "オリジナルB (モノブロ)";
        $armor[3].textContent = "オリジナルC (モノブロ)";
        $armor[4].textContent = "オリジナルD (モノブロ)";
        $armor[5].textContent = "オリジナルE (モノブロ)";
        $armor[6].textContent = "オリジナルF (モノブロ)";
        $armor[7].textContent = "トライA (フロギィ)";
        $armor[8].textContent = "トライB (フロギィ)";
        $armor[9].textContent = "トライC (フロギィ)";
        $armor[10].textContent = "トライD (フロギィ)";
        $armor[11].textContent = "トライE (フロギィ)";
        $armor[12].textContent = "トライF (フロギィ)";
        $armor[13].textContent = "ドスA (タロス)";
        $armor[14].textContent = "ドスB (タロス)";
        $armor[15].textContent = "ドスC (タロス)";
        $armor[16].textContent = "ドスD (タロス)";
        $armor[17].textContent = "ドスE (タロス)";
        $armor[18].textContent = "ドスF (タロス)";
    }
    //ディアブロス亜種、ジンオウガ亜種
    else if($monster1.value == '64' || $monster1.value == '31'){
        $weapon[1].textContent = "スラッシュアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / へビィボウガン";

        weaponKinds[0] = "(モーターバースト、エイムofトリック)";
        weaponKinds[1] = "(封龍剣、軍刀)";
        weaponKinds[2] = "(チュクチュク、テッセン)";
        weaponKinds[3] = "(竜騎槍、ジェネラルパルド)";
        weaponKinds[4] = "(鬼鉄丸、ヒドゥントーン)";
        weaponKinds[5] = "(覇弓レラカムトルム、ギガン＝ショット)";

        $armor[1].textContent = "オリジナルA (リオソウル)";
        $armor[2].textContent = "オリジナルB (リオソウル、ゴア)";
        $armor[3].textContent = "オリジナルC (リオソウル、クシャナ)";
        $armor[4].textContent = "オリジナルD (ゴア、クシャナ)";
        $armor[5].textContent = "オリジナルE (ゴア)";
        $armor[6].textContent = "オリジナルF (クシャナ)";
        $armor[7].textContent = "トライA (レックスU)";
        $armor[8].textContent = "トライB (レックスU、ゴア)";
        $armor[9].textContent = "トライC (レックスU、クシャナ)";
        $armor[10].textContent = "トライD (ゴア、クシャナ)";
        $armor[11].textContent = "トライE (ゴア)";
        $armor[12].textContent = "トライF (クシャナ)";
        $armor[13].textContent = "ドスA (凛/艶)";
        $armor[14].textContent = "ドスB (凛/艶、ゴア)";
        $armor[15].textContent = "ドスC (凛/艶、クシャナ)";
        $armor[16].textContent = "ドスD (ゴア、クシャナ)";
        $armor[17].textContent = "ドスE (ゴア)";
        $armor[18].textContent = "ドスF (クシャナ)";
    }
    //テオテスカトル、オオナズチ、シャガルマガラ
    else if($monster1.value == '20' || $monster1.value == '67' || $monster1.value == '1D'){
        $weapon[1].textContent = "チャージアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / へビィボウガン";

        weaponKinds[0] = "(ナバルクライス、金砕棍棒)";
        weaponKinds[1] = "(海帝剣、冥刀)";
        weaponKinds[2] = "(ゴールドマロウ、海王双刃)";
        weaponKinds[3] = "(七星槍、シルバールーク)";
        weaponKinds[4] = "(ドラゴンブレイカー、ゴルトリコーダー)";
        weaponKinds[5] = "(殲滅と破壊の剛弓、カオスウィング)";

        $armor[1].textContent = "オリジナルA (エスカドラ)";
        $armor[2].textContent = "オリジナルB (エスカドラ)";
        $armor[3].textContent = "オリジナルC (エスカドラ)";
        $armor[4].textContent = "オリジナルD (エスカドラ)";
        $armor[5].textContent = "オリジナルE (エスカドラ)";
        $armor[6].textContent = "オリジナルF (エスカドラ)";
        $armor[7].textContent = "トライA (リベリオン/ライオット)";
        $armor[8].textContent = "トライB (リベリオン/ライオット)";
        $armor[9].textContent = "トライC (リベリオン/ライオット)";
        $armor[10].textContent = "トライD (リベリオン/ライオット)";
        $armor[11].textContent = "トライE (リベリオン/ライオット)";
        $armor[12].textContent = "トライF (リベリオン/ライオット)";
        $armor[13].textContent = "ドスA (ドラゴンX)";
        $armor[14].textContent = "ドスB (ドラゴンX)";
        $armor[15].textContent = "ドスC (ドラゴンX)";
        $armor[16].textContent = "ドスD (ドラゴンX)";
        $armor[17].textContent = "ドスE (ドラゴンX)";
        $armor[18].textContent = "ドスF (ドラゴンX)";
    }
    //ドスランポス
    else if($monster1.value == '10'){
        $weapon[1].textContent = "スラッシュアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / ライトボウガン";

        weaponKinds[0] = "(ディーエッジ、エイムofトリック)";
        weaponKinds[1] = "(41式対飛竜大剣、凍刀)";
        weaponKinds[2] = "(マスターバング、ランポスクロウズ)";
        weaponKinds[3] = "(合戦槍、フルボルテージ)";
        weaponKinds[4] = "(ウォーバッシュ、ガンズロック)";
        weaponKinds[5] = "(クイーンブラスター、ボルボバレット)";

        $armor[1].textContent = "オリジナルA (アロイ)";
        $armor[2].textContent = "オリジナルB (アロイ)";
        $armor[3].textContent = "オリジナルC (アロイ)";
        $armor[4].textContent = "オリジナルD (アロイ)";
        $armor[5].textContent = "オリジナルE (アロイ)";
        $armor[6].textContent = "オリジナルF (アロイ)";
        $armor[7].textContent = "トライA (ルドロス)";
        $armor[8].textContent = "トライB (ルドロス)";
        $armor[9].textContent = "トライC (ルドロス)";
        $armor[10].textContent = "トライD (ルドロス)";
        $armor[11].textContent = "トライE (ルドロス)";
        $armor[12].textContent = "トライF (ルドロス)";
        $armor[13].textContent = "ドスA (ハンター)";
        $armor[14].textContent = "ドスB (ハンター)";
        $armor[15].textContent = "ドスC (ハンター)";
        $armor[16].textContent = "ドスD (ハンター)";
        $armor[17].textContent = "ドスE (ハンター)";
        $armor[18].textContent = "ドスF (ハンター)";
    }
    //バサルモス、イャンクック亜種
    else if($monster1.value == '26' || $monster1.value == '08'){
        $weapon[1].textContent = "スラッシュアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / ライトボウガン";

        weaponKinds[0] = "(竜姫の剣斧、セクトハルバー)";
        weaponKinds[1] = "(41式飛竜大剣、凍刃)";
        weaponKinds[2] = "(マスターバング、ランポスクロウズ)";
        weaponKinds[3] = "(合戦槍、フルボルテージ)";
        weaponKinds[4] = "(ウォーバッシュ、ガンズロック)";
        weaponKinds[5] = "(クイーンブラスター、ボルボバレット)";

        $armor[1].textContent = "オリジナルA (インゴット)";
        $armor[2].textContent = "オリジナルB (インゴット)";
        $armor[3].textContent = "オリジナルC (インゴット)";
        $armor[4].textContent = "オリジナルD (インゴット)";
        $armor[5].textContent = "オリジナルE (インゴット)";
        $armor[6].textContent = "オリジナルF (インゴット)";
        $armor[7].textContent = "トライA (フルフル)";
        $armor[8].textContent = "トライB (フルフル)";
        $armor[9].textContent = "トライC (フルフル)";
        $armor[10].textContent = "トライD (フルフル)";
        $armor[11].textContent = "トライE (フルフル)";
        $armor[12].textContent = "トライF (フルフル)";
        $armor[13].textContent = "ドスA (ゲリョス)";
        $armor[14].textContent = "ドスB (ゲリョス)";
        $armor[15].textContent = "ドスC (ゲリョス)";
        $armor[16].textContent = "ドスD (ゲリョス)";
        $armor[17].textContent = "ドスE (ゲリョス)";
        $armor[18].textContent = "ドスF (ゲリョス)";
    }
    //ブラキディオス、ティガレックス亜種
    else if($monster1.value == '2C' || $monster1.value == '0C'){
        $weapon[1].textContent = "チャージアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / へビィボウガン";

        weaponKinds[0] = "(精鋭討伐隊盾斧、セクトハルバー)";
        weaponKinds[1] = "(封龍剣、軍刀)";
        weaponKinds[2] = "(フロストエッジ、テッセン)";
        weaponKinds[3] = "(竜騎槍、ジェネラルバルド)";
        weaponKinds[4] = "(ナナ＝トリ、ソニックビードロー)";
        weaponKinds[5] = "(覇弓レラカムトルム、ギガン＝ショット)";

        $armor[1].textContent = "オリジナルA (リオハート)";
        $armor[2].textContent = "オリジナルB (リオハート、ギザミ)";
        $armor[3].textContent = "オリジナルC (リオハート、ジンオウU)";
        $armor[4].textContent = "オリジナルD (ギザミ、ジンオウU)";
        $armor[5].textContent = "オリジナルE (ギザミ)";
        $armor[6].textContent = "オリジナルF (ジンオウU)";
        $armor[7].textContent = "トライA (アーティア)";
        $armor[8].textContent = "トライB (アーティア、ギザミ)";
        $armor[9].textContent = "トライC (アーティア、ジンオウU)";
        $armor[10].textContent = "トライD (ギザミ、ジンオウU)";
        $armor[11].textContent = "トライE (ギザミ)";
        $armor[12].textContent = "トライF (ジンオウU)";
        $armor[13].textContent = "ドスA (常磐/八千代)";
        $armor[14].textContent = "ドスB (常磐/八千代、ギザミ)";
        $armor[15].textContent = "ドスC (常磐/八千代、ジンオウU)";
        $armor[16].textContent = "ドスD (ギザミ、ジンオウU)";
        $armor[17].textContent = "ドスE (ギザミ)";
        $armor[18].textContent = "ドスF (ジンオウU)";
    }
    //ラージャン、イャンガルルガ
    else if($monster1.value == '13' || $monster1.value == '1E'){
        $weapon[1].textContent = "チャージアックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / ボウガン";

        weaponKinds[0] = "(フォースofフォール、金砕棍棒)";
        weaponKinds[1] = "(アギト、天上天下天地無双刀)";
        weaponKinds[2] = "(エペ=ギルタナス、ニヴルブリザード)";
        weaponKinds[3] = "(エストック、アームofティラン)";
        weaponKinds[4] = "(クリスタルノヴァ、ヒドゥントーン)";
        weaponKinds[5] = "(龍弓、雷砲、カホウ)";

        $armor[1].textContent = "オリジナルA (シルバーソル)";
        $armor[2].textContent = "オリジナルB (シルバーソル、キリンU)";
        $armor[3].textContent = "オリジナルC (シルバーソル、アカムト)";
        $armor[4].textContent = "オリジナルD (キリンU、アカムト)";
        $armor[5].textContent = "オリジナルE (キリンU)";
        $armor[6].textContent = "オリジナルF (アカムト)";
        $armor[7].textContent = "トライA (フィリア)";
        $armor[8].textContent = "トライB (フィリア、キリンU)";
        $armor[9].textContent = "トライC (フィリア、アカムト)";
        $armor[10].textContent = "トライD (キリンU、アカムト)";
        $armor[11].textContent = "トライE (キリンU)";
        $armor[12].textContent = "トライF (アカムト)";
        $armor[13].textContent = "ドスA (グリード)";
        $armor[14].textContent = "ドスB (グリード、キリンU)";
        $armor[15].textContent = "ドスC (グリード、アカムト)";
        $armor[16].textContent = "ドスD (キリンU、アカムト)";
        $armor[17].textContent = "ドスE (キリンU)";
        $armor[18].textContent = "ドスF (アカムト)";
    }

    else{
        $weapon[1].textContent = "アックス / 操虫棍";
        $weapon[2].textContent = "大剣 / 太刀";
        $weapon[3].textContent = "片手剣 / 双剣";
        $weapon[4].textContent = "ランス / ガンランス";
        $weapon[5].textContent = "ハンマー / 狩猟笛";
        $weapon[6].textContent = "弓 / ボウガン";

        weaponKinds[0] = "";
        weaponKinds[1] = "";
        weaponKinds[2] = "";
        weaponKinds[3] = "";
        weaponKinds[4] = "";
        weaponKinds[5] = "";

        $armor[1].textContent = "オリジナルA";
        $armor[2].textContent = "オリジナルB";
        $armor[3].textContent = "オリジナルC";
        $armor[4].textContent = "オリジナルD";
        $armor[5].textContent = "オリジナルE";
        $armor[6].textContent = "オリジナルF";
        $armor[7].textContent = "トライA";
        $armor[8].textContent = "トライB";
        $armor[9].textContent = "トライC";
        $armor[10].textContent = "トライD";
        $armor[11].textContent = "トライE";
        $armor[12].textContent = "トライF";
        $armor[13].textContent = "ドスA";
        $armor[14].textContent = "ドスB";
        $armor[15].textContent = "ドスC";
        $armor[16].textContent = "ドスD";
        $armor[17].textContent = "ドスE";
        $armor[18].textContent = "ドスF";
    }
    $weaponKinds.textContent = weaponKinds[parseInt($weapon.value,16)];
}
function textSetM2(){
    if($monster2.value == ""){
        for( i=0; i<ele2.length; i++){
            document.getElementsByClassName("$m2Name")[i].textContent = "モンスター";
            }
    }else{
        for( i=0; i<ele2.length; i++){
            document.getElementsByClassName("$m2Name")[i].textContent = monsterName[parseInt($monster2.value,16)];
            }
    }
}

//出土武具、モンスターテキストの変更
$monster1.onchange = function(){
    textSetM1();
    removeOutput();
}
$monster2.onchange = function(){
    textSetM2();
    removeOutput();
}

//エリア横のマップ名セット
function setIniM1(num){
    if(num == ""){
        document.getElementsByClassName("add")[0].textContent = "";
    }else{
        document.getElementsByClassName("add")[0].textContent = areaName[parseInt(num,16)];
    }
}
function setIniM2(num){
    if(num == ""){
        document.getElementsByClassName("add")[3].textContent = "";
    }else{
        document.getElementsByClassName("add")[3].textContent = areaName[parseInt(num,16)];
    }
}
function setSleepM1(num){
    if(num == ""){
        document.getElementsByClassName("add")[2].textContent = "";
    }else{
        document.getElementsByClassName("add")[2].textContent = areaName[parseInt(num,16)];
    }
}
function setSleepM2(num){
    if(num == ""){
        document.getElementsByClassName("add")[5].textContent = "";
    }else{
        document.getElementsByClassName("add")[5].textContent = areaName[parseInt(num,16)];
    }
}
function setMealM1(num){
    if(num == ""){
        document.getElementsByClassName("add")[1].textContent = "";
    }else{
        document.getElementsByClassName("add")[1].textContent = areaName[parseInt(num,16)];
    }
}
function setMealM2(num){
    if(num == ""){
        document.getElementsByClassName("add")[4].textContent = "";
    }else{
        document.getElementsByClassName("add")[4].textContent = areaName[parseInt(num,16)];
    }
}
//2つから受付パス
function passIniM1(){
    switch($ini1.value){
        case "": setIniM1(""); break;
        case "01": setIniM1($area1.value); break;
        case "02": setIniM1($area2.value); break;
        case "03": setIniM1($area3.value); break;
        case "04": setIniM1($area4.value); break;
        case "05": setIniM1($area5.value); break;
    }
}
function passIniM2(){
    switch($ini2.value){
        case "": setIniM2(""); break;
        case "01": setIniM2($area1.value); break;
        case "02": setIniM2($area2.value); break;
        case "03": setIniM2($area3.value); break;
        case "04": setIniM2($area4.value); break;
        case "05": setIniM2($area5.value); break;
    }
}
function passSleepM1(){
    switch($sleep1.value){
        case "": setSleepM1(""); break;
        case "01": setSleepM1($area1.value); break;
        case "02": setSleepM1($area2.value); break;
        case "03": setSleepM1($area3.value); break;
        case "04": setSleepM1($area4.value); break;
        case "05": setSleepM1($area5.value); break;
    }
}
function passSleepM2(){
    switch($sleep2.value){
        case "": setSleepM2(""); break;
        case "01": setSleepM2($area1.value); break;
        case "02": setSleepM2($area2.value); break;
        case "03": setSleepM2($area3.value); break;
        case "04": setSleepM2($area4.value); break;
        case "05": setSleepM2($area5.value); break;
    }
}
function passMealM1(){
    switch($meal1.value){
        case "": setMealM1(""); break;
        case "01": setMealM1($area1.value); break;
        case "02": setMealM1($area2.value); break;
        case "03": setMealM1($area3.value); break;
        case "04": setMealM1($area4.value); break;
        case "05": setMealM1($area5.value); break;
    }
}
function passMealM2(){
    switch($meal2.value){
        case "": setMealM2(""); break;
        case "01": setMealM2($area1.value); break;
        case "02": setMealM2($area2.value); break;
        case "03": setMealM2($area3.value); break;
        case "04": setMealM2($area4.value); break;
        case "05": setMealM2($area5.value); break;
    }
}
//マップ種類変更
function area1Change(){
    passIniM1();
    passIniM2();
    passSleepM1();
    passSleepM2();
    passMealM1();
    passMealM2();
}
function area2Change(){
    passIniM1();
    passIniM2();
    passSleepM1();
    passSleepM2();
    passMealM1();
    passMealM2();
}
function area3Change(){
    passIniM1();
    passIniM2();
    passSleepM1();
    passSleepM2();
    passMealM1();
    passMealM2();
}
function area4Change(){
    passIniM1();
    passIniM2();
    passSleepM1();
    passSleepM2();
    passMealM1();
    passMealM2();
}
function area5Change(){
    passIniM1();
    passIniM2();
    passSleepM1();
    passSleepM2();
    passMealM1();
    passMealM2();
}
$area1.onchange = function(){
    area1Change();
    removeOutput();
}
$area2.onchange = function(){
    area2Change();
    removeOutput();
}
$area3.onchange = function(){
    area3Change();
    removeOutput();
}
$area4.onchange = function(){
    area4Change();
    removeOutput();
}
$area5.onchange = function(){
    area5Change();
    removeOutput();
}
//選択値変更
$ini1.onchange = function(){
    passIniM1();
    removeOutput();
}
$ini2.onchange = function(){
    passIniM2();
    removeOutput();
}
$sleep1.onchange = function(){
    passSleepM1();
    removeOutput();
}
$sleep2.onchange = function(){
    passSleepM2();
    removeOutput();
}
$meal1.onchange = function(){
    passMealM1();
    removeOutput();
}
$meal2.onchange = function(){
    passMealM2();
    removeOutput();
}

//モンスター関連の選択初期化
function monster1None(){
    $monster1.value = "";
    $ini1.value = "";
    $sleep1.value = "";
    $meal1.value = "";
    $area1Posi1.value = "";
    $area2Posi1.value = "";
    $area3Posi1.value = "";
    $area4Posi1.value = "";
    $area5Posi1.value = "";
    document.getElementsByClassName("add")[0].textContent = "";
    document.getElementsByClassName("add")[1].textContent = "";
    document.getElementsByClassName("add")[2].textContent = "";
    textSetM1();
}
function monster2None(){
    $monster2.value = "";
    $ini2.value = "";
    $sleep2.value = "";
    $meal2.value = "";
    $area1Posi2.value = "";
    $area2Posi2.value = "";
    $area3Posi2.value = "";
    $area4Posi2.value = "";
    $area5Posi2.value = "";
    document.getElementsByClassName("add")[3].textContent = "";
    document.getElementsByClassName("add")[4].textContent = "";
    document.getElementsByClassName("add")[5].textContent = "";
    textSetM2();
}

//マップ関連の選択初期化
function area1None(){
    $area1.value = "";
    $area1In.value = "";
    $area1Out.value = "";
    $area1Posi1.value = "";
    $area1Posi2.value = "";
    area1Change();
}
function area2None(){
    $area2.value = "";
    $area2In.value = "";
    $area2Out.value = "";
    $area2Posi1.value = "";
    $area2Posi2.value = "";
    area2Change();
}
function area3None(){
    $area3.value = "";
    $area3In.value = "";
    $area3Out.value = "";
    $area3Posi1.value = "";
    $area3Posi2.value = "";
    area3Change();
}
function area4None(){
    $area4.value = "";
    $area4In.value = "";
    $area4Out.value = "";
    $area4Posi1.value = "";
    $area4Posi2.value = "";
    area4Change();
}
function area5None(){
    $area5.value = "";
    $area5In.value = "";
    $area5Out.value = "";
    $area5Posi1.value = "";
    $area5Posi2.value = "";
    area5Change();
}


//マップ(Area) hidden
function mapNumChange(){
    let num = 0;
    switch($mapNum.value){
        case "" :
            num = 0;
            area1None();
            area2None();
            area3None();
            area4None();
            area5None();
            document.getElementById("hiddenMap").hidden = true;
            break;
        case "2" :
            num = 2;
            area3None();
            area4None();
            area5None();
            document.getElementById("hiddenMap").hidden = true;
            break;
        case "3" :
            num = 3;
            area4None();
            area5None();
            document.getElementById("hiddenMap").hidden = true;
            break;
        case "4" :
            num = 4;
            area5None();
            document.getElementById("hiddenMap").hidden = false;
            break;
        case "5" :
            num = 5;
            document.getElementById("hiddenMap").hidden = false;
            break;
    }

    for( i=0; i<num; i++){
        document.getElementsByClassName("hiddenArea")[i].hidden = false;
    }
    for( i=4; i>=num; i--){
        document.getElementsByClassName("hiddenArea")[i].hidden = true;
    }
}
$mapNum.onchange = function(){
    mapNumChange();
    removeOutput();
}

//モンスター hidden
let ele3 = document.getElementsByClassName("hiddenM1");
let ele4 = document.getElementsByClassName("hiddenM2");
function hiddenSetTrueM1(){
    for( i=0; i<ele3.length; i++){
        document.getElementsByClassName("hiddenM1")[i].hidden = true;
    }
}
function hiddenSetTrueM2(){
    for( i=0; i<ele4.length; i++){
        document.getElementsByClassName("hiddenM2")[i].hidden = true;
    }
}
function hiddenSetFalseM1(){
    for( i=0; i<ele3.length; i++){
        document.getElementsByClassName("hiddenM1")[i].hidden = false;
    }
}
function hiddenSetFalseM2(){
    for( i=0; i<ele4.length; i++){
        document.getElementsByClassName("hiddenM2")[i].hidden = false;
    }
}
function monsterNumChange(){
    switch($monsterNum.value){
        case "":
            hiddenSetTrueM1();
            hiddenSetTrueM2();
            monster1None();
            monster2None();
            break;
        case "1":
            hiddenSetFalseM1();
            hiddenSetTrueM2();
            monster2None();
            break;
        case "2":
            hiddenSetFalseM1();
            hiddenSetFalseM2();
            break;
    }
}
$monsterNum.onchange = function(){
    monsterNumChange();
    removeOutput();
}

//クエスト初期レベル、現在レベル
function LevSet(){
    let Lev1 = 0;
    let Lev2 = 0;
    let cnt = 0;
    switch($monster1.value){
        case "07": Lev1 = 90; cnt+=1; break;
        case "08": Lev1 = 90; cnt+=1; break;
        case "0B": Lev1 = 98; cnt+=1; break;
        case "0C": Lev1 = 94; cnt+=1; break;
        case "10": Lev1 = 90; cnt+=1; break;
        case "13": Lev1 = 120; cnt+=1; break;
        case "1C": Lev1 = 98; cnt+=1; break;
        case "1D": Lev1 = 120; cnt+=1; break;
        case "1E": Lev1 = 101; cnt+=1; break;
        case "1F": Lev1 = 120; cnt+=1; break;
        case "20": Lev1 = 120; cnt+=1; break;
        case "22": Lev1 = 120; cnt+=1; break;
        case "23": Lev1 = 120; cnt+=1; break;
        case "26": Lev1 = 98; cnt+=1; break;
        case "27": Lev1 = 98; cnt+=1; break;
        case "2C": Lev1 = 101; cnt+=1; break;
        case "30": Lev1 = 98; cnt+=1; break;
        case "31": Lev1 = 94; cnt+=1; break;
        case "2A": Lev1 = 120; cnt+=1; break;
        case "58": Lev1 = 94; cnt+=1; break;
        case "63": Lev1 = 101; cnt+=1; break;
        case "64": Lev1 = 101; cnt+=1; break;
        case "67": Lev1 = 120; cnt+=1; break;
        case "6C": Lev1 = 94; cnt+=1; break;
    }
    switch($monster2.value){
        case "07": Lev2 = 90; cnt+=1; break;
        case "08": Lev2 = 90; cnt+=1; break;
        case "0B": Lev2 = 98; cnt+=1; break;
        case "0C": Lev2 = 94; cnt+=1; break;
        case "10": Lev2 = 90; cnt+=1; break;
        case "13": Lev2 = 120; cnt+=1; break;
        case "1C": Lev2 = 98; cnt+=1; break;
        case "1D": Lev2 = 120; cnt+=1; break;
        case "1E": Lev2 = 101; cnt+=1; break;
        case "1F": Lev2 = 120; cnt+=1; break;
        case "20": Lev2 = 120; cnt+=1; break;
        case "22": Lev2 = 120; cnt+=1; break;
        case "23": Lev2 = 120; cnt+=1; break;
        case "26": Lev2 = 98; cnt+=1; break;
        case "27": Lev2 = 98; cnt+=1; break;
        case "2C": Lev2 = 101; cnt+=1; break;
        case "30": Lev2 = 98; cnt+=1; break;
        case "31": Lev2 = 94; cnt+=1; break;
        case "2A": Lev2 = 120; cnt+=1; break;
        case "58": Lev2 = 94; cnt+=1; break;
        case "63": Lev2 = 101; cnt+=1; break;
        case "64": Lev2 = 101; cnt+=1; break;
        case "67": Lev2 = 120; cnt+=1; break;
        case "6C": Lev2 = 94; cnt+=1; break;
    }
    if(cnt==0){
        return "";
    }
    if($monster1.value == "63" && $monster2.value == "64"){
        return 99;
    }
    else if($monster1.value == "10" && $monster2.value == "26"){
        return 92;
    }
    else if($monster1.value == "10" && $monster2.value == "27"){
        return 92;
    }
    else if($monster1.value == "26" && $monster2.value == "2C"){
        return 97;
    }
    else if($monster1.value == "27" && $monster2.value == "2C"){
        return 97;
    }
    else if($monster1.value == "13" && $monster2.value == "13"){
        return 119;
    }
    else{
        return Math.floor((Lev1 + Lev2) / cnt);
    }
}
function LevCheck(val){
    if(val >= 1 && val <= 140){
        return val;
    }else{
        let tmp = LevSet();
        if(tmp == ""){
            return "";
        }
        return tmp;
    }
}
$iniLev.onchange = function(){
    $iniLev.value = LevCheck($iniLev.value);
    removeOutput();
}
$curLev.onchange = function(){
    $curLev.value = LevCheck($curLev.value);
    removeOutput();
}

//お宝フラグ
let RARE = "00";
$RARE.onchange = function(){
    if(RARE == "00"){
        RARE = "01";
    }
    else if(RARE == "01"){
        RARE = "00";
    }
    removeOutput();
}

//自動設定ボタン
const btnAuto = document.getElementById("$btnAuto");
btnAuto.addEventListener("click", function(){
    $iniLev.value = LevSet();
    $curLev.value = "140";
    $frenzyM1.value = "";
    $frenzyM2.value = "";
    $frenzyM3.value = "03";
    $RARE.checked = true;
    RARE = "01";
    removeOutput();
});

//リセットボタン
const btnReset = document.getElementById("$btnReset");
btnReset.addEventListener("click", function(){
    $frames.value = "";
    $Author.value = "";
    AuthorChange();
    $questID.value = "";
    $weapon.value = "";
    $armor.value = "";
    $armorType.value = "";
    $mapNum.value = "";
    mapNumChange();
    $monsterNum.value = "";
    monsterNumChange();
    $iniLev.value = "";
    $curLev.value = "";
    $RARE.checked = false;
    RARE = "00";
    $frenzyM1.value = "";
    $frenzyM2.value = "";
    $frenzyM3.value = "";

    removeOutput();

});

//サンプルボタン
const btnSample = document.getElementById("$btnSample");
btnSample.addEventListener("click", function(){
    $frames.value = "10";
    $Author.value ="＠senaga19"
    AuthorChange();
    generationID();
    $weapon.value = "00";
    $armor.value = "05";
    $armorType.value = "04";
    

    $monsterNum.value = "2";
    monsterNumChange();
    $monster1.value = "0C";
    $monster2.value = "0B";
    $ini1.value = "01";
    $ini2.value = "04";
    $sleep1.value = "02";
    $sleep2.value = "03";
    $meal1.value = "03";
    $meal2.value = "02";
    $area1Posi1.value = "01";
    $area1Posi2.value = "02";
    $area2Posi1.value = "01";
    $area2Posi2.value = "01";
    $area3Posi1.value = "02";
    $area3Posi2.value = "01";
    $area4Posi1.value = "01";
    $area4Posi2.value = "01";
    $area5Posi1.value = "00";
    $area5Posi2.value = "00";
    
    textSetM1();
    textSetM2();
    
    $mapNum.value = "5";
    mapNumChange();
    $area1.value = "03";
    $area1In.value = "03";
    $area1Out.value = "06";
    $area2.value = "07";
    $area2In.value = "06";
    $area2Out.value = "04";
    $area3.value = "03";
    $area3In.value = "05";
    $area3Out.value = "03";
    $area4.value = "02";
    $area4In.value = "03";
    $area4Out.value = "06";
    $area5.value = "0A"
    $area5In.value = "02";
    $area5Out.value = "06";
    area1Change();
    area2Change();
    area3Change();
    area4Change();
    area5Change();

    
    
    $iniLev.value = "96";
    $curLev.value = "140";
    $RARE.checked = true;
    RARE = "01";
    $frenzyM1.value = "03";
    $frenzyM2.value = "09";
    $frenzyM3.value = "03";

    removeOutput();
});


//outputの削除
function removeOutput(){
    if(count != 0){
        $coppy1.value = "";
        $coppy2.value = "";
        for(i=0; i<76; i++){
            let dd_element = document.getElementById("$output"+i);
            dd_element.remove();
        }
        count = 0;
        document.getElementById("$btnHidden").hidden = true;
    } 
}

//コード削除ボタン
const btnDelete = document.getElementById("$btnDelete");
btnDelete.addEventListener("click", function(){
    removeOutput();
});

//情報コピーボタン
const btnCoppyInformation = document.getElementById("$btnCoppyInformation");
btnCoppyInformation.addEventListener("click", function(){
    document.getElementById("$textareaHidden").hidden = false;

    var textarea = document.getElementById("$coppy2");
    // 文字をすべて選択
    textarea.select();
    // コピー
    document.execCommand("copy");

    document.getElementById("$textareaHidden").hidden = true;

    alert("『クエスト情報』をクリップボードにコピーしました");
});

//コードコピーボタン
const btnCoppyCode = document.getElementById("$btnCoppyCode");
btnCoppyCode.addEventListener("click", function(){

    document.getElementById("$textareaHidden").hidden = false;

    var textarea = document.getElementById("$coppy1");
    // 文字をすべて選択
    textarea.select();
    // コピー
    document.execCommand("copy");

    document.getElementById("$textareaHidden").hidden = true;

    alert("『コード』をクリップボードにコピーしました");
});

//残りのチェンジファンクション
$area1In.onchange = function(){
    removeOutput();
}
$area1Out.onchange = function(){
    removeOutput();
}
$area1Posi1.onchange = function(){
    removeOutput();
}
$area1Posi2.onchange = function(){
    removeOutput();
}
$area2In.onchange = function(){
    removeOutput();
}
$area2Out.onchange = function(){
    removeOutput();
}
$area2Posi1.onchange = function(){
    removeOutput();
}
$area2Posi2.onchange = function(){
    removeOutput();
}
$area3In.onchange = function(){
    removeOutput();
}
$area3Out.onchange = function(){
    removeOutput();
}
$area3Posi1.onchange = function(){
    removeOutput();
}
$area3Posi2.onchange = function(){
    removeOutput();
}
$area4In.onchange = function(){
    removeOutput();
}
$area4Out.onchange = function(){
    removeOutput();
}
$area4Posi1.onchange = function(){
    removeOutput();
}
$area4Posi2.onchange = function(){
    removeOutput();
}
$area5In.onchange = function(){
    removeOutput();
}
$area5Out.onchange = function(){
    removeOutput();
}
$area5Posi1.onchange = function(){
    removeOutput();
}
$area5Posi2.onchange = function(){
    removeOutput();
}
$frenzyM1.onchange = function(){
    removeOutput();
}
$frenzyM2.onchange = function(){
    removeOutput();
}
$frenzyM3.onchange = function(){
    removeOutput();
}
$weapon.onchange = function(){
    removeOutput();
    $weaponKinds.textContent = weaponKinds[parseInt($weapon.value,16)];
}
$armor.onchange = function(){
    removeOutput();
}
$armorType.onchange = function(){
    removeOutput();
}
$frames.onchange = function(){
    removeOutput();
}

//ロード時
window.addEventListener("load",function(){
    for( i=0; i<5; i++){
        document.getElementsByClassName("hiddenArea")[i].hidden = true; 
    }
    hiddenSetTrueM1();
    hiddenSetTrueM2();

    document.getElementById("hiddenMap").hidden = true;
    document.getElementById("$btnHidden").hidden = true;
    document.getElementById("$textareaHidden").hidden = true;
    document.getElementById("$load").hidden = true;
});

//コード生成ボタン
const btnGeneration = document.getElementById("$btnGeneration");
btnGeneration.addEventListener("click", function(){

    //隠れる要素は変数格納が必要か(値を00にしたいので)
    let monster1,ini1,sleep1,meal1,area1Posi1,area2Posi1,area3Posi1,area4Posi1,area5Posi1;
    let monster2,ini2,sleep2,meal2,area1Posi2,area2Posi2,area3Posi2,area4Posi2,area5Posi2;
    let area1,area1In,area1Out;
    let area2,area2In,area2Out;
    let area3,area3In,area3Out;
    let area4,area4In,area4Out;
    let area5,area5In,area5Out;
    //未選択箇所チェックの回避用
    let flgMonsterNum = 0;
    let flgArea3 = 0;
    let flgArea4 = 0;
    let flgArea5 = 0;

    //モンスター数、総マップ数の隠れた箇所を正規値で自動入力
    switch($monsterNum.value){
        case "": break;
        case "1":
            monster2 = "00";
            ini2 = "00";
            sleep2 = "00";
            meal2 = "00";
            area1Posi2 = "00";
            area2Posi2 = "00";
            area3Posi2 = "00";
            area4Posi2 = "00";
            area5Posi2 = "00";
            flgMonsterNum = 1;
            break;
    }
    switch($mapNum.value){
        case "": break;
        case "2":
            area3 = "00"; area3In = "01"; area3Out = "01"; flgArea3 = 1;
            area4 = "00"; area4In = "01"; area4Out = "01"; flgArea4 = 1;
            area5 = "00"; area5In = "01"; area5Out = "01"; flgArea5 = 1;
            break;
        case "3":
            area4 = "00"; area4In = "01"; area4Out = "01"; flgArea4 = 1;
            area5 = "00"; area5In = "01"; area5Out = "01"; flgArea5 = 1;
            break;
        case "4":
            area5 = "00"; area5In = "01"; area5Out = "01"; flgArea5 = 1;
            break;
    }


    //未選択箇所をチェック
    if($frames.value == "" || $questID.value == "" ||$weapon.value == "" || $armor.value == "" || $armorType.value == "" || $monsterNum.value == "" || $monster1.value == "" || ($monster2.value==""&&flgMonsterNum==0) || $ini1.value==""||($ini2.value==""&&flgMonsterNum==0)||$sleep1.value==""||($sleep2.value==""&&flgMonsterNum==0)||$meal1.value==""||($meal2.value==""&&flgMonsterNum==0)||$mapNum.value==""||$area1.value==""||$area2.value==""||($area3.value==""&&flgArea3==0)||($area4.value==""&&flgArea4==0)||($area5.value==""&&flgArea5==0)||$area1In.value==""||$area2In.value==""||($area3In.value==""&&flgArea3==0)||($area4In.value==""&&flgArea4==0)||($area5In.value==""&&flgArea5==0)||$area1Out.value==""||$area2Out.value==""||($area3Out.value==""&&flgArea3==0)||($area4Out.value==""&&flgArea4==0)||($area5Out.value==""&&flgArea5==0)||$area1Posi1.value==""||($area1Posi2.value==""&&flgMonsterNum==0)||$area2Posi1.value==""||($area2Posi2.value==""&&flgMonsterNum==0)||($area3Posi1.value==""&&flgArea3==0)||($area3Posi2.value==""&&flgMonsterNum==0&&flgArea3==0)||($area4Posi1.value==""&&flgArea4==0)||($area4Posi2.value==""&&flgMonsterNum==0&&flgArea4==0)||($area5Posi1.value==""&&flgArea5==0)||($area5Posi2.value==""&&flgMonsterNum==0&&flgArea5==0)||$iniLev.value==""||$curLev.value==""||$frenzyM1.value==""||$frenzyM2.value==""||$frenzyM3.value==""){
        alert("\"エラー\"未選択箇所があります");
    }else{

        //値が入っている事が分かったので変数に代入
        monster1 = $monster1.value;
        ini1 = $ini1.value;
        sleep1 = $sleep1.value;
        meal1 = $meal1.value;

        if(flgMonsterNum == 0){
            monster2 = $monster2.value;
            ini2 = $ini2.value;
            sleep2 = $sleep2.value;
            meal2 = $meal2.value;
        }

        if($area1Posi1.value != ""){
            area1Posi1 = $area1Posi1.value;
        }else{
            area1Posi1 = "00";
        }
        if($area2Posi1.value != ""){
            area2Posi1 = $area2Posi1.value;
        }else{
            area2Posi1 = "00";
        }
        if($area3Posi1.value != ""){
            area3Posi1 = $area3Posi1.value;
        }else{
            area3Posi1 = "00";
        }
        if($area4Posi1.value != ""){
            area4Posi1 = $area4Posi1.value;
        }else{
            area4Posi1 = "00";
        }
        if($area5Posi1.value != ""){
            area5Posi1 = $area5Posi1.value;
        }else{
            area5Posi1 = "00";
        }

        if($area1Posi2.value != ""){
            area1Posi2 = $area1Posi2.value;
        }else{
            area1Posi2 = "00";
        }
        if($area2Posi2.value != ""){
            area2Posi2 = $area2Posi2.value;
        }else{
            area2Posi2 = "00";
        }
        if($area3Posi2.value != ""){
            area3Posi2 = $area3Posi2.value;
        }else{
            area3Posi2 = "00";
        }
        if($area4Posi2.value != ""){
            area4Posi2 = $area4Posi2.value;
        }else{
            area4Posi2 = "00";
        }
        if($area5Posi2.value != ""){
            area5Posi2 = $area5Posi2.value;
        }else{
            area5Posi2 = "00";
        }

        area1 = $area1.value;
        area1In = $area1In.value;
        area1Out = $area1Out.value;

        area2 = $area2.value;
        area2In = $area2In.value;
        area2Out = $area2Out.value;
        
        if(flgArea3 == 0){
            area3 = $area3.value;
            area3In = $area3In.value;
            area3Out = $area3Out.value;
        }
        if(flgArea4 == 0){
            area4 = $area4.value;
            area4In = $area4In.value;
            area4Out = $area4Out.value;
        }
        if(flgArea5 == 0){
            area5 = $area5.value;
            area5In = $area5In.value;
            area5Out = $area5Out.value;
        }

        //最終エリアフラグ
        let endFlag = new Array("00","00","00","00");
        switch($mapNum.value){
            case "2": endFlag[0] = "02"; break;
            case "3": endFlag[1] = "02"; break;
            case "4": endFlag[2] = "02"; break;
            case "5": endFlag[3] = "02"; break;
        }

        //初期レベル、現在レベル
        let iniLev;
        let curLev;

        iniLev = document.getElementById("$iniLev").value;
        iniLev = parseInt(iniLev,10);
        iniLev = iniLev.toString(16).toUpperCase();
        if(iniLev.length == 1){
            iniLev = "0" + iniLev;
        }

        curLev = document.getElementById("$curLev").value;
        curLev = parseInt(curLev,10);
        curLev = curLev.toString(16).toUpperCase();
        if(curLev.length == 1){
            curLev = "0" + curLev;
        }

        //配列
        let output = new Array(76);

        //開始アドレス
        let startAddress;
        switch($frames.value){
            case '1': startAddress = 0x833DF20; break;
            case '2': startAddress = 0x833E050; break;
            case '3': startAddress = 0x833E180; break;
            case '4': startAddress = 0x833E2B0; break;
            case '5': startAddress = 0x833E3E0; break;
            case '6': startAddress = 0x833E510; break;
            case '7': startAddress = 0x833E640; break;
            case '8': startAddress = 0x833E770; break;
            case '9': startAddress = 0x833E8A0; break;
            case '10': startAddress = 0x833E9D0; break;
        }

        //クエスト作成者名
        for(i=0,j=0; i<12; i+=2,j+=1){
            
            output[j] = ( "0" + startAddress.toString(16).toUpperCase() + " " + AuthorName[i+1] + AuthorName[i]);

            startAddress += 4;
        }

        //クエスト識別 ID
        output[6] = ( "0" + startAddress.toString(16).toUpperCase() + " " + questID1);
        startAddress += 4;
        output[7] = ( "0" + startAddress.toString(16).toUpperCase() + " " + questID2);
        startAddress += 4;

        //空白
        output[8] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00000000");
        startAddress += 4;

        //出土武器、防具、部位
        output[9] = ( "0" + startAddress.toString(16).toUpperCase() + " " + $armorType.value + $armor.value + $weapon.value + "00");
        startAddress += 4;

        //モンスター1体目
        output[10] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "000000" + monster1);
        startAddress += 4;

        //01
        output[11] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00000001");
        startAddress += 4;
        
        //モンスター1 初期エリア
        output[12] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "0007" + ini1 + "FF");
        startAddress += 4;

        //空白 * 7
        for(i=0; i<7; i++){
            output[13+i] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00000000");
            startAddress += 4;
        }
        
        //モンスター2体目
        output[20] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "000000" + monster2);
        startAddress += 4;

        //01
        output[21] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00000001");
        startAddress += 4;

        //モンスター2 初期エリア
        output[22] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "0007" + ini2 + "FF");
        startAddress += 4;

        //以下3セット
        for(cnt=0,j=0;j<3;j++){
            //空白 * 8
            for(i=0;i<8;i++){
                output[23+cnt] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00000000");
                startAddress += 4;
                cnt ++;
            }

            //01
            output[23+cnt] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00000001");
            startAddress += 4;
            cnt++;

            //FF000700
            output[23+cnt] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "0007" + "00" + "FF");
            startAddress += 4;
            cnt++;
        }

        //空白 * 7
        for(i=0;i<7;i++){
            output[53+i] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00000000");
            startAddress += 4;
        }

        //モンスター1　食事、休眠、位置、位置
        output[60] = ( "0" + startAddress.toString(16).toUpperCase() + " " + area2Posi1 + area1Posi1 + sleep1 + meal1);
        startAddress += 4;

        //モンスター1　位置、位置、位置、モンスター2食事
        output[61] = ( "0" + startAddress.toString(16).toUpperCase() + " " + meal2 + area5Posi1 + area4Posi1 + area3Posi1);
        startAddress += 4;

        //モンスター2　休眠、位置、位置、位置
        output[62] = ( "0" + startAddress.toString(16).toUpperCase() + " " + area3Posi2 + area2Posi2 + area1Posi2 + sleep2);
        startAddress += 4;

        //モンスター2　位置、位置、00、00
        output[63] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00" + "00" + area5Posi2 + area4Posi2);
        startAddress += 4;

        //空白 * 5
        for(i=0;i<5;i++){
            output[64+i] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00000000");
            startAddress += 4;
        }



        //エリア1マップID、入口、出口、最終エリアフラグ
        output[69] = ( "0" + startAddress.toString(16).toUpperCase() + " " + endFlag[0] + area1Out + area1In + area1);
        startAddress += 4;

        //エリア2マップID、入口、出口、最終エリアフラグ
        output[70] = ( "0" + startAddress.toString(16).toUpperCase() + " " + endFlag[1] + area2Out + area2In + area2);
        startAddress += 4;

        //エリア3マップID、入口、出口、最終エリアフラグ
        output[71] = ( "0" + startAddress.toString(16).toUpperCase() + " " + endFlag[2] + area3Out + area3In + area3);
        startAddress += 4;

        //エリア4マップID、入口、出口、最終エリアフラグ
        output[72] = ( "0" + startAddress.toString(16).toUpperCase() + " " + endFlag[3] + area4Out + area4In + area4);
        startAddress += 4;

        //エリア5マップID、入口、出口、最終エリアフラグ
        output[73] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00" + area5Out + area5In + area5);
        startAddress += 4;

        //初期レベル、現在レベル、お宝(RARE)フラグ、モンス1狂竜化
        output[74] = ( "0" + startAddress.toString(16).toUpperCase() + " " + $frenzyM1.value + RARE + curLev + iniLev);
        startAddress += 4;

        //モンス2狂竜化、乱入モンス狂竜化、00、00
        output[75] = ( "0" + startAddress.toString(16).toUpperCase() + " " + "00" + "00" + $frenzyM3.value + $frenzyM2.value);
        startAddress += 4;


        
        removeOutput();

        //出力、生成
        count += 1;

        document.getElementById("$btnHidden").hidden = false;

        for(i=0; i<76; i++){
        // id属性で要素を取得
        let div_element = document.getElementById('$output');

        // 新しいHTML要素を作成
        let new_element = document.createElement('dd');
        new_element.textContent = output[i];
        new_element.id = "$output"+i;

        // 指定した要素の中の末尾に挿入
        div_element.appendChild(new_element);

        //$coppy1
        $coppy1.value = $coppy1.value + output[i] + "\n";
        }
        
        
        //情報info
        let info = new Array("【MH4Gクエスト情報】","\n","frame: ",$frames.value,"\n",$Author.value,"\n",$questID.value,"\n",$weapon[parseInt($weapon.value,16)+1].textContent,"\n",$weaponKinds.textContent,"\n",$armor[parseInt($armor.value,16)+1].textContent," ",$armorType[parseInt($armorType.value,16)+1].textContent,"\n",monsterName[parseInt(monster1,16)]," / ",ini1,",",meal1,",",sleep1,"\n",monsterName[parseInt(monster2,16)]," / ",ini2,",",meal2,",",sleep2,"\n",areaName[parseInt(area1,16)]," / ",area1In,",",area1Out,",",area1Posi1,",",area1Posi2,"\n",areaName[parseInt(area2,16)]," / ",area2In,",",area2Out,",",area2Posi1,",",area2Posi2,"\n",areaName[parseInt(area3,16)]," / ",area3In,",",area3Out,",",area3Posi1,",",area3Posi2,"\n",areaName[parseInt(area4,16)]," / ",area4In,",",area4Out,",",area4Posi1,",",area4Posi2,"\n",areaName[parseInt(area5,16)]," / ",area5In,",",area5Out,",",area5Posi1,",",area5Posi2,"\n","最終エリア: ",$mapNum.value,"\n","初期レベル: ",$iniLev.value,"\n","現在レベル: ",$curLev.value,"\n","RARE: ",$RARE.checked,"\n","狂竜: ",$frenzyM1.value,",",$frenzyM2.value,",",$frenzyM3.value);
        for(i=0; i<info.length; i++){

            $coppy2.value = $coppy2.value + info[i];
        }


        


    }
});


//読み込みボタン
const btnLoad = document.getElementById("$btnLoad");
btnLoad.addEventListener("click", function(){

    if(navigator.clipboard){
        navigator.clipboard.readText()
        .then(function(text){
            $load.textContent = text;


            let cnt1 = 0;                                   //改行数
            let string1 = "";                               //frame
            let string2 = "";                               //作成者名
            let string3 = "";                               //クエストID
            let q1 = ""; let q2 = ""; let tmp17 = 0;
            let string4 = ""; let val1 = "";                //出土武器種名
            let string5 = ""; let val2 = "";                //防具シリーズ
            let string6 = ""; let val3 = "";                //部位
            let tmp1 = 0;                                   //防具、部位で使用
            let string7 = "";                               //モンスター1
            let string8 = "";                               //モンスター2
            let val4 = ""; let val5 = ""; let val6 = "";    //m1初期、食事、休眠
            let val7 = ""; let val8 = ""; let val9 = "";    //m2初期、食事、休眠
            let tmp2 = 0; let tmp3 = 0;                     //m1 tmp
            let tmp4 = 0; let tmp5 = 0;                     //m2 tmp
            let val10 = ""; let val11 = "";                 //モンスターID
            let string9 = ""; let val12 = ""; let val13 = ""; let val14 = ""; let val15 = ""; let tmp6 = 0; let tmp7 = 0;          //エリア1
            let string10 = ""; let val16 = ""; let val17 = ""; let val18 = ""; let val19 = ""; let tmp8 = 0; let tmp9 = 0;         //エリア2
            let string11 = ""; let val20 = ""; let val21 = ""; let val22 = ""; let val23 = ""; let tmp10 = 0; let tmp11 = 0;       //エリア3
            let string12 = ""; let val24 = ""; let val25 = ""; let val26 = ""; let val27 = ""; let tmp12 = 0; let tmp13 = 0;       //エリア4
            let string13 = ""; let val28 = ""; let val29 = ""; let val30 = ""; let val31 = ""; let tmp14 = 0; let tmp15 = 0;       //エリア5
            let val32 = ""; let val33 = ""; let val34 = ""; //最終、初期、現在
            let val35 = ""; let val36 = ""; let val37 = ""; let val38 = ""; let val39 = "";                                        //マップID
            let string14 = ""; let val44 = "";              //RARE
            let val40 = ""; let val41 = ""; let val42 = ""; let tmp16 = 0;                                                         //狂竜化
            let val43 = "2";                                //モンスター数

            for(i=0; i<$load.textContent.length; i++){

                //改行数
                if($load.textContent[i] == "\n" ){
                    cnt1 ++;
                }

                //frame
                if(cnt1 == 1 && $load.textContent[i] != " " && $load.textContent[i] != "\n"  && $load.textContent[i] != "\r" && isNaN($load.textContent[i]) == false){
                    string1 += $load.textContent[i];
                }

                //作成者名
                if(cnt1 == 2 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    string2 += $load.textContent[i];
                }

                //クエストID
                if(cnt1 == 3 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    string3 += $load.textContent[i];
                    //スペース追加
                    if(string3.length == 8){
                        string3 += " ";
                    }
                    //q1、q2
                    if(tmp17 < 8){
                        q1 += $load.textContent[i];
                        tmp17 += 1;
                    }else{
                        q2 += $load.textContent[i];
                    }
                }

                //出土武器種名
                if(cnt1 == 4 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    string4 += $load.textContent[i];
                }

                //防具シリーズ、部位
                if(cnt1 == 6 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    if(tmp1 == 2){
                        string6 += $load.textContent[i];
                    }
                    if($load.textContent[i] == "(" || $load.textContent[i] == ")" ){
                        tmp1 += 1;
                    }
                    if(tmp1 == 0){
                        string5 += $load.textContent[i];
                    }
                }

                //モンスター1
                if(cnt1 == 7 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    
                    if(tmp2 == 1){
                        if($load.textContent[i] == ","){
                            tmp3 += 1;
                        }
                        if(isNaN($load.textContent[i]) == false){
                            switch (tmp3) {
                                case 0: val4+=$load.textContent[i]; break;
                                case 1: val5+=$load.textContent[i]; break;
                                case 2: val6+=$load.textContent[i]; break;
                            }
                        }
                    }
                    if($load.textContent[i] == "/"){
                        tmp2 += 1;
                    }
                    if(tmp2 == 0){
                        string7 += $load.textContent[i];
                    }
                }

                //モンスター2
                if(cnt1 == 8 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    
                    if(tmp4 == 1){
                        if($load.textContent[i] == ","){
                            tmp5 += 1;
                        }
                        if(isNaN($load.textContent[i]) == false){
                            switch (tmp5) {
                                case 0: val7+=$load.textContent[i]; break;
                                case 1: val8+=$load.textContent[i]; break;
                                case 2: val9+=$load.textContent[i]; break;
                            }
                        }
                    }
                    if($load.textContent[i] == "/"){
                        tmp4 += 1;
                    }
                    if(tmp4 == 0){
                        string8 += $load.textContent[i];
                    }
                }

                //エリア1
                if(cnt1 == 9 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    
                    if(tmp6 == 1){
                        if($load.textContent[i] == ","){
                            tmp7 += 1;
                        }
                        if(isNaN($load.textContent[i]) == false){
                            switch (tmp7) {
                                case 0: val12+=$load.textContent[i]; break;
                                case 1: val13+=$load.textContent[i]; break;
                                case 2: val14+=$load.textContent[i]; break;
                                case 3: val15+=$load.textContent[i]; break;
                            }
                        }
                    }
                    if($load.textContent[i] == "/"){
                        tmp6 += 1;
                    }
                    if(tmp6 == 0){
                        string9 += $load.textContent[i];
                    }
                }

                //エリア2
                if(cnt1 == 10 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    
                    if(tmp8 == 1){
                        if($load.textContent[i] == ","){
                            tmp9 += 1;
                        }
                        if(isNaN($load.textContent[i]) == false){
                            switch (tmp9) {
                                case 0: val16+=$load.textContent[i]; break;
                                case 1: val17+=$load.textContent[i]; break;
                                case 2: val18+=$load.textContent[i]; break;
                                case 3: val19+=$load.textContent[i]; break;
                            }
                        }
                    }
                    if($load.textContent[i] == "/"){
                        tmp8 += 1;
                    }
                    if(tmp8 == 0){
                        string10 += $load.textContent[i];
                    }
                }

                //エリア3
                if(cnt1 == 11 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    
                    if(tmp10 == 1){
                        if($load.textContent[i] == ","){
                            tmp11 += 1;
                        }
                        if(isNaN($load.textContent[i]) == false){
                            switch (tmp11) {
                                case 0: val20+=$load.textContent[i]; break;
                                case 1: val21+=$load.textContent[i]; break;
                                case 2: val22+=$load.textContent[i]; break;
                                case 3: val23+=$load.textContent[i]; break;
                            }
                        }
                    }
                    if($load.textContent[i] == "/"){
                        tmp10 += 1;
                    }
                    if(tmp10 == 0){
                        string11 += $load.textContent[i];
                    }
                }

                //エリア4
                if(cnt1 == 12 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    
                    if(tmp12 == 1){
                        if($load.textContent[i] == ","){
                            tmp13 += 1;
                        }
                        if(isNaN($load.textContent[i]) == false){
                            switch (tmp13) {
                                case 0: val24+=$load.textContent[i]; break;
                                case 1: val25+=$load.textContent[i]; break;
                                case 2: val26+=$load.textContent[i]; break;
                                case 3: val27+=$load.textContent[i]; break;
                            }
                        }
                    }
                    if($load.textContent[i] == "/"){
                        tmp12 += 1;
                    }
                    if(tmp12 == 0){
                        string12 += $load.textContent[i];
                    }
                }

                //エリア5
                if(cnt1 == 13 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    
                    if(tmp14 == 1){
                        if($load.textContent[i] == ","){
                            tmp15 += 1;
                        }
                        if(isNaN($load.textContent[i]) == false){
                            switch (tmp15) {
                                case 0: val28+=$load.textContent[i]; break;
                                case 1: val29+=$load.textContent[i]; break;
                                case 2: val30+=$load.textContent[i]; break;
                                case 3: val31+=$load.textContent[i]; break;
                            }
                        }
                    }
                    if($load.textContent[i] == "/"){
                        tmp14 += 1;
                    }
                    if(tmp14 == 0){
                        string13 += $load.textContent[i];
                    }
                }

                //最終、初期、現在
                if(cnt1 == 14 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r" && isNaN($load.textContent[i]) == false){
                    val32 += $load.textContent[i];
                }
                if(cnt1 == 15 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r" && isNaN($load.textContent[i]) == false){
                    val33 += $load.textContent[i];
                }
                if(cnt1 == 16 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r" && isNaN($load.textContent[i]) == false){
                    val34 += $load.textContent[i];
                }

                //RARE
                if(cnt1 == 17 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    string14 += $load.textContent[i]
                }

                //狂竜
                if(cnt1 == 18 && $load.textContent[i] != " " && $load.textContent[i] != "\n" && $load.textContent[i] != "\r"){
                    
                    
                    if($load.textContent[i] == ","){
                        tmp16 += 1;
                    }

                    if(isNaN($load.textContent[i]) == false){
                        switch (tmp16) {
                            case 0: val40+=$load.textContent[i]; break;
                            case 1: val41+=$load.textContent[i]; break;
                            case 2: val42+=$load.textContent[i]; break;
                        }
                    }
                }
                    
                

            }


            switch (string4) {  //武器種変換
                case "アックス/操虫棍":
                case "スラッシュアックス/操虫棍":
                case "チャージアックス/操虫棍":
                case "スラッシュアックス":
                case "チャージアックス":
                case "操虫棍":
                val1 = "00"; break;

                case "大剣/太刀": val1 = "01"; break;
                case "片手剣/双剣": val1 = "02"; break;
                case "ランス/ガンランス": val1 = "03"; break;
                case "ハンマー/狩猟笛": val1 = "04"; break;
                
                case "弓/ボウガン":
                case "弓/ライトボウガン":
                case "弓/へビィボウガン":
                val1 = "05"; break;
            
                default:
                    break;
            }
            switch (string5) {  //防具シリーズ変換
                case "オリジナルA": val2="00"; break;
                case "オリジナルB": val2="01"; break;
                case "オリジナルC": val2="02"; break;
                case "オリジナルD": val2="03"; break;
                case "オリジナルE": val2="04"; break;
                case "オリジナルF": val2="05"; break;
                case "トライA": val2="06"; break;
                case "トライB": val2="07"; break;
                case "トライC": val2="08"; break;
                case "トライD": val2="09"; break;
                case "トライE": val2="0A"; break;
                case "トライF": val2="0B"; break;
                case "ドスA": val2="0C"; break;
                case "ドスB": val2="0D"; break;
                case "ドスC": val2="0E"; break;
                case "ドスD": val2="0F"; break;
                case "ドスE": val2="10"; break;
                case "ドスF": val2="11"; break;
                default: break;
            }
            switch (string6) {  //防具部位変換
                case "胴": val3="00"; break;
                case "腕": val3="01"; break;
                case "腰": val3="02"; break;
                case "脚": val3="03"; break;
                case "頭": val3="04"; break;
                default: break;
            }
            switch (string7) {  //モンスター1変換
                case "イャンクック": val10="07"; break;
                case "イャンクック亜種": val10="08"; break;
                case "ティガレックス": val10="0B"; break;
                case "ティガレックス亜種": val10="0C"; break;
                case "ドスランポス": val10="10"; break;
                case "ラージャン": val10="13"; break;
                case "ゴア・マガラ": val10="1C"; break;
                case "シャガル・マガラ": val10="1D"; break;
                case "イャンガルルガ": val10="1E"; break;
                case "クシャルダオラ": val10="1F"; break;
                case "テオ・テスカトル": val10="20"; break;
                case "キリン": val10="22"; break;
                case "キリン亜種": val10="23"; break;
                case "バサルモス": val10="26"; break;
                case "バサルモス亜種": val10="27"; break;
                case "ブラキディオス": val10="2C"; break;
                case "ジンオウガ": val10="30"; break;
                case "ジンオウガ亜種": val10="31"; break;
                case "イビルジョー": val10="2A"; break;
                case "セルレギオス": val10="58"; break;
                case "ディアブロス": val10="63"; break;
                case "ディアブロス": val10="64"; break;
                case "オオナズチ": val10="67"; break;
                case "ダイミョウザザミ亜種": val10="6C"; break;
            }
            switch (string8) {  //モンスター2変換
                case "なし": val11="00"; val43="1"; break;
                case "イャンクック": val11="07"; break;
                case "イャンクック亜種": val11="08"; break;
                case "ティガレックス": val11="0B"; break;
                case "ティガレックス亜種": val11="0C"; break;
                case "ドスランポス": val11="10"; break;
                case "ラージャン": val11="13"; break;
                case "ゴア・マガラ": val11="1C"; break;
                case "シャガル・マガラ": val11="1D"; break;
                case "イャンガルルガ": val11="1E"; break;
                case "クシャルダオラ": val11="1F"; break;
                case "テオ・テスカトル": val11="20"; break;
                case "キリン": val11="22"; break;
                case "キリン亜種": val11="23"; break;
                case "バサルモス": val11="26"; break;
                case "バサルモス亜種": val11="27"; break;
                case "ブラキディオス": val11="2C"; break;
                case "ジンオウガ": val11="30"; break;
                case "ジンオウガ亜種": val11="31"; break;
                case "イビルジョー": val11="2A"; break;
                case "セルレギオス": val11="58"; break;
                case "ディアブロス": val11="63"; break;
                case "ディアブロス": val11="64"; break;
                case "オオナズチ": val11="67"; break;
                case "ダイミョウザザミ亜種": val11="6C"; break;
            }
            switch (string9) {  //エリア1変換
                case "BC": val35="00"; break;
                case "迷路": val35="01"; break;
                case "傾斜": val35="02"; break;
                case "崖": val35="03"; break;
                case "水": val35="04"; break;
                case "豚": val35="05"; break;
                case "蔦": val35="06"; break;
                case "天井": val35="07"; break;
                case "柱": val35="08"; break;
                case "宝": val35="0A"; break;
                case "水晶": val35="0B"; break;
                case "砂漠": val35="0C"; break;
            }
            switch (string10) {  //エリア2変換
                case "BC": val36="00"; break;
                case "迷路": val36="01"; break;
                case "傾斜": val36="02"; break;
                case "崖": val36="03"; break;
                case "水": val36="04"; break;
                case "豚": val36="05"; break;
                case "蔦": val36="06"; break;
                case "天井": val36="07"; break;
                case "柱": val36="08"; break;
                case "宝": val36="0A"; break;
                case "水晶": val36="0B"; break;
                case "砂漠": val36="0C"; break;
            }
            switch (string11) {  //エリア3変換
                case "BC": val37="00"; break;
                case "迷路": val37="01"; break;
                case "傾斜": val37="02"; break;
                case "崖": val37="03"; break;
                case "水": val37="04"; break;
                case "豚": val37="05"; break;
                case "蔦": val37="06"; break;
                case "天井": val37="07"; break;
                case "柱": val37="08"; break;
                case "宝": val37="0A"; break;
                case "水晶": val37="0B"; break;
                case "砂漠": val37="0C"; break;
            }
            switch (string12) {  //エリア4変換
                case "BC": val38="00"; break;
                case "迷路": val38="01"; break;
                case "傾斜": val38="02"; break;
                case "崖": val38="03"; break;
                case "水": val38="04"; break;
                case "豚": val38="05"; break;
                case "蔦": val38="06"; break;
                case "天井": val38="07"; break;
                case "柱": val38="08"; break;
                case "宝": val38="0A"; break;
                case "水晶": val38="0B"; break;
                case "砂漠": val38="0C"; break;
            }
            switch (string13) {  //エリア5変換
                case "BC": val39="00"; break;
                case "迷路": val39="01"; break;
                case "傾斜": val39="02"; break;
                case "崖": val39="03"; break;
                case "水": val39="04"; break;
                case "豚": val39="05"; break;
                case "蔦": val39="06"; break;
                case "天井": val39="07"; break;
                case "柱": val39="08"; break;
                case "宝": val39="0A"; break;
                case "水晶": val39="0B"; break;
                case "砂漠": val39="0C"; break;
            }
            //16進数変換 (いらなかった)
            // val33 = parseInt(val33,10).toString(16).toUpperCase();
            // val34 = parseInt(val34,10).toString(16).toUpperCase();
            switch (string14) { //RARE変換
                case "RARE:true": string14="true"; val44="01"; break;
                case "RARE:false": string14="false"; val44="00"; break;
            }

            
            // console.log(string1);
            // console.log(string2);
            // console.log(string3);
            // console.log(string4,val1);
            // console.log(string5,val2);
            // console.log(string6,val3);
            // console.log(string7,val10,val4,val5,val6);
            // console.log(string8,val11,val7,val8,val9);
            // console.log(string9,val35,val12,val13,val14,val15);
            // console.log(string10,val36,val16,val17,val18,val19);
            // console.log(string11,val37,val20,val21,val22,val23);
            // console.log(string12,val38,val24,val25,val26,val27);
            // console.log(string13,val39,val28,val29,val30,val31);
            // console.log(val32,val33,val34);
            // console.log(string14);
            // console.log(val40,val41,val42);
            // console.log(q1,q2);

            //値をはめる
            $frames.value = string1;
            $Author.value = string2;
            AuthorChange();
            $questID.value = string3;
            questID1 = q1;
            questID2 = q2;
            $weapon.value = val1;
            $armor.value = val2;
            $armorType.value = val3;
            $monsterNum.value = val43;
            monsterNumChange();

            $monster1.value = val10;
            $monster2.value = val11;
            $ini1.value = val4;
            $ini2.value = val7;
            $meal1.value = val5;
            $meal2.value = val8;
            $sleep1.value = val6;
            $sleep2.value = val9;
            
            $area1Posi1.value = val14;
            $area1Posi2.value = val15;
            $area2Posi1.value = val18;
            $area2Posi2.value = val19;
            $area3Posi1.value = val22;
            $area3Posi2.value = val23;
            $area4Posi1.value = val26;
            $area4Posi2.value = val27;
            $area5Posi1.value = val30;
            $area5Posi2.value = val31;
            
            textSetM1();
            textSetM2();
            
            $mapNum.value = val32;
            mapNumChange();
            $area1.value = val35;
            $area1In.value = val12;
            $area1Out.value = val13;
            $area2.value = val36;
            $area2In.value = val16;
            $area2Out.value = val17;
            $area3.value = val37;
            $area3In.value = val20;
            $area3Out.value = val21;
            $area4.value = val38;
            $area4In.value = val24;
            $area4Out.value = val25;
            $area5.value = val39;
            $area5In.value = val28;
            $area5Out.value = val29;
            area1Change();
            area2Change();
            area3Change();
            area4Change();
            area5Change();

            
            
            $iniLev.value = val33;
            $curLev.value = val34;
            if(string14 == "true"){
                $RARE.checked = true;
            }else{
                $RARE.checked = false;
            }
            RARE = val44;
            $frenzyM1.value = val40;
            $frenzyM2.value = val41;
            $frenzyM3.value = val42;

            removeOutput();

        });
    }

});


