/**
 * Created by JoanC on 22/04/2016.
 */

var MainController = function (){
    var self = this;

    self.pregunta = 'No hay ningún examen seleccionado';
    self.nota = 'No evaluado';
    self.loadedexam = null;
    self.results = [];
    self.index = -1;
    self.answer = {respuesta: false, correct: false};

    // Carga del examen en la estructura loadexam
    self.selectfile = function(){
        var f = document.getElementById('filetoload').files[0],r = new FileReader();
        self.nota = 'Examen iniciado';
        r.onloadend = function(e){
            var data = e.target.result;
            self.loadedexam = JSON.parse(data);
            initiateExam();
        };

        r.readAsBinaryString(f);
    };

    // Gestiona el paso a la pregunta previa
    self.previous = function (){
        if (self.index === 0){
            alert('Esta es la pregunta inicial');
        }
        else{
            self.index --;
            self.pregunta = self.loadedexam.preguntas[self.index].enunciado;
        }
        self.answer.respuesta = self.results[self.index].respuesta;
    };

    // Gestiona el paso a la pregunta siguiente
    self.next = function (){
        // Comprueba la respuesta
        if (self.answer.respuesta === self.loadedexam.preguntas[self.index].respuesta){
            self.answer.correct = 1;
            self.results[self.index]= Object.assign({},self.answer);
        }
        else
        {
            self.answer.correct = 0;
            self.results[self.index]= Object.assign({},self.answer);
        }

        // Controla la última pregunta o carga la siguiente
        if (self.index === (self.loadedexam.preguntas.length)-1){
            var r= confirm('Esta es ultima pregunta. ¿Desea finalizar el examen?');
            finalizaExamen();
        }
        else{
            self.index ++;
            self.pregunta = self.loadedexam.preguntas[self.index].enunciado;
            self.answer.respuesta = self.results[self.index].respuesta;
        }
    };

    // Inicializa el examen
    var initiateExam = function (){
        var respuesta = {respuesta: "VERDADERO", correct:1};
        console.log('aqui');
        console.log(self.loadedexam.preguntas.length);
        self.results = [];
        self.index = 0;

        for (i=0; i < self.loadedexam.preguntas.length ; i++){
            self.results.push(respuesta);
        }
        console.log(self.results);
    };

    // Finaliza examen y muestra la nota
    var finalizaExamen = function (){
        var aciertos=0;
        var nota=0;
        for(var i in self.results)aciertos = aciertos + self.results[i].correct;
        nota=aciertos/self.results.length;
        nota=parseInt(nota*1000)/100;
        self.nota=nota;
    };

};

var myapp = angular.module('myapp',[]);

myapp.controller('MyCtrl', [ MainController]);







