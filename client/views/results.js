Template.results.onRendered(function() {
	let curruser = Meteor.user();
	if(curruser){
		console.log(curruser, "logged in");
	} else{
		console.log("Not Logged In!")
	}
});

Template.results.helpers({
	currUserId: function(){
		return Meteor.userId();
	},
	getCurrMatch: function(){
		return Session.get("currMatch");
	},
	currResults: function(){
		var currSession = Session.get("currMatch");
		var currUserId = Meteor.userId();
		if(currSession && currUserId){
			var data = {
				team1: currSession.team1,
				team2: currSession.team2
			}
			return ActualPredictions.findOne(data);
		}
		return;
	},
	getMatchList: function(){
		return genericFtns.getMatchList();
	},
	applyMatchSelected: function(){
		var currSession = Session.get("currMatch");
		if(currSession && currSession.team1 === this.team1 && currSession.team2 === this.team2)
			return "matchSelect matchSelectColor"
		return "matchSelect";	
	}
});

Template.results.events({
	"click .matchSelect": function(event, template){
		Session.set("currMatch", this);
	}
});

AutoForm.hooks({
	'insertResultsForm': {
		onSuccess: function (operation, result, template) {
			console.log("insertResultsForm", result);
			return false;
		},
		onSubmit: function (insertDoc, updateDoc, currentDoc) {
			return false;
		},
		onError: function (operation, result, template) {
			return false;
		}
	},
	'updateResultsForm': {
		onSuccess: function (operation, result, template) {
			console.log("updateResultsForm", result);
			return false;
		},
		onSubmit: function (insertDoc, updateDoc, currentDoc) {
			return false;
		},
		onError: function (operation, result, template) {
			return false;
		}
	}
});