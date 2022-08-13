// const express = require("express")
// const fetch = require("isomorphic-fetch")

console.log("test");

const acc = document.getElementsByClassName("accordion");

acc.addEventListener("click", function () {
  this.classList.toggle("active");
  /* Toggle between hiding and showing the active panel */
  var panel = this.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
});
