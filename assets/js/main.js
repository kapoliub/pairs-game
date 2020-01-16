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
            if(firstCard.id == '' || secondCard.id == ''){
                if(firstCard.id == ''){
                    firstCard.id = $(this).attr('card-id')
                    $(this).removeAttr('card-id')
                    firstCard.data = $(this);
                    console.log(firstCard.id)
                }
                else if(secondCard.id == ''){
                    secondCard.id = $(this).attr('card-id');
                    secondCard.data = $(this);
                    console.log(secondCard.id)
                    if(firstCard.id === secondCard.id){
                        firstCard.data.remove();
                        secondCard.data.remove();
                        console.log('yes')
                    }
                    else{
                        firstCard.data.attr('card-id', firstCard.id)
                    }
                    firstCard.id = '';
                    firstCard.data = '';
                    secondCard.id = '';
                    secondCard.data = '';
                } 
            }
        });
    }

    // openCards()
    // fillField(4);

    
    // pressStart()
    

    // function startBlinking() {
    //     $("#start-screen span").toggle();
    // }

    // let blink = setInterval(startBlinking, 500);

    function pressStart(){
        // clearTimeout(blink);
        $("#start-screen").hide();
        $("#level-choose").show()
        // chooseDifficult();
        fillField(4)
        openCards();
    }
    // fillField(6)
    // chooseDifficult();
    // openCards()

    function chooseDifficult(){
        let level;
        $('#level-choose li').click(function(){
            level = $(this).attr('id');
            switch(level){
                case 'level-1':
                    fillField(4);
                    $("#level-choose li").hide();
                    $("#level-choose span").hide();
                    break;
                case 'level-2':
                    fillField(6)
                    $("#level-choose li").hide();
                    $("#level-choose span").hide();
                    break;
                case 'level-3':
                    fillField(8);
                    $("#level-choose li").hide();
                    $("#level-choose span").hide();
                    break;
                case 'level-4':
                    fillField(10);
                    $("#level-choose li").hide();
                    $("#level-choose span").hide();
                    break;
            }
        }); 
        
    }
    

    if(isStarted === false){
        $(document).on('keyup',function(e){
            if(e.keyCode === 13 || e.keyCode === 32){
                pressStart();
                isStarted = true;
            }
        });
        
        $("#start-screen").click(function(){
            pressStart();
            isStarted = true;
        })
    }
});
