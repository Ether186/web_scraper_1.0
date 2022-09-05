"use strict";

const e = require("express");

/*const {
   isDocumentTypeNode,
 } = require("jsdom/lib/jsdom/living/domparsing/parse5-adapter-serialization");
 idk what this is lol
*/

/*
Overall features of this applciation
1. Scrapes HTML from any static webpage and then formats it
2. Scrapes HTML from any dynamic webpage and then formats it (explained in https://bretcameron.medium.com/how-to-build-a-web-scraper-using-javascript-11d7cd9f77f2)
3. Make a feature which displays only the textcontent of the website (removing all element tags, scripts and so forth.)
4. Make a text content search feature where you start at initial word and then an ending word and it will copy all text between those two words (if the first word doesn't exist it will copy from beginning to ending word and print error, if ending word doesn't exist it will copy from initial word to ending of textstream and print error, if neither words exist it will copy the entire text and print error)
5. Make a general element search option where you type in a script tag or an attribute, id, class and it will generate that tag.
6. Find a way to make it so you can directly access the public files on a website and download them.
*/

function testPrint() {
  console.log("test.js module is working properly");
}
function iterateOverHtml(htmlElementMasterArray, htmlArray = []) {
  let elementArrayIncludedDepthLevel;
  let elementCharCollection = [];
  let secondElementFlag = false;
  let startOfElementIndexInArray;
  // ^ keeps track of element index so that you can insert whitespace and new line if you need it
  //  at that index
  // console.log(
  //   "html element master array",
  //   htmlElementMasterArray,
  //   "html",
  //   html
  // );
  console.log(htmlArray);
  htmlArray.forEach((item, index) => {
    // if (index === 497) {
    //   console.log(" 497");
    // }
    if (htmlArray[index - 1] === "<") {
      if (htmlArray[index] === "/") {
        if (secondElementFlag === true) {
          let v = 1;
          let elementChar = htmlArray[index + v];
          while (htmlArray[index + v] !== " " && htmlArray[index + v] !== ">") {
            elementChar = htmlArray[index + v];
            console.log("ending element char", elementChar);
            elementCharCollection.push(elementChar);
            v++;
          }
        }
      } else {
        let i = 0;
        let elementChar = htmlArray[index + i];
        while (htmlArray[index + i] !== " " && htmlArray[index + i] !== ">") {
          elementChar = htmlArray[index + i];
          // console.log("beginning element char", elementChar);
          elementCharCollection.push(elementChar);
          i++;
        }
      }
      if (elementCharCollection.length !== 0) {
        let elementString = elementCharCollection.join("");
        elementCharCollection = [];
        // console.log(elementString);
        if (
          startOfElementIndexInArray === null ||
          startOfElementIndexInArray === undefined
        ) {
          startOfElementIndexInArray = 0;
        }

        stringComparisonLoop: for (
          startOfElementIndexInArray;
          startOfElementIndexInArray < htmlElementMasterArray.length;
          startOfElementIndexInArray++
        ) {
          let nestedItem = htmlElementMasterArray[startOfElementIndexInArray];
          let htmlMasterDepthLevel;
          if (startOfElementIndexInArray % 2 === 0) {
            console.log(nestedItem);

            if (nestedItem === elementString) {
              htmlMasterDepthLevel =
                htmlElementMasterArray[startOfElementIndexInArray + 1];
              console.log("index of master array", startOfElementIndexInArray);
              console.log("depth level for this element", htmlMasterDepthLevel);
              startOfElementIndexInArray++;
              break stringComparisonLoop;
            }
          }
        }
      }
    }
  });

  // iterate over the html array match it against htmlElementMasterArray  using (htmlArray[index - 1 === letter))
  // then take those letters and join them into a string and compare them to the html element master array
  // and then when matched insert white space based on depth level twice (one for opening tag one for closing tag (which you will have to find))
  // when finishes looping over html element master array once for opening tag and once for closing tag in html array
  // you will then move on to next element in html array
  // and compare it to html element master array
  // (you need to save where the index where the html element master array had just left off on previous element comparison).
  // It will continue this until all of the html is formatted
  // then it will be turned into a string and displayed
}
function matchStartTagWithEndingTag(matchingTagArray, elementArray, htmlArray) {
  let openingTag;
  let htmlElementMasterArray = new Array();
  let htmlElementType = new Array();

  // let htmlElementReferenceArray = [
  //   "html",
  //   "head",
  //   "title",
  //   "base",
  //   "link",
  //   "meta",
  //   "style",
  //   "body",
  //   "article",
  //   "section",
  //   "nav",
  //   "aside",
  //   "h1",
  //   "h2",
  //   "h3",
  //   "h4",
  //   "h5",
  //   "h6",
  //   "hgroup",
  //   "header",
  //   "footer",
  //   "address",
  //   "p",
  //   "hr",
  //   "pre",
  //   "blockquote",
  //   "ol",
  //   "ul",
  //   "menu",
  //   "li",
  //   "dl",
  //   "dt",
  //   "dd",
  //   "figure",
  //   "figcaption",
  //   "main",
  //   "div",
  //   "a",
  //   "em",
  //   "strong",
  //   "small",
  //   "s",
  //   "cite",
  //   "q",
  //   "dfn",
  //   "abbr",
  //   "ruby",
  //   "rt",
  //   "rp",
  //   "data",
  //   "time",
  //   "code",
  //   "var",
  //   "samp",
  //   "kbd",
  //   "sub",
  //   "sup",
  //   "i",
  //   "b",
  //   "u",
  //   "mark",
  //   "bdi",
  //   "bdo",
  //   "span",
  //   "br",
  //   "wbr",
  //   "ins",
  //   "del",
  //   "picture",
  //   "source",
  //   "img",
  //   "iframe",
  //   "embed",
  //   "object",
  //   "param",
  //   "video",
  //   "audio",
  //   "track",
  //   "map",
  //   "area",
  //   "table",
  //   "caption",
  //   "colgroup",
  //   "col",
  //   "tbody",
  //   "thead",
  //   "tfoot",
  //   "tr",
  //   "td",
  //   "th",
  //   "form",
  //   "label",
  //   "input",
  //   "button",
  //   "select",
  //   "datalist",
  //   "optgroup",
  //   "option",
  //   "textarea",
  //   "output",
  //   "progress",
  //   "meter",
  //   "fieldset",
  //   "legend",
  //   "details",
  //   "summary",
  //   "dialog",
  //   "script",
  //   "noscript",
  //   "template",
  //   "slot",
  //   "canvas",
  // ];

  // Reference for array above: https://www.htmlquick.com/reference/tags.html
  // Make an error being generated if a tag above isn't matched with any of the html elements in the array, this way I can know I missed
  // an element and add it to the array.

  // create html reference array to match all openingTags with what element it is
  // using a method to take filter the first characters of tag and add it to htmlElementType array and then turn it into string
  // (to prevent false positives with attributes that might have the same value as tag).
  // this way no matter how many attributes that match the tag I will know the type of tag it is and then can assign that tag
  // without the brackets to htmlElementType so I can then link the depth level and match it with the closing tag and which will be filtered
  // with startsWith method
  matchingTagArray.forEach((item, index) => {
    if (index % 2 === 0) {
      openingTag = item;
      openingTag.shift();
      openingTag.pop();
      loop: for (const v of openingTag) {
        if (v !== " ") {
          htmlElementType.push(v);
        } else {
          break loop;
        }
      }
      htmlElementType = htmlElementType.join("");
      htmlElementMasterArray.push(htmlElementType);
      htmlElementType = new Array();

      htmlElementMasterArray.push(matchingTagArray[index + 1]);

      console.log(
        "html element type",
        htmlElementType,
        "html element master array",
        htmlElementMasterArray
      );
      openingTag = openingTag.join("");
      // console.log("starting tag", openingTag);
    }
  });

  // let i = 0;
  // while (i < htmlElementMasterArray.length) {
  //   let flag = false;
  //   if (i % 2 === 0) {
  //     loop2: for (const htmlReference of htmlElementReferenceArray) {
  //       if (htmlReference === htmlElementMasterArray[i]) {
  //         // console.log(
  //         //   "html reference",
  //         //   htmlReference,
  //         //   "html element",
  //         //   htmlElementMasterArray[i]
  //         // );
  //         htmlElementType = htmlElementMasterArray[i];
  //         // console.log(
  //         //   "successfully matched html element to html reference",
  //         //   "html reference:",
  //         //   htmlReference,
  //         //   "html element:",
  //         //   htmlElementType
  //         // );
  //         flag = true;
  //         if (flag === true) {
  //           break loop2;
  //         }
  //       }
  //     }
  //     if (flag === false) {
  //       console.error(
  //         "html element not identified with html reference",
  //         htmlElementMasterArray[i]
  //       );
  //     }
  //     i++;
  //   } else {
  //     i++;
  //   }
  // }

  iterateOverHtml(htmlElementMasterArray, htmlArray);

  // //  if I need elementArray later I will have to change this where I do shallow copy of elementArray into new Array
  // // and then alter it
  // htmlElementMasterArray.forEach((ele, index) => {
  //   if (index % 2 === 0) {
  //     elementArray.every((nestedItem) => {
  //       let endingTagFirstChar = nestedItem;
  //       endingTag = nestedItem.slice();

  //       endingTagFirstChar = endingTag.slice(0, 2).join("");
  //       if (endingTagFirstChar === "</") {
  //         endingTag.shift();
  //         endingTag.shift();
  //         endingTag.pop();
  //         endingTag = endingTag.join("");
  //         nestedItem = nestedItem.join("");
  //         // console.log("ending tag", endingTag);
  //         // console.log("nested item", nestedItem);
  //         if (endingTag === ele) {
  //           htmlMatchedEndingTagArray.push(endingTag);
  //           htmlMatchedEndingTagArray.push(htmlElementMasterArray[index + 1]); // if I have issues with html spacing after this check this line

  //           return false;
  //         }
  //       }
  //       return true;
  //     });
  //     // ele = ele.split("");
  //     //       ele.unshift("<");
  //     //       ele.push(">");
  //     //       htmlElementMasterArray.splice()
  //   }
  // });

  // // console.log("htmlMatchedEndingTagArray", htmlMatchedEndingTagArray);
  // // console.log("elementArray", elementArray);
  // return [htmlElementMasterArray, htmlMatchedEndingTagArray];
}

