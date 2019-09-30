
var todoLists;

var addPreItem = 0;


function sanitize(string) {

  return string.replace(/<(|\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '');
}

function createTodoListHTML(todoList) {

    var todoListHTML = '<div class="todoList" value="' + todoList.id + '">' +
            '<h4 class="listHeader">' + todoList.name + '</h4>' +
            '<h5 class="text-secondary listDate"><i class="far fa-calendar-alt"></i> ' + todoList.date + '</h5>' +
            '</div>';

    return todoListHTML;
}

function createTodoItemHTML(todoItem) {

    var status = todoItem.status;
    var todoItemHTML;

    if (status === "pending") {

        todoItemHTML = '<div class="todoItem" value="' + todoItem.id + '">' +
                '<h4 class="itemHeader"><i class="far fa-1x fa-hand-point-right" style="color: #b03f76;"></i> ' + todoItem.name + '</h4>' +
                '<h5 class="text-secondary itemDeadline">Deadline: ' + todoItem.deadline + '</h5>' +
                '<button type="button" class="btn btn-success completeItemButton" data-toggle="tooltip" data-placement="left" title="Complete Item"><i class="far fa-check-circle" alt="Complete"></i></button>' +
                '<button type="button" class="btn btn-warning addPrecondition" data-toggle="tooltip" data-placement="bottom" title="Add Precondition"><i class="far fas fa-plus" alt="Precondition"></i></button>' +
                '<button type="button" class="btn btn-danger deleteItem" data-toggle="tooltip" data-placement="right" title="Delete Item"><i class="fas fa-trash"></i></button>' +
                '</div>';
    } else if (status === "completed") {

        todoItemHTML = '<div class="todoItem" value="' + todoItem.id + '">' +
                '<h4 class="itemHeader"><i class="far fa-1x fa-hand-point-right" style="color: #b03f76;"></i> ' + todoItem.name + '</h4>' +
                '<h5 class="text-secondary itemDeadline">Deadline: ' + todoItem.deadline + '</h5>' +
                '<h5 class="text-success statusCompleted"><i class="far fa-smile-beam"></i> Completed!</h5>' +
                '</div>';

    } else if (status === "expired") {

        todoItemHTML = '<div class="todoItem" value="' + todoItem.id + '">' +
                '<h4 class="itemHeader"><i class="far fa-1x fa-hand-point-right" style="color: #b03f76;"></i> ' + todoItem.name + '</h4>' +
                '<h5 class="text-secondary itemDeadline">Deadline: ' + todoItem.deadline + '</h5>' +
                '<h5 class="text-info statusExpired"><i class="far fa-sad-tear"></i> Expired</h5>' +
                '</div>';

    }

    return todoItemHTML;



}

function createDependencyItem(todoItem) {

    var todoItemHTML;

    todoItemHTML = '<div class="todoItem" value="' + todoItem.id + '">' +
            '<h4 class="itemHeader"><i class="far fa-1x fa-hand-point-right" style="color: #b03f76;"></i> ' + todoItem.name + '</h4>' +
            '<h5 class="text-secondary itemDeadline">Deadline: ' + todoItem.deadline + '</h5>' +
            '<button type="button" class="btn btn-secondary chooseConditionButton" data-toggle="tooltip" data-placement="top" title="Choose Precondition"><i class="far fas fa-plus" alt="Complete"></i></button>' +
            '</div>';

    return todoItemHTML;

}

function showConditions(list) {

    var itemList = '';

    var i;

    for (i = 0; i < list.length; i++) {

        itemList = itemList + createDependencyItem(list[i]);
    }


    $(".rightContainerBottom").html(itemList);

}


function createTodoLıstHeaderHTML(id, name, date) {

    var todoListHeaderHTML = '<h1 class="listHeaderRight" value="' + id + '"><img src="images/list.png" height="75" width="75">' + name + '</h1>' +
            '<button type="button" class="btn btn-danger deleteList" data-toggle="tooltip" data-placement="top" title="Delete List"><i class="fas fa-trash"></i> Delete</button>' +
            '<h2 class="text-secondary listDateRight">' + date + '</h2>' +
            '<div class="dropdown orderDropdown">' +
            '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            'Order <i class="fas fa-chevron-down"></i>' +
            '</button>' +
            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
            '<a class="dropdown-item" href="#">Date</a>' +
            '<a class="dropdown-item" href="#">Deadline</a>' +
            '<a class="dropdown-item" href="#">Name</a>' +
            '<a class="dropdown-item" href="#">Status</a>' +
            '</div>' +
            '</div>' +
            '<div class="dropdown filterDropdown">' +
            '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            'Filter <i class="fas fa-chevron-down"></i>' +
            '</button>' +
            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
            '<a class="dropdown-item" href="#">All Items</a>' +
            '<a class="dropdown-item" href="#">Completed</a>' +
            '<a class="dropdown-item" href="#">Not Completed</a>' +
            '<a class="dropdown-item" href="#">Expired</a>' +
            '</div>' +
            '</div>' +
            '<input type="text" name="itemname" class="form-control newItemNameForm"  placeholder="Enter Item Name" >' +
            '<input type="date" name="itemdate" class="form-control newItemDateForm"  placeholder="Deadline" >' +
            '<button type="button" class="btn btn-success addItemButton" data-toggle="tooltip" data-placement="top" title="Add Item"><i class="fas fa-plus"></i> Add</button>';


    return todoListHeaderHTML;

}

function getLists() {

    var token = localStorage.getItem('token');
    token = encodeURIComponent(token);
    var sendData = "token=" + token;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/todolists",
        async: false,
        data: sendData,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080/"
        },

        success: function (data) {

            if (data === "failure") {

                console.log("token");
            } else {
                todoLists = data;

            }


        }
    });

}

