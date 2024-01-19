/*
 Template Name: Heyqo - Admin & Dashboard Template
 Author: Myra Studio
 File: Chart Js
*/


! function(e) {
    "use strict";
    e(function() {
        if (e("#pieChart").length) {
            var a = e("#pieChart").get(0).getContext("2d");
            new Chart(a, { type: "pie", data: { datasets: [{ data: [21, 16, 48, 31], backgroundColor: ["#3F51B5", "#f8ac5a", "#00c2b2", "#f15050"], borderColor: ["#3F51B5", "#f8ac5a", "#00c2b2", "#f15050"] }], labels: ["Samsung", "Apple", "Vivo", "Motorola"] }, options: { responsive: !0, animation: { animateScale: !0, animateRotate: !0 } } })
        }
        if (e("#lineChart").length) {
            var r = e("#lineChart").get(0).getContext("2d");
            new Chart(r, { type: "line", data: { labels: ["2013", "2014", "2014", "2015", "2016", "2017", "2018", "2019"], datasets: [{ label: "Apple", data: [120, 180, 140, 210, 160, 240, 180, 210], borderColor: ["#1d84c6"], borderWidth: 3, fill: !1, pointBackgroundColor: "#ffffff", pointBorderColor: "#1d84c6" }, { label: "Samsung", data: [80, 140, 100, 170, 120, 200, 140, 170], borderColor: ["#00c2b2"], borderWidth: 3, fill: !1, pointBackgroundColor: "#ffffff", pointBorderColor: "#00c2b2" }] }, options: { scales: { yAxes: [{ gridLines: { drawBorder: !1, borderDash: [3, 3] }, ticks: { min: 0 } }], xAxes: [{ gridLines: { display: !1, drawBorder: !1, color: "#ffffff" } }] }, elements: { line: { tension: .2 }, point: { radius: 4 } }, stepsize: 1 } })
        }
        if (e("#areaChart").length) {
            var o = e("#areaChart").get(0).getContext("2d");
            new Chart(o, { type: "line", data: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets: [{ data: [22, 23, 28, 20, 27, 20, 20, 24, 10, 35, 20, 25], backgroundColor: ["#23b5e2"], borderColor: ["#23b5e2"], borderWidth: 1, fill: "origin", label: "purchases" }, { data: [50, 40, 48, 70, 50, 63, 63, 42, 42, 51, 35, 35], backgroundColor: ["#7266bb"], borderColor: ["#7266bb"], borderWidth: 1, fill: "origin", label: "services" }, { data: [95, 75, 90, 105, 95, 95, 95, 100, 75, 95, 90, 105], backgroundColor: ["#dfe3e9"], borderColor: ["#dfe3e9"], borderWidth: 1, fill: "origin", label: "services" }] }, options: { responsive: !0, maintainAspectRatio: !0, plugins: { filler: { propagate: !1 } }, scales: { xAxes: [{ gridLines: { display: !1, drawBorder: !1, color: "transparent", zeroLineColor: "#eeeeee" } }], yAxes: [{ gridLines: { drawBorder: !1, borderDash: [3, 3] } }] }, legend: { display: !1 }, tooltips: { enabled: !0 }, elements: { line: { tension: 0 }, point: { radius: 0 } } } })
        }
        if (areaChart, e("#barChart").length) {
            var t = e("#barChart").get(0).getContext("2d");
            new Chart(t, { type: "bar", data: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], datasets: [{ label: "Apple", data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81], backgroundColor: "#2ac14e" }, { label: "Samsung", data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59], backgroundColor: "#f8ac5a" }] }, options: { responsive: !0, maintainAspectRatio: !0, scales: { yAxes: [{ display: !1, gridLines: { drawBorder: !1 }, ticks: { fontColor: "#686868" } }], xAxes: [{ ticks: { fontColor: "#686868" }, gridLines: { display: !1, drawBorder: !1 } }] }, elements: { point: { radius: 0 } } } })
        }
    })
}(jQuery);
