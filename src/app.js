"use strict";

require('dotenv').config()

let Globals = require('./routes/Globals');
let express = require('express');

let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let exphbs = require('express-handlebars');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let bodyParser = require('body-parser');

let mongoose = require("mongoose");
let csvDownloadEndpoints = require("./routes/api/csvDownload");

let candidateDelegationEndpoints = require("./routes/api/candidateDelegation");
let candidateEndpoints = require("./routes/api/candidates");
let debugEndpoints = require("./routes/api/debug");
let eligibilityEndpoints = require("./routes/api/eligibility");
let emailEndpoints = require("./routes/api/email");
let questionEndpoints = require("./routes/api/questions");
let requestedCandidateEndpoints = require("./routes/api/requestedCandidates");
let researcherEndpoints = require("./routes/api/researchers");
let responseEndpoints = require("./routes/api/response");
let trialEndpoints = require("./routes/api/trial");
let verifiedCandidateEndpoints = require("./routes/api/verifiedCandidates");
let Scheduler = require("./routes/api/logic/scheduler");
let routes = require('./routes/client');
let users = require('./routes/client/users');

mongoose.connect(process.env.MONGODB_URL);

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: Globals.SECRET,
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use(bodyParser.urlencoded({"extended": false}));
app.get('/', function (req, res) {
    res.render('mainpage');
});

app.use(candidateDelegationEndpoints);
app.use(candidateEndpoints);
app.use(debugEndpoints);
app.use(eligibilityEndpoints);
app.use(emailEndpoints);
app.use(questionEndpoints);
app.use(requestedCandidateEndpoints);
app.use(researcherEndpoints);
app.use(responseEndpoints);
app.use(trialEndpoints);
app.use(verifiedCandidateEndpoints);
app.use(csvDownloadEndpoints);
app.use('/', routes);
app.use('/users', users);

app.set('port', (process.env.PORT || Globals.PORT));

Scheduler.scheduleUpdate();

app.listen(app.get('port'), function () {
    console.log('Server started on port ' + app.get('port'));
});


