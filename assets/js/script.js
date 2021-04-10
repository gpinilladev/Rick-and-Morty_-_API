// Variables
const URL_API = "https://rickandmortyapi.com/api/character";
let contentCards = document.getElementById("contentCards");
let contentPagination = document.getElementById("contentPagination");

// Consumir API Datos
const getData = (url_api) => {
    console.log('url_api: ', url_api);
    return fetch(url_api)
    .then((response) => response.json())
    .then((json) => {
        console.log('json: ', json);
        let data_result = json['results'];
        console.log('data_result: ', data_result);
        let data_info = json['info'];
        console.log('data_info: ', data_info);
        assignData(data_result);
        getPagination(data_info);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
}
// Llena cards de personajes
const assignData = (data_result) => {
    let contentResponse = '';
    if (data_result.length > 0) {
        data_result.forEach(element => {
            contentResponse += `
                <div class="col">
                    <div class="row p-0 m-0 bg-light" style="border: 1px solid #f4f4f4; border-radius: 10px;">
                        <div class="col-4 p-0 m-0">
                            <img src="` + element.image + `" width="200px" alt="" style="border-radius: 10px;">
                        </div>
                        <div class="col p-2 m-0">
                            <h2 class="fw-bold">` + element.name + `</h2>
                            <i class="fa fa-circle text-` + ((element.status == 'Alive') ? 'success' : (element.status == 'Dead') ? 'danger' : 'secondary') + `" aria-hidden="true"></i>&nbsp;
                            <span>` + element.species + ` - ` + element.status + `</span>
                            <br>
                            <small>Last known location: </small>
                            <div class="mb-2">` + element.origin.name + `</div>
                            <small>First seen in: </small>
                            <div class="mb-2">` + element.species + `</div>
                        </div>
                    </div>
                </div>`;
        });    
    } else {
        contentResponse += '';
    }
    
    // console.log('contentResponse: ', contentResponse);
    contentCards.innerHTML = contentResponse;
}
// Paginacion
const getPagination = (data_info) => {
    console.log('data_info: ', data_info);
    let prevDisabled = (data_info.prev == null) ? "disabled" : "";
    let nextDisabled = (data_info.next == null) ? "disabled" : "";

    let htmlPagination = "";
    // htmlPagination += "Previous";
    // htmlPagination += "Next"
    let url_prev = (data_info.prev == null) ? null : data_info.prev;
    console.log('url_prev: ', url_prev);
    let url_next = (data_info.next == null) ? null : data_info.next;
    console.log('url_next: ', url_next);
    htmlPagination += `
    <ul class="pagination justify-content-center">
        <li class="page-item ` + prevDisabled + `" onclick="getData('` + url_prev + `')">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        &nbsp;
        &nbsp;
        <li class="page-item ` + nextDisabled + `" onclick="getData('` + url_next + `')">
            <a class="page-link" href="#">Next</a>
        </li>
    </ul>`;
    contentPagination.innerHTML = htmlPagination;

}

// Invocar API
getData(URL_API);
