Template.predict.onRendered(function() {
	let curruser = Meteor.user();
	if(curruser){
		console.log(curruser, "logged in");
	} else{
		console.log("Not Logged In!")
	}
});

Template.predict.helpers({
	currUserId: function(){
		return Meteor.userId();
	},
	getCurrMatch: function(){
		return Session.get("currMatch");
	},
	currUserEmail: function(){
		let curruser = Meteor.user();
		if(curruser){
			var currRecord = {};
			return curruser.emails[0].address;
		}
		return null;
	},
	currPrediction: function(){
		var currSession = Session.get("currMatch");
		var currUserId = Meteor.userId();
		if(currSession && currUserId){
			var data = {
				team1: currSession.team1,
				team2: currSession.team2,
				userId: currUserId
			}
			return MyPredictions.findOne(data);
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

Template.predict.events({
	"click .matchSelect": function(event, template){
		Session.set("currMatch", this);
	}
});

AutoForm.hooks({
	'insertPredictionForm': {
		onSuccess: function (operation, result, template) {
			return false;
		},
		onSubmit: function (insertDoc, updateDoc, currentDoc) {
			return false;
		},
		onError: function (operation, result, template) {
			return false;
		}
	},
	'updatePredictionForm': {
		onSuccess: function (operation, result, template) {
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