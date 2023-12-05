//選取HTML要做動畫的區塊
let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

// // parameter1 是要控制的對象
// // parameter2 是duration(total時間)
// // parameter3 是控制對象的原始狀態
// // parameter4 是控制對象的動畫結束後的狀態
// // parameter5 提早開始跑
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2" //提早1.2秒開始跑
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });
//清除動畫的覆蓋pointerEvents = "none"
window.setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2400);
//按下鍵盤不重整
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});
//按下button不重整
let allbutton = document.querySelectorAll("button");
allbutton.forEach((button) => {
  button.addEventListener("click", (i) => {
    i.preventDefault();
  });
});
//按下select要setGPA() changeColor()
let allselect = document.querySelectorAll("select");
allselect.forEach((select) => {
  select.addEventListener("change", (r) => {
    setGPA();
    changeColor(r.target);
  });
});
//調整後學分"也"要setGPA()
let allcredit = document.querySelectorAll(".class-credits");
allcredit.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});
//select要改變顏色
function changeColor(target) {
  if (target.value == "") {
    target.style.backgroundColor = "white";
  }
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
  } else if (
    target.value == "B+" ||
    target.value == "B" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "lightblue";
  } else if (
    target.value == "C+" ||
    target.value == "C" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "lightyellow";
  } else if (
    target.value == "D+" ||
    target.value == "D" ||
    target.value == "D-"
  ) {
    target.style.backgroundColor = "orange";
  } else if (target.value == "F") {
    target.style.backgroundColor = "red";
  } else {
    target.style.backgroundColor = "white";
  }
}
//
// let allform = document.querySelectorAll("form");
// allform.addEventListener("keypress", (e) => {
//   if (e.key == "Enter") {
//     e.preventDefaul();
//   }
// });
//
function setGPA() {
  let formlen = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credits");
  let select = document.querySelectorAll("select");
  let son = 0;
  let mon = 0;

  // for (let i = 0; i < credits.length; i++) {
  for (let i = 0; i < formlen; i++) {
    //如果不是Nan才會+=
    if (!isNaN(credits[i].valueAsNumber)) {
      mon += credits[i].valueAsNumber;
    }
  }

  for (let i = 0; i < formlen; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      son += credits[i].valueAsNumber * convertor(select[i].value);
    }
  }
  let ans;
  if (mon == 0 || son == 0) {
    ans = 0.0;
  } else {
    ans = son / mon;
  }
  let gpa = document.getElementById("result-gpa");
  gpa.innerText = ans.toFixed(2);
  //變色
  let resultBroder = document.querySelector(".result");
  if (ans >= 2.7 && ans != 0) {
    resultBroder.classList.remove("ani");
    resultBroder.style = " border-color: limegreen;";
  } else if (ans >= 1.7 && ans != 0) {
    resultBroder.classList.remove("ani");
    resultBroder.style = "border-color: yellow;";
  } else if (ans < 1.7 && ans != 0) {
    resultBroder.classList.remove("ani");
    resultBroder.style = "border-color: red;";
  }
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

//新增欄位
let plusbtn = document.querySelector(".plus-btn");
plusbtn.addEventListener("click", () => {
  let newform = document.createElement("form");
  let newdiv = document.createElement("div");
  newdiv.classList.add("grader");
  //製作出New div裡面的元素
  //1.class category
  let newinput1 = document.createElement("input");
  newinput1.setAttribute("list", "opt"); //key:value
  newinput1.setAttribute("type", "text");
  newinput1.setAttribute("placeholder", "class category");
  newinput1.classList.add("class-type");
  //2.class numder
  let newinput2 = document.createElement("input");
  newinput2.classList.add("class-numder");
  newinput2.setAttribute("type", "text");
  newinput2.setAttribute("placeholder", "class numder");
  //3.credits
  let newinput3 = document.createElement("input");
  newinput3.classList.add("class-credits");
  newinput3.setAttribute("type", "number");
  newinput3.setAttribute("placeholder", "credits");
  newinput3.setAttribute("min", "0");
  newinput3.setAttribute("max", "6");
  //已經設定 點擊newinput3要
  newinput3.addEventListener("click", () => {
    setGPA();
  });
  //4.select
  let newselect = document.createElement("select");
  newselect.classList.add("select");
  newselect.setAttribute("name", "select");
  // here is the select tag
  //將value放入opt(1)
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);
  //將 opt1放入newSelect(2)
  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);
  //新垃圾桶
  let newbutton = document.createElement("button");
  newbutton.classList.add("trush");
  let newi = document.createElement("i");
  newi.classList.add("fas"); //classList幫他加入classList
  newi.classList.add("fa-trash");
  newbutton.appendChild(newi);

  //全部放進newdiv
  let allinput = document.querySelector(".all-Input");
  newdiv.appendChild(newinput1);
  newdiv.appendChild(newinput2);
  newdiv.appendChild(newinput3);
  newdiv.appendChild(newSelect);
  newdiv.appendChild(newbutton); //垃圾桶
  newform.appendChild(newdiv); //再把newdiv放進 newform
  //怪怪的
  allinput.appendChild(newform); //再把newform放進  allinput
  //嘗試上動畫
  newform.style.animation = "scaleUp 0.5s ease forwards";
  //垃圾桶功能
  newbutton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaledown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        console.log(e.target);
        e.target.remove();
        setGPA();
      }
    );
  });
  //如果刪除了
  //先刪掉
  let deleform = newbutton.parentElement.parentElement;
  deleform.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
    console.log("我有用嗎");
  });
  //
  // console.log(newSelect.parentElement);
  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });
  //選單換色
});
//結束

