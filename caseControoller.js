const caseStudyModel = require('../models/case-study-models');

module.exports.renderData = async (req, res, next) => {
    const data = await caseStudyModel.fetchAll();
    console.log(' before rendering the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
    res.render('case-study', {
        taskList: data.rows
    });
    console.log(' after render the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
   
}

module.exports.insertTask = async (req, res ,next) => {
  
    try {
        const newTask = await caseStudyModel.createCaseStudy(req.body);
        console.log('task is created' , newTask)
      

        if (newTask &&  newTask.rows[0].id) {
            console.log('New task created:', newTask);
            console.log('ID:', newTask.rows[0].id);
            res.status(200).json({ status: 'done', taskId: newTask.rows[0].id });
        } else {
            console.error('Failed to add the task. New task:', newTask);
            res.status(500).json({ status: 'error', message: 'Failed to add the task' });
        }
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ status: 'error', message: 'An error occurred while adding the task' });
    }
};

module.exports.deleteCaseStudy = async (req,res,next) =>{
    const delCase = await caseStudyModel 
}

module.exports.deleteCaseStudy = async (req, res, next) => {
    try {
        const delTask = await caseStudyModel.delete(req.body.taskId); // Assuming you pass the task ID correctly
        console.log('id... in delete ...',req.body.taskId)
        console.log('deltask ===>..',delTask);
        console.log('delcout of row ==',delTask.rowCount)

        if (delTask.rowCount === 1) {
            res.status(200).json({
                status: 'done'
            });
        } else {
            res.status(404).json({
                status: 'not found',
                message: 'Task not found'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while trying to delete the task'
        });
    }
};
