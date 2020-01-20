$(function(){
    let cardTransitionTime = 500;
    let switching = false
    let s = 1;
    let m = 0;

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

    function flipCard (card1, card2 = false) {
        if (switching) {
            return false
        }
        switching = true
        
        card1.toggleClass('is-switched')
        window.setTimeout(function () {
            card1.children().children().toggleClass('is-active')
            switching = false
        }, cardTransitionTime / 2)
        if(card2){
            card2.toggleClass('is-switched')
            window.setTimeout(function () {
                card2.children().children().toggleClass('is-active')
                switching = false
            }, cardTransitionTime / 2)
        }
    }

    function fillField(sideSize){
        // $('.main-container').append(`<table id=''play-field></table>`)
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
            // $(this).append(`<img card-id='${arr[i]}' class='image' src='./build/img/${arr[i]}.jpg'></img>`)
            $(this).append(`
                <div id='card' class="card">
                    <div class="card-wrapper">
                        <img class="card-side is-active" src='./build/img/shirt.png'/>
                        <img card-id='${arr[i]}' class="card-side card-side-back" src='./build/img/${arr[i]}.jpg' />
                    </div>
                </div>
            `)
        })
    }

    function openCards(time){
        let firstCard = {
            id: '',
            data: ''
        }

        let secondCard = {
            id: '',
            data: ''
        }
        $(".card").click(function (){
            // console.log($(this).find('.card-side-back')[0])
            // console.log($(this))
            // console.log($("#timer").text())
            if($(this).hasClass('is-switched')){
                return
            }
            if(firstCard.id != '' && secondCard.id != '' ){
                return
            }
            if(firstCard.id == '' || secondCard.id == ''){
                if(firstCard.id == ''){
                    firstCard.id = $(this).find('.card-side-back').attr('card-id');
                    firstCard.data = $(this);
                    flipCard(firstCard.data)
                    // console.log(firstCard.id)
                    // console.log(firstCard.data[0])
                }
                else if(secondCard.id == ''){ 
                    // if($(this).hasClass('is-switched')){
                    //     return
                    // }
                    secondCard.id = $(this).find('.card-side-back').attr('card-id');
                    secondCard.data = $(this);
                    // console.log(secondCard.id)
                    flipCard(secondCard.data)
                    if(firstCard.id === secondCard.id){
                        setTimeout(deleteCard, 1000, firstCard, secondCard, time)
                    }
                    else{
                        setTimeout(closeCards, 1000, firstCard, secondCard)
                    }
                } 
            }
            
        });
    }
    function deleteCard(first, second, time){
        // first.data.css('opacity', 0.3)
        // second.data.css('opacity', 0.3)
        first.data.find('.card-wrapper').remove();
        second.data.find('.card-wrapper').remove();
        first.id = '';
        first.data = '';
        second.id = '';
        second.data = '';
        if($(".card").children().length < 1){
            clearInterval(time);
            endGame();
        }
    }
    function closeCards(first, second){
        // first.data.find('.card-side-back').attr('card-id', first.id)
        // console.log(first.data.find('.card-side-back').attr('card-id'))
        flipCard(first.data, second.data)
        first.id = '';
        first.data = '';
        second.id = '';
        second.data = '';
        
    }

    function endGame(){
        let time = $("#timer").text()
        
        $('#play-field').children().remove();
        $('#play-field').hide();
        $(".main-container").append(`
            <div id="result-field">
                <h2>Your time is ${time}</h2>
                <p id='end-game-screen'>Press Start to reset</p>
            </div>
        `)
        let endScreenBlink = setInterval(endBlinkink, 500)
        $('#timer-block').hide();

        $(document).on('keyup',function(e){
            if(e.keyCode === 13 || e.keyCode === 32){
                location.reload();
            }
        });
        
        $("#result-field").click(function(){
            location.reload();
        });

    }

    function timer(){
        if(s<10){
            $("#timer").text(`${m}:0${s}`)
        }
        else{
            $("#timer").text(`${m}:${s}`)
        }
        s++
        if(s>59){
            m++;
            s=0;
        }
        
    }

    function startBlinking() {
        $("#start-screen span").toggle();
    }
    function endBlinkink(){
        $('#end-game-screen').toggle();
    }
    let blink = setInterval(startBlinking, 500);

    function pressStart(){
        clearTimeout(blink);
        $("#start-screen").attr('isPlaying', true)
        $("#start-screen").hide();
        $("#level-choose").show()
        $("#level-choose li").click(function(){
            fillField($(this).attr('level-id'))
            let time = setInterval(timer, 1000)
            openCards(time);
            $("#level-choose").hide()
            $("#timer-block").show();
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
        });
    }
});
