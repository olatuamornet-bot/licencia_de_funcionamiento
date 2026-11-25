function abrir(id, boton) {
    var modulos = document.getElementsByClassName("modulo");
    for (var i = 0; i < modulos.length; i++) {
        modulos[i].classList.remove("visible");
    }
    var tabs = document.getElementsByClassName("tab");
    for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove("activo");
    }
    document.getElementById(id).classList.add("visible");
    boton.classList.add("activo");
}

function mostrar(id, texto, clase) {
    var caja = document.getElementById(id);
    caja.className = "resultado " + clase;
    caja.innerText = texto;
}

function valor(id) {
    return document.getElementById(id).value.trim();
}

function cambiarTipo() {
    var tipo = valor("tipo");
    if (tipo == "1") {
        document.getElementById("natural").classList.remove("oculto");
        document.getElementById("juridica").classList.add("oculto");
    } else {
        document.getElementById("natural").classList.add("oculto");
        document.getElementById("juridica").classList.remove("oculto");
    }
}

function cambiarRep() {
    if (valor("nResp") == "SI") {
        document.getElementById("representante").classList.remove("oculto");
    } else {
        document.getElementById("representante").classList.add("oculto");
    }
}

function verificarPersoneria() {
    var anioActual = 2026;
    var tipo = valor("tipo");
    var nombre = valor("pNombre");
    var conformes = false;

    if (nombre == "") {
        mostrar("resPersoneria", "Ingrese el nombre o razón social.", "error");
        return;
    }

    if (tipo == "1") {
        if (valor("nRuc").length != 11) {
            mostrar("resPersoneria", "El RUC debe tener 11 dígitos.", "error");
            return;
        }
        if (valor("nDni").length != 8) {
            mostrar("resPersoneria", "El DNI o carné debe tener 8 dígitos.", "error");
            return;
        }
        if (valor("nResp") == "SI") {
            var valido = valor("nDniRep").length == 8 && valor("nCarta") == "SI" && valor("nFirma") == "SI" && valor("nDniPod") == "SI";
            if (valido == false) {
                mostrar("resPersoneria", "OBSERVACIÓN: Documentos observados. Ingréselos de nuevo.", "aviso");
                return;
            }
            conformes = true;
        } else {
            mostrar("resPersoneria", "OBSERVACIÓN: No actúa mediante representante.\nSOLICITUD RECHAZADA para: " + nombre, "error");
            return;
        }
    } else {
        if (valor("jRuc").length != 11) {
            mostrar("resPersoneria", "El RUC de la empresa debe tener 11 dígitos.", "error");
            return;
        }
        if (valor("jDniRep").length != 8) {
            mostrar("resPersoneria", "El DNI o carné del representante debe tener 8 dígitos.", "error");
            return;
        }
        if (valor("jPartida") == "" || valor("jAsiento") == "" || valor("jAnio") == "") {
            mostrar("resPersoneria", "Complete la partida, el asiento y el año de vencimiento del poder.", "error");
            return;
        }
        if (Number(valor("jAnio")) < anioActual) {
            mostrar("resPersoneria", "OBSERVACIÓN: Vigencia vencida.", "aviso");
            return;
        }
        if (valor("jPartidaOk") != "SI" || valor("jDatosOk") != "SI") {
            mostrar("resPersoneria", "OBSERVACIÓN: Partida o datos mal. Verifique de nuevo.", "aviso");
            return;
        }
        conformes = true;
    }

    if (conformes == true) {
        var texto = "REQUISITOS CONFORMES\n* Verificación de documentos\n* Emisión de licencia de funcionamiento\n";
        if (valor("pAprobacion") == "SI") {
            mostrar("resPersoneria", texto + "SOLICITUD APROBADA para: " + nombre, "ok");
        } else {
            mostrar("resPersoneria", texto + "SOLICITUD RECHAZADA para: " + nombre, "error");
        }
    }
}

function cambiarModalidad() {
    var modalidad = valor("modalidad");
    document.getElementById("extra6").classList.add("oculto");
    document.getElementById("extra8").classList.add("oculto");
    document.getElementById("extra9").classList.add("oculto");
    document.getElementById("seccionEstablecimiento").classList.remove("oculto");

    if (modalidad == "6") {
        document.getElementById("extra6").classList.remove("oculto");
    }
    if (modalidad == "8") {
        document.getElementById("extra8").classList.remove("oculto");
    }
    if (modalidad == "9") {
        document.getElementById("extra9").classList.remove("oculto");
    }
    if (modalidad == "6" || modalidad == "7" || modalidad == "8") {
        document.getElementById("seccionEstablecimiento").classList.add("oculto");
    }
}

