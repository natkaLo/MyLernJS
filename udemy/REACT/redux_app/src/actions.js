//ф-ция action creater
// нужна для того, чтобы в  dispatch не писать объект
//создает объект, который содержит type
// const inc = () =>{
//   return {
//     type: 'INC'
//   }
// }
//запись короче
const inc = () => ({type: 'INC'});
const dec = () => ({type: 'DEC'});
const rnd = (value) => ({type: 'RND', value});