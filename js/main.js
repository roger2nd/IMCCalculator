function getIMC() {
    var peso = document.getElementById("peso").value;
    var altura = document.getElementById("altura").value;

    var result = calculaMapping(parseFloat(peso), parseFloat(altura));

    alterAlertMsg(result.risco, result.value, result.classf)

}

function calculaMapping(peso, altura) {
   let IMC =  peso / (altura * altura);
   return mapping(IMC);
}

function mapping(arg) {
    let risco;
    let classf;
    if (arg <= 18.5) {
        classf = "Baixo peso";
        risco = "Baixo";
    } else if (arg <= 24.9) {
        classf = "Normal";
        risco = "Normal";
    } else if (arg <= 29.9) {
        classf = "Sobrepeso";
        risco = "Aumentado";
    } else if (arg <= 34.9) {
        classf = "Obesidade";
        risco = "Moderado";
    } else if (arg <= 39.9) {
        classf = "Obesidade Morbida";
        risco = "Grave";
    } else if (arg > 40) {
        classf = "Obesidade Morbida";
        risco = "Muito Grave";
    }

    return {
        "value": arg,
        "risco": risco,
        "classf": classf
    }
}
function alterAlertMsg(argR, argV, argC) {
    switch (argR) {
        case "Baixo":
            document.getElementById("alertbox").style.background="aliceblue";
            document.getElementById("alertbox").style.color="black";
            break;
        case "Normal":
            document.getElementById("alertbox").style.background="#32de84";
            document.getElementById("alertbox").style.color="black";
            break;
        case "Aumentado":
            document.getElementById("alertbox").style.background="#FFD700";
            document.getElementById("alertbox").style.color="black";
            break;
        case "Moderado":
            document.getElementById("alertbox").style.background="#FF5F1F";
            document.getElementById("alertbox").style.color="black";
            break;
        case "Grave":
            document.getElementById("alertbox").style.background="#FF0800";
            document.getElementById("alertbox").style.color="white";
            break;
        case "Muito Grave":
            document.getElementById("alertbox").style.background="#FF0800";
            document.getElementById("alertbox").style.color="white";
            break;
    }

    document.getElementById("imc_value_text").innerHTML = argV.toFixed(2);
    document.getElementById("risco_value_text").innerHTML = argR;
    document.getElementById("classf_value_text").innerHTML = argC;

}