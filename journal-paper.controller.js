const journalPaperService = require('../services/journal-paper.service');
// controller for fetching
module.exports.renderJournalPaper = async (req, res, next) => {
    const journalList = await journalPaperService.renderJournalPaper();
    res.render('journal-paper', {
        journalData : journalList
    });
};

// controller for inserting
module.exports.createJournalPaper = async (req, res, next) => {
    const journalPaperData = await journalPaperService.insertJournalPapper(req.body) ;
    console.log(" journalPaperData ===>" , journalPaperData);
    if(journalPaperData && journalPaperData.rows[0].id) {
        console.log('ID' , journalPaperData.rows[0].id);
        res.status(200).send({
            'status' : 'done',
            taskId : journalPaperData.rows[0].id
        });
    }
    else {
        res.status(500).send({
            'status' : 'failed',
            'massage' : 'failed to insert new row'
        });
    };
};

// controller for deleting
module.exports.delJournalPaper = async (req, res, next) => {
    console.log(' deletion==>' , req.body);
    const taskId = req.body.taskId;
    console.log('controller taskID', taskId) 
    const delJournalData = await journalPaperService.deleteJournalPaper(taskId);
    if( delJournalData.success){
        res.status(200).send({
            success : true ,
            massage : delJournalData.massage
        });
    }
    else{
        res.status(500).send({
            success : false ,
            massage : delJournalData.massage
        })

    };
};
 
// controller for updating 
module.exports.updateJournalPaper = async (req, res, next) => {
    const updateJournalDetails = req.body;
    const taskId = req.body.taskId;
    console.log('taskId', taskId)
    console.log('updateJournalDetails ==>>' , updateJournalDetails);
    const updatePaper = await journalPaperService.updateJournalPaper({taskId, updateJournalDetails});
    console.log('id for updation', taskId);
    if(updatePaper.success){
        res.status(200).send({
            success : true,
            massage : updatePaper.massage
        });
    }
    else{
        res.status(500).send({
            success  : false,
            massage : updatePaper.massage
        });
    };
};
