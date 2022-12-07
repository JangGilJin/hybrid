// div 게임 판 배열 각각 16개로된 블록 불러오기
var cellArr = document.getElementsByClassName("cell");
// 숫자 배열 numArr에다가 16개의 배열
var numArr = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

// 상하좌우 이동
// 상하좌우 방향키 입력
function moveNum(obj) {
    switch (obj.getAttribute("id")) {
        case "ArrowUp"://업 조건값
            up();//up 동작
            break; //up 
        case "ArrowDown"://다운 조건값
            down();//down 동작
            break; //down
        case "ArrowLeft"://왼쪽 조건값
            left();//left 동작
            break; //left
        case "ArrowRight"://오른쪽 조건값
            right();//right 동작
            break; //right
    }
}

// 게임 초기화
function init() {
    // i 가 16이 될때까지 반복 i는 16개로된 블록 즉, 블록을16개 만드는 코드 만들어진 코드는 numArr에 배열에다가 배치
    for (var i = 0; i < 16; i++) {
        cellArr[i].innerHTML = "";
        numArr[i] = 0;
    }
    //점수를 초기화 시키는 코드 게임이 초기화 되었을때 스코어를 0으로 만들어주는 코드
    var score = document.getElementById("score");
    score.innerHTML = 0;
    //초기화
    randomNum();
    randomNum();
}

// 게임 시작
function start() {
    //html 에 있는 div intro 를 불러오는 코드
    document.getElementById("intro").style.display = 'none';
    //html 에 있는 div gamearea를 불러오는 코드
    document.getElementById("gamearea").style.display = 'block';
    //객체를 실행시키는 함수
    init();
}
// 게임을 끝내는 함수
function end() {
    //스코어와 베스트 스코어를 불러오는 함수 score라는 곳에다가 div score를 집어 넣는 코드
    var score = document.getElementById("score").innerHTML;
    var bestScore = document.getElementById("bestScore").innerHTML;
    //score : 스코어 를 불러서 보여주는 코드
    alert("score : " + score);
//만약 최대 스코어가 방금한 스코어보다 적다면
    if (parseInt(bestScore) < parseInt(score)) {
        //베스트스코어로 불러옴
        localStorage.removeItem("2048_best_score");
        //베스트 스코어 갱신
        localStorage.setItem("2048_best_score", score);
        //베스트 스코어 불러오기
        document.getElementById("bestScore").innerHTML = score;
    }
    //intro 라는 div에 block 스타일 넣기
     document.getElementById("intro").style.display = 'block';
    //gamearea에다가 none스타일 넣기
    document.getElementById("gamearea").style.display = 'none';
    //score에다가 0 넣는코드
    document.getElementById("score").innerHTML = "0";
}
// 숫자 랜덤 생성
//16칸의 배열중에서 숫자를 랜덤으로 생성 한칸한칸
function randomNum() {
    //done에다가 false를 넣기
    var done = false;
    // done이 false와 같을때 실행
    while (done == false) {
        var num = Math.floor(Math.random() * 3);
        if (numArr[num] == 0) {
            numArr[num] = getNewNum();
            done = true;
        }
    }
    setNum();
}


// 숫자 생성 (2,4)
function getNewNum() {
    var rand = parseInt(Math.random() * 10);
    if (rand == 0) return 4;
    return 2;
}

// div에 숫자 반영
function setNum() {
    for (var i = 0; i < 16; i++) {
        cellArr[i].innerHTML = numArr[i] != 0 ? numArr[i] : "";
        setCellStyle(cellArr[i]);
    }
}
// 칸 색칠
function setCellStyle(cell) {
    var cellNum = parseInt(cell.innerHTML);
    switch (cellNum) {
        case 2:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#CBDDF5";
            break;
        case 4:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#B1CCF0";
            break;
        case 8:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#98BBEB";
            break;
        case 16:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#7EAAE6";
            break;
        case 32:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#6499E1";
            break;
        case 64:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#4B89DC";
            break;
        case 128:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#447CC7";
            break;
        case 256:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#3D6FB3";
            break;
        case 512:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#36629E";
            break;
        case 1024:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#203A5E";
            break;
        case 2048:
            cell.style.color = "#FFFFFF";
            cell.style.background = "#15273E";
            break;
        default:
            if (cellNum > 2048) {
                cell.style.color = "#FFFFFF";
                cell.style.background = "#0A131F";
            } else {
                cell.style.color = "#684A23";
                cell.style.background = "#E5EEFA";
            }
            break;
    }
}