function registrarFormulario() {
    var modalidad = valor("modalidad");
    var pass = 0;
    if (modalidad == "6" || modalidad == "7" || modalidad == "8") {
        pass = 1;
    }

    if (valor("fFecha") == "") {
        mostrar("resFormulario", "Ingrese la fecha.", "error");
        return;
    }
    if (valor("fNombre") == "") {
        mostrar("resFormulario", "Ingrese los apellidos y nombres o la razón social.", "error");
        return;
    }
    if (valor("fDni").length != 8) {
        mostrar("resFormulario", "El DNI o carné del solicitante debe tener 8 dígitos.", "error");
        return;
    }
    if (valor("fRuc").length != 11) {
        mostrar("resFormulario", "El RUC debe tener 11 dígitos.", "error");
        return;
    }
    if (valor("fTelefono").length != 9) {
        mostrar("resFormulario", "El teléfono debe tener 9 dígitos.", "error");
        return;
    }
    if (valor("fDniRep").length != 8) {
        mostrar("resFormulario", "El DNI o carné del representante debe tener 8 dígitos.", "error");
        return;
    }

    var texto = "Modalidad de trámite registrado: " + document.getElementById("modalidad").selectedOptions[0].text + "\n";
    texto = texto + "Solicitante: " + valor("fNombre") + "\n";
    texto = texto + "Representante: " + valor("fRepresentante") + "\n";

    if (pass == 0) {
        var marcados = document.querySelectorAll(".dj:checked");
        var lista = "";
        for (var i = 0; i < marcados.length; i++) {
            lista = lista + " " + marcados[i].value;
        }
        texto = texto + "Establecimiento: " + valor("fComercial") + "\n";
        texto = texto + "Declaración jurada, opciones:" + lista + "\n";
    }

    texto = texto + "Datos ingresados correctamente.";
    mostrar("resFormulario", texto, "ok");
}

var preguntas = [];

function determinarRuta() {
    var area = Number(valor("rArea"));
    var almacenamiento = Number(valor("rAlmacenamiento"));
    var ruta = 0;

    document.getElementById("preguntasRuta").innerHTML = "";
    document.getElementById("btnVerificarRuta").classList.add("oculto");
    mostrar("resVerificacion", "", "");
    document.getElementById("resVerificacion").className = "resultado";

    if (valor("rArea") == "" || valor("rAlmacenamiento") == "") {
        mostrar("resRuta", "Ingrese el área y la proporción de almacenamiento.", "error");
        return;
    }

    if (area > 0 && almacenamiento >= 0) {
        if (area <= 100 && almacenamiento <= 0.3) {
            ruta = 1;
            mostrar("resRuta", "RUTA 1: INSPECCIÓN BÁSICA EX POST", "ok");
            preguntas = [
                ["¿Presenta la Declaración Jurada de Observancia de Condiciones de Seguridad?", "Falta presentar la declaración jurada de seguridad."],
                ["¿Presenta la solicitud de licencia de funcionamiento?", "Falta presentar la solicitud de licencia."],
                ["¿Cumple los requisitos aplicables del Artículo 7?", "Faltan requisitos del Artículo 7."],
                ["¿Cumple la zonificación y compatibilidad de uso?", "No cumple zonificación o compatibilidad de uso."],
                ["¿Pagó la tasa municipal?", "Pendiente: pagar la tasa municipal."],
                ["¿La municipalidad otorgó la licencia?", "Licencia no otorgada."],
                ["¿Se realizó la Inspección Básica Ex Post?", "Inspección Ex Post pendiente."]
            ];
        } else {
            if (area <= 500) {
                ruta = 2;
                mostrar("resRuta", "RUTA 2: INSPECCIÓN BÁSICA EX ANTE", "ok");
                preguntas = [
                    ["¿Presenta la solicitud de licencia?", "Falta presentar la solicitud de licencia."],
                    ["¿Cumple los requisitos del Artículo 7?", "Faltan requisitos del Artículo 7."],
                    ["¿Cumple zonificación y compatibilidad de uso?", "No cumple zonificación o compatibilidad de uso."],
                    ["¿Se realizó la Inspección Básica Ex Ante?", "Inspección Ex Ante pendiente."],
                    ["¿Pagó la tasa municipal?", "Pendiente: pagar la tasa municipal."],
                    ["¿La municipalidad otorgó la licencia?", "Licencia no otorgada."]
                ];
            } else {
                ruta = 3;
                mostrar("resRuta", "RUTA 3: INSPECCIÓN DE DETALLE O MULTIDISCIPLINARIA", "ok");
                preguntas = [
                    ["¿Solicitó la ITSDC de detalle o multidisciplinaria?", "Debe iniciar el trámite de inspección correspondiente."],
                    ["¿Pagó el derecho de tramitación ante INDECI?", "Pendiente: pagar el derecho de tramitación ante INDECI."],
                    ["¿Obtuvo el certificado de inspección?", "Debe obtener el certificado antes de solicitar la licencia."],
                    ["¿Presenta la solicitud de licencia municipal?", "Falta presentar la solicitud de licencia."],
                    ["¿Cumple los requisitos del Artículo 7?", "Faltan requisitos del Artículo 7."],
                    ["¿Cumple zonificación y compatibilidad de uso?", "No cumple zonificación o compatibilidad de uso."],
                    ["¿La municipalidad evaluó favorablemente la solicitud?", "Licencia no otorgada."]
                ];
            }
        }

        var html = "";
        for (var i = 0; i < preguntas.length; i++) {
            html = html + "<label>" + preguntas[i][0] + "</label>";
            html = html + "<select id='q" + i + "'><option value='1'>Sí</option><option value='0'>No</option></select>";
        }
        document.getElementById("preguntasRuta").innerHTML = html;
        document.getElementById("btnVerificarRuta").classList.remove("oculto");
        document.getElementById("btnVerificarRuta").setAttribute("data-ruta", ruta);
    } else {
        preguntas = [];
        mostrar("resRuta", "Error: el área debe ser mayor que cero y el almacenamiento no puede ser negativo.", "error");
    }
}

