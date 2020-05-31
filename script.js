{   
    let flag=false;
    let currentValue=$('#breed_options').val();

    $('#breed_options').click(function(e){
        let newValue=$('#breed_options').val();
        console.log(currentValue);
        console.log(newValue);
        if(currentValue!=newValue){
            flag=true;
        }else{
            flag=false;
        }
        currentValue=newValue;
        toggleNewBtn();
    });

    
    let toggleNewBtn=function(){
        if(flag==false){
            console.log("Flag is false");
            $('#get_new_Img').prop('disabled', true);
        }else{
            $('#get_new_Img').prop('disabled', false);
        }
    }
    let addBreedToOptions=function(){
        $.ajax({
            type:'get',
            url:'https://dog.ceo/api/breeds/list/all',
            success:function(data){
                for(breed in data.message){
                    $('#breed_options').append(`<option value="${breed}">${breed}</option>`);   
                }
                
            },error:function(error){
                console.log("Error",error)
            }
        });
    }

    let checkBreed=function(){
        let breed=$('#breed_options').val();
        return breed;
    }

    let addImage=function(breed){
        $.ajax({
            type:'get',
            url:`https://dog.ceo/api/breed/${breed}/images`,
            success:function(data){
                let random=Math.random();
                let currIndex=Math.floor(random*data.message.length);
                let link=data.message[currIndex];
                $('#dog-image').prop('src',link);
                
            },error:function(error){
                console.log(error)
            }
        });
    }

    let get_new_Image=function(){
            $('#get_new_Img').click(function(e){
                console.log(flag);
                    e.preventDefault();
                    let breed=checkBreed();
                    addImage(breed);
                    flag=false;
                    toggleNewBtn();
            });
    }
                
    let get_next_Image=function(){
        $('#get_next_Img').click(function(e){
            e.preventDefault();
            let breed=checkBreed();
            addImage(breed);
            
        });
        
    }
    
    // toggleNewBtn();
    get_next_Image();
    get_new_Image();
    addBreedToOptions();
    checkBreed();
}