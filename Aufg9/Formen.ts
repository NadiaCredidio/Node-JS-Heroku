//In zusammenarbeit mit Sara Kalinic.//

namespace OnlineEisdealer {
    window.addEventListener("load", init);
 let becher: HTMLElement;
    let iceCream: HTMLElement;
    let sosse: HTMLElement;
    let overview: HTMLElement;
    let button: HTMLElement;

    let flavors: string[] = ["Peachpuff", "UnicornSwirls", "Schokolade", "Kinderschokolade",
        "Kastanie", "Zitronensorbe", "Yogurt-Kirsch", "Blaubeere", "Haselnuss"];

    let sauces: string[] = ["Schokosoße", "Erdbeersoße", "Karamellsoße", "Waldfruchtsoße", "Kiwisoße", "Sahne", "Haselnusskrokant", "Kokusflocken", 
    "Smarties", "Getrocknete Erdbeeren"];


    let cone: string[] = ["Waffel", "Becher"];


    let inputSauces: HTMLInputElement[] = [];
    let inputFlavors: HTMLInputElement[] = [];
    let inputCone: HTMLInputElement[] = [];

    
   

    function init(): void {
        iceCream = document.getElementById("flavors"); 
        iceCream.addEventListener("change", change);

        sosse = document.getElementById("sauces"); 
        sosse.addEventListener("change", change);
        
        becher = document.getElementById("cone"); 
        becher.addEventListener("change", change);

        overview = document.getElementById("overview"); 

        button = document.getElementById("sendOrder");
        button.addEventListener("click", checkOrder);

        createFlavors();
        createSauces();

        createCone();
    }


   
    function createFlavors(): void {
        for (let i: number = 0; i < flavors.length; i++) {
            createInput(flavors[i]);
        }
    }
    function createInput(_flavors: string): void {
        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");
        label.innerText = _flavors;
        label.appendChild(input);
        input.type = "number";
        input.min = "0";
        input.max = "10";
        input.value = "0";
        label.id = _flavors;
        iceCream.appendChild(label);
        inputFlavors.push(input);
    }

   
    function createSauces(): void {
        for (let i: number = 0; i < sauces.length; i++) {
            createCheckbox(sauces[i]);
        }
    }
    function createCheckbox(_Checkboxen: string): void {
        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");
        label.innerText = _Checkboxen;
        label.appendChild(input);
        input.type = "checkbox"; 
        label.id = _Checkboxen;
        sosse.appendChild(label);
        inputSauces.push(input);
    }
    


   
    function createCone(): void {
        for (let i: number = 0; i < cone.length; i++) {
            createRadio(cone[i]);
        }
    }
    function createRadio(_Radiobutton: string): void {
        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");
        label.innerText = _Radiobutton;
        label.appendChild(input);
        input.type = "radio";
        input.name = "Radiobutton";
        label.id = _Radiobutton;
        becher.appendChild(label);
        inputCone.push(input);
    }


    
    function changeDelivery(_sum: number): void {
        let overview: HTMLElement = document.getElementById("delivery");
        overview.innerText = "";

        for (let i: number = 0; i < inputFlavors.length; i++) {
            if (parseInt(inputFlavors[i].value) > 0) {
                overview.innerText += flavors[i] + " " + (parseInt(inputFlavors[i].value) * 1) + "Euro" + "\n";
            }
        }

        for (let i: number = 0; i < inputSauces.length; i++) {
            if (inputSauces[i].checked) {
                overview.innerText += sauces[i] + " 0.20 Euro" + "\n";
            }
        }

        
        for (let i: number = 0; i < inputCone.length; i++) {
            if (inputCone[i].checked) {
                overview.innerText += cone[i] + "\n";
            }
        }

   
        let sumHtml: HTMLElement = document.getElementById("sum");
        sumHtml.innerText = _sum.toString() + " Euro";
    }


    function change(): void {
        let sum: number = 0;
        for (let i: number = 0; i < inputFlavors.length; i++) {
            sum += parseInt(inputFlavors[i].value); 
        }
        for (let i: number = 0; i < inputSauces.length; i++) {
            if (inputSauces[i].checked) 
            sum += 0.20;
        }
        

        changeDelivery(sum);
    }


 
    function checkOrder(): void {
        let check: string[] = ["Bitte folgende Eingaben ueberpruefen! \n"];

        
        let surname: HTMLInputElement = <HTMLInputElement>document.getElementById("surname");
        if (surname.validity.valid == false) {
            check.push("Surname \n");
            surname.style.backgroundColor = "deepskyblue";
        }
        else {
            surname.style.backgroundColor = "white";
        }

        
        let name: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
        if (name.validity.valid == false) {
            check.push("Name \n");
            name.style.backgroundColor = "deepskyblue";
        }
        else {
            name.style.backgroundColor = "white";
        }

        
        let street: HTMLInputElement = <HTMLInputElement>document.getElementById("street");
        if (street.validity.valid == false) {
            check.push("Street \n");
            street.style.backgroundColor = "deepskyblue";
        }
        else {
            street.style.backgroundColor = "white";
        }

        
        let cityPostcode: HTMLInputElement = <HTMLInputElement>document.getElementById("city,postcode");
        if (cityPostcode.validity.valid == false) {
            check.push("City, Postcode \n");
            cityPostcode.style.backgroundColor = "deepskyblue";
        }
        else {
            cityPostcode.style.backgroundColor = "white";
        }

        
        let mail: HTMLInputElement = <HTMLInputElement>document.getElementById("Email");
        if (mail.validity.valid == false) {
            check.push("Email \n");
            mail.style.backgroundColor = "deepskyblue";
        }
        else {
            mail.style.backgroundColor = "white";
        }

        
        let flavors: number = 0;
        for (let i: number = 0; i < inputFlavors.length; i++) {
            if (parseInt(inputFlavors[i].value) > 0)
                flavors += 1;
        }
        if (flavors == 0)
            check.push("Flavors\n");

        
        let sauces: number = 0;
        for (let i: number = 0; i < inputSauces.length; i++) {
            if (inputSauces[i].checked)
                sauces += 1;
        }
        if (sauces == 0)
            check.push("Sauces \n");

        
        
        let cone: number = 0;
        for (let i: number = 0; i < inputCone.length; i++) {
            if (inputCone[i].checked)
                cone += 1;
        }
        if (cone == 0)
            check.push("Cone");

        if (check.length > 0) {
            for (let i: number = 0; i < check.length; i++)
                check.push
            alert(check.join(""));
        }
        else {
            alert("Vielen Dank und 'nen Guten!!");
        }
    }
}