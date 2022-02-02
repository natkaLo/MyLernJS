//ф-ция action creater
// нужна для того, чтобы в  dispatch не писать объект
//создает объект, который содержит type
// const inc = () =>{
//   return {
//     type: 'INC'
//   }
// }
//запись короче
export const inc = () => ({type: 'INC'});
export const dec = () => ({type: 'DEC'});
//export const rnd = (value) => ({type: 'RND', value});
export const rnd =(value) => {
    return {type: 'RND',value: Math.floor(Math.random() * 10)}
}