function showTodoListsLeft(lists) {

    if (lists.length !== 0) {

        var listsHTML = '';
        var i;
        for (i = 0; i < lists.length; i++) {

            listsHTML = listsHTML + createTodoListHTML(lists[i]);
        }

        $(".leftContainer").html(listsHTML);
    } else {
        $(".leftContainer").html("<h4 class='text-dark'>No Items Added.</h4>");
    }



}

function showTodoItemsRight(list) {

    var leftSideTopHTML = '';

    leftSideTopHTML = leftSideTopHTML + createTodoLıstHeaderHTML(list.id, list.name, list.date);


    if (list.items.length !== 0) {



        var leftSideBottomHtml = '';

        var i;

        for (i = 0; i < list.items.length; i++) {

            leftSideBottomHtml = leftSideBottomHtml + createTodoItemHTML(list.items[i]);
        }
        $(".rightContainerTop").html(leftSideTopHTML);
        $(".rightContainerBottom").html(leftSideBottomHtml);


    } else {

        $(".rightContainerTop").html(leftSideTopHTML);
        $(".rightContainerBottom").html("<h4 class='text-dark'>No Items Added.</h4>");
    }


}


function findTodoList(lists, listid) {

    var i;
    for (i = 0; i < lists.length; i++) {

        if (lists[i].id + "" === listid)
            return lists[i];

    }
}

function addNewList(name) {

    var date = getDate();
    name = sanitize(name);
    var token = localStorage.getItem('token');
    token = encodeURIComponent(token);
    
    var sendData = "token=" + token + "&&name=" + name + "&&date=" + date;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/addtodolist",
        async: false,
        data: sendData,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080/"
        },

        success: function (data) {

            if (data === "failure") {

                alert("Liste Eklenemedi!");
            } else {

                var list = {
                    id: data,
                    name: name,
                    date: date,
                    items: []

                };
                todoLists.push(list);
                showTodoListsLeft(todoLists);
                alert("Liste Eklendi!");

            }


        }
    });

}

function deleteList(id) {


    var token = localStorage.getItem('token');
    token = encodeURIComponent(token);
    var sendData = "token=" + token + "&&id=" + id;

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/deletetodolist",
        async: false,
        data: sendData,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080/"
        },

        success: function (data) {

            if (data === "failure") {

                alert("Liste Eklenemedi!");
            } else {

                var i;

                for (i = 0; i < todoLists.length; i++) {

                    if (todoLists[i].id + "" === "" + id) {

                        todoLists.splice(i, 1);

                    }
                }


                clearRigtTop();
                showTodoListsLeft(todoLists);
                alert("Liste Silindi!");

            }


        }
    });

}

function getDate() {

    var d = new Date();

    var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    return date;

}
function clearRigtTop() {
    $(".rightContainerTop").html("");
}

