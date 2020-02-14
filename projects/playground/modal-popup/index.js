function openPopUpModal(){
    document.querySelector('.popup-modal-wrapper').classList.remove('hide');
}
function closePopUpModal(){
    document.querySelector('.popup-modal-wrapper').classList.add('hide');
}
function savePopUpModal(){
    document.querySelector('.popup-modal-wrapper').classList.add('hide');
}
function init(i){
    var tableBodyDom = document.querySelector('tbody');
    var tableTr = document.createElement("tr");
    var tableTd = document.createElement("td");
    var tableTdData = document.createTextNode(i);
    tableTd.appendChild(tableTdData);
    tableTr.appendChild(tableTd);
    tableBodyDom.appendChild(tableTr);
}
function loadArray(page){
    var inputArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    for (i = 0; i < inputArray.length; i++) { 
        init('data-'+ page + i);
    }
}
function cleanTable(){
    var tableDom = document.querySelector('table');
    var tableBodyDom = document.querySelector('tbody');
    tableDom.removeChild(tableBodyDom);  
    var tableNewBody = document.createElement("tbody"); 
    tableDom.appendChild(tableNewBody);
}
function loadData(page){
    cleanTable();
    loadArray(page);
}
window.onload = function(){
    loadArray(1);
}