function catchIndexInsertWhiteSpace(
  item,
  index,
  newUniqueTag = null,
  htmlArray,
  whiteSpace,
  startingIndex,
  endingIndex
) {
  if (item === "<") {
    startingIndex = index;
  }

  if (item === ">") {
    endingIndex = index;
    // console.log(item, index);

    newUniqueTag++;
  }
  return [newUniqueTag, htmlArray, endingIndex, startingIndex, whiteSpace];
}

function capturedTag(
  htmlArray,
  startingIndex,
  endingIndex,
  newUniqueTag,
  oldUniqueTag,
  elementArray
) {
  if (
    startingIndex !== 0 &&
    endingIndex !== 0 &&
    newUniqueTag !== oldUniqueTag
  ) {
    let capturedTag = htmlArray.slice(startingIndex, endingIndex + 1);

    // console.log("captured tag", capturedTag);
    if (capturedTag[1] !== "/") {
      console.log("captured starting tag", capturedTag);
    }

    elementArray.push(capturedTag);
  }
  oldUniqueTag = newUniqueTag;

  return oldUniqueTag;
}

function format(html) {
  let removedExcessiveSpaces = html.replace(/\s\s+/g, " ");
  let htmlArray = removedExcessiveSpaces.split("");
  let whiteSpace = "";
  let elementArray = new Array();
  let depthLevel = 0;
  let startingIndex = 0;
  let endingIndex = 0;
  let newUniqueTag = 0;
  let oldUniqueTag = 0;
  let matchingTagDepthLevel = 0;
  let matchingTagArray = new Array();

  let captureFlag = false;

  htmlArray.forEach((item, index) => {
    [newUniqueTag, htmlArray, endingIndex, startingIndex, whiteSpace] =
      catchIndexInsertWhiteSpace(
        item,
        index,
        newUniqueTag,
        htmlArray,
        whiteSpace,
        startingIndex,
        endingIndex
      );

    oldUniqueTag = capturedTag(
      htmlArray,
      startingIndex,
      endingIndex,
      newUniqueTag,
      oldUniqueTag,
      elementArray
    );
  });

  let htmlString = htmlArray.join("");
  // console.log("html string", htmlString);

  elementArray.forEach((item, index) => {
    console.log(item);

    // console.log("starting", item.slice(0, 2));
    if (item.slice(0, 2).join("") === "</") {
      depthLevel--;
      console.log("^ /");
    } else {
      depthLevel++;
      matchingTagDepthLevel = depthLevel;
      matchingTagArray.push(item);
      matchingTagArray.push(matchingTagDepthLevel);
      // matchingTagArray format [starting tag to be matched with first ending tag of same type, starting tag depth level]
    }
    for (let i = 0; i < depthLevel; i++) {
      whiteSpace += " ";
    }

    // elementArray.unshift(whiteSpace);
    // elementArray.push("\n");
  });

  matchStartTagWithEndingTag(matchingTagArray, elementArray, htmlArray);

  // take two arrays above and combine them into one array with the htmlElementMasterArray (opening tags) being first
  // after which comes the depth level of the opening tag then followed by the htmlMatchedEndingTagArray (closing tags)
  // which will be after the opening tag depth level, and then after that comes the closing tag depth level
  // after this is formatted for the new array take that new array and iterate over the htmlArray
  // whenever a tag matches the new array ensure that it has two spaces per depth level
  // and line up vertically with the matching tag

  // console.log(htmlArray);
}

// Use includes and a flag to pair starting and ending tag of same type and make sure they have the same depth level
//  without altering the global depth level value. (Altered)
// copy the starting tag into an array or object and check all closing tags to see if it matches the starting tag
// type if it does ensure that the closing tag has same amount of whiteSpace as the opening tag (matchingTagDepthLevel)
// I also need to figure out away to take the elementArray and splice the new formatting into the htmlArray I think
// I could do this with includes and map to find the index of each tag in htmlArray that is the same as the tags in
// elementArray (I have to control for added whtiespace/formatting)
// and then storing those indexes (and also the size of the string) in another array-nested object then running
//  splice with a for loop ( or while loop) splicing in the newly formatted elementArray tags into the
// htmlArray (and deleting the previous tags with the splice delete parameter) which has the content of the tags.
// Then I can join together the new htmlArray into htmlString variable and display it.
module.exports.testPrint = testPrint;
module.exports.format = format;