function addNewItem(itemname, deadline, listid) {
    
    itemname = sanitize(itemname);

    var token = localStorage.getItem('token');
    token = encodeURIComponent(token);
    var sendData = "token=" + token + "&&name=" + itemname + "&&deadline=" + deadline + "&&listid=" + listid;

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/additem",
        async: false,
        data: sendData,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080/"
        },

        success: function (data) {

            if (data === "failure") {

                alert("Yapılacak Madde Eklenemedi!");
            } else {

                var i;
                var item;
                for (i = 0; i < todoLists.length; i++) {

                    if (todoLists[i].id + "" === "" + listid) {

                        item = {
                            id: data,
                            todolistid: listid,
                            deadline: deadline,
                            status: "pending",
                            date: getDate(),
                            name: itemname
                        };
                        todoLists[i].items.push(item);
                        showTodoItemsRight(todoLists[i]);
                    }
                }


                alert("Yapılacak Eklendi!");

            }


        }
    });

}

function deleteItem(itemid, listid) {


    var token = localStorage.getItem('token');
    token = encodeURIComponent(token);
    var sendData = "token=" + token + "&&itemid=" + itemid;

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/deleteitem",
        async: false,
        data: sendData,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080/"
        },

        success: function (data) {

            if (data === "failure") {

                alert("Madde Silinemedi!!");

            } else {

                var i;

                for (i = 0; i < todoLists.length; i++) {

                    if (todoLists[i].id + "" === "" + listid) {

                        var j;

                        for (j = 0; j < todoLists[i].items.length; j++) {


                            if (todoLists[i].items[j].id + "" === "" + itemid) {
                                todoLists[i].items.splice(j, 1);
                                showTodoItemsRight(todoLists[i]);
                            }
                        }

                    }
                }





            }
        }
    });

}


function completeItem(itemid, listid) {

    var token = localStorage.getItem('token');
    token = encodeURIComponent(token);
    var sendData = "token=" + token + "&&itemid=" + itemid;

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/completeitem",
        async: false,
        data: sendData,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080/"
        },

        success: function (data) {

            if (data === "failure") {

                alert("You have to complete preconditions!");

            } else {

                var i;

                for (i = 0; i < todoLists.length; i++) {

                    if (todoLists[i].id + "" === "" + listid) {

                        var j;

                        for (j = 0; j < todoLists[i].items.length; j++) {


                            if (todoLists[i].items[j].id + "" === "" + itemid) {
                                todoLists[i].items[j].status = "completed";
                                showTodoItemsRight(todoLists[i]);
                            }
                        }

                    }
                }





            }
        }
    });



}

function orderByDate(list) {

    return list.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

}
function orderByDeadline(list) {

    return list.sort(function (a, b) {
        return new Date(a.deadline) - new Date(b.deadline);
    });

}
function orderByName(list) {

    return list.sort(function (a, b) {
        if (a.name > b.name)
            return 1;
        else if (a.name < b.name)
            return -1;
        else
            return 0;
    });

}
function orderByStatus(list) {

    return list.sort(function (a, b) {

        var c;
        var d;

        c = getStatusValue(a.status);
        d = getStatusValue(b.status);


        if (c > d)
            return 1;
        else if (c < d)
            return -1;
        else
            return 0;
    });

}

function getStatusValue(status) {

    if (status === "completed") {
        return 1;
    } else if (status === "pending") {
        return 2;
    } else
        return 3;

}


function filter(status, list) {

    var i;
    var completedList = [];
    var pendingList = [];
    var expiredList = [];

    for (i = 0; i < list.items.length; i++) {

        if (list.items[i].status === "completed")
            completedList.push(list.items[i]);
        else if (list.items[i].status === "pending")
            pendingList.push(list.items[i]);
        else if (list.items[i].status === "expired")
            expiredList.push(list.items[i]);

    }

    if (status === "completed")
        return completedList;
    else if (status === "pending")
        return pendingList;
    else
        return expiredList;

}

function addCondition(item,condition){
    
    
    var token = localStorage.getItem('token');
    
    token = encodeURIComponent(token);
    
    var sendData = "token=" + token + "&&item=" + item+"&&condition="+condition;

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/adddependency",
        async: false,
        data: sendData,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080/"
        },

        success: function (data) {

            if (data === "failure") {

                alert("Item has already relationship with that!");

            } else {


                alert("Item connected with it!");
                showTodoItemsRight(todoLists);

            }
        }
    });
    
    
}




$(document).ready(function () {

//*************************** TODOLIST ITEM CLICK LISTENER(LEFT MENU) **********************//


    $(document).on("click", ".todoList", function () {

        var todolistid = $(this).attr('value');

        var selectedList = findTodoList(todoLists, todolistid);

        showTodoItemsRight(selectedList);

        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });


    });

