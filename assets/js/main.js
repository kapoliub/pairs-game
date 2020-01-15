$(function(){
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

    fillField(4);

    function fillField(sideSize){
        let arr = getArray(sideSize);

        $("td").each(function(i){
            $(this).append(`<img card-id='${arr[i]}' src='./build/img/${arr[i]}.jpg'></img>`)
        })
    }

    function openCards(){
        let firstCard = {
            value: '',
            location: ''
        }

        let secondCard = {
            value: '',
            location: ''
        }
        $(document).click(function(){
            console.log($(this))
        })
        $("td").click(function (){
            console.log(this)
            if(firstCard.value == '' || secondCard.value == ''){
                if(firstCard.value == ''){
                    firstCard.value = $(this).text();
                    firstCard.location = $(this);
                    console.log(firstCard.value)
                }
                else if(secondCard.value == ''){
                    secondCard.value = $(this).text();
                    secondCard.location = $(this);
                    console.log(secondCard.value)
                    if(firstCard.value === secondCard.value){
                        firstCard.location.text('')
                        secondCard.location.text('')
                        console.log('yes')
                    }
                    else{
                        console.log('no')
                    }
                    firstCard.value = '';
                    firstCard.location = '';
                    secondCard.value = '';
                    secondCard.location = '';
                } 
            }
        });
    }
});

