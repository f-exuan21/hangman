
const words = [
    "apple",
    "banana",
    "umbrella",
    "triangle",
    "cave",
    "sunglass",
    "chair",
    "legal",
    "illegal",
    "valuable",
    "chemical",
    "delicious",
    "active",
    "creative",
    "actual",
    "wonderful",
    "slim",
    "fat",
    "stupid",
    "actual",
    "double",
    "creative",
    "show",
    "eternal",
    "exalt",
    "exert",
    "exploit",
    "explicit",
    "revolve",
    "ethereal",
    "give",
    "get",
    "grain",
    "great",
    "bad",
    "goverment",
    "trim"
];

var word;

function startGame() {

    word = words[Math.floor(Math.random() * words.length)]

    game.setUpBackground();
    
    blanks.init();

}


var game = {

    canvas : document.getElementById("canvas"),

    // background 세팅
    setUpBackground : function() {
        context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        document.body.style.textAlign = "center";
    },

    failGame : function() {
        alert("FAIL!");
        blanksDivs = document.getElementsByClassName("blanks_cards");

        for(var i = 0; i < word.length; i++) {
            blanksDivs[i].innerText = word.charAt(i).toUpperCase();
        }

        blanks.reverseAllCards(true);
    },

    successGame : function() {
        alert("SUCCESS!");
        blanks.reverseAllCards(true);
    }

}


var hangman = {

    canvas : document.getElementById("canvas"),
    x : 150,
    y : 50,
    r : 30,

    setBase : function() {

        ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 250);

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 100, this.y);

        ctx.moveTo(this.x - 20, this.y + 250);
        ctx.lineTo(this.x + 50, this.y + 250);

        ctx.stroke();
        
    },

    setRope : function() {

        ctx = canvas.getContext("2d");

        ctx.lineWidth = 3;
        
        ctx.beginPath();

        ctx.moveTo(this.x + 100, this.y);
        ctx.lineTo(this.x + 100, this.y + 50);

        ctx.moveTo(this.x + 50, this.y);
        ctx.lineTo(this.x, this.y + 50);

        ctx.stroke();

    },

    setHead : function() {

        ctx = canvas.getContext("2d");

        ctx.lineWidth = 5;
        
        ctx.beginPath();
        
        ctx.arc(this.x + 100, this.y + 50 + this.r, this.r, 0, 360);

        ctx.stroke();

    },

    setBody : function() {
    
        ctx = canvas.getContext("2d");

        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.moveTo(this.x + 100, this.y + 50 + this.r * 2);
        ctx.lineTo(this.x + 100, this.y + 50 + this.r * 2 + 50);
        
        ctx.stroke();

    },

    setArms : function() {

        ctx = canvas.getContext("2d");

        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.moveTo(this.x + 100, this.y + 50 + this.r * 2 + 10);
        ctx.lineTo(this.x + 50, this.y + 50 + this.r * 2 - 10);

        ctx.moveTo(this.x + 100, this.y + 50 + this.r * 2 + 10);
        ctx.lineTo(this.x + 150, this.y + 50 + this.r * 2 - 10);

        ctx.stroke();

    },

    setLegs : function() {

        ctx = canvas.getContext("2d");

        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.moveTo(this.x + 100, this.y + 50 + this.r * 2 + 50);
        ctx.lineTo(this.x + 50, this.y + 50 + this.r * 2 + 95);

        ctx.moveTo(this.x + 100, this.y + 50 + this.r * 2 + 50);
        ctx.lineTo(this.x + 150, this.y + 50 + this.r * 2 + 95);

        ctx.stroke();

    },

    setHands : function() {

        ctx = canvas.getContext("2d");

        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.arc(this.x + 50, this.y + 50 + this.r * 2 - 10, 5, 0, 360);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x + 150, this.y + 50 + this.r * 2 - 10, 5, 0, 360);
        ctx.stroke();

    },

    setFeet : function() {

        ctx = canvas.getContext("2d");

        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.moveTo(this.x + 50 + 10, this.y + 50 + this.r * 2 + 95 + 5);
        ctx.lineTo(this.x + 50 - 10, this.y + 50 + this.r * 2 + 95 - 10);

        ctx.moveTo(this.x + 150 - 10, this.y + 50 + this.r * 2 + 95 + 5);
        ctx.lineTo(this.x + 150 + 10, this.y + 50 + this.r * 2 + 95 - 10);

        ctx.stroke();

    }

}

var counts = 0;
var correctCounts = 0;


var blanks = {

    init : function() {
        
        this.reverseAllCards(false);
        counts = 0;
        correctCounts = 0;

        blanksDiv = document.getElementById("blanks");
        blanksDiv.innerHTML = '';

        for(var i = 0; i < word.length; i++) {
            span = document.createElement("span");
            span.className = "blanks_cards"
            span.style.display = "inline-block";
            span.style.width = "30px";
            span.style.height = "30px";
            span.style.margin = "10px";
            span.style.fontSize = "30px";
            span.style.borderBottom = "solid #000";
            blanksDiv.append(span);
        }
        
    },

    onClickCard : function(btn) {

        blanksDivs = document.getElementsByClassName("blanks_cards");
        isCorrect = false;
        
        btn.disabled = true;
        for(var i = 0; i < word.length; i++) {
            if(word[i].toUpperCase() == btn.innerText.toUpperCase()) {
                blanksDivs[i].innerText = word.charAt(i).toUpperCase();
                isCorrect = true;
                correctCounts++;
            }
        }

        if(!isCorrect) {
            counts++;
            switch(counts) {
                case 1:
                    hangman.setBase();
                    break;
                case 2:
                    hangman.setRope();
                    break;
                case 3:
                    hangman.setHead();
                    break;
                case 4:
                    hangman.setBody();
                    break;
                case 5:
                    hangman.setArms();
                    break;
                case 6:
                    hangman.setHands();
                    break;
                case 7:
                    hangman.setLegs();
                    break;
                case 8:
                    hangman.setFeet();
                    game.failGame();                  
            }
        }else {
            if(correctCounts == word.length) {
                game.successGame();
            }
        }

    },

    reverseAllCards : function(isBack) {
        blanksDivs = document.getElementsByClassName("cards");
        
        for(var i = 0; i < blanksDivs.length; i++) {
            blanksDivs[i].disabled = isBack;
        }
    }

}