//*************************** COMPLETE/PRE/DELETE ITEM LISTENERS ************************//

    $(document).on("click", ".completeItemButton", function () {
        $(this).tooltip('hide');
        var itemid = $(this).parent().attr('value');
        var listid = $(".listHeaderRight").attr('value');
        completeItem(itemid, listid);
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

    });

    $(document).on("click", ".deleteItem", function () {

        $(this).tooltip('hide');
        var itemid = $(this).parent().attr('value');
        var listid = $(".listHeaderRight").attr('value');
        deleteItem(itemid, listid);
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });


    });
    $(document).on("click", ".addPrecondition", function () {

        $(this).tooltip('hide');

        var itemid = $(this).parent().attr('value');

        addPreItem = itemid;

        var listid = $(".listHeaderRight").attr('value');

        var itemList;
        var i;

        for (i = 0; i < todoLists.length; i++)
        {

            if (todoLists[i].id + "" === "" + listid){
                itemList = todoLists[i].items;

            }
        }

        var itemIndex;

        for (i = 0; i < itemList.length; i++) {

            if (itemList[i].id + "" === itemid)
                itemIndex = i;
        }
        
        
        var item = itemList[itemIndex];
        
        itemList.splice(itemIndex, 1);

        var conditionList = [];

        for (i = 0; i < itemList.length; i++) {

            if (new Date(itemList[i].deadline) - new Date(item.deadline) < 1 && itemList[i].status === "pending")
                conditionList.push(itemList[i]);
        }

        

        showConditions(conditionList);
        
        
        itemList.push(item);

        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });


    });
    
    
    $(document).on("click", ".chooseConditionButton", function () {
        
        
        var condition = $(this).parent().attr('value');
        
        addCondition(addPreItem,condition);
        
        
    });

    $(document).on("click", ".addItemButton", function () {

        $(this).tooltip('hide');
        var itemname = $(".newItemNameForm").val();
        var itemdate = $(".newItemDateForm").val();
        var listid = $(this).parent().children(".listHeaderRight").attr("value");
        addNewItem(itemname, itemdate, listid);




    });

    $(document).on("click", ".dropdown-menu a", function () {

        var value = $(this).text();

        var listid = $(".listHeaderRight").attr('value');

        var listIndex;

        var i;
        for (i = 0; i < todoLists.length; i++) {

            if (todoLists[i].id + "" === "" + listid)
                listIndex = i;
        }

        var allItems = todoLists[listIndex].items

        if (value === "Date") {


            var newList = orderByDate(todoLists[listIndex].items);

            todoLists[listIndex].items = newList;

            showTodoItemsRight(todoLists[listIndex]);

        } else if (value === "Deadline") {

            var newList = orderByDeadline(todoLists[listIndex].items);


            todoLists[listIndex].items = newList;

            showTodoItemsRight(todoLists[listIndex]);
        } else if (value === "Name") {

            var newList = orderByName(todoLists[listIndex].items);


            todoLists[listIndex].items = newList;

            showTodoItemsRight(todoLists[listIndex]);

        } else if (value === "Status") {

            var newList = orderByStatus(todoLists[listIndex].items);


            todoLists[listIndex].items = newList;

            showTodoItemsRight(todoLists[listIndex]);


        } else if (value === "Completed") {

            var newList = filter("completed", todoLists[listIndex]);

            todoLists[listIndex].items = newList;

            showTodoItemsRight(todoLists[listIndex]);

            todoLists[listIndex].items = allItems;

        } else if (value === "Not Completed") {

            var newList = filter("pending", todoLists[listIndex]);

            todoLists[listIndex].items = newList;

            showTodoItemsRight(todoLists[listIndex]);

            todoLists[listIndex].items = allItems;

        } else if (value === "Expired") {

            var newList = filter("expired", todoLists[listIndex]);

            todoLists[listIndex].items = newList;

            showTodoItemsRight(todoLists[listIndex]);

            todoLists[listIndex].items = allItems;

        } else if (value === "All Items") {

            todoLists[listIndex].items = allItems;

            showTodoItemsRight(todoLists[listIndex]);



        }

        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    });






//**************************** ADD/DELETE LIST LISTENER *****************************************//



    $(document).on("click", ".deleteList", function () {


        $(this).tooltip('hide');
        var todolistid = $(this).parent().children('.listHeaderRight').attr('value');

        deleteList(todolistid);

        $(".rightContainerBottom").html("");
    });

    $(document).on("click", ".addListButton", function () {

        var name = $(".newListNameForm").val();
        addNewList(name);


    });




    getLists();
    showTodoListsLeft(todoLists);
});