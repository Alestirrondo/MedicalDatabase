const express = require('express');
const newConn = require('./initDB.js');
const app = express();


app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('static'));

app.post('/login', (req,res) => {
    let name = req.body.usr;
    res.redirect('DataBaseMain.html');
})


app.post('/Q1', (req,res) => {//redirect to Q1
    res.redirect('Q1.html');
})

let Q1AllergySearch;//global value
app.post('/Q1Search',(req,res) => {//this is Q1
    Q1AllergySearch = req.body.drugname;
    let message = "<h1>List Of People who are allergic to their meds</h1>";
    let conn = newConn();//connecting to the database 
    conn.connect();
    conn.query(`SELECT c.fName, c.lName, c.Allergies, p.prescriptionId, c.customerId, COUNT(*) from Customer c, Prescription p, CustomerOrder o where p.PrescriptionID = o.PrescriptionID and c.CustomerID = o.CustomerID and c.Allergies = '${Q1AllergySearch}'`,(err,rows,fields) =>{
        //selecting values from tables, checks if a customer has an allergy to a drug prescribed to them
        if(err){
            console.log(err);
            message = "<h1> you've entered something wrong </h>";
        }else

        if(rows[0] > 0){//if the count is 0 and the only row is null, display an error message
            console.log(err);
            message = "<h1> you've entered something wrong </h>";
        }
        
        for (r of rows){
            message += ("<b>First Name:</b> " + r.fName + " <b>Last Name:</b> " + r.lName + " <b>Allergy:</b> " + r.Allergies + " <b>PrescriptionId:</b> " + r.prescriptionId +  " <b>CustomerId:</b> " + r.customerId + "<br/>");
            if(r.Allergies == null){
                console.log(err);//if the value of allergies is null (there isnt any rows) display error message
                message = "<h1> you've entered something wrong </h>";
            }
        }
        message += "<h2>Press the back button to go back</h2>"
        res.send(message);
    })
    
    conn.end();
})

app.post('/Q1Goback', (req,res) => {//redirecting to main page
    name = "";
    res.redirect('DatabaseMain.html');

})

app.post('/Q2', (req,res) => {//redirect to Q2
    res.redirect('Q2.html');

})

let Q2AvailabilitySearch;
let Q2Orderid;
app.post('/Q2Search',(req,res) => {
    Q2Orderid = req.body.OrderID;
    Q2AvailabilitySearch = req.body.drugname;//grabbing input objects from the html page
    let message = "<h1>List of amount of medication available for certain </h1>";
    let conn = newConn();
    conn.connect();
    //checks if there is enough quantity to make a prescription
    conn.query(`SELECT c.OrderID, d.AmountAvailable, p.AmountPrescribed,Count(*) from CustomerOrder c, Prescription p, PrescriptionDrug d where c.PrescriptionId = p.PrescriptionID and  p.Pname = d.Pname and p.AmountPrescribed < d.AmountAvailable and p.Pname = '${Q2AvailabilitySearch}' and c.OrderID = '${Q2Orderid}'`
    ,(err,rows,fields) =>{
        if(err){
            console.log(err);
            message = "<h1> you've entered something wrong </h>";
        }
        if(rows[0] > 0){
            console.log(err);
            message = "<h1> you've entered something wrong </h>";
        }
        for (r of rows){//looping through the rows of the table checking the query select and outputting the values ddynamically
            message += ("<b>OrderID:</b> " + r.OrderID + " <b>Amount Available:</b> " + r.AmountAvailable + " <b>Amount Prescribed:</b> " + r.AmountPrescribed + "<br/>");
            if(r.OrderID == null){
                console.log(err);
                message = "<h1> There is not enough quantity to fill the order, or the drug does not exist </h>";
            }
        }
        
        message += "<h2>Press the back button to go back</h2>"
        res.send(message);
    })
    conn.end();
})

app.post('/Q2Goback', (req,res) => {//redirecting to main page
    name = "";
    res.redirect('DatabaseMain.html');
})

app.post('/Q3', (req,res) => {//redirect to Q3
    res.redirect('Q3.html');
})