// 왼쪽
function right() {
    var isMoved = false;
    var access = false;
    var k;
    var score = document.getElementById("score");
    //fixed
    for (var i = 14; i > 0; i -= 4) {
        access = false;
        for (var j = i; j >= i - 2; j--) {
            if (numArr[j] != 0) {
                k = j;
                while (k < (i + 1) && (numArr[k + 1] == numArr[k] || numArr[k + 1] == 0)) {
                    if (numArr[k + 1] == numArr[k] && access == false) {
                        numArr[k + 1] = numArr[k + 1] + numArr[k];
                        score.innerHTML = numArr[k + 1] + parseInt(score.innerHTML);
                        numArr[k] = 0;
                        isMoved = true;
                        access = true;
                    } else if (numArr[k + 1] == numArr[k] && access == true) {
                        access == false;
                    } else if (numArr[k + 1] == 0) {
                        numArr[k + 1] = numArr[k];
                        numArr[k] = 0;
                        isMoved = true;
                    }
                    k++;
                }
            }
        }

    }

    setNum();

    if (isMoved) {
        randomNum();
    } else {
        check();
    }
}

//오른쪽
function left() {
    var isMoved = false;
    var access = false;
    var k;
    var score = document.getElementById("score");
    for (var i = 13; i > 0; i -= 4) {
        access = false;
        for (var j = i; j <= i + 2; j++) {
            if (numArr[j] != 0) {
                k = j;
                while (k > (i - (i % 4)) && (numArr[k - 1] == numArr[k] || numArr[k - 1] == 0)) {
                    if (numArr[k - 1] == numArr[k] && access == false) {
                        numArr[k - 1] = numArr[k - 1] + numArr[k];
                        numArr[k] = 0;
                        isMoved = true;
                        access = true;
                        score.innerHTML = numArr[k - 1] + parseInt(score.innerHTML);
                    } else if (numArr[k - 1] == numArr[k] && access == true) {
                        access == false;
                    } else if (numArr[k - 1] == 0) {
                        numArr[k - 1] = numArr[k];
                        numArr[k] = 0;
                        isMoved = true;
                    }
                    k -= 1;
                }
            }
        }

    }

    setNum();
    if (isMoved) {
        randomNum();
    } else {
        check();
    }
}
//아래
function down() {
    var isMoved = false;
    var access = false;
    var k;
    var score = document.getElementById("score");
    for (var i = 11; i > 7; i -= 1) {
        access = false;
        for (var j = i; j >= 0; j = j - 4) {
            if (numArr[j] != 0) {
                k = j;
                while (k < 12 && (numArr[k + 4] == numArr[k] || numArr[k + 4] == 0)) {
                    if (numArr[k + 4] == numArr[k] && access == false) {
                        numArr[k + 4] = numArr[k + 4] + numArr[k];
                        numArr[k] = 0;
                        isMoved = true;
                        access = true;
                        score.innerHTML = numArr[k + 4] + parseInt(score.innerHTML);
                    } else if (numArr[k + 4] == numArr[k] && access == true) {
                        access == false;
                    } else if (numArr[k + 4] == 0) {
                        numArr[k + 4] = numArr[k];
                        numArr[k] = 0;
                        isMoved = true;
                    }
                    k += 4;
                }
            }
        }
    }

    setNum();

    if (isMoved) {
        randomNum();
    } else {
        check();
    }
}