//按下垃圾桶要消失
let alltrush = document.querySelectorAll(".trush");
alltrush.forEach((trush) => {
  trush.addEventListener("click", (e) => {
    console.log(e);
    e.target.parentElement.parentElement.classList.add("trush-animation");
  });
});
alltrush.forEach((i) => {
  let removeform = i.parentElement.parentElement;
  removeform.addEventListener("transitionend", (e) => {
    console.log(e);
    e.target.remove();
    setGPA();
  });
});

let decending = document.querySelector(".sort-decending");
let scending = document.querySelector(".sort-scending");
decending.addEventListener("click", () => {
  sort("decending");
});
scending.addEventListener("click", () => {
  sort("scending");
});
function sort(direaction) {
  let grader = document.querySelectorAll(".grader");
  let obj_arr = [];
  for (let i = 0; i < grader.length; i++) {
    let class_category = grader[i].children[0].value;
    let class_number = grader[i].children[1].value;
    let class_credits = grader[i].children[2].value;
    let class_select = grader[i].children[3].value; //抓回的都是string

    if (
      !(
        class_category == "" &&
        class_number == "" &&
        class_credits == "" &&
        class_select == ""
      )
    ) {
      let class_obj = {
        class_category, //因為class_category: class_category太常見,因此直接寫class_category
        class_number,
        class_credits,
        class_select,
      };
      obj_arr.push(class_obj);
    }
  }

  //取得objarr後,把成績換成數字，來進行升降續
  for (let i = 0; i < obj_arr.length; i++) {
    obj_arr[i].class_select_value = convertor(obj_arr[i].class_select);
  }
  // console.log(obj_arr[2].class_select, obj_arr[2].class_select_value);

  obj_arr = mergesort(obj_arr);
  if (direaction == "decending") {
    obj_arr = obj_arr.reverse();
  }
  // console.log(obj_arr);
  //跟著merge sort先刪除，在填入
  let allInputs = document.querySelector(".all-Input");
  allInputs.innerHTML = "";
  for (i = 0; i < obj_arr.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
    <input type="text" class="class-type" placeholder="class category" list="opt" value=${obj_arr[i].class_category} /><!--
    --><input type="text" class="class-numder" placeholder="class numder" value=${obj_arr[i].class_number} /><!--
    --><input type="number" class="class-credits" placeholder="credits" min="0" max="6" value=${obj_arr[i].class_credits} /><!--
    // --><select name="select" class="select" >
    // <option value=""></option>
    // <option value="A">A</option>
    // <option value="A-">A-</option>
    // <option value="B+">B+</option>
    // <option value="B">B</option>
    // <option value="B-">B-</option>
    // <option value="C+">C+</option>
    // <option value="C">C</option>
    // <option value="C-">C-</option>
    // <option value="D+">D+</option>
    // <option value="D">D</option>
    // <option value="D-">D-</option>
    // <option value="F">F</option>
    // </select><!--
    --><button class="trush"><i class="fas fa-trash"></i></button>
    </div>
    </form>`;
  }
  grades = document.querySelectorAll(".grader");

  for (i = 0; i < grades.length; i++) {
    grades[i].children[3].value = obj_arr[i].class_select;
  }

  //
  let creditsAll = document.querySelectorAll(".class-credits");
  let SelectorAll = document.querySelectorAll("select");
  // console.log(creditsAll, SelectorAll);
  //使新的credits掛上監聽
  creditsAll.forEach((credits) =>
    credits.addEventListener("click", () => {
      setGPA();
    })
  );
  //使新的select掛上監聽
  SelectorAll.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      changeColor(e.target);
      setGPA();
    });
  });
  //使新的alltrush能有功能、動畫
  let alltrush = document.querySelectorAll(".trush");
  alltrush.forEach((trush) => {
    trush.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.classList.add("trush-animation");
    });
  });
  alltrush.forEach((i) => {
    let removeform = i.parentElement.parentElement;
    removeform.addEventListener("transitionend", (e) => {
      e.target.remove();
      setGPA();
    });
  });
}

function merge(a1, a2) {
  let j = 0;
  let i = 0;
  let result = [];
  while (j < a1.length && i < a2.length) {
    if (a1[j].class_select_value > a2[i].class_select_value) {
      result.push(a2[i]);
      i++;
    } else {
      result.push(a1[j]);
      j++;
    }
  }
  while (j < a1.length) {
    result.push(a1[j]);
    j++;
  }
  while (i < a2.length) {
    result.push(a2[i]);
    i++;
  }

  return result;
}

function mergesort(arr) {
  if (arr.length == 0) {
    return;
  }
  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let lift = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergesort(lift), mergesort(right));
  }
}
