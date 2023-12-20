const patentSubmissionservice = require('../services/patent-submission.service');
const clientScript = require('../../public/js/client');
const path = require('path');

module.exports.renderPatentSubMissionAndGrant = async(req, res, next) =>{
    const fileuploadStatus = req.app.locals.fileuploadStatus;
    console.log('fileuploadStatus===>',req.app.locals.fileuploadStatus )
    const docuploadStatus = req.app.locals.docuploadStatus;
    console.log('docuploadStatus ==>',req.app.locals.docuploadStatus )
    const htmlVal = res.app.locals.htmlVal;
    console.log('htmlVal ==>>', res.app.locals.htmlVal);
    const errorMsg = res.app.locals.errorMsg;
    req.app.locals.fileuploadStatus = false;
    req.app.locals.docuploadStatus = false;
    res.app.locals.htmlVal = '';
    clientScript.includeHtml(htmlVal);
   const patentSubmissionList = await patentSubmissionservice.fetchPatentForm();
   if(patentSubmissionList){
    
    res.render('patent-submission', {
        title: 'File Upload Using Multer in Node.js and Express',
        utils: clientScript,
        fileuploadStatus: fileuploadStatus,
        docuploadStatus: docuploadStatus,
        errorMsg: errorMsg,
        htmlVal: htmlVal,
        patentList : patentSubmissionList
      })
}
};

module.exports.insertPatentsubmission = async(req, res, next) => {
        console.log('patentData in Controller', req.body);
        const patentData = req.body;
        const patentDocument = req.file.filename;
        const { filename, path: filePath } = req.file;
        console.log('file name ==>', patentDocument);
        console.log('Controller for handleFileConversion ==>>',req.file)
        const patentDataSubmission = await patentSubmissionservice.insertPatentFormData(req.body, req.file.filename);
        console.log('ID ==>>', patentDataSubmission.rows[0].id);
        if(patentDataSubmission && patentDataSubmission.rows[0].id){
            res.json({
            status : 'done',
            massage : 'data inserted suceessfully',
            patentData ,
            patentDocument,
            filePath: path.join('/', filePath),
            patentId : patentDataSubmission.rows[0].id
            
        })

        }
}

module.exports.updatePatentSubMissiom = async(req, res, next) => {
    console.log('data in controller' , req.body);
    console.log('ID in controller ==>', req.body.patentId);
    const updatedPatentData = req.body;
    const  patentId = req.body.patentId;
    const patentDocument = req.file.filename
    console.log(' updated file in Cotroller ', req.file);
    const updatedPatentSubmissionData = await patentSubmissionservice.updatPatentSubmission({updatedPatentData, patentId, patentDocument});
    if(updatedPatentSubmissionData.status === 'done'){
        res.json({
            status : 'done',
            massage : 'Data updated successfully',
            updatedPatentData : updatedPatentData,
            patentDocument
        })
    }
}

