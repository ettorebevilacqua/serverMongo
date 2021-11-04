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



module.exports.queryDocentiActivity = queryDocentiActivity;