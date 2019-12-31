/**
 * Author: Cairo Campos
 * Instagram: cairocampos98
 * Email: cairocampos98@gmail.com
 * Date: 31/12/2019
 */
let table, firstDay, totalDays, start,  numRows;
const main = document.querySelector("#main");
const selectYear = document.querySelector("#years");
const selectMonth = document.querySelector("#months");
const form = document.querySelector("#sendForm");
const daysWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const allMonths = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let dt = new Date();

document.querySelector("#next").addEventListener("click", event => {
    let newMonth = dt.getMonth();
    let newYear = dt.getFullYear();

    newMonth++;

    if(newMonth > 11) {
        newYear++;
        newMonth = 0;
    }

    dt = new Date(newYear, newMonth);

    render();
});

document.querySelector("#previous").addEventListener("click", event => {
    let newMonth = dt.getMonth();
    let newYear = dt.getFullYear();

    newMonth--;

    if(newMonth < 0) {
        newYear--;
        newMonth = 11;
    }

    dt = new Date(newYear, newMonth);

    render();
});


function render() {
    firstDay = firstDayInWeek(dt);
    totalDays = totalDaysInMonth(dt);
    numRows = Math.ceil((firstDay + totalDays) / 7);

    let startDate = new Date(dt.getFullYear(), dt.getMonth());
    let start = startDate.setDate( startDate.getDate() - firstDay );

    table = '<table>';
    table += '<tr>';
    for(let key in daysWeek) {
        table += `<th>${daysWeek[key]}</th>`
    }

    for(let rows = 0; rows < numRows; rows++) {
        table += '<tr>';
        for(let cols = 0; cols < 7; cols++) {
            let w = new Date(start);
            let miliseconds = w.getDate() + (cols + ( rows * 7 ));
            let newDate = new Date(w.setDate( miliseconds ))
            let day = newDate.getDate();
            let today = newDate.getDate() == new Date().getDate() && newDate.getMonth() == new Date().getMonth() && newDate.getFullYear() == new Date().getFullYear() ? true : false;

            table += `<td class="${today ? 'today' : '' }">${day}</td>`;
        }

        table += '</tr>';
    }
    
    table += '</tr>';
    table += '</table>';

    main.innerHTML = table;
    document.querySelector("#year").innerHTML = dt.getFullYear();
    document.querySelector("#month").innerHTML = allMonths[dt.getMonth()];
    watchCurrentDate();
}

function firstDayInWeek(dt) {
    let date = new Date(dt.getFullYear(), dt.getMonth());
    return date.getDay();
}

function totalDaysInMonth(dt) {
    let date = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
    return date.getDate();
}

let back = document.querySelector("#back");
function watchCurrentDate() {
    let currentDate = new Date();
    if(dt.getFullYear() != currentDate.getFullYear() || dt.getMonth() != currentDate.getMonth())
    {
        back.classList.add("active");
    } else {
        back.classList.remove("active");
    }
}

back.addEventListener("click", function() {
    dt = new Date();
    render();
});

render();