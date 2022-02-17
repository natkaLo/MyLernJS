const pictureSize = (imgSelector) =>{
    const blocks = document.querySelectorAll(imgSelector);

    function showImg(block){
        const img = block.querySelector('img');
        //все названия картинок у нас в формате (name.png). Нужно добавить -1
        img.src = img.src.slice(0,-4) + '-1.png'; //slice отрежет от строки 4 символа с конца (.png)
        //скроем все параграфы внутри каждого блока (кроме параграфа с классом sizes-hit)
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    }

    function hideImg(block){
        const img = block.querySelector('img');
        //все названия картинок у нас в формате (name.png). Нужно убрать -1
        img.src = img.src.slice(0,-6) + '.png'; //slice отрежет от строки 6 символа с конца (-1.png)
        //скроем все параграфы внутри каждого блока (кроме параграфа с классом sizes-hit)
        block.querySelectorAll('p').forEach(p => {
            p.style.display = 'block';
        });
    }

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showImg(block);
        });
        block.addEventListener('mouseout', () => {
            hideImg(block);
        });
    });
};
export default pictureSize;