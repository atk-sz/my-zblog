// console.log(window.innerWidth)
const header = document.querySelector('header');
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768)
        header.classList.remove('sticky');
    else
        if (window.scrollY > 0)
            header.classList.add('sticky', window.scrollY > 0);
})
window.addEventListener('scroll', () => {
    if (window.innerWidth > 768)
        header.classList.toggle('sticky', window.scrollY > 0);
});
// document.getElementById("submit").addEventListener("click", function () {
//     document.getElementById("res-message").innerHTML = "Hello World";
// });
$('#submit').on('click', (event) => {
    event.preventDefault();
    $('.onsubmit').empty();
    const data = {
        name: $("#user-name").val(),
        email: $("#user-email").val(),
        text: $("#user-text").val(),
    };
    $.ajax({
        type: "POST",
        url: "/sendfeedback",
        // contentType:"application/json; charset=utf-8",
        data: data,
        dataType: "json",
        success: (msg) => {
            if (msg.result) {
                $('.onsubmit').html('<h4>' + msg.message + '</h4>', setTimeout(function () {
                    $('.onsubmit').empty();
                }, 1500));
                $("#user-name").val('');
                $("#user-email").val('');
                $("#user-text").val('');
            }
            else
                $('body').find('.onsubmit').html('<h4 style="background-color: rgb(235, 158, 158);">' + msg.message + '</h4>', setTimeout(function () {
                    $('.onsubmit').empty();
                }, 2000));
        },
        error: (msg) => {
            $('body').find('.onsubmit').html('<h4 style="background-color: rgb(235, 158, 158);">Message could not be sent</h4>', setTimeout(function () {
                $('.onsubmit').empty();
            }, 3000));
        }
    });
});
openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}
closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
}