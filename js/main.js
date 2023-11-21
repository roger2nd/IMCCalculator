function getData() {
    var peso = document.getElementById("peso").value;
    var altura = document.getElementById("altura").value;
    var idade = document.getElementById("idade").value;

    if(peso == "" || altura == "" || idade == "") {
        alert("Preencha todos os campos!");
        return;
    }

    var result = calculate(parseFloat(peso), parseFloat(altura), parseFloat(idade));

    alterAlertMsg(result.mapping.risco, result.mapping.value, result.mapping.classf)
    updateHTMLValues(result);

}

function calculate(peso, altura, idade) {
   let IMC =  peso / (altura * altura);
   let result = mapping(IMC);
   let oa = calculaOperatorA(idade, IMC);
   let ob = calculaOperatorB(result.factor, IMC);

   
   return {
        "basico": [oa[0].toFixed(2), ob[0].toFixed(2)],
        "standard": [oa[1].toFixed(2), ob[1].toFixed(2)],
        "premium": [oa[2].toFixed(2), ob[2].toFixed(2)],
        "best": getBestValue(oa, ob),
        "mapping": result
   }

}

function getBestValue(a, b) {
    let oa_minimum = Math.min(...a);
    let ob_minimum = Math.min(...b);
    return oa_minimum < ob_minimum ? planMapping(a.indexOf(oa_minimum), "A" ) : planMapping(b.indexOf(ob_minimum), "B")
}

function planMapping (arg, arg2) {
    let res;
    switch (arg) {
        case 0:
            res = "basico";
            break;
        case 1:
            res = "standard";
            break;
        case 2:
            res = "premium";
            break;
        default:
            return null
    }
    res = res + arg2;
    return res
}

function mapping(arg) {
    let risco;
    let classf;
    let factor;
    if (arg <= 18.5) {
        classf = "Baixo peso";
        risco = "Baixo";
        factor = 10;
    } else if (arg <= 24.9) {
        classf = "Normal";
        risco = "Normal";
        factor = 1;
    } else if (arg <= 29.9) {
        classf = "Sobrepeso";
        risco = "Aumentado";
        factor = 6;
    } else if (arg <= 34.9) {
        classf = "Obesidade";
        risco = "Moderado";
        factor = 10;
    } else if (arg <= 39.9) {
        classf = "Obesidade Morbida";
        risco = "Grave";
        factor = 20;
    } else if (arg > 40) {
        classf = "Obesidade Morbida";
        risco = "Muito Grave";
        factor = 30;
    }

    return {
        "value": arg,
        "risco": risco,
        "classf": classf,
        "factor": factor
    }
}

function alterAlertMsg(argR, argV, argC) {
    var ele = document.getElementById("alertbox_IMC");
    ele.style.display = 'block'
    switch (argR) {
        case "Baixo":
            ele.style.background="aliceblue";
            ele.style.color="black";
            break;
        case "Normal":
            ele.style.background="#32de84";
            ele.style.color="black";
            break;
        case "Aumentado":
            ele.style.background="#FFD700";
            ele.style.color="black";
            break;
        case "Moderado":
            ele.style.background="#FF5F1F";
            ele.style.color="black";
            break;
        case "Grave":
            ele.style.background="#FF0800";
            ele.style.color="white";
            break;
        case "Muito Grave":
            ele.style.background="#FF0800";
            ele.style.color="white";
            break;
    }

    document.getElementById("imc_value_text").innerHTML = argV.toFixed(2);
    document.getElementById("class_value_text").innerHTML = argC;


}

function updateHTMLValues(arg) {
    document.getElementById("basicoA").firstElementChild.innerHTML = "R$"+ arg.basico[0];
    document.getElementById("standardA").firstElementChild.innerHTML = "R$" + arg.standard[0];
    document.getElementById("premiumA").firstElementChild.innerHTML = "R$" + arg.premium[0];
    document.getElementById("basicoB").firstElementChild.innerHTML = "R$" + arg.basico[1];
    document.getElementById("standardB").firstElementChild.innerHTML = "R$" + arg.standard[1];
    document.getElementById("premiumB").firstElementChild.innerHTML = "R$" + arg.premium[1];

    let bestEle = document.getElementById(arg.best);
    bestEle.style.background = "#32de84";
    bestEle.style.color = "white";
}

function calculaOperatorA (idade, IMC) {

    let a = 100 + (idade * 10 * (IMC/10));
    let b = (150 + (idade * 15)) * (IMC/10);
    let c = (200 - (IMC * 10) + (idade * 20)) * (IMC/10);

    return [a, b, c];
}

function calculaOperatorB (factor, IMC) {

    let a = 100 + (factor * 10 * (IMC/10));
    let b =  (150 + (factor * 15)) * (IMC/10);
    let c = (200 - (IMC * 10) + (factor * 20)) * (IMC/10);

    return [a, b, c];
}