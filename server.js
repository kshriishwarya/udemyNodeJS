const express = require('express');
const app = express();
const request = require('request');
const port = 5400;
var fs=require('fs')




function getWeather(url) {
    // Setting URL and headers for request
    var options = {
        url: weatherUrl,
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
        // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}
// Weather Api Route
app.get('/employee/:id',(req,res) => {
    var id=req.params.id
var data=fs.readFileSync('./data/employeeDetails.JSON',{encoding:'utf8', flag:'r'})
var data=JSON.parse(data)
data=data.filter((item)=>{
    return item.employeeId==id

})
res.send(data)
})
app.get('/project/:id',(req,res) => {
    var id=req.params.id
var data=fs.readFileSync('./data/projectDetails.JSON',{encoding:'utf8', flag:'r'})
var data=JSON.parse(data)
data=data.filter((item)=>{
    return item.projectId==id

})
res.send(data)
})
app.get('/getemployeeDetails',(req,res) => {
    var id=req.params.id
var projectData=JSON.parse(fs.readFileSync('./data/projectDetails.JSON',{encoding:'utf8', flag:'r'}))
var employeeData=JSON.parse(fs.readFileSync('./data/employeeDetails.JSON',{encoding:'utf8', flag:'r'}))
var employeeDataRes=employeeData.map((employee)=>{
var res=projectData.find((project)=>{
return project.projectId==employee.projectId
})
return {...employee,projectName:res.projectName}
})
res.send(employeeDataRes)
})
//Weather Api Without promise
app.get('/weatherwithoutpromise',(req,res) => {
    request(url, (err,response,body) =>{
        if(err){
            console.log(err);
        } else {
           
            const output = JSON.parse(body);
            res.send(output);
        }
    });
});
app.get('/getData',(req,response)=>{
    var data
    request('http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees',(err,res,body)=>{
        console.log(body)
        data=JSON.parse(body).map((item)=>{
  return {name:item.name,createdAt:item.createdAt,Id:item.id}
        })
        response.send(data)

    })

})

app.listen(port ,(err) => {
    if(err) { console.log('error in api call')}
    else{ console.log ('App is running on port '+port)}
})