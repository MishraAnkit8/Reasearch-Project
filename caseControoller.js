const caseStudyService = require('../services/case-study.service')

module.exports.renderCaseStudy = async(req, res, next) => {
    const caseStudiesDataList = await caseStudyService.createCaseStudy();
    console.log('data is controller' , caseStudiesDataList);
    res.render('case-study', {
        caseStudiesData : caseStudiesDataList
    } );
};

module.exports.insertCaseStudies  = async(req, res, next) => {
    console.log('caseStudy inserted data ==>>', req.body);
    const insertCaseStudy = await caseStudyService.insertCaseStudies(req.body);
    console.log('caseStudyId ==>>' , insertCaseStudy.rows[0].id);
    if(insertCaseStudy && insertCaseStudy.rows[0].id){
        res.status(200).send({
            status : 'done',
            caseStudyId : insertCaseStudy.rows[0].id
        })

    }
    else{
        res.status(500).send({
            status : 'failed',
            massage : 'Data is Not inserted'
        })
    }
}
