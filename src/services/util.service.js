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
  if (arr.length) {
    let idx = arr.findIndex((val) =>val.id === valueId
    );
    if (idx < 0) return false;
    else return idx;
  } else false;
}
function checkDuplicateWith_id(arr, valueId){
  if (arr.length) {
    let idx = arr.findIndex((val) =>{ 
     return val === valueId}
      );
    if (idx < 0) return false;
    else return idx;
  } else false;
}

function getExclusiveArr(arr) {
  let setLabels = new Set();
  const exclusiveArr = [];

  // implementing Set on the objects :
  arr.forEach((obj) => {
   delete obj.createdAt
   return setLabels.add(JSON.stringify(obj))
  }
  );
  //get the original values before set :
  setLabels.forEach((label) => {
    exclusiveArr.push(JSON.parse(label));
  });

  return exclusiveArr;
}

function getUniqueArr(arr){
  var uniqeArr = arr.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]);
}

export const utilService = {
  makeId,
  getRandomInt,
  checkDuplicate,
  getExclusiveArr,
  checkDuplicateWith_id
};
