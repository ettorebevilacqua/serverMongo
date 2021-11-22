const queryDocentiActivity = idEnte => [
    { "$match": { "idEnte": idEnte + '' } },
    { $lookup: { from: "corsis", localField: "idcorso", foreignField: "_id", as: "corso" } },
    { "$unwind": "$corso" },
    { "$unwind": "$docenti" },
    {
        "$project": {
            "_id": 0,
            "idDocente": "$docenti.id",
            "idQuestion": "$_id",
            "idcorso": "$idcorso",
            "dataCorso": "$corso.dataInizio",
            "codiceCorso": "$corso.codice",
            "corso": "$corso.titolo",
            "cognome": "$docenti.cognome",
            "nome": "$docenti.nome",
            "cf": "$docenti.cf",
        }
    },
    {
        $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$idDocente',
            count: { $sum: 1 },
            cognome: { $first: '$cognome'},
            nome: { $first: '$nome'},
            cf: { $first: '$cf'},
            corsi: {
                $push: {
                    idcorso: '$idcorso',
                    corso: '$corso',
                    dataCorso: '$dataCorso',
                    codiceCorso: '$codiceCorso',
        }
            }
        }
    }
];


const queryQuestionActivity = idEnte => [
    { "$match": { "idEnte": idEnte + ''} },
    { $lookup: { from: "questionmodulis", localField: "idquestion", foreignField: "_id", as: "question" } },
    { $lookup: { from: "modulos", localField: "question.moduli", foreignField: "_id", as: "modulo" } },
    { "$unwind": "$question" },
    { "$unwind": "$modulo" },
    { "$unwind": "$modulo.domande" },
    { "$unwind": "$partecipanti" },
    { "$unwind": "$partecipanti.risposte" },

    { "$match": { "idEnte": idEnte + ''} },

    {
        "$project": {
            "_id": 0,
            "idQuestion": "$_id",
            "idcorso": "$idcorso",
            "idmodulo": "$modulo._id",
            "modulo": "$modulo.title",
            "domanda": "$modulo.domande.domanda",
            "iddomanda": "$modulo.domande._id",
            "risposte": "$partecipanti.risposte",
        }
    },
    /* {
        $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$iddomanda',
            domanda: {$first: '$domanda'},
            count: { $sum: 1 },
            risposte: {$push: '$risposte'},
        }
    }
    */

];


module.exports={queryDocentiActivity, queryQuestionActivity};
