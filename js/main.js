function getIMC() {
    var peso = document.getElementById("peso").value;
    var altura = document.getElementById("altura").value;
    var idade = document.getElementById("idade").value;


    var result = calculate(parseFloat(peso), parseFloat(altura), parseFloat(idade));

    alterAlertMsg(result.mapping.risco, result.mapping.value, result.mapping.classf)
    console.log(calculate(parseFloat(peso), parseFloat(altura), parseFloat(idade)))

}

function calculate(peso, altura, idade) {
   let IMC =  peso / (altura * altura);
   let result = mapping(IMC);
   let oa = calculaOperatorA(idade, IMC);
   let ob = calculaOperatorB(result.factor, IMC);

   return {
        "basico": [oa.basico.toFixed(2), ob.basico.toFixed(2)],
        "standard": [oa.standard.toFixed(2), ob.standard.toFixed(2)],
        "premium": [oa.premium.toFixed(2), ob.premium.toFixed(2)],
        "mapping": result
   }

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

function calculaOperatorA (idade, IMC) {
    return {
        "basico": 100 + (idade * 10 * (IMC/10)),
        "standard": (150 + (idade * 15)) * (IMC/10),
        "premium": (200 - (IMC * 10) + (idade * 20)) * (IMC/10)
    }
}

function calculaOperatorB (factor, IMC) {
    return {
        "basico": 100 + (factor * 10 * (IMC/10)),
        "standard": (150 + (factor * 15)) * (IMC/10),
        "premium": (200 - (IMC * 10) + (factor * 20)) * (IMC/10)
    }
}