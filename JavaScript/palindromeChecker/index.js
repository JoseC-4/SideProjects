const input = document.getElementById("palindrome");

function check(){
    const value = input.value;
    const str = reverseString(value);
    if(value == str){
        alert(`Yes, it is a palindrome`);
    }else{
        alert(`It is not a palindrome`);

    }
    input.value= "";
}

function reverseString(str){
    const check = str.split('').reverse().join('');
    return check;
}