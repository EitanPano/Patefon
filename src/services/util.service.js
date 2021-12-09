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
  // console.log(arr);
  if (arr.length) {
    // console.log("went trought if");
    let idx = arr.findIndex((val) =>val.id === valueId
    );
    console.log(idx);
    // console.log(idx);
    if (idx < 0) return false;
    else return idx;
  } else false;
}
function checkDuplicateWith_id(arr, valueId){
  console.log(arr);
  if (arr.length) {
    // console.log("went trought if");
    let idx = arr.findIndex((val) =>{ 
      console.log('val id:',val);
      console.log(('currstaion id',valueId));
     return val === valueId}
      );
    console.log(idx);
    // console.log(idx);
    if (idx < 0) return false;
    else return idx;
  } else false;
}

function getExclusiveArr(arr) {
  let setLabels = new Set();
  const exclusiveArr = [];
  // console.log('array before changes',arr);

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
  // console.log('array after changes',exclusiveArr);
  

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
