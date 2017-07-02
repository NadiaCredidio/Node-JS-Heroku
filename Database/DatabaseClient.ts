namespace DatabaseClient {
    window.addEventListener("load", init);

    function init(_event: Event): void {
        console.log("Init");
        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insert");       
        let searchSingleButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("singlesearch");       
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refresh");
        insertButton.addEventListener("click", insert);       
        searchSingleButton.addEventListener("click", searchSingleStudent);        
        refreshButton.addEventListener("click", refresh);
    }

    function insert(_event: Event): void {
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
        let query: string = "command=insert";
        query += "&name=" + inputs[0].value;
        query += "&firstname=" + inputs[1].value;
        query += "&matrikel=" + inputs[2].value;
        console.log(query);
        sendRequest(query, handleInsertResponse);
    }
    
    
        function refresh(_event: Event): void {
        let query: string = "command=find";
        sendRequest(query, handleFindResponse);
    }
    
        function searchSingleStudent(_event: Event): void {
            
        let matrikelNummer: HTMLInputElement = <HTMLInputElement>document.getElementById("matrikelSingleStudent");
        let query: string = "command=search";
       
        query += "&matrikel=" + matrikelNummer.value;
        console.log(query);
        sendRequest(query, handleSearchResponse);
    }
    


    function sendRequest(_query: string, _callback: EventListener): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8100?" + _query, true);
        //asynchroner verlauf, die verschiedenen Dinge arbeiten parallel 
        //oder werden erst fortgesetzt sobald etwas passiert z.B. Event

        //xhr.open("GET", "https://eia2-servertest.herokuapp.com?color=" + _color, true);
        xhr.addEventListener("readystatechange", _callback);
        xhr.send();
    }

    function handleInsertResponse(_event: ProgressEvent): void {
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert(xhr.response);
        }
    }
    
    function handleSearchResponse(_event: ProgressEvent): void {
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let output = document.getElementsByTagName("textarea")[0];
            output.value = xhr.response;
            let responseAsJson = JSON.parse(xhr.response);
            console.log(responseAsJson);
        }
    }

    function handleFindResponse(_event: ProgressEvent): void {
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[1];
            output.value = xhr.response;
            let responseAsJson: JSON = JSON.parse(xhr.response);
            console.log(responseAsJson);
        }
    }
}