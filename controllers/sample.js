// function getNumber(num) {
//     return new Promise(function(resolve, reject) {
//         // numが3以上ならnumを返し、3未満なら"Falied!"のメッセージを返す
//         if (num >= 3) {
//             setTimeout(function() {
//                 resolve(num);
//             }, 1000);
//         } else {
//             reject("Falied!");    
//         }
//     });  
// }

// // 今回は3を渡しているので、resolveから3が返ってくる
// getNumber(2).then(function(result) {
//     console.log(result);
//     //numに3を加算して、getNumberに返している
//     return result + 3;
// }).then(function(result) {
//     //上と同じ処理の繰り返し。これがチェイン
//     console.log(result);
//     return result + 3;
// }).then(function(result) {
//     // 最終結果として、numに6を加算した数を表示
//     console.log(result);
// }, function(err){
//     // 3未満の場合はrejectが呼び出され、"Falied!"のメッセージが表示される
//     console.log(err);
// });


// //o.5秒待つやつ
// var promise3 = new Promise(function(resolve, reject) {
//     setTimeout(function() {
//         resolve();
//     }, 500);
// });

/**async/await の目的は、 Promise を同期的に使用する動作を簡素化し、
 *  Promise のグループに対して何らかの動作を実行することです。 Promise が構造化コールバックに似ているのと同様に、
 *  async/await はジェネレーターと Promise を組み合わせたものに似ています。
 * 
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function
 *  */

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      while(9){

      }
    });
  }
  
  async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: "resolved"
  }
  
  asyncCall();





  
  // ...treratail https://teratail.com/questions/97127

function query(params) {
    return new Promise((resolve, reject) => {

        // ... some callback nesting for connection and request
                    resolve(result);
        // ...
    }
}

module.exports = query;