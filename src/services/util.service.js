function makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
function checkDuplicate(arr, valueId) {
  console.log(arr);
  if (arr.length) {
    console.log("went trought if");
    let idx = arr.findIndex((val) => val.id === valueId);
    console.log(idx);
    if (idx < 0) return false;
    else return idx;
  } else false;
}

export const utilService = {
  makeId,
  getRandomInt,
  checkDuplicate,
};
