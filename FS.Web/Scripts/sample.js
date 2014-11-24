

//var hostURL = "http://localhost:41492/";
var hostURL = "http://sageowls.com/";
function getData(param, controller, method) {
    $.ajax({
        url: hostURL + controller + "/" + method,
        type: "GET",
        cache: false,
        data: param,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $('#divPreload').show();
        },
        success: function (json) {
            //callback(json);
            $.each(json, function (i, ddata) {

                var div_data = "<option value=" + ddata.code + ">" + ddata.name + "</option>";

                $(div_data).appendTo('#cmbFaculty');
            });
            $('#divPreload').hide();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#divPreload').hide();
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function getDataByParam(param, controller, method, callback) {
    $.ajax({
        url: hostURL + controller + "/" + method + "/" + param,
        type: "GET",
        cache: false,
        data: null,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $('#divPreload').show();
        },
        success: function (json) {
            callback(json);
            $('#divPreload').hide();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#divPreload').hide();
            alert(xhr.status);
            alert(thrownError);
        }
    });
}





$(document).ready(function()
{
    function facultyLoaded(data) {
        //var obj = JSON.parse(data);
        $.each(data, function (i, ddata) {

            var div_data = "<option value=" + ddata.code + ">" + ddata.name + "</option>";

            $(div_data).appendTo('#cmbFaculty');
        });
    }

    function coursesLoaded(data) {
        //var obj = JSON.parse(data);
        $.each(data, function (i, ddata) {

            var div_data = "<option value=" + ddata.code + ">" + ddata.name + "</option>";

            $(div_data).appendTo('#cmbCourse');
        });
    }

    function GetFaculty(param, controller, method) {
        getData(param, controller, method, facultyLoaded);
    }



    function GetCourse(param, controller, method) {
        getDataByParam(param, controller, method, coursesLoaded);
    }
    GetFaculty("", "home", "GetInstitutes");

    $('#cmbFaculty').change(function () {
        $('#cmbCourse').find('option').remove()
        GetCourse($(this).val(), "home", "GetCourses");
    })

  

    

})
