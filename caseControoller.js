const caseStudyService = require('../services/case-study.service');

module.exports.renderCaseStudy = async (req, res, next) => {
    const caseStudiesList =  await caseStudyService.fetchCaseStudy();
    console.log("caseStudiesList : ", caseStudiesList.rows);
    res.render('case-study' , {caseStudiesList : caseStudiesList.rows});
};

module.exports.insertCaseStudyData = async(req, res, next) => {
    console.log('req.body ===>', req.body);
    const caseStudyInsertedData = await caseStudyService.insertCaseStudyData(req.body);
    console.log('caseStudyID', caseStudyInsertedData.rows[0].id);
    if(caseStudyInsertedData && caseStudyInsertedData.rows[0].id){
        res.status(200).send({
            status : 'done',
            caseStudyId : caseStudyInsertedData.rows[0].id
        })
    }
    else{
        res.status(500).send({
            status : 'failed',
            massage : 'data in not inserting somthing went wrong'
        })
    }
};

module.exports.deleteCaseStudyData = async (req, res, next) => {
    const caseStudyId = req.body.caseStudyId;
    console.log('ID for deletion', req.body.caseStudyId);
    const caseStudyData = await caseStudyService.deleteCaseStudyData(caseStudyId);
    if(caseStudyData.status === 'done'){
        res.status(200).send({
            status : 'done',
            massage : caseStudyData.massage
        })
    }
    else{
        res.status(500).send({
            status : 'failed',
            massage : caseStudyData.massage
        })
    }
}

module.exports.upadateCaseStudies = async (req, res, next) => {
   console.log(' updatedData  controller==>',  req.body);
   const updatedCaseStudyData = req.body ;
   const caseStudyId = req.body.caseStudyId;
   console.log('caseStudyID for Updation controller ==>', caseStudyId);
   console.log('updated name' , req.body.author_fname);
   const upadtedCaseStudies = await caseStudyService.updateCaseStudies({caseStudyId , updatedCaseStudyData});
   if(upadtedCaseStudies.status === 'done'){
    res.status(200).send({
        status : 'done' ,
        massage : upadtedCaseStudies.massage
    })
   }
   else{
    res.status(500).send({
        status : 'done' ,
        massage : upadtedCaseStudies.massage
      })
   }
};
