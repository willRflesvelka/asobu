//DOM要素取得
const $doc = document;
const $tab = $doc.getElementById('js-tab');
const $nav = $tab.querySelectorAll('[data-nav]');
const $content = $tab.querySelectorAll('[data-content]');
const $CorW = $doc.getElementById('CorW');
const $correctIs = $doc.getElementById('correctIs');
const $next = $doc.getElementById('js-next');

//ボタンを定数化
const $button = document.querySelectorAll('[data-button]')
const buttonLength = $button.length

// 問題文、選択肢、解説文を用意
const quiz = [
    {question: '問題：次のうち、タンクロールのジョブはどれ？',
    answers: ['吟遊詩人','戦士','学者','竜騎士'],
    correct: '戦士',
    desc: '吟遊詩人は遠隔物理DPS、戦士はタンク、学者はヒーラー、竜騎士は近接物理DPS。'},
    {question: '問題：次のうち、HP回復効果があるスキルはどれ？',
    answers: ['ブルータルシェル','時神のピーアン','フェイイルミネーション','心眼'],
    correct: 'ブルータルシェル',
    desc: 'ブルータルシェルはガンブレイカーのウェポンスキル。コンボボーナスで回復力200の回復効果がつく。\nまた、時神のピーアンは弱体効果解除(吟遊詩人)、フェイイルミネーションは回復効果上昇+被魔法ダメージ軽減(学者)、心眼は被ダメージ低減+開眼バフを付与(侍)する効果がある。'},
    {question: '問題：次のうち、範囲攻撃のスキルはどれ？',
    answers: ['エアロ','エアロラ','ヴァルエアロ','ヴァルエアロラ'],
    correct: 'ヴァルエアロラ',
    desc: 'エアロ、エアロラは白魔道士の敵単体に継続ダメージを与える魔法。ヴァルエアロとヴァルエアロラは赤魔道士の攻撃魔法だが、ヴァルエアロラは対象とその周囲5mの敵に攻撃できる。'},
    {question: '問題：次のうち、基礎威力が最も高いスキルはどれ？',
    answers: ['照破','ゼノグロシー','ハート・オブ・ミゼリ','雷遁の術'],
    correct: 'ハート・オブ・ミゼリ',
    desc: '照破(侍)威力400、ゼノグロシー(黒魔道士)威力750、ハート・オブ・ミゼリ(白魔道士)威力900、雷遁の術(忍者)威力800。'},
    {question: '問題：次のうち、「側面から攻撃すると威力が上がる」スキルはどれ？',
    answers: ['強甲破点突','雪風','正拳突き','猛者の撃'],
    correct: '強甲破点突',
    desc: '強甲破点突は忍者のウェポンスキル。コンボ時威力は通常400だが、さらに側面攻撃により460に上昇する。\nなお、雪風(侍)は方向指定なし、正拳突き(モンク)は背面攻撃で威力上昇、猛者の撃(吟遊詩人)は一定時間火力を上げるアビリティである。'}
];

//配列quizの長さを比較するための変数を定義
const quizLength = quiz.length;
let quizIndex = 0;

//回答解説初期化
const init = () => {
    let buttonColorIndex = 0;
    while (buttonColorIndex < buttonLength){
        $button[buttonColorIndex].classList.remove('btn-warning');
        buttonColorIndex++;
    }

    let contentIndex = 0;
    while(contentIndex < $content.length){
        $content[contentIndex].style.display = 'none';
        $next.style.display = "none";
        contentIndex++;
    }

    let ableIndex = 0;
    while (ableIndex < buttonLength){
        $button[ableIndex].disabled = false;
        ableIndex++;
    }

    $CorW.classList.remove('text-success');
    $CorW.classList.remove('text-primary');

};
init();

//クイズの問題文、選択肢を定義
const setupQuiz = () => {

    //問題文表示
    document.getElementById('js-question').textContent = quiz[quizIndex].question;
    
    //回答用ボタン表示
    let buttonIndex = 0
    while(buttonIndex < buttonLength){
        $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
        buttonIndex++;
    }
}
setupQuiz();

//回答解説を表示し、回答ボタンを無効化する関数
const displayDescs = () => {
    $content[0].style.display = 'block';
    $correctIs.textContent = "正解は「" + quiz[quizIndex].correct + "」でした。"

    $content[1].style.display = 'block';
    $content[1].textContent = quiz[quizIndex].desc

    $next.style.display = 'block';
    
    let disIndex = 0;
    while (disIndex < buttonLength){
        $button[disIndex].disabled = true;
        disIndex++;
    }
}

//正解数をカウント
let score = 0

//選択肢のクリックに対し正誤判定
const clickHandler = (e) => {
    e.preventDefault();
    e.target.classList.add('btn-primary');
    e.target.classList.add('btn-warning');
    
    if(quiz[quizIndex].correct === e.target.textContent){
        $CorW.textContent = '正解！';
        $CorW.classList.add('text-success');
        displayDescs();
        score++;
    }else{
        $CorW.textContent = '不正解…';
        $CorW.classList.add('text-primary');
        displayDescs();
    }

    quizIndex++;

    //最終問題が終わった場合は「次の問題へ」ボタンの表示を変える
    if(quizIndex === quizLength){
        $next.textContent = '正解数を表示';
    }

};

let handlerIndex = 0;
while(handlerIndex < buttonLength){
    $button[handlerIndex].addEventListener('click',(e) => {
        clickHandler(e);
    });
    handlerIndex++;
}

//次の問題へボタンを押すと、解答解説を非表示にし、次の問題を表示する
$next.addEventListener('click',() => {
    init();
    if(quizIndex < quizLength){
        //問題がまだある場合
        setupQuiz();
    }else{
        //全問終わった場合
        window.alert(`終了です！あなたの正解数は${score}問/${quizLength}問でした！`);
    }
})