function verificarRuta() {
    var ruta = document.getElementById("btnVerificarRuta").getAttribute("data-ruta");
    for (var i = 0; i < preguntas.length; i++) {
        if (document.getElementById("q" + i).value != "1") {
            mostrar("resVerificacion", preguntas[i][1], "aviso");
            return;
        }
    }
    mostrar("resVerificacion", "Procedimiento de Ruta " + ruta + " evaluado.", "ok");
}

function itsdcExPost() {
    var area = Number(valor("xArea"));
    var almacenamiento = Number(valor("xAlmacenamiento"));

    if (valor("xGiro") == "" || valor("xArea") == "" || valor("xAlmacenamiento") == "") {
        mostrar("resExPost", "Complete el giro, el área y el almacenamiento.", "error");
        return;
    }

    if (area <= 100 && almacenamiento <= area * 0.30) {
        if (valor("xDj") == "S") {
            var texto = "Licencia y certificado emitidos de forma inmediata\n";
            if (valor("xCumple") == "S") {
                mostrar("resExPost", texto + "Resultado: Inspección favorable", "ok");
            } else {
                texto = texto + "Resultado: observado, tiene plazo de subsanación\n";
                if (valor("xSubsano") == "S") {
                    mostrar("resExPost", texto + "Reinspección favorable", "ok");
                } else {
                    mostrar("resExPost", texto + "Revocación de licencia", "error");
                }
            }
        } else {
            mostrar("resExPost", "Falta Declaración Jurada", "aviso");
        }
    } else {
        mostrar("resExPost", "No corresponde a modalidad Ex-Post\nDerivado a la ruta ITSDC Ex-Ante", "aviso");
    }
}

function itsdcExAnte() {
    var area = Number(valor("eArea"));

    if (valor("eArea") == "") {
        mostrar("resExAnte", "Ingrese el área del local.", "error");
        return;
    }

    if (area > 100 && area <= 500) {
        if (valor("ePlanos") == "S" && valor("eCertificados") == "S") {
            var texto = "Expediente aprobado. Ejecutando inspección\n";
            if (valor("eAprueba") == "S") {
                mostrar("resExAnte", texto + "Inspección favorable. Se emite Certificado ITSE", "ok");
            } else {
                texto = texto + "Con observaciones. Se otorga plazo.\n";
                if (valor("eSubsana") == "S") {
                    mostrar("resExAnte", texto + "Reinspección aprobada", "ok");
                } else {
                    mostrar("resExAnte", texto + "Trámite improcedente", "error");
                }
            }
        } else {
            mostrar("resExAnte", "Expediente incompleto", "aviso");
        }
    } else {
        mostrar("resExAnte", "Fuera del rango para Ex-Ante", "aviso");
    }
}

function itsdcIndeci() {
    var area = Number(valor("iArea"));
    var aforo = Number(valor("iAforo"));

    if (valor("iArea") == "" || valor("iAforo") == "") {
        mostrar("resIndeci", "Ingrese el área y el aforo.", "error");
        return;
    }

    if (area > 500 || aforo > 500) {
        if (valor("iEstruc") == "S" && valor("iElect") == "S" && valor("iPci") == "S") {
            var texto = "Conformidad documentaria OK. Ejecutando pruebas de panel...\n";
            if (valor("iPruebas") == "S") {
                mostrar("resIndeci", texto + "Emisión de resolución favorable y Certificado de Seguridad.", "ok");
            } else {
                texto = texto + "Acta con observaciones técnicas complejas.\n";
                if (valor("iLevanto") == "S") {
                    mostrar("resIndeci", texto + "Reinspección favorable. Emitiendo ITSE.", "ok");
                } else {
                    mostrar("resIndeci", texto + "Improcedente / Clausura preventiva.", "error");
                }
            }
        } else {
            mostrar("resIndeci", "Expediente denegado.", "error");
        }
    } else {
        mostrar("resIndeci", "No califica para inspección multidisciplinaria.", "aviso");
    }
}
