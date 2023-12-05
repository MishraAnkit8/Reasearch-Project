const journalPaperService = require('../services/journal-paper.service');
// controller for fetching
module.exports.renderJournalPaper = async (req, res, next) => {
    const journalList = await journalPaperService.renderJournalPaper();
    res.render('journal-paper', {
        journalData : journalList
    })
}

// controller for inserting
module.exports.createJournalPaper = async (req, res, next) => {
    const journalPaperData = await journalPaperService.insertJournalPapper(req.body) ;
    console.log(" journalPaperData ===>" , journalPaperData);
    
    if(journalPaperData && journalPaperData.rows[0].id) {
        console.log('ID' , journalPaperData.rows[0].id);
        res.status(200).send({
            'status' : 'done',
            taskId : journalPaperData.rows[0].id
        })

    }
    else {
        res.status(500).send({
            'status' : 'failed',
            'massage' : 'failed to insert new row'
        });
    }

};

module.exports.deleteJournalPaper = async (req, res, next) => {
    console.log('taskId for deletion==>' , req.body);
    const delJournalData = await journalPaperService.deleteJournalPaper(req.body);
    if( delJournalData.success){
        res.status(200).send({
            success : true ,
            massage : delJournalData.massage
        })
    }
    else{
        res.status(500).send({
            success : false ,
            massage : delJournalData.massage
        })

    }

};