let Q3PharmacistID
app.post('/Q3Search',(req,res) => {
    Q3PharmacistID = req.body.PharmacistID//grabbing inputted values from html
    let message = "<h1>These are the drug prescriptions that were filled out by the Pharmacist</h1>"
    let conn = newConn();
    conn.connect();
    //selecting the values in prescription where the pharmacist inputted has made prescriptions
    conn.query(`SELECT PrescriptionID, Pdate, Pname,count(*) from Prescription where PharmacistID = '${Q3PharmacistID}'`
    ,(err,rows,fields) =>{
        if(err){
            console.log(err);
            message = "<h1> you've entered something wrong </h>";
        }
        if(rows[0] > 0){
            console.log(err);
            message = "<h1> you've entered something wrong </h>";
        }
        for(r of rows){//dynamically displaying the values queried
            message += ("<b>PresctiptionID:</b> " + r.PrescriptionID + " <b>Prescription Date:</b> " + r.Pdate + " <b>Prescription Name:</b> " + r.Pname + "<br/>");
            if(r.PrescriptionID == null){
                console.log(err);//if the values are null or the pharmacist ID is invalid display an error message
                message = "<h1> you've entered something wrong </h>";
            }
        }
        message += "<h2>Press the back button to go back</h2>"
        res.send(message);
    })
    conn.end();

})

app.post('/Q3Goback', (req,res) => {
    name = "";
    res.redirect('DatabaseMain.html');//redirecting to main page

})

app.post('/Q4', (req,res) => {//redirect to Q4
    res.redirect('Q4.html');

})

let Q4AmountAvail;
let Q4Pnam;
app.post('/Q4Search',(req,res) => {
    let conn = newConn();
    Q4AmountAvail = req.body.NewAmount;
    Q4Pnam = req.body.PrescriptionName;//grabbing inputted html values
    
    conn.connect();
    //query to update the prescription drugs amount available based on anme of drug and new number
    conn.query(`update prescriptiondrug set AmountAvailable = '${Q4AmountAvail}' where Pname = '${Q4Pnam}'`
    ,(err,rows,fields) =>{
        //display that the update has happened, check the update has happened in mySQL 
        res.send("<h1>These are the drug prescriptions that were filled out by the Pharmacist</h1> We have updated the Amount Available<h2>Press the back button to go back</h2>")
    })
    conn.end();
})

app.post('/Q4Goback', (req,res) => {//redirect to main page
    name = "";
    res.redirect('DatabaseMain.html');

})

app.post('/Q5', (req,res) => {//redirect to Q5
    res.redirect('Q5.html');

})

let Q5Pname;
let Q5Expire;
let Q5Strength;
let Q5DrugInteraction;
let Q5AmountAvailable;//global values
app.post('/Q5Search',(req,res) => {
    let conn = newConn();
    Q5Pname = req.body.drugname;
    Q5Expire = req.body.ExpirationDate;
    Q5Strength = req.body.strength;
    Q5DrugInteraction = req.body.DrugInteraction;
    Q5AmountAvailable = req.body.AmountAvailable;//grab values from html
    conn.connect();
    //insert values from html into row of database
    conn.query(`INSERT INTO PrescriptionDrug(Pname, ExpirationDate, Strength, DrugInteraction, AmountAvailable) VALUES('${Q5Pname}', '${Q5Expire}', '${Q5Strength}', '${Q5DrugInteraction}', '${Q5AmountAvailable}')`
    ,(err,rows,fields) =>{
        //values have been updated display message
        res.send("<h1>These are the drug prescriptions that were filled out by the Pharmacist</h1>We have added in the drug to our database <h2>Press the back button to go back</h2>")
    })
    conn.end();
})

app.post('/Q5Goback', (req,res) => {//redirect to main page
    name = "";
    res.redirect('DatabaseMain.html');

})

app.post('/Quit', (req,res) => {//quit the app return to sign in
    name = "";//quit the page erase the name
    res.redirect('index.html');

})

app.listen(1212);//listening at port 1212