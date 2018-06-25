Router.configure({
	layoutTemplate: "layout"
});

Router.map(function() {
	this.route('/', function() {
		this.layout("layout");
		this.render('myaccount');
	});	
	this.route('myaccount');
	this.route('predict');
	this.route('rankings');
	this.route('rules');
	this.route('results');
	this.route('allpredictions');	
});