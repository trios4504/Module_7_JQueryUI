$("<span></span>").attr("id", "Gram").text("My Gram").appendTo("#MainContainerDiv");
$("<button></button>").attr("id", "LoginButton").text("Log In").appendTo("#MainContainerDiv");
$("<button></button>").attr("id", "SignupButton").text("Sign Up").appendTo("#MainContainerDiv");
$("</br>").appendTo("#MainContainerDiv");

var imageContainer = $("<div></div>").attr("id", "ImageContainer").appendTo("#MainContainerDiv");
var table = $("<table></table>").attr("id", "ImageTabel").appendTo(imageContainer);
var thead = $("<thead></thead>").appendTo(table);
var headerRow = $("<tr></tr>").appendTo(thead);
$("<th></th>").appendTo(headerRow);
$("<th></th>").appendTo(headerRow);
$("<th></th>").appendTo(headerRow);
$("<th></th>").appendTo(headerRow);
$("<th></th>").appendTo(headerRow);

var tbody = $("<tbody></tbody>").attr("id", "ImageBodyContainer").appendTo(table);

$("</br>").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "About").text("About").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "Blog").text("Blog").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "Jobs").text("Jobs").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "Help").text("Help").appendTo("#MainContainerDiv");
$("</br>").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "English").text("English").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "2021").text("2021").appendTo("#MainContainerDiv");
$("<span></span>").attr("id", "MyGram").text("MyGram").appendTo("#MainContainerDiv");
$("</br>").appendTo("#MainContainerDiv");
$("#SignupButton").click(function () {
    $("#DialogFormBox").dialog("open");
});
$("#LoginButton").click(function () {
    alert("You have successfully logged in!");
});

$(document).ready(function () {
    $('form[name="UserInputForm"]').validate({
        rules: {
            User: "required",
            Password: "required"
        },
        messages: {
            User: "User is required",
            Password: "Password is required"
        },
        submitHandler: function(form) {
            $("#DialogBox").dialog(
                "open");
        }
    });

    $.when($.ajax({
        url: "/Home/GetAllImages",
        method: "GET"
    })).then(function (data) {
        var image = null;
        var tbody = $("#ImageBodyContainer");
        var tr = $("<tr></tr>");
        var td = null;
        var counter = 0;

        for (var element in data) {
            if (counter == 5) {
                tbody.append(tr);
                tr = $("<tr></tr>");
                counter = 0;
            }
            image = data[element];

            td = $("<td></td>");
            $("<span></span>").addClass("Images").text(image.imageAlt).css("margin-right", "10px")
                .appendTo(td);
            tr.append(td);

            counter++;
        }

        tbody.append(tr);
        $("#ImageTabel").DataTable();

        //ImageContainer
        //$("<span></span>").attr("id", "Image1").text("Image 1").appendTo("#MainContainerDiv");
        //$("<span></span>").attr("id", "Image2").text("Image 2").appendTo("#MainContainerDiv");
        //$("<span></span>").attr("id", "Image3").text("Image 3").appendTo("#MainContainerDiv");
        //$("<span></span>").attr("id", "Image4").text("Image 4").appendTo("#MainContainerDiv");
        //$("<span></span>").attr("id", "Image5").text("Image 5").appendTo("#MainContainerDiv");
    });


    $("#DialogBox").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            ok: function () {
                var user = $("#User").val();
                var password = $("#Password").val();

                $.when($.ajax({
                    url: "/Home/Register",
                    type: "POST",
                    data: {
                        User: user,
                        Password: password
                    },
                    datatype: "json"
                })).then(function (data) {
                    if (data != null && data.registerMessage != "") {
                        $.toast({
                            heading: "Success",
                            text: data.registerMessage,
                            icon: "success",
                            loader: true,
                            loaderBg: "blue"
                        });
                    }
                });
            },
            cancel: function () {
                $("#DialogBox").dialog(
                    "close");
            }
        }
    });

    $("#DialogFormBox").dialog({
        autoOpen: false,
        modal: true
    });

    $("#ImageTabel").on("click", ".Images", function () {
        $.when($.ajax({
            url: "/Home/ImageLike",
            type: "POST"
        })).then(function (data) {
            if (data == true) {
                $.toast({
                    heading: "Success",
                    text: "You liked the image",
                    icon: "success",
                    loader: true,
                    loaderBg: "blue"
                });
            }
        }
        );
    });
});