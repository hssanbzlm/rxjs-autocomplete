import {
  debounceTime,
  map,
  distinctUntilChanged,
  mergeMap,
} from "rxjs/operators";
import { fromEvent, of } from "rxjs";
const url = "http://localhost:3000/clubs?q=";
let inputTxt = document.getElementById("text-input");
let textChange$ = fromEvent(inputTxt, "keyup");

let autoSuggest$ = textChange$.pipe(
  map((e) => e.target.value),

  debounceTime(1000),
  distinctUntilChanged(),
  mergeMap((value) =>
    value ? fetch(url + value).then((response) => response.json()) : of([])
  )
);

autoSuggest$.subscribe((v) => {
  console.log(v);

  let list = document.getElementsByClassName("list-group")[0];
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  for (let club of v) {
    let li = document.createElement("li");
    let textNode = document.createTextNode(club.name);
    li.setAttribute("class", "list-group-item list-group-item-primary");
    li.appendChild(textNode);
    list.appendChild(li);
  }
});

//document.getElementsByClassName("list-group-item")[0].style.display = "none";
