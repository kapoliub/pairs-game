$(function(){
    let isStarted = false;
    function shuffle(arr){
        let j, temp;
        for(let i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
    function getArray(sideSize){
        let arr = [];
        let arrayLength = (sideSize * sideSize)/4;
        for(let i = 0; i < arrayLength; i++){
            arr[i] = i;
            arr[i + arrayLength] = i;
            arr[i + arrayLength*2] = i;
            arr[i + arrayLength*3] = i
        }
        shuffle(arr);
        return arr;
    }


    function fillField(sideSize){
        for(let i = 0; i < sideSize; i++){
            $('#play-field').append(`<tr></tr>`) 
        }
        $('tr').each(function(){
            for(let i = 0; i < sideSize; i++){
                $(this).append(`<td></td>`)
            }
        })
        let arr = getArray(sideSize);

        $("td").each(function(i){
            $(this).append(`<img card-id='${arr[i]}' src='./build/img/${arr[i]}.jpg'></img>`)
        })
    }

    function openCards(){
        let firstCard = {
            id: '',
            data: ''
        }

        let secondCard = {
            id: '',
            data: ''
        }
        $("td img").click(function (){
            if(firstCard.id != '' && secondCard.id != '' ){
                return
            }
            if(firstCard.id == '' || secondCard.id == ''){
                if(firstCard.id == ''){
                    firstCard.id = $(this).attr('card-id')
                    $(this).removeAttr('card-id')
                    firstCard.data = $(this);
                    firstCard.data.css('opacity', '1');
                    // console.log(firstCard.id)
                }
                else if(secondCard.id == ''){
                    secondCard.id = $(this).attr('card-id');
                    secondCard.data = $(this);
                    secondCard.data.css('opacity', '1');
                    // console.log(secondCard.id)
                    if(firstCard.id === secondCard.id){
                        setTimeout(deleteCard, 1000, firstCard, secondCard)
                    }
                    else{
                        setTimeout(closeCards, 1000, firstCard, secondCard)
                    }
                } 
            }
        });
    }
    function deleteCard(first, second){
        first.data.parent().css('background-color', 'grey')
        second.data.parent().css('background-color', 'grey')
        first.data.remove();
        second.data.remove();
        first.id = '';
        first.data = '';
        second.id = '';
        second.data = '';
    }
    function closeCards(first, second){
        first.data.attr('card-id', first.id)
        first.data.css('opacity', '0');
        second.data.css('opacity', '0');
        first.id = '';
        first.data = '';
        second.id = '';
        second.data = '';
        
    }

    function startBlinking() {
        $("#start-screen span").toggle();
    }
    let blink = setInterval(startBlinking, 500);

    function pressStart(){
        clearTimeout(blink);
        $("#start-screen").attr('isPlaying', 'true')
        $("#start-screen").hide();
        $("#level-choose").show()
        $("#level-choose li").click(function(){
            fillField($(this).attr('level-id'))
            openCards();
            $("#level-choose").hide()
        })
    }

    if($("#start-screen").attr('isPlaying') != true){
        $(document).on('keyup',function(e){
            if(e.keyCode === 13 || e.keyCode === 32){
                pressStart();
            }
        });
        
        $("#start-screen").click(function(){
            pressStart();
        })
    }
});