//위
function up() {
    var isMoved = false;
    var access = false;
    var k;
    var score = document.getElementById("score");
    for (var i = 7; i > 3; i -= 1) {
        access = false;
        for (var j = i; j < (i + 9); j += 4) {
            if (numArr[j] != 0) {
                k = j;
                while (k >= i && (numArr[k - 4] == numArr[k] || numArr[k - 4] == 0)) {
                    if (numArr[k - 4] == numArr[k] && access == false) {
                        numArr[k - 4] = numArr[k - 4] + numArr[k];
                        numArr[k] = 0;
                        isMoved = true;
                        access = true;
                        score.innerHTML = numArr[k - 4] + parseInt(score.innerHTML);
                    } else if (numArr[k - 4] == numArr[k] && access == true) {
                        access == false;
                    } else if (numArr[k - 4] == 0) {
                        numArr[k - 4] = numArr[k];
                        numArr[k] = 0;
                        isMoved = true;
                    }
                    k -= 4;
                }
            }
        }
    }

    setNum();

    if (isMoved) {
        randomNum();
    } else {
        check();
    }
}

// 게임 종료 체크
function check() {
    var x = false;
    for (var i = 0; i < 16; i++) {
        switch (i) {
            case (0):
                if (numArr[0] == numArr[1] || numArr[0] == numArr[4]) {
                    x = true;
                };
                break;
            case (1):
                if (numArr[1] == numArr[0] || numArr[1] == numArr[2] || numArr[1] == numArr[5]) {
                    x = true;
                };
                break;
            case (2):
                if (numArr[2] == numArr[1] || numArr[2] == numArr[3] || numArr[2] == numArr[6]) {
                    x = true;
                };
                break;
            case (3):
                if (numArr[3] == numArr[2] || numArr[3] == numArr[7]) {
                    x = true;
                };
                break;
            case (4):
                if (numArr[4] == numArr[0] || numArr[4] == numArr[5] || numArr[4] == numArr[8]) {
                    x = true;
                };
                break;
            case (5):
                if (numArr[5] == numArr[1] || numArr[5] == numArr[4] || numArr[5] == numArr[6] || numArr[5] == numArr[9]) {
                    x = true;
                };
                break;
            case (6):
                if (numArr[6] == numArr[2] || numArr[6] == numArr[5] || numArr[6] == numArr[7] || numArr[6] == numArr[10]) {
                    x = true;
                };
                break;
            case (7):
                if (numArr[7] == numArr[3] || numArr[7] == numArr[6] || numArr[7] == numArr[11]) {
                    x = true;
                };
                break;
            case (8):
                if (numArr[8] == numArr[4] || numArr[8] == numArr[9] || numArr[8] == numArr[12]) {
                    x = true;
                };
                break;
            case (9):
                if (numArr[9] == numArr[5] || numArr[9] == numArr[8] || numArr[9] == numArr[10] || numArr[9] == numArr[13]) {
                    x = true;
                };
                break;
            case (10):
                if (numArr[10] == numArr[6] || numArr[10] == numArr[9] || numArr[10] == numArr[11] || numArr[10] == numArr[14]) {
                    x = true;
                };
                break;
            case (11):
                if (numArr[11] == numArr[7] || numArr[11] == numArr[10] || numArr[11] == numArr[15]) {
                    x = true;
                };
                break;
            case (12):
                if (numArr[12] == numArr[8] || numArr[12] == numArr[13]) {
                    x = true;
                };
                break;
            case (13):
                if (numArr[13] == numArr[9] || numArr[13] == numArr[12] || numArr[13] == numArr[14]) {
                    x = true;
                };
                break;
            case (14):
                if (numArr[14] == numArr[10] || numArr[14] == numArr[13] || numArr[14] == numArr[15]) {
                    x = true;
                };
                break;
            case (15):
                if (numArr[15] == numArr[11] || numArr[15] == numArr[14]) {
                    x = true;
                };
                break;
        }

        if (numArr[i] == 0) {
            x = true;
            break;
        }
    }
    if (!x) {
        end();
    }
}
