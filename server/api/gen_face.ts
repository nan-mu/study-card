function reImageAfterWait() {
    let xhr = new XMLHttpRequest();
    let timeInMs = Date.now();
    let imageType = "";
    let firstPath = location.pathname.split('/')[1];
    switch (firstPath) {
        case 'this-cat-does-not-exist':
            imageType = "&type=cat";
            break;
        case 'this-horse-does-not-exist':
            imageType = "&type=horse";
            break;
        case 'this-artwork-does-not-exist':
            imageType = "&type=artwork";
            break;
        case 'this-auto-does-not-exist':
            imageType = "&type=auto";
            break;
        default:
            break
    }
    let paramsGoal = {};
    let gender = document.getElementsByName('gender');
    if (gender.length > 0) {
        gender = gender[0].value;
        paramsGoal.Gender = gender;
        imageType = imageType + '&gender=' + gender
    } else {
        paramsGoal.Gender = 'all'
    }
    let age = document.getElementsByName('age');
    if (age.length > 0) {
        age = age[0].value;
        paramsGoal.Age = age;
        imageType = imageType + '&age=' + age
    } else {
        paramsGoal.Age = 'all'
    }
    let etnic = document.getElementsByName('etnic');
    if (etnic.length > 0) {
        etnic = etnic[0].value;
        paramsGoal.Ethnicity = etnic;
        imageType = imageType + '&etnic=' + etnic
    } else {
        paramsGoal.Ethnicity = 'all'
    }
    ym(92801542, 'reachGoal', 'refreshPhoto', paramsGoal);
    xhr.open('GET', '/new?time=' + timeInMs + imageType);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function () {
        let responseObj = xhr.response;
        console.log(responseObj);
        setTimeout(function ttt() {
            let reloadButton = document.getElementById("reload-button");
            let reloadCount = document.getElementById('reload-count');
            let t = reloadCount.innerHTML;
            if (t === '1') {
                let img = document.getElementById("avatar");
                img.setAttribute("src", responseObj.src);
                let sendingParam = responseObj.src.substr(0, responseObj.src.length - 4);
                sendingParam = sendingParam.substr(12);
                let downloadPageButton = document.getElementById("download");
                mainImage = sendingParam;
                downloadPageButton.href = "/zh/download-page" + "?image=" + sendingParam;
                img.onload = function () {
                    let reloadButton = document.getElementById("reload-button");
                    reloadButton.classList.remove('waiting');
                    reloadButton.setAttribute("disabled", "");
                    reloadButton.disabled = false
                }
            } else {
                reloadCount.innerHTML = parseInt(t) - 1;
                setTimeout(ttt, 1000)
            }
        }, 1000)
    }
        ;
}